import Proyectil from "./Proyectil.js";

class Bala extends Proyectil {
  constructor(posX, posY, apunPosX, apunPosY, color) {
    super(posX, posY, apunPosX, apunPosY, color);

    this.radio = 4;
  }

  mover() {
    if (this.pendiente < 0.5 && this.pendiente > -0.5) this.posX += this.apunX
    else this.posX += this.apunX / Math.abs(this.pendiente);

    this.posY = this.evaluarPunto(this.posX);
  }
  // Chequea si el objeto recibido colisiona con la bala
  hayColision(obj) {
    const colision1 = this.dentroDeBala(obj.posX, obj.posY);
    const colision2 = this.dentroDeBala(obj.posX + obj.sizeX, obj.posY);
    const colision3 = this.dentroDeBala(obj.posX + obj.sizeX, obj.posY + obj.sizeY);
    const colision4 = this.dentroDeBala(obj.posX, obj.posY + obj.sizeY);

    return colision1 || colision2 || colision3 || colision4;
  }
  // Chequea si el punto recibido esta dentro de la bala
  dentroDeBala(posX, posY) {
    return distEntrePuntos(this.posX, this.posY, posX, posY) < this.radio;
  }
}

function distEntrePuntos(x1, y1, x2, y2) {
  const cuadrado1 = Math.pow(x2 - x1, 2);
  const cuadrado2 = Math.pow(y2 - y1, 2);

  return Math.sqrt(cuadrado1 + cuadrado2);
}

export default Bala;