/**********************************
**	REQUIRES
***********************************/
var fs = require('fs');
var path = require("path");
var url = require("url");
var qs = require('querystring');
var handlebars = require('handlebars');
var pg = require('pg');
var conf = require('../core/config.js');
var NodeSession = require('node-session');
var gravatar = require('gravatar');
var validator = require('validator');


/**********************************
**	AUX
***********************************/
session = new NodeSession({secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD',
							'lifetime':3600000});

/**********************************
**	HOME
***********************************/
exports.home = function(req, res) {

	session.startSession(req, res,function(){
		var data = {};
		if (req.session.has('username')){
			data['username'] = req.session.get('username');
			data['foto'] = req.session.get('foto');
		}
		pg.connect(conf.conectionString(), function(err, client, done) {

			if (err) {
				require('../controllers/404').get(req, res);
			}
			client.query('SELECT username,SUM(puntos) as totalpuntos FROM users inner join batallas on users.username = batallas.ganador GROUP BY username ORDER BY totalpuntos  DESC',
			function(err, result) {
				if (err) {
					require('../controllers/404').get(req, res);
				}

				fs.readFile(path.resolve(__dirname, '../views/index.html'),'utf-8', function (error, source) {
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
	});



}

/**********************************
**	LOGIN
***********************************/
exports.login = function(req, res) {
	session.startSession(req, res,function(){
		if (req.session.has('username')){
			res.writeHead(302, {
				'Location': 'home'
			});
			res.end();
		}else{
			var data = {};
			req.session.keep('redirect');
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
	});
}

/**********************************
**	DOLOGIN
***********************************/
exports.dologin = function(req, res){
	session.startSession(req, res,function(){
		if (req.session.has('username')){
			res.writeHead(302, {
				'Location': 'home'
			});
			res.end();
		}else{
			if (req.method == 'POST') {
				var fullBody = '';
				req.on('data', function(chunk) {
					// append the current chunk of data to the fullBody variable
					fullBody += chunk.toString();
				});

				req.on('end', function() {
					// parse the received body data
					var decodedBody = qs.parse(fullBody);
					if(validator.isEmail(decodedBody['email'])){
						pg.connect(conf.conectionString(), function(err, client, done) {
							//Update last_login
							//Si afecta a 1 row quiere decir que existe
							client.query("UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE email = $1 and password = $2",
							[decodedBody['email'],decodedBody['password']],
							function(err, result) {
								if(err){
									require('../controllers/404').get(req, res);
								}
								client.query("SELECT * FROM users WHERE email = $1 and password = $2",
								[decodedBody['email'],decodedBody['password']],
								function(err, result) {
									if(err){
										require('../controllers/404').get(req, res);
									}
									if(result.rowCount==1){
										session.startSession(req, res,function(){
											req.session.put('username', result.rows[0]['username']);
											req.session.put('email', result.rows[0]['email']);
											req.session.put('foto',gravatar.url(result.rows[0]['email'], {s: '200'}));
											if (req.session.has('redirect'))
											{
												res.writeHead(302, {
													'Location': req.session.get('redirect')
												});
											}else{
												res.writeHead(302, {
													'Location': 'home'
												});
											}
											res.end();
										});
									}else{
										res.writeHead(302, {
											'Location': 'login'
										});
										res.end();
									}
								});
							});
						});
					}else{
						res.writeHead(302, {
							'Location': 'login'
						});
						res.end();
					}
				});
			} else{
				require('../controllers/404').get(req, res);
			}
		}
	});
}

/**********************************
**	DOREGISTRO
***********************************/
exports.doregistro = function(req,res){
	session.startSession(req, res,function(){
		if (req.session.has('username')){
			res.writeHead(302, {
				'Location': 'home'
			});
			res.end();
		}else{

			if (req.method == 'POST') {
				var fullBody = '';
				req.on('data', function(chunk) {
					// append the current chunk of data to the fullBody variable
					fullBody += chunk.toString();
				});

				req.on('end', function() {
					// parse the received body data
					var decodedBody = qs.parse(fullBody);
					pg.connect(conf.conectionString(), function(err, client, done) {
						if(validator.isEmail(decodedBody['email'])){
							client.query("INSERT INTO users (email, password, username, last_login) VALUES ($1, $2, $3,CURRENT_TIMESTAMP)",
							[decodedBody['email'],decodedBody['password'],decodedBody['username']],
							function(err, result) {
								if(err){
									require('../controllers/404').get(req, res);
								}
								// empty 200 OK response for now
								session.startSession(req, res,function(){
									req.session.put('username', decodedBody['username']);
									req.session.put('email', decodedBody['email']);
									req.session.put('foto',gravatar.url(decodedBody['email'], {s: '200'}));
									res.writeHead(302, {
										'Location': 'home'
									});
									res.end();
								});
							});
						}else{
							res.writeHead(302, {
								'Location': 'home'
							});
							res.end();
						}
					});
				});

			} else{
				require('../controllers/404').get(req, res);
			}
		}
	});
}

/**********************************
**	LOGOUT
***********************************/
exports.logout = function(req,res){
	session.startSession(req, res,function(){
		req.session.flush();
		res.writeHead(302, {
			'Location': 'home'
		});
		res.end();
	});
}

/**********************************
**	NEWS
***********************************/
exports.news = function(req, res) {
	var data = {};
	session.startSession(req, res,function(){
		if (req.session.has('username')){
			data['username'] = req.session.get('username');
			data['foto'] = req.session.get('foto');
		}
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
	});
}

/**********************************
**	PLAY
***********************************/
exports.play = function(req, res) {
	var data = {};
	session.startSession(req, res,function(){
		if (req.session.has('username')){
			data['username'] = req.session.get('username');
			data['foto'] = req.session.get('foto');
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
		}else{
			req.session.flash('redirect', 'play');
			res.writeHead(302, {
				'Location': 'login'
			});
			res.end();
		}
	});
}

/**********************************
**	RANK
***********************************/
exports.rank = function(req, res) {
	var data = {};
	session.startSession(req, res,function(){
		if (req.session.has('username')){
			data['username'] = req.session.get('username');
			data['foto'] = req.session.get('foto');
		}
		pg.connect(conf.conectionString(), function(err, client, done) {

			if (err) {

				require('../controllers/404').get(req, res);
			}
			client.query('SELECT username,SUM(puntos) as totalpuntos,COUNT(puntos) as cantidad FROM users inner join batallas on users.username = batallas.ganador '+
			" WHERE start_date  >= CURRENT_DATE - interval '1 months' GROUP BY username ORDER BY totalpuntos DESC",
			function(errMonth, resultMonth) {
				if (errMonth) {
					require('../controllers/404').get(req, res);
				}else{
					data['month'] = resultMonth.rows;
					client.query('SELECT username,SUM(puntos) as totalpuntos,COUNT(puntos) as cantidad FROM users inner join batallas on users.username = batallas.ganador '+
					" GROUP BY username ORDER BY totalpuntos DESC",
					function(err, result) {
						if (err) {
							require('../controllers/404').get(req, res);
						}else{
							data['all']		= result.rows;
							fs.readFile(path.resolve(__dirname, '../views/rank.html'),'utf-8', function (error,source) {
								if (error) {
									require('../controllers/404').get(req, res);
								}else{

									res.writeHead(200, {
										'Content-Type': 'text/html'
									});
									var template = handlebars.compile(source);
									var html = template(data);
									res.write(html);
									res.end();
								}

							});
						}
					});
				}
			});
		});
	});
}

/**********************************
**	SUPPORT
***********************************/
exports.support = function(req, res) {
	var data = {};
	session.startSession(req, res,function(){
		if (req.session.has('username')){
			data['username'] = req.session.get('username');
			data['foto'] = req.session.get('foto');
		}
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
	});
}

/**********************************
**	HOW TO PLAY
***********************************/
exports.howtoplay = function(req, res) {
	var data = {};
	session.startSession(req, res,function(){
		if (req.session.has('username')){
			data['username'] = req.session.get('username');
			data['foto'] = req.session.get('foto');
		}
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
	});
}
