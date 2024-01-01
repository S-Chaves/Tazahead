import Taza from "./Taza.js"
import Escenario from "./Escenario.js";

const canvas = document.querySelector("#canvas");
const vida = document.querySelector("#vida");
const inmune = document.querySelector("#inmune");
const puntos = document.querySelector("#puntos");

const WIDTH = 400;
const HEIGHT = 400;

const taza = new Taza(10, HEIGHT - 10);
const escenario = new Escenario(WIDTH, HEIGHT, taza);

function draw() {
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    mostrarHud();
    
    taza.checkMoves();

    escenario.gravedad();
    escenario.checkColision();
    escenario.nuevoEnemigo();
    escenario.accionesEnemigos();

    escenario.draw(ctx);

    window.requestAnimationFrame(draw);
  }
}

let interval;

addEventListener("keydown", (e) => {
  if (!taza.jumping && e.code == "KeyZ" && taza.posY == HEIGHT - 10) taza.jumping = true;

  if (!taza.derecha && e.code == "ArrowRight") taza.derecha = true;
  else if (!taza.izquierda && e.code == "ArrowLeft") taza.izquierda = true;
  else if (!taza.arriba && e.code == "ArrowUp") taza.arriba = true;
  else if (!taza.abajo && e.code == "ArrowDown") taza.abajo = true;

  if (!taza.disparando && e.code == "KeyX") {
    interval = setInterval(() => taza.disparar(), 200);
    taza.disparando = true;
  }

  taza.apuntar(e.code);
});

addEventListener("keyup", (e) => {
  if (taza.derecha && e.code == "ArrowRight") taza.derecha = false;
  else if (taza.izquierda && e.code == "ArrowLeft") taza.izquierda = false;
  else if (taza.arriba && e.code == "ArrowUp") taza.arriba = false;
  else if (taza.abajo && e.code == "ArrowDown") taza.abajo = false;

  if (taza.disparando && e.code == "KeyX") {
    clearInterval(interval);
    taza.disparando = false;
  }

  taza.apuntar(e.code);
});

function mostrarHud() {
  vida.textContent = taza.vida;
  puntos.textContent = `Puntos: ${taza.puntos}`;
  
  if (taza.inmune) inmune.textContent = "Inmune!";
  else inmune.textContent = "";
}

draw();