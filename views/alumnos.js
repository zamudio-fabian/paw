template_main = require('./template-main.js');

exports.render = function(titulo, titulo_pagina, alumnos) {

    var lista_alumnos = "";

    for (var i = 0; i < alumnos.length; i++) {
        lista_alumnos = lista_alumnos + "<li>" + alumnos[i].nombre + "</li>";
    }

    lista_alumnos = "<ul>" + lista_alumnos + "</ul>";

    return template_main.render(titulo, titulo_pagina, lista_alumnos);
}
