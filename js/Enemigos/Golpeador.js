import Enemigo from "./Enemigo.js";

class Golpeador extends Enemigo {
  constructor(posX, posY) {
    super(posX, posY, 10, 10, "blue");
  }

  puntos() { return 5 }
}

export default Golpeador;