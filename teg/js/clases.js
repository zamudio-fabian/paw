function Juego(){
	this.jugador1 = new Jugador("J1");
	this.jugador2 = new Jugador("J2");
	//Creamos Paises
    this.paises = array();

	this.prototype.init = function () {
		//Repartimos Paises
	};


}

function Jugador(nombre,color){
	this.nombre = nombre;
	this.color = color;
}


function Pais(nombre,continente,urlImg,posx,posy){
	this.nombre = nombre;
	this.continente = continente;
	this.urlImg = urlImg;
	this.posX = posx;
	this.posY = posy;
	this.limitrofes = [];
	this.jugador = null;

	this.draw = function(){
		Snap.load(this.urlImg,function(f,pais){
			var g = f.select("g");
		    s.append(g);
			g.attr({fill:this.jugador.color});
			g.attr({transform:"translate("+this.posX+","+this.posY+") scale(0.075,-0.068)"});
		},this);
	}

	this.addJugador = function(jugador){
		this.jugador = jugador;
	}
}

function ObjetivoSecreto(){
}

function TarjetaPais(){
}
