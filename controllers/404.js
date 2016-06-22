var template = require('../views/404.html');

exports.get = function(req, res) {
    res.writeHead(404, {
        'Content-Type': 'text/html'
    });
    res.end();
}
