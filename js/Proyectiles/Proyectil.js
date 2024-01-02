import {calcularPendiente, calcularOrdenadaAlOrigen, calcularMovimientoX, calcularMovimientoY } from "./calcUtils.js"
import Entidad from "../Entidad.js";

class Proyectil extends Entidad {
  constructor(posX, posY, apunPosX, apunPosY, color) {
    super(posX, posY, 4, 4);

    this.velocidad = 4;
    this.color = color;

    this.pendiente = calcularPendiente(posX, posY, apunPosX, apunPosY);
    this.ordAlOri = calcularOrdenadaAlOrigen(posX, posY, this.pendiente);

    this.apunX = calcularMovimientoX(posX, apunPosX, this.velocidad);
    this.apunY = calcularMovimientoY(posY, apunPosY, this.velocidad);
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, 4, 0, Math.PI * 2, true);
    ctx.fill();
  }

  // Recibe un valor en x y retorna el valor evaluado en la función
  evaluarPunto(x) {
    const res = this.pendiente * x + this.ordAlOri;
    if (res == 0) return this.posY + this.apunY;
    return res;
  }
}

export default Proyectil;