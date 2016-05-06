function Juego(){
	this.jugador1 = null;
	this.jugador2 = null;
	//Creamos Paises
    this.paises = [];

	this.init = function () {
		//Repartimos Paises
	};

	this.addPaises = function(paises){
		this.paises = paises;
	}

	this.setJ1 = function(jugador1){
		this.jugador1 = jugador1;
	}

	this.setJ2 = function(jugador2){
		this.jugador2 = jugador2;
	}

	function shuffle(paisesArray) {
		var j, x, i;
	    for (i = paisesArray.length; i; i -= 1) {
	        j = Math.floor(Math.random() * i);
	        x = paisesArray[i - 1];
	        paisesArray[i - 1] = paisesArray[j];
	        paisesArray[j] = x;
	    }
		return paisesArray;
	}

	this.repartirPaises = function(){
		//Ponemos todos los paises dentro de un array y los repartimos
		var shufflePaises = [];
		for (var property in paises) {
		    if (paises.hasOwnProperty(property)) {
		        shufflePaises.push(paises[property]);
		    }
		}
		shufflePaises = shuffle(shufflePaises);
		for (var i = 0; i < shufflePaises.length; i++) {
			if(i<22){
				shufflePaises[i].addJugador(jugador1);
				jugador1.addPais(shufflePaises[i]);
			}else{
				shufflePaises[i].addJugador(jugador2);
				jugador2.addPais(shufflePaises[i]);
			}
			shufflePaises[i].draw();
		}

	}


}

function Jugador(nombre,color){
	this.nombre = nombre;
	this.color = color;
	this.paises = [];

	this.addPais = function(pais){
		this.paises.push(pais);
	}
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
