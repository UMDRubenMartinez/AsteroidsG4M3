//Codigo Juego
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let mouseX = 0;
let mouseY = 0

canvas.addEventListener("mousemove", (evento) => {
    mouseX = evento.clientX - canvas.offsetLeft;
    mouseY = evento.clientY - canvas.offsetTop;
});

// Ajustar el tamaño del canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);


// Variables para controlar las pantallas del juego
let pantallaInicio = true;
let juegoEnCurso = false;
let pantallaFinJuego = false;

// Función para dibujar la pantalla de inicio
function dibujarPantallaInicio() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Asteroids", canvas.width / 2, canvas.height / 2 - 50);

    ctx.fillStyle = "gray";
    ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2 + 20, 200, 50);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Empezar", canvas.width / 2, canvas.height / 2 + 50);
}
// Función para dibujar la pantalla de fin de juego
function dibujarPantallaFinJuego() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Fin del juego", canvas.width / 2, canvas.height / 2 - 100);

    ctx.font = "20px Arial";
    ctx.fillText("Puntuacion: " + puntuacion, canvas.width / 2, canvas.height / 2 - 50);

    ctx.fillStyle = "gray";
    ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2 + 20, 200, 50);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Volver a jugar", canvas.width / 2, canvas.height / 2 + 50);
}


// Función para manejar el clic en el canvas
function manejarClic(evento) {
    let x = evento.clientX;
    let y = evento.clientY;

    if (pantallaInicio) {
        if (x > canvas.width / 2 - 100 && x < canvas.width / 2 + 100 && y > canvas.height / 2 + 20 && y < canvas.height / 2 + 70) {
            pantallaInicio = false;
            juegoEnCurso = true;
            bucleDelJuego();
        }
    } else if (pantallaFinJuego) {
        if (x > canvas.width / 2 - 100 && x < canvas.width / 2 + 100 && y > canvas.height / 2 + 20 && y < canvas.height / 2 + 70) {
            pantallaFinJuego = false;
            juegoEnCurso = true;
            vidas = 3;
            puntuacion = 0;
            navesEnemigas = [];
            puntos = [];
            disparos = [];
            bucleDelJuego();
        }
    }
}
// Evento de clic en el canvas
canvas.addEventListener("click", manejarClic);


//Nave
// Variables para la nave
let nave = {
    x: canvas.width / 2, // Posición X en el centro del canvas
    y: canvas.height / 2, // Posición Y en el centro del canvas
    ancho: 20, // Ancho de la nave
    alto: 30, // Alto de la nave
    rotacion: 0, // Rotación inicial en grados
    velocidad: 0, // Velocidad inicial
};

// Función para dibujar la nave
function dibujarNave() {
    ctx.save(); // Guarda el estado actual del canvas
    ctx.translate(nave.x, nave.y); // Traslada el origen al centro de la nave
    ctx.rotate((nave.rotacion * Math.PI) / 180); // Rota la nave

    // Dibujar la nave como un triángulo
    ctx.beginPath();
    ctx.moveTo(0, -nave.alto / 2); // Punta del triángulo
    ctx.lineTo(nave.ancho / 2, nave.alto / 2); // Esquina inferior derecha
    ctx.lineTo(-nave.ancho / 2, nave.alto / 2); // Esquina inferior izquierda
    ctx.closePath();
    ctx.fillStyle = "white"; // Color de la nave
    ctx.fill();

    ctx.restore(); // Restaura el estado original del canvas
}

// Variables para el movimiento
let teclasPresionadas = {};

// Eventos de teclado
document.addEventListener("keydown", (evento) => {
    teclasPresionadas[evento.key] = true;
});

document.addEventListener("keyup", (evento) => {
    teclasPresionadas[evento.key] = false;
});

