import Enemigo from "./Enemigo.js";

class Golpeador extends Enemigo {
  constructor(posX, posY) {
    super(posX, posY, "blue");
  }
}

export default Golpeador;