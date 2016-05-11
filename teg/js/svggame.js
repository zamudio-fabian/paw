

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
var cantidadPase = 1;
var alert = null;
var s = Snap("#svggame");
s.attr({ viewBox: "0 0 1100 600" });



//Creamos Jugadores
var jugador1 = new Jugador('Fabian','#689f38');
var jugador2 = new Jugador('Matias','#e65100');

//Creamos paises
var paises = {
 'Argentina'	:new Pais('Argentina','América del Sur','teg/images/paises/argentina.svg',505,527),
 'Chile'		:new Pais('Chile','América del Sur','teg/images/paises/chile.svg',470.75,526.37),
 'Brasil'		:new Pais('Brasil','América del Sur','teg/images/paises/brasil.svg',524.25,433.85),
 'Uruguay'		:new Pais('Uruguay','América del Sur','teg/images/paises/uruguay.svg',552.75,465),
 'Peru'			:new Pais('Perú','América del Sur','teg/images/paises/peru.svg',461.5,443.44),
 'Colombia'		:new Pais('Colombia','América del Sur','teg/images/paises/colombia.svg',453,382.11),
 'Mexico'		:new Pais('México','América del Norte','teg/images/paises/mexico.svg',393.975,344.78),
 'Oregon'		:new Pais('Oregon','América del Norte','teg/images/paises/oregon.svg',273.225,308.45),
 'NewYork'		:new Pais('New York','América del Norte','teg/images/paises/newyork.svg',376.65,270.05),
 'California'	:new Pais('California','América del Norte','teg/images/paises/california.svg',333.9,326.23),
 'Alaska'		:new Pais('Alaska','América del Norte','teg/images/paises/alaska.svg',242.95,274.43),
 'Yukon'		:new Pais('Yukón','América del Norte','teg/images/paises/yukon.svg',290.925,235.78),
 'Canada'		:new Pais('Canadá','América del Norte','teg/images/paises/canada.svg',329.225,220.195),
 'Labrador'		:new Pais('Labrador','América del Norte','teg/images/paises/labrador.svg',401.725,232.025),
 'Groenlandia'	:new Pais('Groenlandia','América del Norte','teg/images/paises/groenlandia.svg',498,210),
 'Islandia'		:new Pais('Islandia','América del Norte','teg/images/paises/islandia.svg',596,255),
 'Suecia'		:new Pais('Suecia','Europa','teg/images/paises/suecia.svg',715.375,191.715),
 'GranBretana'	:new Pais('Gran Bretaña','Europa','teg/images/paises/granbretana.svg',648,275),
 'Espana'		:new Pais('España','Europa','teg/images/paises/espana.svg',644,355.16),
 'Rusia'		:new Pais('Rusia','Europa','teg/images/paises/rusia.svg',774,267),
 'Australia'	:new Pais('Australia','Oceanía','teg/images/paises/australia.svg',990.6,471.43),
 'Japon'		:new Pais('Japón','Asia','teg/images/paises/japon.svg',1008.275,189.94),
 'China'		:new Pais('China','Asia','teg/images/paises/china.svg',935,281.074),
 'Sudafrica'	:new Pais('Sudáfrica','África','teg/images/paises/sudafrica.svg',800.625,521.73),
 'Sahara'		:new Pais('Sahara','África','teg/images/paises/sahara.svg',695.15,463.06),
 'Zaire'		:new Pais('Zaire','África','teg/images/paises/zaire.svg',742.9,487.261),
 'Egipto'		:new Pais('Egipto','África','teg/images/paises/egipto.svg',787.025,435.648),
 'Etiopia'		:new Pais('Etiopía','África','teg/images/paises/etiopia.svg',779.875,457.921),
 'Madagascar'	:new Pais('Madagascar','África','teg/images/paises/madagascar.svg',896.525,506.968),
 'Israel'		:new Pais('Israel','Asia','teg/images/paises/israel.svg',843.275,355),
 'Turquia'		:new Pais('Turquía','Asia','teg/images/paises/turquia.svg',820,312.102),
 'Francia'		:new Pais('Francia','Europa','teg/images/paises/francia.svg',695.85,323.819),
 'Alemania'		:new Pais('Alemania','Europa','teg/images/paises/alemania.svg',746.9,310),
 'Italia'		:new Pais('Italia','Europa','teg/images/paises/italia.svg',755.1,373),
 'Goby'			:new Pais('Goby','Asia','teg/images/paises/goby.svg',876,292),
 'Siberia'		:new Pais('Siberia','Asia','teg/images/paises/siberia.svg',872.7,177.598),
 'Mongolia'		:new Pais('Mongolia','Asia','teg/images/paises/mongolia.svg',864.2,227.856),
 'Kamtchatka'	:new Pais('Kamtchatka','Asia','teg/images/paises/kamtchatka.svg',940,152),
 'Aral'			:new Pais('Aral','Asia','teg/images/paises/aral.svg',822,181),
 'India'		:new Pais('India','Asia','teg/images/paises/india.svg',945.125,353),
 'Sumatra'		:new Pais('Sumatra','Oceanía','teg/images/paises/sumatra.svg',927.875,420.625),
 'Borneo'		:new Pais('Borneo','Oceanía','teg/images/paises/borneo.svg',985.525,383.888),
 'Java'			:new Pais('Java','Oceanía','teg/images/paises/java.svg',1041.95,380.76),
}

