var http = require('http');
var path = require('path');
var fs = require('fs');
http.createServer(function (request, response) {
	var lookup = url.parse(decodeURI(request.url)).pathname;
	lookup = (lookup === "/") ? '/index.html-serve' : lookup + '-serve';
	var f = 'content-pseudosafe' + lookup;
	fs.exists(f, function (exists) {
		if(!exists){
			response.writeHead(404);
			response.end('Page not found')
		}
	});
}).listen(8080);