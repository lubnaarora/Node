var http = require('http');
var path = require('path');
var fs = require('fs');

var mimeTypes = {
	'.js' : 'text/javascript',
	'.html' : 'text/html',
	'.css' : 'text/css'
};

var cache = {};
function cacheAndDeliver( f, cb){
	fs.stat(f,function(err,stats){
		if(err){
			return console.log('Oh no! Error');
		}
		var lastChanged = Date.parse(stats.ctime),
		isUpdated = ( cache[f]) && lastChanged > cache[f].timestamp;
		if(!cache[f] || isUpdated)
		{
			fs.readFile(f,function(err,data){
				console.log('loading' + f + 'from file');
			});
		}

	})
		}




http.createServer(function(request,response){
	var lookup = path.basename(decodeURI(request.url)) || 'index.html';
	// value assigned to lookup using double pipe OR operator
	var f = 'content/' + lookup
	fs.exists(f,function(exists){
		if(exists){
			cacheAndDeliver(f,function(err,data) {
				if(err) { 
					//Error Handling
					response.writeHead(500);
					response.end('Server error');	
					return ;
				}
				var headers = {'Content-type' : mimeTypes[path.extname(lookup)]};
				response.writeHead(200,headers);
				response.end(data);
			});
			return;
		}
		response.writeHead(404);
		response.end();
	});
}).listen(8080);