//Asignamos paises limitrofes
paises.Argentina.addLimitrofes([paises.Chile,paises.Brasil,paises.Uruguay,paises.Peru]);
paises.Chile.addLimitrofes([paises.Argentina,paises.Australia,paises.Peru]);
paises.Peru.addLimitrofes([paises.Chile,paises.Brasil,paises.Argentina,paises.Colombia]);
paises.Brasil.addLimitrofes([paises.Argentina,paises.Colombia,paises.Uruguay,paises.Peru,paises.Sahara]);
paises.Uruguay.addLimitrofes([paises.Argentina,paises.Brasil]);
paises.Colombia.addLimitrofes([paises.Mexico,paises.Brasil,paises.Peru]);
paises.Mexico.addLimitrofes([paises.Colombia,paises.California]);
paises.California.addLimitrofes([paises.Mexico,paises.NewYork,paises.Oregon]);
paises.Oregon.addLimitrofes([paises.California,paises.Alaska,paises.Yukon,paises.Canada,paises.NewYork]);
paises.Alaska.addLimitrofes([paises.Kamtchatka,paises.Yukon,paises.Oregon]);
paises.Yukon.addLimitrofes([paises.Alaska,paises.Oregon,paises.Canada]);
paises.Canada.addLimitrofes([paises.Yukon,paises.Oregon,paises.NewYork,paises.Labrador]);
paises.NewYork.addLimitrofes([paises.Canada,paises.Oregon,paises.California,paises.Labrador,paises.Groenlandia]);
paises.Labrador.addLimitrofes([paises.NewYork,paises.Canada,paises.Groenlandia]);
paises.Groenlandia.addLimitrofes([paises.Labrador,paises.NewYork,paises.Islandia]);
paises.Islandia.addLimitrofes([paises.Groenlandia,paises.GranBretana,paises.Suecia]);
paises.GranBretana.addLimitrofes([paises.Islandia,paises.Alemania,paises.Espana]);
paises.Espana.addLimitrofes([paises.GranBretana,paises.Francia,paises.Sahara]);
paises.Francia.addLimitrofes([paises.Espana,paises.Alemania,paises.Italia]);
paises.Italia.addLimitrofes([paises.Francia,paises.Alemania]);
paises.Alemania.addLimitrofes([paises.Francia,paises.GranBretana,paises.Italia,paises.Rusia,paises.Turquia,paises.Egipto]);
paises.Suecia.addLimitrofes([paises.Islandia,paises.Rusia]);
paises.Rusia.addLimitrofes([paises.Alemania,paises.Suecia,paises.Turquia,paises.Aral,paises.Mongolia,paises.Goby]);
paises.Turquia.addLimitrofes([paises.Rusia,paises.Alemania,paises.Israel,paises.Egipto,paises.Goby]);
paises.Israel.addLimitrofes([paises.Turquia,paises.Egipto]);
paises.Egipto.addLimitrofes([paises.Sahara,paises.Etiopia,paises.Israel,paises.Turquia,paises.Alemania,paises.Madagascar]);
paises.Etiopia.addLimitrofes([paises.Egipto,paises.Sahara,paises.Zaire,paises.Sudafrica]);
paises.Sahara.addLimitrofes([paises.Brasil,paises.Espana,paises.Zaire,paises.Etiopia,paises.Egipto]);
paises.Zaire.addLimitrofes([paises.Sahara,paises.Sudafrica,paises.Etiopia,paises.Madagascar]);
paises.Sudafrica.addLimitrofes([paises.Zaire,paises.Etiopia]);
paises.Madagascar.addLimitrofes([paises.Egipto,paises.Zaire]);
paises.Goby.addLimitrofes([paises.Rusia,paises.Turquia,paises.China,paises.Mongolia,paises.India]);
paises.Aral.addLimitrofes([paises.Rusia,paises.Mongolia,paises.Siberia]);
paises.Mongolia.addLimitrofes([paises.Siberia,paises.Aral,paises.Rusia,paises.Goby,paises.China]);
paises.Siberia.addLimitrofes([paises.Aral,paises.Mongolia,paises.China,paises.Kamtchatka]);
paises.Kamtchatka.addLimitrofes([paises.Siberia,paises.China,paises.Alaska,paises.Japon]);
paises.China.addLimitrofes([paises.Kamtchatka,paises.Japon,paises.Siberia,paises.Mongolia,paises.Goby,paises.India]);
paises.India.addLimitrofes([paises.China,paises.Goby,paises.Sumatra,paises.Borneo]);
paises.Sumatra.addLimitrofes([paises.India,paises.Australia]);
paises.Borneo.addLimitrofes([paises.India,paises.Australia]);
paises.Java.addLimitrofes([paises.Australia]);
paises.Australia.addLimitrofes([paises.Chile,paises.Java,paises.Borneo,paises.Sumatra]);
paises.Japon.addLimitrofes([paises.Kamtchatka,paises.China]);

