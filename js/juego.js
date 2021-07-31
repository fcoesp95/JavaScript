var canvas;
var ctx;
var FPS = 50;


var altoF = 50;
var anchoF = 50;

var tileMap;

/*var pared = "#3d9a25";
var tierra = '#804000';


//var jugador = "#FF0000";
var llave = '#ffff00';
var puerta = '#8040c0';
*/


var tablero = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0],
    [0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 2, 0, 0],
    [0, 0, 3, 0, 2, 2, 2, 2, 2, 2, 0, 0],
    [0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0],
    [0, 2, 2, 2, 0, 0, 0, 0, 2, 3, 0, 0],
    [0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0],
    [0, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];




function dibujarEscenario() {
    var color;

    for (y = 0; y < tablero.length; y++) {
        for (x = 0; x < tablero[0].length; x++) {
            var tile = tablero[y][x];
            ctx.drawImage(tileMap, tile * 32, 0, 32, 32, anchoF * x, altoF * y, anchoF, altoF);
        }
    }
}

function personaje() {


    this.x = 1;
    this.y = 1;
    this.color = '#FF0000';
    var contadorLlaves = 0;
    this.pintar = function () {
        var door = 0;
        ctx.drawImage(tileMap, 32, 32, 32, 32, this.x * anchoF, this.y * altoF, anchoF, altoF);


    }
    this.margenes = function (x, y) {
        var colision = false;
        if (tablero[y][x] == 0) {
            colision = true;
        }
        return (colision);
    }

    this.AlmacenarLlave = function (x, y, z) {
        if (tablero[y][x] == 3) {
            z++;
            tablero[y][x] = 2;
        }
        return (z);
    }
    this.reiniciar = function () {
        this.x = 1;
        this.y = 1;
        contadorLlaves = 0;
        door = 0;
        tablero[5][2] = 3;
        tablero[10][9] = 3;
        tablero[12][2] = 3;
    }
    this.door = function (x, y, contadorLlaves) {
        if (tablero[y][x] == 1) {
            if (contadorLlaves == 3) {
                this.reiniciar();
                console.log("Has ganado");

            } else {
                if (contadorLlaves == 2) {
                    console.log("Te falta " + (3 - contadorLlaves) + " llave");
                } else
                    console.log("Te faltan " + (3 - contadorLlaves) + " llaves");

            }
        }
    }
    this.mueveArriba = function () {
        if (this.margenes(this.x, this.y - 1) == false) {
            this.y--;
            contadorLlaves = this.AlmacenarLlave(this.x, this.y, contadorLlaves);
            door = this.door(this.x, this.y, contadorLlaves);

        }
    }
    this.mueveAbajo = function () {
        if (this.margenes(this.x, this.y + 1) == false) {

            this.y++;
            contadorLlaves = this.AlmacenarLlave(this.x, this.y, contadorLlaves);
            door = this.door(this.x, this.y, contadorLlaves);

        }
    }
    this.mueveIzquierda = function () {
        if (this.margenes(this.x - 1, this.y) == false) {

            this.x--;
            contadorLlaves = this.AlmacenarLlave(this.x, this.y, contadorLlaves);
            door = this.door(this.x, this.y, contadorLlaves);
        }
    }
    this.mueveDerecha = function () {
        if (this.margenes(this.x + 1, this.y) == false) {

            this.x++;
            contadorLlaves = this.AlmacenarLlave(this.x, this.y, contadorLlaves);
            door = this.door(this.x, this.y, contadorLlaves);

        }

    }
}
var protagonista;

function inicializar() {

    canvas = document.getElementById('mycanvas');
    ctx = canvas.getContext('2d');

    tileMap = new Image();
    tileMap.src = 'img/tilemap.png';

    protagonista = new personaje();

    setInterval(function () {
        principal();
    }, 1000 / FPS);

    document.addEventListener('keydown', function (tecla) {
        if ((tecla.code == "ArrowUp") || (tecla.code == "KeyW")) {
            protagonista.mueveArriba();
        }
        if ((tecla.code == "ArrowDown") || (tecla.code == "KeyS")) {
            protagonista.mueveAbajo();


        }
        if ((tecla.code == "ArrowLeft") || (tecla.code == "KeyA")) {
            protagonista.mueveIzquierda();

        }
        if ((tecla.code == "ArrowRight") || (tecla.code == "KeyD")) {
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