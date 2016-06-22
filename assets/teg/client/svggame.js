var tegGame = null;
$("#iniciar").click(function(e) {
e.preventDefault();
//Agregamos elementos DOM necesarios para mostrar información y dar acciones
var nombre = $.trim($("#nombre").val());
if(nombre.length==0){
	alert('Complete su nombre para comenzar');
	return false;
}
$("#myForm").remove();

//Botones y textos a mostrar
$('#svgwrapper').append('<svg class="z-depth-3 margin30-tb col m12 s12" id="svggame"></svg>');
$('#modalLoading').css('display','block');
$('#svggame').before('<textarea id="consola" rows="8" cols="40"></textarea>');
$('#svggame').before('<button id="btnNext" rows="8" cols="40">Siguiente</button>');
$('#svggame').before('<div id="wrapperj1" class="activePlayer"><div class="nombreteg"><span id="nombreJ1"></span><br><small id="estadoJ1"></small></div><div class="ejercitosteg" id="ejercitosJ1"></div><div id="paisesJ1" class="paisesteg"></div></div>');
$('#svggame').before('<div id="wrapperj2"><div class="nombreteg"><span id="nombreJ2"></span></br><small id="estadoJ2"></small></div><div class="ejercitosteg" id="ejercitosJ2"></div><div id="paisesJ2" class="paisesteg"></div></div>');
$('#svggame').before('<div id="wrapperp1" class="z-depth-3"><span></span><i class="fa fa-times pointer" aria-hidden="true"></i></div>');
$('#svggame').before('<div id="wrapperp2" class="z-depth-3"><span></span><i class="fa fa-times pointer" aria-hidden="true"></i></div>');
$('#svggame').before('<button id="btnAtacar" ><i class="fa fa-bomb" aria-hidden="true"></i></button>');
$('#svggame').before('<button id="btnRestar" class="z-depth-2"><i class="fa fa-minus" aria-hidden="true"></i></button>');
$('#svggame').before('<button id="btnAumentar" class="z-depth-2"><i class="fa fa-plus" aria-hidden="true"></i></button>');
$('#svggame').before('<button id="btnLeft" class="z-depth-2"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i></button>');

//Cargamos svg mínimo
var s = Snap("#svggame");
s.attr({ viewBox: "0 0 1100 600" });

//Set Juego
tegGame = new JuegoClient(s);
$('#btnNext').click(tegGame.siguiente);
$('#btnAtacar').click(tegGame.atacar);
$('#btnAumentar').click(function(){
	if(tegGame.paisSeleccionado1){
		switch (tegGame.jugadorActual.estado) {
			case 'PrimeraIncorporacion':
			case 'SegundaIncorporacion':
			case 'Incorporando':
				tegGame.addEjercitoP1(1);
				break;
			case 'Reagrupando':
				if(tegGame.paisSeleccionado1 &&
					tegGame.paisSeleccionado2 &&
					tegGame.paisSeleccionado1.ejercito>1){
					tegGame.enviarEjercito(1);
				}
			break;

		}

	}
});
$('#btnRestar').click(function(){
	if(tegGame.paisSeleccionado1){
		switch (tegGame.jugadorActual.estado) {
			case 'PrimeraIncorporacion':
			case 'SegundaIncorporacion':
			case 'Incorporando':
				if(tegGame.paisSeleccionado1.ejercito>1){
					tegGame.removeEjercitoP1(1);
				}
				break;

		}
	}
});
$('#btnLeft').click(function(){
	if(tegGame.paisSeleccionado1){
		switch (tegGame.jugadorActual.estado) {
			case 'Reagrupando':
					if(tegGame.paisSeleccionado1 &&
						tegGame.paisSeleccionado2 &&
						tegGame.paisSeleccionado2.ejercito>1){
						tegGame.devolverEjercito(1);
					}
				break;
		}
	}
});
$('#wrapperp1 > i').click(function(){tegGame.removePaisSeleccionado1();tegGame.removePaisSeleccionado2();});
$('#wrapperp2 > i').click(function(){tegGame.removePaisSeleccionado2()});
//Set Jugadores
tegGame.addJugador(nombre);
return false;
});

function addEjercitoAfterAtack(){
	var cantidad = $('#EjercitoAtackAdd').val();
	tegGame.addEjercitoAfterAtack(parseInt(cantidad));
}

function closeMessage(){
	$('#modalWrapper').css('display','none');
	$('#modalMessage').css('display','none');
}
