var http = require('http');
var queryString = require('querystring');
var util = require('util');
var form = require('fs').readFileSync('form.html');
//Setting the maximum acceptable size
var maxData = 2*1024*1024; //2MB
http.createServer(function (request, response) {
if (request.method === "GET") {
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.end(form);
	}

if (request.method === "POST") {
	var postData = '';
	request.on('data', function (chunk) {
	postData += chunk;
	if( postData.length > maxData){
		postData = '';
		this.destroy();
		response.writeHead(413);
		response.end('Too Large');
	}
	}).on('end', function() {
		if(!postData){
			response.end();
			return ;
		}
		var postDataObject = queryString.parse(postData);
		console.log('User Posted:\n' + postData);
		response.end('You Posted:\n' + util.inspect(postDataObject));
		});
	}
}).listen(8080);