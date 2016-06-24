## Guía de instalación
#### Servidor HTTP
1. Descargar el proyecto.
2. Crear en postgresql la base de datos tegBd y restaurarla desde bk_teg.backup incluido en el .rar
3. Cambie el archivo <ruta>\httpServer\core\config.js
```javascript
config['username'] 	= '<user>';
config['password']	= '<password>';
config['ip']		= '<ip>';
config['port']		= '<puerto>';
config['bd']		= 'tegBd';
```

4. De ser necesario cambiar la IP del servidor de juego (por default localhost:8888), editar el archivo <ruta>\httpServer\assets\teg\client\juego.js
```javascript
this.socket = io.connect('http://<ip>:<puerto>');
```
#### Servidor Juego

1. Descargar el proyecto.
2. Cambie el archivo <ruta>\httpServer\core\config.js para apuntar a la misma BD que el servidor http.
```javascript
config['username'] 	= '<user>';
config['password']	= '<password>';
config['ip']		= '<ip>';
config['port']		= '<puerto>';
config['bd']		= 'tegBd';
```
3. Si desea cambiar el puerto de esucha del servidor, cambie el archivo <ruta>\httpServer\core\config.js
```javascript
server.listen(<puerto>, function() {
```
