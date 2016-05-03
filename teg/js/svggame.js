var over = function(){this.attr({fill:"#4CAF50"})};
var out = function(){this.attr({fill:"#000"})};

var move = function(dx,dy) {
        this.attr({
                    transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
                });
}

var start = function(x,y) {
        this.data('origTransform', this.transform().local );
}
var stop = function() {
		console.log(this.getBBox());
		console.log(this.getBBox().x +","+this.getBBox().y2);
}

function shuffle(a) {
	var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
	return a;
}

var s = Snap("#svggame");
s.attr({ viewBox: "0 0 1100 600" });

var jugador1 = new Jugador('Fabian','#689f38');
var jugador2 = new Jugador('Matias','#e65100');

var paises = [
 new Pais('Argentina','América del Sur','teg/images/paises/argentina.svg',505,527),
 new Pais('Chile','América del Sur','teg/images/paises/chile.svg',470.75,526.37),
 new Pais('Brasil','América del Sur','teg/images/paises/brasil.svg',524.25,433.85),
 new Pais('Uruguay','América del Sur','teg/images/paises/uruguay.svg',552.75,465),
 new Pais('Perú','América del Sur','teg/images/paises/peru.svg',461.5,443.44),
 new Pais('Colombia','América del Sur','teg/images/paises/colombia.svg',453,382.11),
 new Pais('México','América del Norte','teg/images/paises/mexico.svg',393.975,344.78),
 new Pais('Oregon','América del Norte','teg/images/paises/oregon.svg',273.225,308.45),
 new Pais('New York','América del Norte','teg/images/paises/newyork.svg',376.65,270.05),
 new Pais('California','América del Norte','teg/images/paises/california.svg',333.9,326.23),
 new Pais('Alaska','América del Norte','teg/images/paises/alaska.svg',242.95,274.43),
 new Pais('Yukón','América del Norte','teg/images/paises/yukon.svg',290.925,235.78),
 new Pais('Canadá','América del Norte','teg/images/paises/canada.svg',329.225,220.195),
 new Pais('Labrador','América del Norte','teg/images/paises/labrador.svg',401.725,232.025),
 new Pais('Groenlandia','América del Norte','teg/images/paises/groenlandia.svg',498,210),
 new Pais('Islandia','América del Norte','teg/images/paises/islandia.svg',596,255),
 new Pais('Suecia','Europa','teg/images/paises/suecia.svg',715.375,191.715),
 new Pais('Gran Bretaña','Europa','teg/images/paises/granbretana.svg',648,275),
 new Pais('España','Europa','teg/images/paises/espana.svg',644,355.16),
 new Pais('Rusia','Europa','teg/images/paises/rusia.svg',774,267),
 new Pais('Australia','Oceanía','teg/images/paises/australia.svg',990.6,471.43),
 new Pais('Japón','Asia','teg/images/paises/japon.svg',1008.275,189.94),
 new Pais('China','Asia','teg/images/paises/china.svg',935,281.074),
 new Pais('Sudáfrica','África','teg/images/paises/sudafrica.svg',800.625,521.73),
 new Pais('Sahara','África','teg/images/paises/sahara.svg',695.15,463.06),
 new Pais('Zaire','África','teg/images/paises/zaire.svg',742.9,487.261),
 new Pais('Egipto','África','teg/images/paises/egipto.svg',779.875,457.921),
 new Pais('Etiopía','África','teg/images/paises/etiopia.svg',787.025,435.648),
 new Pais('Madagascar','África','teg/images/paises/madagascar.svg',896.525,506.968),
 new Pais('Israel','Asia','teg/images/paises/israel.svg',843.275,355),
 new Pais('Turquía','Asia','teg/images/paises/turquia.svg',820,312.102),
 new Pais('Francia','Europa','teg/images/paises/francia.svg',695.85,323.819),
 new Pais('Alemania','Europa','teg/images/paises/alemania.svg',746.9,310),
 new Pais('Italia','Europa','teg/images/paises/italia.svg',755.1,373),
 new Pais('Goby','Asia','teg/images/paises/goby.svg',876,292),
 new Pais('Siberia','Asia','teg/images/paises/siberia.svg',872.7,177.598),
 new Pais('Mongolia','Asia','teg/images/paises/mongolia.svg',864.2,227.856),
 new Pais('Kamtchatka','Asia','teg/images/paises/kamtchatka.svg',940,152),
 new Pais('Aral','Asia','teg/images/paises/aral.svg',822,181),
 new Pais('India','Asia','teg/images/paises/india.svg',945.125,353),
 new Pais('Sumatra','Oceanía','teg/images/paises/sumatra.svg',927.875,420.625),
 new Pais('Borneo','Oceanía','teg/images/paises/borneo.svg',985.525,383.888),
 new Pais('Java','Oceanía','teg/images/paises/java.svg',1041.95,380.76),
]
var shufflePaises = shuffle(paises);
for (var i = 0; i < shufflePaises.length; i++) {
	if(i<21){
		shufflePaises[i].addJugador(jugador1);
	}else{
		shufflePaises[i].addJugador(jugador2);
	}
	shufflePaises[i].draw();

}

// Snap.load("teg/images/paises/java.svg",function(f){
// 	g = f.select("g");
//     s.append(g);
// 	g.hover(over,out);
// 	g.attr({transform:"translate() scale(0.075,-0.067)"});
// });
