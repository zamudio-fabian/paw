exports.render = function(titulo, titulo_pagina, cuerpo) {
 return ['<!doctype html>',
  '<html lang="es">\n<head>\n<meta charset="utf-8">\n<title>{titulo}</title>',
  '<link rel="stylesheet" href="/css/style.css" />\n</head>',
  '<body><h1>{titulo_pagina}</h1>',
  '<div id="content">{cuerpo}</div>\n</body>\n</html>'
 ].join('\n')
 .replace(/\{titulo\}/g, titulo)
 .replace(/\{titulo_pagina\}/g, titulo_pagina)
 .replace(/\{cuerpo\}/g, cuerpo);
}
