import Enemigo from "./Enemigo.js";

class Escenario {
  constructor(width, height, taza) {
    this.width = width;
    this.height = height;
    this.taza = taza;

    this.bottomY = this.height - 10;
    this.rightX = this.width - 10;
    this.fuerzaGravedad = 1.5;

    this.enemigos = [];
  }

  gravedad() {
    if (this.taza.posY + this.fuerzaGravedad > this.bottomY) this.taza.abajo(this.bottomY - this.taza.posY);
    else if (!this.taza.jumping && this.taza.posY < this.bottomY) this.taza.abajo(this.fuerzaGravedad);
  }

  checkColision() {
    if (this.taza.posX == -10) this.taza.setPosX(this.width);
    else if (this.taza.posX == this.width + 10) this.taza.setPosX(0);

    this.enemigos.forEach((e, i) => {
      if (hayColision(e, this.taza)) console.log("CHOWQW")
      if (e.posY > this.height) this.enemigos.splice(i, 1);
    })
  }

  nuevoEnemigo() {
    if (this.enemigos.length < 5) this.enemigos.push(new Enemigo(randomInt(this.rightX), 0));
  }

  moverEnemigos() {
    this.enemigos.forEach(e => e.abajo(2));
  }

  draw(ctx) {
    this.taza.draw(ctx);
    this.enemigos.forEach(e => e.draw(ctx));
  }
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function hayColision(obj1, obj2) {
  const colisionX = (obj1.posX > obj2.posX && obj1.posX < obj2.posX + 10) || 
    (obj1.posX + 10 > obj2.posX && obj1.posX + 10 < obj2.posX + 10);

  const colisionY = (obj1.posY > obj2.posY && obj1.posY < obj2.posY + 10) || 
    (obj1.posY + 10 > obj2.posY && obj1.posY + 10 < obj2.posY + 10);

  return colisionX && colisionY;
}

export default Escenario;