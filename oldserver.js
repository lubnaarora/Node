var http = require('http');
var path = require('path');

	//
	//response.end('Woohoo!');

//defining routes in array of objects
var pages = [
	{route: '',output: 'Woohoo!'},
	//Single level routing
	{route: 'about',output:'A simple routing with node example'},
	//Multi-level routing
	//{route: '/about/this',output:'Multi-level routing with node'},
	//{route: '/about/node',output:'Evented I/O for V8 javascript'},
	//{route: 'about', childRoutes: [
	//	{route : 'node',output: 'Multi-level routing with node'},
	//	{route : 'this',output: 'Evented I/O for V8 javascript'}
	//]},
	{route: 'another page',output:function() { return 'Here is'+this.route}}
];
http.createServer(function(request,response){
	//Routing
	var lookup = path.basename(decodeURI(request.url));
	pages.forEach(function(page){
		if( page.route == lookup){
			response.writeHead(200,{'Content-Type':'text/html'});
			response.end(typeof page.output == 'function' ? page.output() : page.output);
		}
	});
	if(!response.finished){
		response.writeHead(404);
		response.end('Page not found');
	}
}).listen(8080);