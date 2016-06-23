function JuegoClient(svg){
	this.jugadores = [];
	this.jugadorActual = null;
	this.svg = svg;
	this.paisSeleccionado1 = '';
	this.paisSeleccionado2 = '';
	this.cantidad = 0;
	this.finish = false;
	this.conquistado = false;
	this.socket = io.connect('http://localhost:8888');
	var that = this;

		//Creamos paises
		this.paises = {
		 1		:new Pais(1,'Argentina','América del Sur','teg/images/paises/argentina.svg',505,527),
		 2		:new Pais(2,'Chile','América del Sur','teg/images/paises/chile.svg',470.75,526.37),
		 3		:new Pais(3,'Brasil','América del Sur','teg/images/paises/brasil.svg',524.25,433.85),
		 4		:new Pais(4,'Uruguay','América del Sur','teg/images/paises/uruguay.svg',552.75,465),
		 5		:new Pais(5,'Perú','América del Sur','teg/images/paises/peru.svg',461.5,443.44),
		 6		:new Pais(6,'Colombia','América del Sur','teg/images/paises/colombia.svg',453,382.11),
		 7		:new Pais(7,'México','América del Norte','teg/images/paises/mexico.svg',393.975,344.78),
		 8		:new Pais(8,'Oregon','América del Norte','teg/images/paises/oregon.svg',273.225,308.45),
		 9		:new Pais(9,'New York','América del Norte','teg/images/paises/newyork.svg',376.65,270.05),
		 10		:new Pais(10,'California','América del Norte','teg/images/paises/california.svg',333.9,326.23),
		 11		:new Pais(11,'Alaska','América del Norte','teg/images/paises/alaska.svg',242.95,274.43),
		 12		:new Pais(12,'Yukón','América del Norte','teg/images/paises/yukon.svg',290.925,235.78),
		 13		:new Pais(13,'Canadá','América del Norte','teg/images/paises/canada.svg',329.225,220.195),
		 14		:new Pais(14,'Labrador','América del Norte','teg/images/paises/labrador.svg',401.725,232.025),
		 15		:new Pais(15,'Groenlandia','América del Norte','teg/images/paises/groenlandia.svg',498,210),
		 16		:new Pais(16,'Islandia','Europa','teg/images/paises/islandia.svg',596,255),
		 17		:new Pais(17,'Suecia','Europa','teg/images/paises/suecia.svg',715.375,191.715),
		 18		:new Pais(18,'Gran Bretaña','Europa','teg/images/paises/granbretana.svg',648,275),
		 19		:new Pais(19,'España','Europa','teg/images/paises/espana.svg',644,355.16),
		 20		:new Pais(20,'Rusia','Europa','teg/images/paises/rusia.svg',774,267),
		 21		:new Pais(21,'Australia','Oceanía','teg/images/paises/australia.svg',990.6,471.43),
		 22		:new Pais(22,'Japón','Asia','teg/images/paises/japon.svg',1008.275,189.94),
		 23		:new Pais(23,'China','Asia','teg/images/paises/china.svg',935,281.074),
		 24		:new Pais(24,'Sudáfrica','África','teg/images/paises/sudafrica.svg',800.625,521.73),
		 25		:new Pais(25,'Sahara','África','teg/images/paises/sahara.svg',695.15,463.06),
		 26		:new Pais(26,'Zaire','África','teg/images/paises/zaire.svg',742.9,487.261),
		 27		:new Pais(27,'Egipto','África','teg/images/paises/egipto.svg',787.025,435.648),
		 28		:new Pais(28,'Etiopía','África','teg/images/paises/etiopia.svg',779.875,457.921),
		 29		:new Pais(29,'Madagascar','África','teg/images/paises/madagascar.svg',896.525,506.968),
		 30		:new Pais(30,'Israel','Asia','teg/images/paises/israel.svg',843.275,355),
		 31		:new Pais(31,'Turquía','Asia','teg/images/paises/turquia.svg',820,312.102),
		 32		:new Pais(32,'Francia','Europa','teg/images/paises/francia.svg',695.85,323.819),
		 33		:new Pais(33,'Alemania','Europa','teg/images/paises/alemania.svg',746.9,310),
		 34		:new Pais(34,'Italia','Europa','teg/images/paises/italia.svg',755.1,373),
		 35		:new Pais(35,'Goby','Asia','teg/images/paises/goby.svg',876,292),
		 36		:new Pais(36,'Siberia','Asia','teg/images/paises/siberia.svg',872.7,177.598),
		 37		:new Pais(37,'Mongolia','Asia','teg/images/paises/mongolia.svg',864.2,227.856),
		 38		:new Pais(38,'Kamtchatka','Asia','teg/images/paises/kamtchatka.svg',940,152),
		 39		:new Pais(39,'Aral','Asia','teg/images/paises/aral.svg',822,181),
		 40		:new Pais(40,'India','Asia','teg/images/paises/india.svg',945.125,353),
		 41		:new Pais(41,'Sumatra','Oceanía','teg/images/paises/sumatra.svg',927.875,420.625),
		 42		:new Pais(42,'Borneo','Oceanía','teg/images/paises/borneo.svg',985.525,383.888),
		 43		:new Pais(43,'Java','Oceanía','teg/images/paises/java.svg',1041.95,380.76),
		}



			//Asignamos paises limitrofes
			this.paises[1].addLimitrofes([this.paises[2],this.paises[3],this.paises[4],this.paises[5]]);
			this.paises[2].addLimitrofes([this.paises[1],this.paises[21],this.paises[5]]);
			this.paises[3].addLimitrofes([this.paises[1],this.paises[6],this.paises[4],this.paises[5],this.paises[25]]);
			this.paises[4].addLimitrofes([this.paises[1],this.paises[3]]);
			this.paises[5].addLimitrofes([this.paises[2],this.paises[3],this.paises[1],this.paises[6]]);
			this.paises[6].addLimitrofes([this.paises[7],this.paises[3],this.paises[5]]);
			this.paises[7].addLimitrofes([this.paises[6],this.paises[10]]);
			this.paises[8].addLimitrofes([this.paises[10],this.paises[11],this.paises[12],this.paises[13],this.paises[9]]);
			this.paises[9].addLimitrofes([this.paises[13],this.paises[8],this.paises[10],this.paises[14],this.paises[15]]);
			this.paises[10].addLimitrofes([this.paises[7],this.paises[9],this.paises[8]]);
			this.paises[11].addLimitrofes([this.paises[38],this.paises[12],this.paises[8]]);
			this.paises[12].addLimitrofes([this.paises[11],this.paises[8],this.paises[13]]);
			this.paises[13].addLimitrofes([this.paises[12],this.paises[8],this.paises[9],this.paises[14]]);
			this.paises[14].addLimitrofes([this.paises[9],this.paises[13],this.paises[15]]);
			this.paises[15].addLimitrofes([this.paises[14],this.paises[9],this.paises[16]]);
			this.paises[16].addLimitrofes([this.paises[15],this.paises[18],this.paises[17]]);
			this.paises[17].addLimitrofes([this.paises[16],this.paises[20]]);
			this.paises[18].addLimitrofes([this.paises[16],this.paises[33],this.paises[19]]);
			this.paises[19].addLimitrofes([this.paises[18],this.paises[32],this.paises[25]]);
			this.paises[20].addLimitrofes([this.paises[33],this.paises[17],this.paises[31],this.paises[39],this.paises[37],this.paises[35]]);
			this.paises[21].addLimitrofes([this.paises[2],this.paises[43],this.paises[42],this.paises[41]]);
			this.paises[22].addLimitrofes([this.paises[38],this.paises[23]]);
			this.paises[23].addLimitrofes([this.paises[38],this.paises[22],this.paises[36],this.paises[37],this.paises[35],this.paises[40]]);
			this.paises[24].addLimitrofes([this.paises[26],this.paises[28]]);
			this.paises[25].addLimitrofes([this.paises[3],this.paises[19],this.paises[26],this.paises[28],this.paises[27]]);
			this.paises[26].addLimitrofes([this.paises[25],this.paises[24],this.paises[28],this.paises[29]]);
			this.paises[27].addLimitrofes([this.paises[25],this.paises[28],this.paises[30],this.paises[31],this.paises[33],this.paises[29]]);
			this.paises[28].addLimitrofes([this.paises[27],this.paises[25],this.paises[26],this.paises[24]]);
			this.paises[29].addLimitrofes([this.paises[27],this.paises[26]]);
			this.paises[30].addLimitrofes([this.paises[31],this.paises[27]]);
			this.paises[31].addLimitrofes([this.paises[20],this.paises[33],this.paises[30],this.paises[27],this.paises[35]]);
			this.paises[32].addLimitrofes([this.paises[19],this.paises[33],this.paises[34]]);
			this.paises[33].addLimitrofes([this.paises[32],this.paises[18],this.paises[34],this.paises[20],this.paises[31],this.paises[27]]);
			this.paises[34].addLimitrofes([this.paises[32],this.paises[33]]);
			this.paises[35].addLimitrofes([this.paises[20],this.paises[31],this.paises[23],this.paises[37],this.paises[40]]);
			this.paises[36].addLimitrofes([this.paises[39],this.paises[37],this.paises[23],this.paises[38]]);
			this.paises[37].addLimitrofes([this.paises[36],this.paises[39],this.paises[20],this.paises[35],this.paises[23]]);
			this.paises[38].addLimitrofes([this.paises[36],this.paises[23],this.paises[11],this.paises[22]]);
			this.paises[39].addLimitrofes([this.paises[20],this.paises[37],this.paises[36]]);
			this.paises[40].addLimitrofes([this.paises[23],this.paises[35],this.paises[41],this.paises[42]]);
			this.paises[41].addLimitrofes([this.paises[40],this.paises[21]]);
			this.paises[42].addLimitrofes([this.paises[40],this.paises[21]]);
			this.paises[43].addLimitrofes([this.paises[21]]);


	this.socket.on('setId',function(id){
		that.jugadorId = id;
	});
	this.socket.on('players',function(data){
		for (var i = 0; i < data.length; i++) {
			var e = data[i];
			that.jugadores[i] = new JugadorClient(e.id,e.nombre,e.color)
			that.jugadores[i].paises = e.paises;
		}
		that.jugadorActual = that.jugadores[0];

	});

	this.socket.on('objetivo',function(objetivo){
		that.objetivo = objetivo;
		$('#modalMessage h6').html('OBJETIVO SECRETO :<br>');
		$('#modalMessage p').html(that.objetivo.descripcion);
		$('#modalWrapper').css('display','block');
		$('#modalMessage').css('display','block');
	});

	this.socket.on('ready',function(data){
		var jugador1 = that.getJ(1);
		var jugador2 = that.getJ(2);
		for (var i = 0; i < data.player1.length; i++) {
			jugador1.paises.push(that.paises[data.player1[i]]);
			that.paises[data.player1[i]].addJugador(jugador1);
			that.paises[data.player1[i]].draw(that.svg);
			that.paises[data.player1[i]].setTegGame(that);
		}
		for (var i = 0; i < data.player2.length; i++) {
			jugador2.paises.push(that.paises[data.player2[i]]);
			that.paises[data.player2[i]].addJugador(jugador2);
			that.paises[data.player2[i]].draw(that.svg);
			that.paises[data.player2[i]].setTegGame(that);
		}
		that.refreshPlayers();
		showMessage();
		$('#btnAumentar').addClass('btnActive');
		$('#btnRestar').addClass('btnActive');
		$("#modalLoading").remove();

	});

	this.socket.on('setP1Response',function(response){
		that.paisSeleccionado1 = that.paises[response.pais];
		$("#wrapperp1").children("span").text(that.paisSeleccionado1.nombre);
	});

	this.socket.on('setP2Response',function(response){
		that.paisSeleccionado2 = that.paises[response.pais];
		$("#wrapperp2").children("span").text(that.paisSeleccionado2.nombre);
	});

	this.socket.on('addEjercitoP1Response',function(response){
		that.paisSeleccionado1.addEjercito(response.cantidad);
		that.paisSeleccionado1.draw(that.svg);
	});

	this.socket.on('enviarEjercitoResponse',function(response){
		that.paisSeleccionado1.ejercito = response.p1;
		that.paisSeleccionado1.draw(that.svg);
		that.paisSeleccionado2.ejercito = response.p2;
		that.paisSeleccionado2.draw(that.svg);
	});

	this.socket.on('responseRemovePaisSeleccionado1',function(){
		this.paisSeleccionado1 = '';
		$("#wrapperp1").children("span").text('');
	});

	this.socket.on('responseRemovePaisSeleccionado2',function(){
		this.paisSeleccionado2 = '';
		$("#wrapperp2").children("span").text('');
	});

	this.socket.on('removeEjercitoP1Response',function(response){
		that.paisSeleccionado1.removeEjercito(response.cantidad);
		that.paisSeleccionado1.draw(that.svg);
	});

	this.socket.on('responseAtacar',function(response){
		that.paisSeleccionado1.removeEjercito(response.ejercitos.atacantesEliminados);
		that.paisSeleccionado2.removeEjercito(response.ejercitos.defensoresEliminados);
		if(response.conquistado){
			var auxEjercitos = that.paisSeleccionado1.ejercito>3?3:that.paisSeleccionado1.ejercito-1;
			var auxPais = that.paisSeleccionado2.nombre;
			var indexPaisJ2 = that.paisSeleccionado2.jugador.paises.indexOf(that.paisSeleccionado2);
			that.paisSeleccionado2.jugador.paises.splice(indexPaisJ2,1);
			that.paisSeleccionado1.jugador.paises.push(that.paisSeleccionado2);
			that.paisSeleccionado2.jugador = that.paisSeleccionado1.jugador;
			//Solo si es el jugador activo
			if(that.jugadorId == that.jugadorActual.id){
				var auxOptions = "";
				for (var i = 1; i <= auxEjercitos; i++) {
					auxOptions+='<option value="'+i+'">'+i+'</option>';
				}
				$('#EjercitoAtackAdd').html(auxOptions);
				$('#modalWrapper').css('display','block');
				$('#modal').css('display','block');
			}else{
				$('#modalMessage h6').html(that.jugadorActual.nombre+' ha conquistado '+auxPais);
				$('#modalMessage p').html('');
				$('#modalWrapper').css('display','block');
				$('#modalMessage').css('display','block');
			}
		}
		that.refreshAfterAtaque(response.ejercitos.dadosAtacante,response.ejercitos.dadosDefensores);


	});

	this.socket.on('responseAddEjercitoAfterAtack',function(response){
		console.log(response);
		that.paisSeleccionado1.enviarEjercito(that.paisSeleccionado1,that.paisSeleccionado2,response.cantidad);
		that.refreshPlayers();
		if(that.jugadorActual.id==that.jugadorId){
			$('#modalWrapper').css('display','none');
			$('#modal').css('display','none');
		}
	});

	this.socket.on('nextResponse',function(response){
		for (var i = 0; i < that.jugadores.length; i++) {
			if(that.jugadores[i].id == response.actualId){
				that.jugadorActual = that.jugadores[i];
			}
			that.jugadores[i].estado = response.jugadores[that.jugadores[i].id].estado;
			that.jugadores[i].ejercitosDisponibles = response.jugadores[that.jugadores[i].id].ejercitosDisponibles;
		}
		that.refreshPlayers();
	});

	this.socket.on('win',function(response){
		var jugador = null;
		for (var i = 0; i < that.jugadores.length; i++) {
			if(that.jugadores[i].id == response.playerWin){
				jugador = that.jugadores[i];
			}
		}
		that.finish = true;
		$('#modalMessage h6').html(jugador.nombre+' GANO!!!');
		$('#modalMessage p').html('Presione "aceptar" para continuar');
		$('#modalWrapper').css('display','block');
		$('#modalMessage').css('display','block');

		this.disconnect();
	});


	//Mensajes para el servidor

	this.siguiente = function(){
		that.socket.emit('next',{
				id:that.jugadorId
		});
	};

	this.atacar = function(){
		if(that.paisSeleccionado1 && that.paisSeleccionado2
					&& (that.paisSeleccionado1.ejercito-1)>0
					&& (that.paisSeleccionado1.isLimitrofeEnemigo(that.paisSeleccionado2))){
						console.log('atacar');
				that.socket.emit('atacar',{
						id:that.jugadorId
				});
		}
	}

	this.setPaisSeleccionado1 = function(pais){
		that.socket.emit('setP1',{
				id:that.jugadorId,
				pais:pais.id
		});
	};

	this.setPaisSeleccionado2 = function(pais){
		that.socket.emit('setP2',{
				id:that.jugadorId,
				pais:pais.id
		});
	};

	this.addEjercitoP1 = function(cantidad){
		that.socket.emit('addEjercitoP1',{
				id:that.jugadorId,
				cantidad:cantidad
			});
	};

	this.removeEjercitoP1 = function(cantidad){
		that.socket.emit('removeEjercitoP1',{
				id:that.jugadorId,
				cantidad:cantidad
			});
	};

	this.enviarEjercito = function(cantidad){
		that.socket.emit('enviarEjercito',{
				id:that.jugadorId,
				cantidad:cantidad
		});
	};

	this.devolverEjercito = function(cantidad){
		that.socket.emit('devolverEjercito',{
				id:that.jugadorId,
				cantidad:cantidad
		});
	}

	this.devolverEjercito = function(cantidad){
		that.socket.emit('devolverEjercito',{
				id:that.jugadorId,
				cantidad:cantidad
		});
	}

	this.addEjercitoAfterAtack = function(cantidad){
		that.socket.emit('addEjercitoAfterAtack',{
				id:that.jugadorId,
				cantidad:cantidad
			});
	}

	this.addJugador = function(nombre){
		this.socket.emit('setJugador',nombre);
	}

	this.getJ = function(numero){
		return that.jugadores[numero-1];
	}


	this.removePaisSeleccionado1 = function(){
		that.socket.emit('removePaisSeleccionado1',{
				id:that.jugadorId
			});
	}

	this.removePaisSeleccionado2 = function(){
		that.socket.emit('removePaisSeleccionado2',{
				id:that.jugadorId
			});
	}



	this.showWinAlert = function(){
		alert('ganaste');
	}

	this.refreshAfterAtaque = function(dadosAtacante,dadosDefensor){
		var txt = $('#consola');
		var txtAtacante = '';
		var txtDefensor = '';
		for (var i = 0; i < dadosAtacante.length; i++) {
			txtAtacante += ' '+dadosAtacante[i];
		}
		for (var i = 0; i < dadosDefensor.length; i++) {
			txtDefensor += ' '+dadosDefensor[i];
		}
		txt.text(txt.val()+"/nAtacante = "+txtAtacante);
		txt.text(txt.val()+"/nDefensor = "+txtDefensor);
		var j1 = that.getJ(1);
		var j2 = that.getJ(2);
		$("#ejercitosJ1").text('E '+j1.ejercitosDisponibles);
		$("#ejercitosJ2").text('E '+j2.ejercitosDisponibles);
		$("#paisesJ1").text('P '+j1.paises.length);
		$("#paisesJ2").text('P '+j2.paises.length);
		that.paisSeleccionado1.draw(that.svg);
		that.paisSeleccionado2.draw(that.svg);
	}


	this.refreshPlayers = function(){
		var j1 = that.getJ(1);
		var j2 = that.getJ(2);
		if(that.getJ(1).id == that.jugadorActual.id){
			$("#wrapperj1").addClass('activePlayer');
			$("#wrapperj2").removeClass('activePlayer');
		}else{
			$("#wrapperj2").addClass('activePlayer');
			$("#wrapperj1").removeClass('activePlayer');
		}
		switch (that.jugadorActual.estado) {
			case 'PrimeraIncorporacion':
			case 'SegundaIncorporacion':
			case 'Incorporando':
				$('#btnLeft').removeClass('active');
				$('#btnAumentar').find($(".fa")).removeClass('fa-arrow-circle-right').addClass('fa-plus');
				$('#btnAumentar').addClass('active');
				$('#btnRestar').addClass('active');
				break;
			case 'Atacando':
				$('#btnAumentar').removeClass('active');
				$('#btnRestar').removeClass('active');
				$('#btnAtacar').addClass('active');

				break;
			case 'Reagrupando':
				$('#btnAumentar').find($(".fa")).addClass('fa-arrow-circle-right').removeClass('fa-plus');
				$('#btnAtacar').removeClass('active');
				$('#btnLeft').addClass('active');
				$('#btnAumentar').addClass('active');
				break;
		}
		$("#nombreJ1").text(j1.nombre);
		$("#nombreJ2").text(j2.nombre);
		$("#ejercitosJ1").text('E '+j1.ejercitosDisponibles);
		$("#ejercitosJ2").text('E '+j2.ejercitosDisponibles);
		$("#paisesJ1").text('P '+j1.paises.length);
		$("#paisesJ2").text('P '+j2.paises.length);
		$("#estadoJ1").text(j1.estado);
		$("#estadoJ2").text(j2.estado);
		showMessage();
	}

	function showMessage(){
		var txt = $('#consola');
		switch (that.jugadorActual.estado) {
			case 'PrimeraIncorporacion':
			case 'SegundaIncorporacion':
			case 'Incorporando':
				if(that.jugadorId == that.jugadorActual.id){
					txt.text("Seleccione un país para agregar ejercitos." + that.jugadorActual.ejercitosDisponibles+" unidades disponiles");
				}else{
					txt.text("" + that.jugadorActual.nombre+" esta incorporando ejercitos.");
				}
				break;
			case 'Atacando':
				if(that.jugadorId == that.jugadorActual.id){
					txt.text("Seleccione un país aliado para atacar a otro país enemigo.");
				}else{
					txt.text("" + that.jugadorActual.nombre+" esta atacando.");
				}
				break;
			case 'Reagrupando':
				if(that.jugadorId == that.jugadorActual.id){
					txt.text("Seleccione dos paises aliados para pasar ejercitos");
				}else{
					txt.text("" + that.jugadorActual.nombre+" esta reagrupando.");
				}
				break;
			}
		}



}
