import Disparador from "./Enemigos/Disparador.js";
import Golpeador from "./Enemigos/Golpeador.js";
import Jefe from "./Jefe.js";

class Escenario {
  constructor(width, height, taza) {
    this.width = width;
    this.height = height;
    this.taza = taza;
    this.jefe = new Jefe(width, taza);
    this.jefe.iniciarCohetes();

    this.bottomY = this.height - 10;
    this.rightX = this.width - 10;
    this.fuerzaGravedad = 1.5;

    this.enemigos = [];
    this.muertos = [];
  }
  // Maneja la gravedad de la taza
  gravedad() {
    if (this.taza.posY + this.fuerzaGravedad > this.bottomY) this.taza.bajar(this.bottomY - this.taza.posY);
    else if (!this.taza.jumping && this.taza.posY < this.bottomY) this.taza.bajar(this.fuerzaGravedad);
  }

  checkColision() {
    this.warpTaza();

    this.enemigos.forEach((e, i) => {
      if (e.hayColision(this.taza)) this.damageTaza(1);
      // Chequea la colision entre las balas de los enemigos y la taza
      if (e instanceof Disparador) {
        e.balas.forEach(b => {
          if (b.hayColision(this.taza)) this.damageTaza(1);
        })
      };
      // Cuando los enemigos se van del canvas dejan de disparar y se eliminan
      if (e.posY > this.height) {
        clearInterval(e.interval);
        
        if (e instanceof Disparador) {
          if (e.balas.every(b => fueraDeRango(b, this.width, this.height))) this.enemigos.splice(i, 1);
        } else this.enemigos.splice(i, 1);
      }
      // Chequea la colisión de las balas de la taza con los enemigos
      this.taza.balas.forEach(b => {
        if (e.hayColision(b)) {
          if (e instanceof Disparador) {
            clearInterval(e.interval);
            this.muertos.push(this.enemigos.splice(i, 1)[0]);
          }
          else this.enemigos.splice(i, 1)[0];
          this.taza.sumarPuntos(e.puntos());
        }
      })
    })
    // Espera a que las balas de los enemigos muertos salgan del canvas para eliminarlos
    this.muertos.forEach((m, i) => {
      if (m.balas.every(b => fueraDeRango(b, this.width, this.height))) this.muertos.splice(i, 1);
    })
    // Elimina las balas de la taza por fuera del canvas
    this.taza.balas.forEach((b, i) => {
      if (fueraDeRango(b, this.width, this.height)) {
        this.taza.balas.splice(i, 1);
      }
      if (this.jefe.hayColision(b)) console.log("awda");
    })
  }
  // Transporta la taza de un lado al otro al tocar la pared
  warpTaza() {
    if (this.taza.posX == -10) this.taza.setPosX(this.width);
    else if (this.taza.posX == this.width + 10) this.taza.setPosX(0);
  }
  // Crea nuevos enemigos
  nuevoEnemigo() {
    if (this.enemigos.length < 5) {
      this.enemigos.push(new Golpeador(randomInt(this.rightX), 0));
      const disp = new Disparador(randomInt(this.rightX), 0, this.taza);
      this.enemigos.push(disp);
      disp.iniciarDisparos();
    }
  }
  // Se encarga de mover a los enemigos y sus balas
  accionesEnemigos() {
    this.enemigos.forEach(e => e.mover());
    this.muertos.forEach(m => m.mover());
    this.jefe.cohetes.forEach(c => c.mover());
  }
  // Se encarga de restarle vida a la taza
  damageTaza(val) {
    if (!this.taza.inmune) {
      this.taza.damage(val);
      this.taza.inmune = true;
      setTimeout(() => { this.taza.inmune = false }, 2000);
    }
  }
  // Dibuja todas las entidades
  draw(ctx) {
    this.taza.draw(ctx);
    this.enemigos.forEach(e => e.draw(ctx));
    this.muertos.forEach(m => m.balas.forEach(b => b.draw(ctx)));
    this.jefe.draw(ctx);
  }
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}
// Chequea si el objeto esta por fuera del canvas
function fueraDeRango(obj, w, h) {
  return obj.posX > w || obj.posX < 0 || obj.posY > h || obj.posY < 0;
}

export default Escenario;