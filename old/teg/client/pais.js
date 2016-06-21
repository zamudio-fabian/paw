function Pais(id,nombre,continente,urlImg,posx,posy){
	this.id = id;
	this.nombre = nombre;
	this.continente = continente;
	this.urlImg = urlImg;
	this.posX = posx;
	this.posY = posy;
	this.ejercito = 1;
	this.limitrofes = [];
	this.jugador = null;
	this.svg = null;

	this.setTegGame = function(teg){
		this.tegGame = teg;
	}

	this.draw = function(s){
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
			// grupo.hover(this.showLimitrofes,this.hideLimitrofes,this,this);
			grupo.click($.proxy(handlerClick, this));
			//Agregamos al svg y al pais
			s.append(grupo);
			this.svg = grupo;
		},this);
	}


	function handlerClick(){
		//Si es el su turno
		if(this.tegGame.jugadorActual.id == this.tegGame.jugadorId){
			switch (this.tegGame.jugadorActual.estado) {
				case 'PrimeraIncorporacion':
				case 'SegundaIncorporacion':
				case 'Incorporando':
					//Si el país pertenece al jugador
					if(this.jugador == this.tegGame.jugadorActual){
						this.tegGame.setPaisSeleccionado1(this);
					}
					break;
				case 'Atacando':
						//Si el país pertenece al jugador
						if(this.tegGame.jugadorActual == this.jugador){
							//Si tiene más de 1 ejercito puede atacar
							if(this.ejercito > 1){
								this.tegGame.setPaisSeleccionado1(this);
								this.tegGame.removePaisSeleccionado2();
							}
						//Si no y es limitrofe
						}else if(this.tegGame.paisSeleccionado1 &&
								this.tegGame.paisSeleccionado1.isLimitrofeEnemigo(this)){
								this.tegGame.setPaisSeleccionado2(this);
						}
					break;
				case 'Reagrupando':
						//Si es del jugador actual lo seteo
						if(this.tegGame.jugadorActual == this.jugador){
							//Si no hay p1 lo seteamos
							if(!this.tegGame.paisSeleccionado1){
								this.tegGame.setPaisSeleccionado1(this);
								this.tegGame.removePaisSeleccionado2();
							//Si hay p1 y este es limitrofe aliado seteo p2
							}else if(this.tegGame.paisSeleccionado1.isLimitrofeAliado(this)){
								this.tegGame.setPaisSeleccionado2(this);
							//Si no cambio p1
							}else{
								this.tegGame.setPaisSeleccionado1(this);
								this.tegGame.removePaisSeleccionado2();
							}
						}
					break;
			}
		}
	}

	this.pasarEjercito = function(toPais,cantidad){
		var paisDesde  = this;
		var paisHacia = toPais;
		paisDesde.enviarEjercito(paisDesde,paisHacia,cantidad);
	}

	this.enviarEjercito = function(paisDesde,paisHacia,cantidad){
		paisHacia.ejercito+=cantidad;
		paisDesde.ejercito-=cantidad;
		paisHacia.draw(this.tegGame.svg);
		paisDesde.draw(this.tegGame.svg);
	}

	this.addJugador = function(jugador){
		this.jugador = jugador;
	}

	this.addLimitrofes = function(limitrofes){
		this.limitrofes = limitrofes;
	}

	this.addEjercito = function(cantidad){
		if(this.jugador.ejercitosDisponibles >= cantidad){
			this.ejercito+=cantidad;
			this.jugador.removeEjercitosDisponibles(cantidad);
			this.tegGame.refreshPlayers();
		}

	}

	this.removeEjercito = function(cantidad){
		if(this.ejercito >= cantidad){
			this.ejercito-=cantidad;
			this.jugador.addEjercitosDisponibles(cantidad);
			this.tegGame.refreshPlayers();
		}
	}

	this.isLimitrofeEnemigo = function(pais){
		return this.jugador != pais.jugador &&
				this.limitrofes.indexOf(pais)>-1;
	}

	this.isLimitrofeAliado = function(pais){
		return this.jugador == pais.jugador &&
				this.limitrofes.indexOf(pais)>-1;
	}

}
