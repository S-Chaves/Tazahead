import Enemigo from "./Enemigo.js";
import Bala from "../Proyectiles/Bala.js";

class Disparador extends Enemigo {
  constructor(posX, posY, taza) {
    super(posX, posY, 10, 10, "green");
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

  eliminarBala(i) { this.balas.splice(i, 1) }

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