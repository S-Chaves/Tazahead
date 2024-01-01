class Bala {
  constructor(posX, posY, apunPosX, apunPosY, color) {
    this.posX = posX;
    this.posY = posY;

    this.pendiente = calcularPendiente(posX, posY, apunPosX, apunPosY);
    this.ordAlOri = calcularOrdenadaAlOrigen(posX, posY, this.pendiente);

    this.apunX = calcularMovimientoX(posX, apunPosX);
    this.apunY = calcularMovimientoY(posY, apunPosY);

    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.posX, this.posY, 5, 5)
  }

  mover() {
    this.posX += this.apunX;
    this.posY = this.evaluarPunto(this.posX);
  }

  evaluarPunto(x) {
    const res = this.pendiente * x + this.ordAlOri;
    if (res == 0) return this.posY + this.apunY;
    return res;
  }
}

const velocidad = 4;

function calcularPendiente(x1, y1, x2, y2) {
  const div = x2 - x1;
  if (div != 0) return (y2 - y1) / div;
  return 0;
}

function calcularOrdenadaAlOrigen(x, y, m) {
  const res = m * x;
  if (res != 0) return y - res;
  return 0;
}

function calcularMovimientoX(x1, x2) {
  if (x1 > x2) return -velocidad;
  else if (x1 < x2) return velocidad;
  else return 0
}

function calcularMovimientoY(y1, y2) {
  if (y1 > y2) return -velocidad;
  else if (y1 < y2) return velocidad;
  else return 0
}

export default Bala;