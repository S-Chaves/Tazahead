import Enemigo from "./Enemigo.js";
import Bala from "./Bala.js";

class Disparador extends Enemigo {
  constructor(posX, posY, taza) {
    super(posX, posY, "green");
    this.taza = taza;

    this.interval;
    this.balas = [];
  }

  draw(ctx) {
    super.draw(ctx);
    this.balas.forEach(b => b.draw(ctx));
  }

  disparar() {
    this.balas.push(new Bala(this.posX, this.posY, this.taza.posX, this.taza.posY, "purple"));
  }

  iniciarDisparos() {
    this.interval = setInterval(() => { this.disparar() }, 1000);
  }

  mover() {
    super.mover();
    this.balas.forEach(b => b.mover());
  }

  puntos() { return 10 }
}

export default Disparador;