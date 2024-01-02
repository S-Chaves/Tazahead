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

function calcularMovimientoX(x1, x2, vel) {
  if (x1 > x2) return -vel;
  else if (x1 < x2) return vel;
  else return 0
}

function calcularMovimientoY(y1, y2, vel) {
  if (y1 > y2) return -vel;
  else if (y1 < y2) return vel;
  else return 0
}

export { calcularPendiente, calcularOrdenadaAlOrigen, calcularMovimientoX, calcularMovimientoY }