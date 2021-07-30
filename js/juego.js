var canvas;
var ctx;
var FPS = 50;


var altoF = 50;
var anchoF = 50;


var pared = "#3d9a25";
var tierra = '#804000';


//var jugador = "#FF0000";
var llave = '#ffff00';
var puerta = '#8040c0';



var tablero = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 2, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 0, 1, 2, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function dibujarEscenario() {
    var color;

    for (y = 0; y < tablero.length; y++) {
        for (x = 0; x < tablero[0].length; x++) {
            if (tablero[y][x] == 0) {
                color = pared;
            }
            if (tablero[y][x] == 1) {
                color = tierra;
            }
            if (tablero[y][x] == 2) {
                color = llave;
            }
            if (tablero[y][x] == 3) {
                color = puerta;
            }

            ctx.fillStyle = color;
            ctx.fillRect(x * anchoF, y * altoF, anchoF, altoF);
        }
    }
}

function personaje() {


    this.x = 1;
    this.y = 1;
    this.color = '#FF0000';

    this.pintar = function () {

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x * anchoF, this.y * altoF, anchoF, altoF);

    }

    this.mueveArriba = function () {
        if (tablero[this.y - 1][this.x] != 0){
            this.y--;
    }
    }
    this.mueveAbajo = function () {
        if (tablero[this.y + 1][this.x] != 0){

            this.y++;
    }
}
    this.mueveIzquierda = function () {
        if (tablero[this.y][this.x - 1] != 0){

            this.x--;
        }
        }
    this.mueveDerecha = function () {
        if (tablero[this.y][this.x + 1] != 0){

            this.x++;
    }
}

}
var protagonista;

function inicializar() {

    canvas = document.getElementById('mycanvas');
    ctx = canvas.getContext('2d');

    protagonista = new personaje();

    setInterval(function () {
        principal();
    }, 1000 / FPS);

    document.addEventListener('keydown', function (tecla) {
        if (tecla.keyCode == 38) {
            protagonista.mueveArriba();
        }
        if (tecla.keyCode == 40) {
            protagonista.mueveAbajo();


        }
        if (tecla.keyCode == 37) {
            protagonista.mueveIzquierda();

        }
        if (tecla.keyCode == 39) {
            protagonista.mueveDerecha();


        }
    })

}



function principal() {
    borrado();
    dibujarEscenario();
    protagonista.pintar();
}

function borrado() {
    canvas.width = 600;
    canvas.height = 700;
}