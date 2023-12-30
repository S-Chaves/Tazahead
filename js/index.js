import Taza from "./Taza.js"
import Escenario from "./Escenario.js";

const canvas = document.querySelector("#canvas");

const WIDTH = 400;
const HEIGHT = 400;

const taza = new Taza(10, HEIGHT - 10);
const escenario = new Escenario(WIDTH, HEIGHT, taza);

function draw() {
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    taza.checkMoves();

    escenario.gravedad();
    escenario.checkColision();
    escenario.nuevoEnemigo();
    escenario.moverEnemigos();

    escenario.draw(ctx);

    window.requestAnimationFrame(draw);
  }
}

addEventListener("mousemove", (e) => {
  taza.apuntaX = e.clientX;
  taza.apuntaY = e.clientY;
});

addEventListener("keydown", (e) => {
  if (!taza.jumping && e.code == "ArrowUp" && taza.posY == HEIGHT - 10) taza.jumping = true;
  if (!taza.derecha && e.code == "ArrowRight") taza.derecha = true;
  if (!taza.izquierda && e.code == "ArrowLeft") taza.izquierda = true;
  if (e.code == "ArrowDown") taza.disparar();
});

addEventListener("keyup", (e) => {
  if (taza.derecha && e.code == "ArrowRight") taza.derecha = false;
  if (taza.izquierda && e.code == "ArrowLeft") taza.izquierda = false;
});

draw();