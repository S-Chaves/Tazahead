import Entidad from "./Entidad.js";
import Liviana from "./Armas/Liviana.js";

class Taza extends Entidad {
  constructor(posX, posY) {
    super(posX, posY, 10, 10);

    this.apuntaX = this.posX + 5;
    this.apuntaY = this.posY - 8;
    this.apuntando = 0;

    this.arma = new Liviana(this);
    this.vida = 3;
    this.puntos = 0;

    this.derecha = false;
    this.izquierda = false;
    this.arriba = false;
    this.abajo = false;

    this.jumping = false;
    this.jumping_i = 0;

    this.inmune = false;
    this.disparando = false;
  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(this.posX, this.posY, this.sizeX, this.sizeY)
    this.arma.drawBalas(ctx);
  }

  checkMoves() {
    if (this.jumping) this.jump();
    if (this.derecha) this.moverDerecha(2);
    if (this.izquierda) this.moverIzquierda(2);

    this.arma.moverBalas();
  }

  jump() {
    if (this.jumping_i < 10) {
      this.subir(2);
      this.jumping_i++;
    }
    else {
      this.jumping_i = 0;
      this.jumping = false;
    }
  }

  disparar() {
    const ap = this.apuntando;
    let posX = this.posX;
    let posY = this.posY;

    if ([0, 1, 7].includes(ap)) posX += 5
    if ([3, 4, 5].includes(ap)) posX -= 5;
    if ([1, 2, 3].includes(ap)) posY -= 5;
    if ([5, 6, 7].includes(ap)) posY += 5;

    this.arma.disparar(posX, posY);
  }
  // Cambia el lugar donde se apunta dependiendo de las teclas presionadas
  apuntar() {
    if (this.arriba && this.derecha) this.apuntando = 1;
    else if (this.arriba && this.izquierda) this.apuntando = 3;
    else if (this.derecha) this.apuntando = 0;
    else if (this.arriba) this.apuntando = 2;
    else if (this.izquierda) this.apuntando = 4;
  }

  getBalas() { return this.arma.balas }

  eliminarBala(i) { this.arma.balas.splice(i, 1) }

  damage(val) { this.vida -= val }

  sumarPuntos(val) { this.puntos += val }

  moverDerecha(x) { this.posX += x }

  moverIzquierda(x) { this.posX -= x }

  subir(y) { this.posY -= y }

  bajar(y) { this.posY += y }

  setPosX(x) { this.posX = x }
}

export default Taza;