var Router = require('./router.js');
var http = require('http');

exports.iniciar = function(puerto){

 var server = http.createServer(function (req, res) {
   Router.procesar(req, res);
 });

 server.listen(puerto);
 console.log('Servidor web escuchando en el puerto ' + puerto);
};
