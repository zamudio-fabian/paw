var template = require('../views/template-main');

exports.get = function(req, res) {
    res.writeHead(404, {
        'Content-Type': 'text/html'
    });
    res.write(
        template.render("404 - Página no encuentrada", "¡No se encontró la página", "<p>No se ha encontrado la página solicitada. Comuniquse con el administrador.</p>"));
    res.end();
}
