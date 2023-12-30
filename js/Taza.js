class Taza {
  constructor(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.sizeX = 10;
    this.sizeY = 10;

    this.apuntaX = this.posX + 5;
    this.apuntaY = this.posY - 8;

    this.derecha = false;
    this.izquierda = false;
    this.jumping = false;
    this.jumping_i = 0;
  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(this.posX, this.posY, this.sizeX, this.sizeY)

    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.moveTo(this.posX + 5, this.posY - 2);
    ctx.lineTo(this.apuntaX , this.apuntaY);
    ctx.stroke();
   }

  checkMoves() {
    if (this.jumping) this.jump();
    if (this.derecha) this.moverDerecha(2);
    if (this.izquierda) this.moverIzquierda(2);
  }

  jump() {
    if (this.jumping_i < 10) {
      this.arriba(2);
      this.jumping_i++;
    }
    else {
      this.jumping_i = 0;
      this.jumping = false;
    }
  }

  disparar() {
    this.balas.push(new Bala(this.posX, this.posY, "red"));
  }

  moverDerecha(x) { this.posX += x }

  moverIzquierda(x) { this.posX -= x }

  arriba(y) { this.posY -= y }

  abajo(y) { this.posY += y }

  setPosX(x) { this.posX = x }
}

export default Taza;