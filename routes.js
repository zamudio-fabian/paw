var rutas = [];
rutas["/"] = {controlador: 'home', metodo: 'home'};
rutas["/home"] = {controlador: 'home', metodo: 'home'};
rutas["/login"] = {controlador: 'home', metodo: 'login'};
rutas["/news"] = {controlador: 'home', metodo: 'news'};
rutas["/play"] = {controlador: 'home', metodo: 'play'};
rutas["/rank"] = {controlador: 'home', metodo: 'rank'};
rutas["/how-to-play"] = {controlador: 'home', metodo: 'howtoplay'};
rutas["/support"] = {controlador: 'home', metodo: 'support'};

exports.rutas = rutas;
