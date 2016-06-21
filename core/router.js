var url = require('url'),
    fs = require('fs'),
    manejador_rutas = require('../routes.js'),
    path = require("path"),
    tipos_de_archivos = require('./tipos_archivos.js');



function getExtension(filename) {
    var ext = path.extname(filename || '').split('.');
    return ext[ext.length - 1];
}

procesar = function(req, res) {

    req.requrl = url.parse(req.url, true);
    var carpeta = req.requrl.pathname;

    // ¿Es un controlador?
    if (manejador_rutas.rutas[carpeta] != null) {
        require('../controllers/' + manejador_rutas.rutas[carpeta].controlador)[manejador_rutas.rutas[carpeta].metodo](req, res);
    } else {


        // ¿Es un recurso público?
        fs.readFile(path.resolve(__dirname, '../assets/' + carpeta),  function(err, data) {
            if (err) {
                require('../controllers/404').get(req, res);
            } else {
                res.writeHead(200, {
                    'Content-Type': tipos_de_archivos.tipos[getExtension(carpeta)]
                });
                res.write(data);
                res.end();
            }
        });
    }
}

exports.procesar = procesar;
