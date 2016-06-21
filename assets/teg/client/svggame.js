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
$('#svggame').before('<textarea id="consola" rows="8" cols="40"></textarea>');
$('#svggame').before('<button id="btnNext" rows="8" cols="40">Siguiente</button>');
$('#svggame').before('<div id="wrapperj1" class="activePlayer"><div class="nombreteg"><span id="nombreJ1"></span><br><small id="estadoJ1"></small></div><div class="ejercitosteg" id="ejercitosJ1"></div><div id="paisesJ1" class="paisesteg"></div></div>');
$('#svggame').before('<div id="wrapperj2"><div class="nombreteg"><span id="nombreJ2"></span></br><small id="estadoJ2"></small></div><div class="ejercitosteg" id="ejercitosJ2"></div><div id="paisesJ2" class="paisesteg"></div></div>');
$('#svggame').before('<div id="wrapperp1" class="z-depth-3"><span></span><i class="fa fa-times pointer" aria-hidden="true"></i></div>');
$('#svggame').before('<div id="wrapperp2" class="z-depth-3"><span></span><i class="fa fa-times pointer" aria-hidden="true"></i></div>');
$('#svggame').before('<button id="btnAtacar" >A</button>');
$('#svggame').before('<button id="btnRestar" class="z-depth-2"><i class="fa fa-minus" aria-hidden="true"></i></button>');
$('#svggame').before('<button id="btnAumentar" class="z-depth-2"><i class="fa fa-plus" aria-hidden="true"></i></button>');

//Cargamos svg mínimo
var s = Snap("#svggame");
s.attr({ viewBox: "0 0 1100 600" });


// //Acción
// var btnAccion = s.group(s.rect(500,0,235,100).attr({fill:"brown"}),s.text(530, 60, 'Atacar').attr({fill: "white",'font-size':"30px"}));
// btnAccion.click($.proxy(tegGame.jugadorActual.accion,tegGame));
// //Siguiente
// var btnSiguiente = s.group(s.rect(-20,550,235,50).attr({fill:"brown"}),s.text(60, 580, 'Finalizar').attr({fill: "white",'font-size':"20px"}));
// btnSiguiente.click($.proxy(tegGame.siguiente,tegGame));
//
// //Pais1
// var removePais1 = s.rect(0,145,14,14).click(function(){tegGame.removePaisSeleccionado1();pais1.attr({text:''})});
// var pais1 = s.text(20, 160, '').attr({fill: "white",'font-size':"20px"});
// //Pais2
// var removePais2 = s.rect(0,175,14,14).click(function(){tegGame.removePaisSeleccionado2();pais2.attr({text:''})});
// var pais2 = s.text(20, 190, '').attr({fill: "white",'font-size':"20px"});
// //Addbtn
//
// var removeCantidad = s.text(0,220,'-').click(function(){
// 	if(tegGame.paisSeleccionado1){
// 		switch (tegGame.jugadorActual.estado) {
// 			case 'PrimeraIncorporacion':
// 			case 'SegundaIncorporacion':
// 			case 'Incorporando':
// 				tegGame.paisSeleccionado1.removeEjercito(1);
// 				tegGame.paisSeleccionado1.draw();
// 				break;
// 			case 'Reagrupando':
// 					if(tegGame.paisSeleccionado1 &&
// 						tegGame.paisSeleccionado2 &&
// 						tegGame.cantidadReagrupar>0){
// 						tegGame.paisSeleccionado1.enviarEjercito(tegGame.paisSeleccionado2,tegGame.paisSeleccionado1,1);
// 						tegGame.cantidadReagrupar--;
// 					}
// 				break;
//
// 		}
// 	}
// });
// var addCantidad = s.text(50,220,'+').click(function(){
// 	if(tegGame.paisSeleccionado1){
// 		switch (tegGame.jugadorActual.estado) {
// 			case 'PrimeraIncorporacion':
// 			case 'SegundaIncorporacion':
// 			case 'Incorporando':
// 				tegGame.paisSeleccionado1.addEjercito(1);
// 				tegGame.paisSeleccionado1.draw();
// 				break;
// 			case 'Reagrupando':
// 				if(tegGame.paisSeleccionado1 &&
// 					tegGame.paisSeleccionado2 &&
// 					tegGame.paisSeleccionado1.ejercito>1){
// 					tegGame.paisSeleccionado1.enviarEjercito(tegGame.paisSeleccionado1,tegGame.paisSeleccionado2,1);
// 					tegGame.cantidadReagrupar++;
// 				}
// 			break;
//
// 		}
//
// 	}
// });
//
//
// var cantidadPase = 1;
// var alert = null;
//
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


// $('#svggame').before('<div class="pais1Teg">Pais1</div>');
// $('#svggame').before('<div class="pais2Teg">Pais2</div>');

// Metodos que ayudan a saber la pos x e y donde van los paises
// var move = function(dx,dy) {
//         this.attr({
//                     transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
//                 });
// }
//
// var start = function(x,y) {
//         this.data('origTransform', this.transform().local );
// }
// var stop = function() {
// 		console.log(this.getBBox());
// 		console.log(this.getBBox().x +","+this.getBBox().y2);
// }
// var over = function(){this.attr({fill:"#4CAF50"})};
// var out = function(){this.attr({fill:"#000"})};
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
