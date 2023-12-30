import Bala from "./Bala.js";

class Enemigo {
  constructor(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.sizeX = 10;
    this.sizeY = 10;
    
    this.velocidad = Math.random() + 0.4;
    this.balas = [];
  }

  draw(ctx) { 
    ctx.fillStyle = "blue";
    ctx.fillRect(this.posX, this.posY, this.sizeX, this.sizeY)
  }

  abajo(posY) {
    this.posY += posY * this.velocidad;
  }

  disparar() {
    this.balas.push(new Bala(this.posX, this.posY, "red"));
  }
}

export default Enemigo;