//Set Juego
var tegGame = new Juego();
tegGame.setJ1(jugador1);
tegGame.setJ2(jugador2);
tegGame.addPaises(paises);
tegGame.repartirPaises();
//Creamos btns
//Acción
var btnAccion = s.group(s.rect(-20,0,235,100),s.text(50, 60, 'Acción').attr({fill: "white",'font-size':"30px"}));
btnAccion.click($.proxy(tegGame.jugadorActual.accion,tegGame));
//Siguiente
var btnSiguiente = s.group(s.rect(-20,500,235,100),s.text(50, 560, 'Siguiente').attr({fill: "white",'font-size':"30px"}));
btnSiguiente.click($.proxy(tegGame.siguiente,tegGame));

//Pais1
var removePais1 = s.rect(0,145,14,14).click(function(){tegGame.removePaisSeleccionado1();pais1.attr({text:''})});
var pais1 = s.text(20, 160, '').attr({fill: "white",'font-size':"20px"});
//Pais2
var removePais2 = s.rect(0,175,14,14).click(function(){tegGame.removePaisSeleccionado2();pais2.attr({text:''})});
var pais2 = s.text(20, 190, '').attr({fill: "white",'font-size':"20px"});
//Addbtn
var removeCantidad = s.text(0,220,'-').click(function(){
	if(tegGame.paisSeleccionado1){
		switch (tegGame.jugadorActual.estado) {
			case 'PrimeraIncorporacion':
			case 'SegundaIncorporacion':
			case 'Incorporando':
				tegGame.paisSeleccionado1.removeEjercito(1);
				tegGame.paisSeleccionado1.draw();
				break;

		}
	}
});
var addCantidad = s.text(50,220,'+').click(function(){
	if(tegGame.paisSeleccionado1){
		switch (tegGame.jugadorActual.estado) {
			case 'PrimeraIncorporacion':
			case 'SegundaIncorporacion':
			case 'Incorporando':
				tegGame.paisSeleccionado1.addEjercito(1);
				tegGame.paisSeleccionado1.draw();
				break;

		}

	}
});

function checkLoadSvg(){
	window.setTimeout(function(){
		var svgLoad = true;
		for (var pais in tegGame.paises) {
		    if (tegGame.paises.hasOwnProperty(pais)) {
				if(pais.svg){
					svgLoad = false;
				}
		    }
		}
		//Si faltan cargar esperamos otros segundo
	    if(!svgLoad){
			checkLoadSvg();
		}
	}, 1000);
}
checkLoadSvg();
