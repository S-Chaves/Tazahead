import {calcularPendiente, calcularOrdenadaAlOrigen, calcularMovimientoX, calcularMovimientoY } from "./calcUtils.js"
import Proyectil from "./Proyectil.js";

class Cohete extends Proyectil {
  constructor(posX, posY, taza, color) {
    super(posX, posY, taza.posX, taza.posY, color);
    this.taza = taza;
    this.velocidad = 2;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, 8, 0, Math.PI * 2, true);
    ctx.fill();
  }
  // Primero calcula la nueva recta para el lugar de la taza y luego se mueve
  mover() {
    this.calcularPosicionTaza();

    if (this.pendiente < 0.5 && this.pendiente > -0.5) this.posX += this.apunX
    else this.posX += this.apunX / Math.abs(this.pendiente);

    this.posY = this.evaluarPunto(this.posX);
  }

  calcularPosicionTaza() {
    this.pendiente = calcularPendiente(this.posX, this.posY, this.taza.posX, this.taza.posY);
    this.ordAlOri = calcularOrdenadaAlOrigen(this.posX, this.posY, this.pendiente);

    this.apunX = calcularMovimientoX(this.posX, this.taza.posX, this.velocidad);
    this.apunY = calcularMovimientoY(this.posY, this.taza.posY, this.velocidad);
  }
}

export default Cohete;