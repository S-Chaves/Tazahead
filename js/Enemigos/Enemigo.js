import Entidad from "../Entidad.js";

class Enemigo extends Entidad {
  constructor(posX, posY, sizeX, sizeY, color) {
    super(posX, posY, sizeX, sizeY);

    this.color = color;
    this.velocidad = Math.random() + 0.4;
  }

  draw(ctx) { 
    ctx.fillStyle = this.color;
    ctx.fillRect(this.posX, this.posY, this.sizeX, this.sizeY);
  }

  mover() {
    this.posY += 2 * this.velocidad;
  }
}

export default Enemigo;