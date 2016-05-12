function Juego(){
	this.jugador1 = null;
	this.jugador2 = null;
	this.jugadorActual = null;
	this.paisSeleccionado1 = '';
	this.paisSeleccionado2 = '';
	this.cantidad = 0;
	this.conquistado = false;
	this.objetivos = [];


	//Creamos Paises
    this.paises = [];

	this.init = function () {
		//Repartimos Paises
	};

	this.addPaises = function(paises){
		this.paises = paises;
	}

	this.addObjetivos = function(objetivos){
		this.objetivos = objetivos;
	}

	this.repartirObjetivos = function(){
		var objetivosShuffle = shuffle(this.objetivos);
		this.jugador1.addObjetivo(objetivosShuffle[0]);
		console.log(objetivosShuffle[0]);
		this.jugador2.addObjetivo(objetivosShuffle[1]);
	}

	this.setJ1 = function(jugador1){
		this.jugadorActual = jugador1;
		this.jugador1 = jugador1;
	}

	this.setJ2 = function(jugador2){
		this.jugador2 = jugador2;
	}

	this.getJ1 = function(){
		return this.jugador1;
	}

	this.getJ2 = function(){
		return this.jugador2;
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

	this.setPaisSeleccionado1 = function(pais){
		this.paisSeleccionado1 = pais;
	}

	this.setPaisSeleccionado2 = function(pais){
		this.paisSeleccionado2 = pais;
	}

	this.removePaisSeleccionado1 = function(){
		this.paisSeleccionado1 = '';
	}

	this.removePaisSeleccionado2 = function(){
		this.paisSeleccionado2 = '';
	}

	this.clearPaisesSeleccionados = function(){
		this.paisSeleccionado1 = '';
		this.paisSeleccionado2 = '';
		pais1.attr({text:''});
		pais2.attr({text:''})
	}

	this.siguiente = function(){
		if(this.jugadorActual.objetivo.checkWin(this.jugadorActual)){
			console.log(this.jugadorActual.nombre + ' GANO!!');
			showWinAlert();
		}
		switch (this.jugadorActual.estado) {
			case 'PrimeraIncorporacion':
				this.jugadorActual.estado = 'SegundaIncorporacion';
				this.jugadorActual.addEjercitosDisponibles(3);
				if(this.jugadorActual == this.jugador1){
					this.jugadorActual = this.jugador2;
				}else{
					this.jugadorActual = this.jugador1;
				}
				this.clearPaisesSeleccionados();
				break;
			case 'SegundaIncorporacion':
					this.jugadorActual.estado = 'Atacando';
					if(this.jugadorActual == this.jugador1){
						this.jugadorActual = this.jugador2;
					}else{
						this.jugadorActual = this.jugador1;
					}
					this.clearPaisesSeleccionados();
					break;
			case 'Incorporando':
				this.jugadorActual.estado = 'Atacando';
				this.clearPaisesSeleccionados();
				break;
			case 'Atacando':
				this.jugadorActual.estado = 'Reagrupando';
				this.clearPaisesSeleccionados();
				break;
			case 'Reagrupando':
				//Cambio el jugador Actual
				if(this.jugadorActual == this.jugador1){
					this.jugadorActual = this.jugador2;
				}else{
					this.jugadorActual = this.jugador1;
				}
				//Agregamos ejercitos MIN 3
				var ejercitosNuevos = 3;
				if(this.jugadorActual.paises.length>=8){
					ejercitosNuevos = Math.floor(this.jugadorActual.paises.length/2);
				}
				this.jugadorActual.addEjercitosDisponibles(ejercitosNuevos);

				this.jugadorActual.estado = 'Incorporando';
				this.conquistado = false;
				break;
		}

	console.log(this.jugadorActual.nombre+" - "+this.jugadorActual.estado);
	}
}

function Jugador(nombre,color){
	this.nombre = nombre;
	this.color = color;
	this.paises = [];
	this.ejercitosDisponibles = 5;
	this.estado = 'PrimeraIncorporacion';
	this.objetivo = null;

	this.addObjetivo = function(objetivo){
		this.objetivo = objetivo;
	}

	this.addPais = function(pais){
		this.paises.push(pais);
	}

	this.hasPais = function(pais){
		var encontrado = false;
		var i = 0;
		while (!encontrado && this.paises.length>i) {
			if(this.paises[i].nombre == pais.nombre){
				encontrado == true;
			}
			i++;
		}
		return encontrado;
	}


	this.accion = function(){

		switch (this.jugadorActual.estado) {
				case 'PrimeraIncorporacion':
				case 'PrimeraIncorporacion':
				case 'Incorporando':
					break;
				case 'Atacando':
					if(this.paisSeleccionado1 && this.paisSeleccionado2
								&& (this.paisSeleccionado1.ejercito-1)>0
								&& (this.paisSeleccionado1.isLimitrofeEnemigo(this.paisSeleccionado2))){
						//Creamos dado
						var dado = new Dado();
						var dadosAtacante = [];
						var dadosDefensores = [];
						//Tiramos dados segun la cantidad de ejercitos - 1 (MAX 3)
						var ejercitosAtacantes = ((this.paisSeleccionado1.ejercito-1) <= 3)?(this.paisSeleccionado1.ejercito-1):3;
						for (var i = 0; i < ejercitosAtacantes; i++) {
							dadosAtacante.push(dado.tirar());
						}
						dadosAtacante.sort(function(a, b){return b-a});
						console.log(dadosAtacante);
						//Tiramos dados segun la cantidad de ejercitos (MAX 3)
						var ejercitosDefensores = ((this.paisSeleccionado2.ejercito) <=3)?(this.paisSeleccionado2.ejercito):3;
						for (var i = 0; i < ejercitosDefensores; i++) {
							dadosDefensores.push(dado.tirar());
						}
						dadosDefensores.sort(function(a, b){return b-a});
						console.log(dadosDefensores);
						//Comparamos resultados de los dados
						var comparanciones = (dadosAtacante.length > dadosDefensores.length)?dadosDefensores.length:dadosAtacante.length;
						var c = 0;
						var ejercitoDefensorEliminado = 0;
						var ejercitoAtacanteEliminado = 0;
						var conquistado = false;
						for (var c = 0; c < comparanciones; c++) {
							if(dadosAtacante[c]>dadosDefensores[c]){
								ejercitoDefensorEliminado++;
								console.log(c+' - Gano atacante');
							}else{
								ejercitoAtacanteEliminado++;
								console.log(c+' - Gano defensor');
							}
							if((this.paisSeleccionado2.ejercito - ejercitoDefensorEliminado)<=0){
								conquistado = true;
							}
						}


						//Los ejercitos eliminados vuelven al stack de ejercitos
						this.paisSeleccionado1.jugador.addEjercitosDisponibles(ejercitoAtacanteEliminado);
						this.paisSeleccionado1.removeEjercito(ejercitoAtacanteEliminado);


						this.paisSeleccionado2.jugador.addEjercitosDisponibles(ejercitoDefensorEliminado);
						this.paisSeleccionado2.removeEjercito(ejercitoDefensorEliminado);

						if(conquistado){
							//Seteamos variable usada en la etapa de tarjetas
							this.conquistado = conquistado;
							//Eliminamos el pais del array del j2
							var indexPaisJ2 = this.paisSeleccionado2.jugador.paises.indexOf(this.paisSeleccionado2);
							this.paisSeleccionado2.jugador.paises.splice(indexPaisJ2,1);
							console.log('Paises j2 = '+this.paisSeleccionado2.jugador.paises.length);
							//Asignamos el pais al array del j1
							this.paisSeleccionado2.jugador = this.paisSeleccionado1.jugador;
							this.paisSeleccionado1.jugador.paises.push(this.paisSeleccionado2);
							console.log('Paises j1 = '+this.paisSeleccionado1.jugador.paises.length);
							//Creamos una alerta para felicitarlo y ver si quiere pasar ejercitos
							btnAumentar = s.group(s.rect(580,300,20,20).attr({fill:'white'}),
												s.text(580, 320, '+').attr({'font-size':"30px"}))
												.click(function(){
												if(cantidadPase<3 && cantidadPase<(tegGame.paisSeleccionado1.ejercito-1)){
													cantidadPase++;
													alert[4].attr({'text':cantidadPase});
												}});
							var btnDisminuir = s.group(s.rect(480,300,20,20).attr({fill:'white'}),
												s.text(480, 320, '-').attr({'font-size':"30px"}))
												.click(function(){console.log(cantidadPase);if(cantidadPase>1){cantidadPase--;alert[4].attr({'text':cantidadPase})}});
							var btnAceptar = s.group(s.rect(460,400,180,50).attr({fill:'white'}),
												s.text(500, 435, 'Aceptar').attr({'font-size':"30px"}))
												.click($.proxy(tegGame.paisSeleccionado1.pasarEjercito,alert));
							alert = s.group(s.rect(0,0,1100,600).attr({'fill-opacity':'0.5'}),
										s.rect(200,100,700,400),
										s.text(250,150,'Felicitaciones!! Conquisto un país').attr({fill:'white','font-size':"40px"}),
										s.text(300,200,'Cuantas ejercitos desea pasar de '+tegGame.paisSeleccionado1.nombre+' a '+tegGame.paisSeleccionado2.nombre).attr({fill:'white','font-size':"20px"}),
										s.text(530,320,''+cantidadPase).attr({fill:'white','font-size':"30px"}),
										btnAumentar,
										btnDisminuir,
										btnAceptar);
							if(this.jugadorActual.objetivo.checkWin(this.jugadorActual)){
											console.log(this.jugadorActual.nombre + ' GANO!!');
											showWinAlert();
							}

						}else{
							this.paisSeleccionado1.draw();
							this.paisSeleccionado2.draw();
						}

					}
					break;
				case 'Reagrupamos':

					break;
				default:

			}

	}


	this.addEjercitosDisponibles = function(cantidad){
		this.ejercitosDisponibles+=cantidad;
	}

	this.removeEjercitosDisponibles = function(cantidad){
			this.ejercitosDisponibles-=cantidad;
	}

	this.setEstado = function(estado){
		this.estado = estado;
	}
}

function Dado(){
	this.valor = 1;

	this.tirar = function(){
		return (1 + Math.floor(Math.random()*6));
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
	this.ejercitosPasados = 0;

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
			// grupo.hover(this.showLimitrofes,this.hideLimitrofes,this,this);
			grupo.click($.proxy(handlerClick, this));
			//Agregamos al svg y al pais
			s.append(grupo);
			this.svg = grupo;
		},this);
	}


	function handlerClick(){
			switch (tegGame.jugadorActual.estado) {
				case 'PrimeraIncorporacion':
					if(this.jugador == tegGame.jugadorActual){
						tegGame.setPaisSeleccionado1(this);
						pais1.attr({text:this.nombre});
					}
					break;
				case 'SegundaIncorporacion':
						if(this.jugador == tegGame.jugadorActual){
							tegGame.setPaisSeleccionado1(this);
							pais1.attr({text:this.nombre});
						}
						break;
				case 'Incorporando':
					if(this.jugador == tegGame.jugadorActual){
						tegGame.setPaisSeleccionado1(this);
						pais1.attr({text:this.nombre});
					}
					break;
				case 'Atacando':
						if(tegGame.jugadorActual == this.jugador){
							if(this.ejercito > 1){
								tegGame.setPaisSeleccionado1(this);
								pais1.attr({text:this.nombre});
								pais2.attr({text:''});
								tegGame.paisSeleccionado2 = '';
							}
						}else if(tegGame.paisSeleccionado1.isLimitrofeEnemigo(this)){
							tegGame.setPaisSeleccionado2(this);
							pais2.attr({text:this.nombre});
						}
					break;
				case 'Reagrupando':
						//Si no tengo pais seleccionado en 1 y es del jugador actual lo seteo
						if(!tegGame.paisSeleccionado1 && tegGame.jugadorActual == this.jugador){
							tegGame.setPaisSeleccionado1(this);
							pais1.attr({text:this.nombre});
							pais2.attr({text:''});
							tegGame.paisSeleccionado2 = '';
							tegGame.cantidadReagrupar = 0;
						}else if(tegGame.paisSeleccionado1.isLimitrofeAliado(this)){
							tegGame.setPaisSeleccionado2(this);
							pais2.attr({text:this.nombre});
							tegGame.cantidadReagrupar = 0;
						}
					break;
			}

	}

	this.pasarEjercito = function(){
		var paisDesde  = tegGame.paisSeleccionado1;
		var paisHacia = tegGame.paisSeleccionado2;
		var cantidad = cantidadPase;
		if(cantidad<=3 && cantidad>=1 && cantidad<=(tegGame.paisSeleccionado1.ejercito-1)){
			paisDesde.enviarEjercito(paisDesde,paisHacia,cantidad);
		}
		cantidadPase = 1;
		tegGame.removePaisSeleccionado2();
		pais2.attr({text:''});
		alert.remove();
	}

	this.enviarEjercito = function(paisDesde,paisHacia,cantidad){
		paisHacia.ejercito+=cantidad;
		paisDesde.ejercito-=cantidad;
		console.log(paisDesde.ejercito);
		console.log(paisHacia.ejercito);
		paisHacia.draw();
		paisDesde.draw();
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
		}

	}

	this.removeEjercito = function(cantidad){
		if(this.ejercito >= cantidad){
			this.ejercito-=cantidad;
			this.jugador.addEjercitosDisponibles(cantidad);
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

function ObjetivoSecreto(descripcion,funcion){
	this.descripcion = descripcion;

	this.checkWin = function(jugador){
		if(funcion(jugador)){
			return true;
		}else if(jugador.paises.length==43){
			return true;
		}else{
			return false;
		}
	}
}

function TarjetaPais(){
}