// Función para actualizar la posición de la nave
function actualizarNave() {
    /*if (teclasPresionadas["ArrowLeft"]||teclasPresionadas["a"]) {
        nave.rotacion -= 5; // Rotar a la izquierda
    }
    if (teclasPresionadas["ArrowRight"]||teclasPresionadas["d"]) {
        nave.rotacion += 5; // Rotar a la derecha
    }
    if (teclasPresionadas["ArrowUp"]||teclasPresionadas["w"]) {
        nave.velocidad = 5; // Acelerar hacia adelante
    } else {
        nave.velocidad = 0; // Detener la nave
    }

    // Calcular nueva posición (CORREGIDO)
    nave.x += nave.velocidad * Math.sin((nave.rotacion * Math.PI) / 180);
    nave.y -= nave.velocidad * Math.cos((nave.rotacion * Math.PI) / 180);

    // Mantener la nave dentro de los límites del canvas
    if (nave.x < 0) nave.x = canvas.width;
    if (nave.x > canvas.width) nave.x = 0;
    if (nave.y < 0) nave.y = canvas.height;
    if (nave.y > canvas.height) nave.y = 0;
    */
   // Calcular el ángulo entre la nave y el ratón
   // Calcular el ángulo entre la nave y el ratón
   const dx = mouseX - nave.x;
   const dy = mouseY - nave.y;
   let angulo = Math.atan2(dy, dx) * 180 / Math.PI;

   // Ajustar el ángulo para que la nave apunte correctamente
   angulo += 90; // Restar 90 grados

   nave.rotacion = angulo;

   if (teclasPresionadas["w"]) nave.velocidad = 5; else nave.velocidad = 0;
   nave.x += nave.velocidad * Math.sin((nave.rotacion * Math.PI) / 180);
   nave.y -= nave.velocidad * Math.cos((nave.rotacion * Math.PI) / 180);
   if (nave.x < 0) nave.x = canvas.width; if (nave.x > canvas.width) nave.x = 0;
   if (nave.y < 0) nave.y = canvas.height; if (nave.y > canvas.height) nave.y = 0;
}

// Puntuación
let puntuacion = 0;

// Función para actualizar la puntuación (ejemplo: al recoger un punto)
function recogerPunto() {
    puntuacion += 10; // Suma 10 puntos (puedes ajustar el valor)
}


// Puntos de puntuación
let puntos = []; // Array para almacenar los puntos

// Clase o función para crear puntos
class Punto {
    constructor(x, y, valor) {
        this.x = x;
        this.y = y;
        this.valor = valor;
        this.radio = 10; // Tamaño del punto
    }

    dibujar() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        ctx.fillStyle = "yellow"; // Color del punto
        ctx.fill();
        ctx.closePath();
    }
}

const maxPuntosEnPantalla = 10; // Máximo de puntos en pantalla
const probabilidadGenerarPunto = 0.02; // Probabilidad de generar un punto en cada fotograma

// Función para generar un punto si es necesario
function generarPunto() {
    if (puntos.length < maxPuntosEnPantalla && Math.random() < probabilidadGenerarPunto) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let valor = 1; // Valor del punto (puedes ajustar el valor)
        puntos.push(new Punto(x, y, valor));
    }
}

// Función para detectar colisiones entre la nave y los puntos
function detectarColisionesPuntos() {
    for (let i = 0; i < puntos.length; i++) {
        let punto = puntos[i];
        let distancia = Math.sqrt((nave.x - punto.x) ** 2 + (nave.y - punto.y) ** 2);
        if (distancia < nave.ancho / 2 + punto.radio) {
            // Colisión detectada
            recogerPunto(punto.valor); // Sumar el valor del punto a la puntuación
            puntos.splice(i, 1); // Eliminar el punto
            i--; // Ajustar el índice después de eliminar un elemento
        }
    }
}

// Función para recoger un punto (modificada)
function recogerPunto(valor) {
    puntuacion += valor;
}


// Disparos
let disparos = []; // Array para almacenar los disparos

// Clase o función para crear disparos
class Disparo {
    constructor(x, y, angulo) {
        this.x = x;
        this.y = y;
        this.angulo = angulo;
        this.velocidad = 10; // Velocidad del disparo
        this.radio = 3; // Tamaño del disparo
    }

    dibujar() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        ctx.fillStyle = "white"; // Color del disparo
        ctx.fill();
        ctx.closePath();
    }

    actualizar() {
        this.x += this.velocidad * Math.sin((this.angulo * Math.PI) / 180);
        this.y -= this.velocidad * Math.cos((this.angulo * Math.PI) / 180);
    }
}

// Función para crear un disparo
function crearDisparo() {
    let disparo = new Disparo(nave.x, nave.y, nave.rotacion);
    disparos.push(disparo);
}

// Evento de teclado para disparar
document.addEventListener("keydown", (evento) => {
    if (evento.key === " ") { // Barra espaciadora
        crearDisparo();
    }
});

// Función para actualizar y dibujar los disparos
function actualizarDisparos() {
    for (let i = 0; i < disparos.length; i++) {
        let disparo = disparos[i];
        disparo.actualizar();
        disparo.dibujar();

        // Eliminar disparos que salen de la pantalla
        if (disparo.x < 0 || disparo.x > canvas.width || disparo.y < 0 || disparo.y > canvas.height) {
            disparos.splice(i, 1);
            i--;
        }
    }
}

