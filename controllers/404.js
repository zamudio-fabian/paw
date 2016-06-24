var fs = require('fs');
var path = require("path");
var url = require("url");
var qs = require('querystring');

var handlebars = require('handlebars');
exports.get = function(req, res) {
	fs.readFile(path.resolve(__dirname, '../views/404.html'),'utf-8', function (error, source) {
		res.writeHead(404, {
			'Content-Type': 'text/html'
		});
		data = [];
		var template = handlebars.compile(source);
		var html = template(data);
		res.write(html);
		res.end();
	});

}
