function JugadorClient(id,nombre,color){
	this.id = id;
	this.nombre = nombre;
	this.color = color;
	this.paises = [];
	this.ejercitosDisponibles = 5;
	this.estado = 'PrimeraIncorporacion';

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