// Naves enemigas
let navesEnemigas = [];
const maxNavesEnemigas = 5; // Máximo de naves enemigas en pantalla

class NaveEnemiga {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radio = 15;
        this.velocidad = 2;
    }

    dibujar() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }

    actualizar() {
        let dx = nave.x - this.x;
        let dy = nave.y - this.y;
        let distancia = Math.sqrt(dx * dx + dy * dy);
        this.x += (dx / distancia) * this.velocidad;
        this.y += (dy / distancia) * this.velocidad;
    }
}

function generarNaveEnemiga() {
    if (navesEnemigas.length < maxNavesEnemigas) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        navesEnemigas.push(new NaveEnemiga(x, y));
    }
}

function actualizarNavesEnemigas() {
    for (let i = navesEnemigas.length - 1; i >= 0; i--) {
        let naveEnemiga = navesEnemigas[i];
        naveEnemiga.actualizar();
        naveEnemiga.dibujar();

        let dx = nave.x - naveEnemiga.x;
        let dy = nave.y - naveEnemiga.y;
        let distancia = Math.sqrt(dx * dx + dy * dy);
        if (distancia < nave.ancho / 2 + naveEnemiga.radio) {
            // Colisión con la nave del jugador
            vidas--;
            navesEnemigas.splice(i, 1);
            if (vidas <= 0) {
                juegoEnCurso = false;
                pantallaFinJuego = true;
            }
        } else {
            for (let j = disparos.length - 1; j >= 0; j--) {
                let disparo = disparos[j];
                let dxDisparoNaveEnemiga = disparo.x - naveEnemiga.x;
                let dyDisparoNaveEnemiga = disparo.y - naveEnemiga.y;
                let distanciaDisparoNaveEnemiga = Math.sqrt(dxDisparoNaveEnemiga * dxDisparoNaveEnemiga + dyDisparoNaveEnemiga * dyDisparoNaveEnemiga);
                if (distanciaDisparoNaveEnemiga < disparo.radio + naveEnemiga.radio) {
                    // Colisión con un disparo
                    aumentarPuntuacion();
                    navesEnemigas.splice(i, 1);
                    disparos.splice(j, 1);
                    break;
                }
            }
        }
    }
}

// Vidas
let vidas = 3;

function dibujarVidas() {
    for (let i = 0; i < vidas; i++) {
        ctx.save();
        ctx.translate(20 + i * 30, 60); // Posición de las vidas
        ctx.scale(0.5, 0.5); // Escalar las naves para que sean más pequeñas
        ctx.beginPath();
        ctx.moveTo(0, -nave.alto / 2);
        ctx.lineTo(nave.ancho / 2, nave.alto / 2);
        ctx.lineTo(-nave.ancho / 2, nave.alto / 2);
        ctx.closePath();
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.restore();
    }
}

function dibujarPuntuacion() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Puntuacion: " + puntuacion, 10, 30);
}

function aumentarPuntuacion() {
    puntuacion += 10;
}

//------------------------------------------

//Musica

// Crear el elemento de audio
var backgroundMusic = new Audio('1.mp3');
backgroundMusic.loop = true; // Para que la música se repita
backgroundMusic.volume = 0.5; // Ajustar el volumen

// Reproducir la música
backgroundMusic.play().catch((error) => {
    console.log('Autoplay no permitido, esperando interacción del usuario:', error);
});

//------------------------------------------





// Bucle del juego
let frameCount = 0;

function bucleDelJuego() {
    if (juegoEnCurso) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        resizeCanvas();
        actualizarNave();
        dibujarNave();
        dibujarVidas();
        dibujarPuntuacion();
        generarPunto();
        for (let punto of puntos) {
            punto.dibujar();
        }
        detectarColisionesPuntos();
        actualizarDisparos();
        if (frameCount % 120 === 0) {
            generarNaveEnemiga();
        }
        actualizarNavesEnemigas();
        frameCount++;
        requestAnimationFrame(bucleDelJuego);
    } else if (pantallaInicio) {
        resizeCanvas();
        dibujarPantallaInicio();
    } else if (pantallaFinJuego) {
        resizeCanvas();
        dibujarPantallaFinJuego();
    }
}

// Iniciar el bucle del juego
bucleDelJuego();// Iniciar el bucle del juego  
