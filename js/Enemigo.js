class Enemigo {
  constructor(posX, posY, color) {
    this.posX = posX;
    this.posY = posY;
    this.sizeX = 10;
    this.sizeY = 10;
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