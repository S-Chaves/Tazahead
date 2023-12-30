class Escenario {
  constructor(width, height, taza) {
    this.width = width;
    this.height = height;
    this.taza = taza;

    this.bottomY = this.width - 10;
    this.fuerzaGravedad = 1.5;
  }

  gravedad() {
    if (this.taza.posY + this.fuerzaGravedad > this.bottomY) this.taza.abajo(this.bottomY - this.taza.posY);
    else if (!this.taza.jumping && this.taza.posY < this.bottomY) this.taza.abajo(this.fuerzaGravedad);
  }

  checkColision() {
    if (this.taza.posX == -10) this.taza.setPosX(this.width);
    if (this.taza.posX == this.width + 10) this.taza.setPosX(0);
  }
}

export default Escenario;