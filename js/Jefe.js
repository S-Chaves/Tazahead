import Entidad from "./Entidad.js";
import Cohete from "./Proyectiles/Cohete.js";

class Jefe extends Entidad {
  constructor(canvasW, taza) {
    super(canvasW / 2 - 270 / 2, 25, 250, 50);
    this.w = this.sizeX + 20;

    this.cohetes = [];
    this.cohete = 0;
    this.vida = 1000;

    this.taza = taza;
    this.interval;
  }

  draw(ctx) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.posX, this.posY, this.sizeX, this.sizeY);
    ctx.fillRect(this.posX - 10, this.posY - 10, 50, 75);
    ctx.fillRect(this.posX + this.sizeX - 10, this.posY - 10, 50, 75);
    this.cohetes.forEach(c => c.draw(ctx));
  }

  dispararCohete() {
    if (this.cohete == 0) {
      this.cohetes.push(new Cohete(this.posX + 15, this.posY + 65, this.taza, "orange"));
      this.cohete++;
    } else {
      this.cohetes.push(new Cohete(this.posX + this.sizeX + 15, this.posY + 65, this.taza, "orange"));
      this.cohete--;
    }
  }

  iniciarCohetes() {
    this.interval = setInterval(() => { this.dispararCohete() }, 2000);
  }

  damage(val) { this.vida -= val }
}

export default Jefe;