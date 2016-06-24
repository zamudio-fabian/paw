var rutas = [];
rutas["/"] = {controlador: 'home', metodo: 'home'};
rutas["/home"] = {controlador: 'home', metodo: 'home'};
rutas["/login"] = {controlador: 'home', metodo: 'login'};
rutas["/news"] = {controlador: 'home', metodo: 'news'};
rutas["/play"] = {controlador: 'home', metodo: 'play'};
rutas["/rank"] = {controlador: 'home', metodo: 'rank'};
rutas["/how-to-play"] = {controlador: 'home', metodo: 'howtoplay'};
rutas["/logout"] = {controlador: 'home', metodo: 'logout'};
rutas["/dologin"] = {controlador: 'home', metodo: 'dologin'};
rutas["/registro"] = {controlador: 'home', metodo: 'registro'};
rutas["/doregistro"] = {controlador: 'home', metodo: 'doregistro'};
rutas["/404"]	= {controlador: '404', metodo: 'get'};

exports.rutas = rutas;
