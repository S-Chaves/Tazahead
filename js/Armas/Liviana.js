import Arma from "./Arma.js";
import Bala from "../Proyectiles/Bala.js";

class Liviana extends Arma {
  constructor(taza) {
    super(taza);

    this.poder = 5;
  }

  disparar(posX, posY) {
    this.balas.push(new Bala(this.taza.posX, this.taza.posY, posX, posY, "red"));
  }
}

export default Liviana;