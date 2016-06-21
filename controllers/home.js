/**********************************
**	REQUIRES
***********************************/
var fs = require('fs');
var path = require("path");
var handlebars = require('handlebars');
var pg = require('pg');
var conf = require('../core/config.js');

/**********************************
**	AUX
***********************************/



/**********************************
**	HOME
***********************************/
exports.home = function(req, res) {
	var data = {};
	pg.connect(conf.conectionString(), function(err, client, done) {

	    var handleError = function(err) {
	      // no error occurred, continue with the request
	      if(!err) return false;

	      // An error occurred, remove the client from the connection pool.
	      // A truthy value passed to done will remove the connection from the pool
	      // instead of simply returning it to be reused.
	      // In this case, if we have successfully received a client (truthy)
	      // then it will be removed from the pool.
	      if(client){
	        done(client);
	      }
	      res.writeHead(500, {'content-type': 'text/plain'});
	      res.end('An error occurred');
	      return true;
	    };

	    // handle an error from the connection
	    if(handleError(err)) return;

		client.query('SELECT * FROM users', function(err, result) {

		  // handle an error from the query
		  if(handleError(err)) return;

		  // return the client to the connection pool for other requests to reuse
		  done();
		  fs.readFile(path.resolve(__dirname, '../views/index.html'),'utf-8','utf-8', function (error, source) {
		  		if (error) {
		  			require('../controllers/404').get(req, res);
		  		}
		  		res.writeHead(200, {
		  			'Content-Type': 'text/html'
		  		});
				data['users'] = result.rows;
		  		var template = handlebars.compile(source);
		  		var html = template(data);
		  		res.write(html);
		  		res.end();
		  	});

		});
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
