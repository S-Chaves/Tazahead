class Bala {
  constructor(posX, posY, color) {
    this.posX = posX;
    this.posY = posY;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.posX, this.posY, 5, 5)
  }
}

export default Bala;