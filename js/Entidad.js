class Entidad {
  constructor(posX, posY, sizeX, sizeY) {
    this.posX = posX;
    this.posY = posY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  }
  // Chequea si hay colision con el parámetro recibido
  hayColision(obj) {
    const colisionX = this.puntoEntre(obj.posX, this.posX, this.sizeX) || this.puntoEntre(obj.posX + obj.sizeX, this.posX, this.sizeX);
    const colisionY = this.puntoEntre(obj.posY, this.posY, this.sizeY) || this.puntoEntre(obj.posY + obj.sizeY, this.posY, this.sizeY);

    return colisionX && colisionY;
  }
  // Chequea si un numero se encuentra entre otro y ese más un offset
  puntoEntre(x1, x2, offset) {
    return (x1 >= x2) && (x1 <= x2 + offset)
  }
}

export default Entidad;