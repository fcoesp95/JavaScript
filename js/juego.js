var canvas;
var ctx;
var FPS = 50;


var altoF = 50;
var anchoF = 50;

var tileMap;
var rival = [];
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

var enemigo = function (x, y) {
    this.x = x;
    this.y = y;
    this.pintar = function () {
        ctx.drawImage(tileMap, 0, 32, 32, 32, this.x * anchoF, this.y * altoF, anchoF, altoF);
    }
    this.direccion = Math.floor(Math.random() * 4);

    this.comprobarColision = function (x, y) {
        var colisiona = false;
        if (tablero[y][x] == 0) {
            colisiona = true;
        }
        return colisiona;
    }

    var retraso = 25;
    var contador = 0;

    this.mover = function () {

        if (contador < retraso) {
            contador++
        } else {
            if (this.direccion == 0) {
                if (this.comprobarColision(this.x, this.y - 1) == false) {
                    this.y--;

                } else {
                    this.direccion = Math.floor(Math.random() * 4);
                }
            }
            if (this.direccion == 1) {
                if (this.comprobarColision(this.x, this.y + 1) == false) {
                    this.y++;

                } else {
                    this.direccion = Math.floor(Math.random() * 4);
                }
            }
            if (this.direccion == 2) {
                if (this.comprobarColision(this.x - 1, this.y) == false) {
                    this.x--;

                } else {
                    this.direccion = Math.floor(Math.random() * 4);
                }
            }
            if (this.direccion == 3) {
                if (this.comprobarColision(this.x + 1, this.y) == false) {
                    this.x++;

                } else {
                    this.direccion = Math.floor(Math.random() * 4);
                }
            }
            contador = 0;
        }
    }
}

function personaje() {


    this.x = 1;
    this.y = 1;
    //this.color = '#FF0000';
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

        for (i = 0; i < rival.length; i++) {
            rival[i].x = 0;
            rival[i].y = 0;
        }

        for (i = 0; i < rival.length; i++) {
            var valido = false;
            while (valido == false) {
                y = Math.floor(Math.random() * 13);
                x = Math.floor(Math.random() * 11);
                if (tablero[y][x] == 2) {
                    var ocupada = false;
                    if (rival.length > 1) {
                        for (j = 1; j < rival.length; j++) {

                            if ((x == rival[j].x) && (y == rival[j].y)) {
                                ocupada = true;
                            }
                            if (ocupada == false) {
                                rival[i].x = x;
                                rival[i].y = y;
                                valido = true;

                            }
                        }
                    } else {
                        rival[i].x = x;
                        rival[i].y = y;
                        valido = true;
                    }
                }
            }
        }
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

    this.checkRival = function () {
        for (i = 0; i < rival.length; i++) {

            if ((this.x == rival[i].x) && (this.y == rival[i].y)) {
                console.log("Has perdido");
                this.reiniciar();



            }
        }
    }

}
var protagonista;

function enemigos(){

    var numero= rival.length;
    console.log(numero);
    for (i=0; i<numero;i++){
    rival.shift();

    }
    const input = prompt("Inserte numero de enemigos");

    for (i = 0; i < input; i++) {
        var valido = false;
        while ((valido == false)) {
            y = Math.floor(Math.random() * 13);
            x = Math.floor(Math.random() * 11);

            if(rival.length == input){
                valido = true;
            }

            if (tablero[x][y] == 2) {
                var ocupada = false;

                if (rival.length > 1) {
                    for (j = 0; j < rival.length; j++) {

                        if ((x == rival[j].x) && (y == rival[j].y)) {
                            ocupada = true;
                        }
                    }
                        if (ocupada == false) {
                            rival.push(new enemigo(y, x));
                            console.log("rival " + i +" creado");

                            valido = true;

                        }
                    
                } else {
                    //rival[i] = new enemigo(y, x);
                    rival.push(new enemigo(y, x));
                    console.log("rival " + i +" creado");
                    valido = true;
                }
            }
        }
    }
}
    
function inicializar() {

    canvas = document.getElementById('mycanvas');
    ctx = canvas.getContext('2d');

    tileMap = new Image();
    tileMap.src = 'img/tilemap.png';

    protagonista = new personaje();

    const input = prompt("Inserte numero de enemigos");
    console.log("enemigos = " + input);
    for (i = 0; i < input; i++) {
        var valido = false;
        while ((valido == false)) {
            y = Math.floor(Math.random() * 13);
            x = Math.floor(Math.random() * 11);

            if(rival.length == input){
                valido = true;
            }

            if (tablero[x][y] == 2) {
                var ocupada = false;

                if (rival.length > 1) {
                    for (j = 0; j < rival.length; j++) {

                        if ((x == rival[j].x) && (y == rival[j].y)) {
                            ocupada = true;
                        }
                    }
                        if (ocupada == false) {
                            rival.push(new enemigo(y, x));
                            console.log("rival " + i +" creado");

                            valido = true;

                        }
                    
                } else {
                    //rival[i] = new enemigo(y, x);
                    rival.push(new enemigo(y, x));
                    console.log("rival " + i +" creado");
                    valido = true;
                }
            }
        }
    }
    //rival = new enemigo(7, 9);
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

    for (i = 0; i < rival.length; i++) {
        rival[i].pintar();
        rival[i].mover();
    }
    protagonista.checkRival();
}

function borrado() {
    canvas.width = 600;
    canvas.height = 700;
}