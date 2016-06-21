var fs = require('fs');
var path = require("path");
var handlebars = require('handlebars');

/**********************************
**	HOME
***********************************/
exports.home = function(req, res) {
	var data = {};
	fs.readFile(path.resolve(__dirname, '../views/index.html'),'utf-8','utf-8', function (error, source) {
		if (error) {
			require('../controllers/404').get(req, res);
		}
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});
		var template = handlebars.compile(source);
		var html = template(data);
		res.write(html);
		res.end();
	});
}

/**********************************
**	LOGIN
***********************************/
exports.login = function(req, res) {
	var data = {};
	fs.readFile(path.resolve(__dirname, '../views/login.html'),'utf-8', function (error,source) {
		if (error) {
			require('../controllers/404').get(req, res);
		}
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});
		var template = handlebars.compile(source);
		var html = template(data);
		res.write(html);
		res.end();
	});
}

/**********************************
**	NEWS
***********************************/
exports.news = function(req, res) {
	var data = {};
	fs.readFile(path.resolve(__dirname, '../views/news.html'),'utf-8', function (error,source) {
		if (error) {
			require('../controllers/404').get(req, res);
		}
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});
		var template = handlebars.compile(source);
		var html = template(data);
		res.write(html);
		res.end();
	});

}

/**********************************
**	PLAY
***********************************/
exports.play = function(req, res) {
	var data = {};
	fs.readFile(path.resolve(__dirname, '../views/play.html'),'utf-8', function (error,source) {
		if (error) {
			require('../controllers/404').get(req, res);
		}
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});
		var template = handlebars.compile(source);
		var html = template(data);
		res.write(html);
		res.end();
	});
}

/**********************************
**	RANK
***********************************/
exports.rank = function(req, res) {
	var data = {};
	fs.readFile(path.resolve(__dirname, '../views/rank.html'),'utf-8', function (error,source) {
		if (error) {
			require('../controllers/404').get(req, res);
		}
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});
		var template = handlebars.compile(source);
		var html = template(data);
		res.write(html);
		res.end();
	});
}

/**********************************
**	SUPPORT
***********************************/
exports.support = function(req, res) {
	var data = {};
	fs.readFile(path.resolve(__dirname, '../views/support.html'),'utf-8', function (error,source) {
		if (error) {
			require('../controllers/404').get(req, res);
		}
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});
		var template = handlebars.compile(source);
		var html = template(data);
		res.write(html);
		res.end();
	});
}

/**********************************
**	HOW TO PLAY
***********************************/
exports.howtoplay = function(req, res) {
	var data = {};
	fs.readFile(path.resolve(__dirname, '../views/how-to-play.html'),'utf-8', function (error,source) {
		if (error) {
			require('../controllers/404').get(req, res);
		}
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});
		var template = handlebars.compile(source);
		var html = template(data);
		res.write(html);
		res.end();
	});
}
