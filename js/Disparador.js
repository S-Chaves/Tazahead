import Enemigo from "./Enemigo.js";
import Bala from "./Bala.js";

class Disparador extends Enemigo {
  constructor(posX, posY, apunX, apunY) {
    super(posX, posY, "green");
    this.apunX = apunX;
    this.apunY = apunY;

    this.interval;
    this.balas = [];
  }

  disparar(apunX, apunY) {
    this.balas.push(new Bala(this.posX, this.posY, apunX, apunY, "red"));
  }

  iniciarDisparos() {
    this.interval = setInterval(() => { this.disparar(this.apunX, this.apunY) }, 1000);
  }
}

export default Disparador;