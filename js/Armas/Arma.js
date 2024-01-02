class Arma {
  constructor(taza) {
    this.taza = taza;
    this.balas = [];
  }
  
  drawBalas(ctx) { this.balas.forEach(b => b.draw(ctx)) }

  moverBalas() { this.balas.forEach(b => b.mover()) }
}

export default Arma;