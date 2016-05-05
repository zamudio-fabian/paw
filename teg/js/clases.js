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
	this.ejercito = 1;
	this.limitrofes = [];
	this.jugador = null;
	this.svg = null;

	this.draw = function(){
		Snap.load(this.urlImg,function(f){
			//Creamos objetos basicos
			//[0]
			var g = f.select("g");
			//[1]
			var circulo = s.circle(0, 0, 10);
			//[2]
			var texto = s.text(0, 0, this.ejercito);
			//Los agrupamos
			var grupo = s.group(g,circulo,texto);
			//Cambiamos aspecto
			g.attr({fill:this.jugador.color});
			g.attr({transform:"translate("+this.posX+","+this.posY+") scale(0.075,-0.068)"});
			circulo.attr({transform:"translate("+g.getBBox().cx+","+g.getBBox().cy+")",
				fill: 'black',
				'fill-opacity':'0.3',
				stroke:'#424242',
	    		strokeWidth: 2
			});
			texto.attr({transform:"translate("+(circulo.getBBox().cx-(texto.getBBox().w))+","+(circulo.getBBox().cy+(texto.getBBox().h/2))+")",
				fill: "white",
				'font-size':"22px"
			});

			//Agregamos comportamiento
			grupo.hover(this.showLimitrofes,this.hideLimitrofes,this,this);
			//Agregamos al svg y al pais
			s.append(grupo);
			this.svg = grupo;
		},this);
	}

	this.addJugador = function(jugador){
		this.jugador = jugador;
	}

	this.addLimitrofes = function(limitrofes){
		this.limitrofes = limitrofes;
	}

	this.showLimitrofes = function(){
		this.limitrofes.forEach(function(e){
			e.shine();
		});

	}

	this.hideLimitrofes = function(){
		this.limitrofes.forEach(function(e){
			e.darken();
		});
	}

	this.shine = function(){
		this.svg[0].attr({fill:'#b0bec5'});
	}

	this.darken = function(){
		this.svg[0].attr({fill:this.jugador.color});
	}
}

function ObjetivoSecreto(){
}

function TarjetaPais(){
}
