import Disparador from "./Disparador.js";
import Golpeador from "./Golpeador.js";

class Escenario {
  constructor(width, height, taza) {
    this.width = width;
    this.height = height;
    this.taza = taza;

    this.bottomY = this.height - 10;
    this.rightX = this.width - 10;
    this.fuerzaGravedad = 1.5;

    this.enemigos = [];
  }

  gravedad() {
    if (this.taza.posY + this.fuerzaGravedad > this.bottomY) this.taza.bajar(this.bottomY - this.taza.posY);
    else if (!this.taza.jumping && this.taza.posY < this.bottomY) this.taza.bajar(this.fuerzaGravedad);
  }

  checkColision() {
    if (this.taza.posX == -10) this.taza.setPosX(this.width);
    else if (this.taza.posX == this.width + 10) this.taza.setPosX(0);

    this.enemigos.forEach((e, i) => {
      if (!this.taza.inmune && hayColision(e, this.taza)) this.damageTaza(1);

      if (e.posY > this.height) {
        if (e instanceof Disparador) {
          if (e.balas.every(b => fueraDeRango(b, this.width, this.height))) this.enemigos.splice(i, 1);
        } else this.enemigos.splice(i, 1);

        clearInterval(e.interval);
      }
  
      this.enemigos.forEach(e => {
        if (e instanceof Disparador) {
          e.balas.forEach(b => {
            if (!this.taza.inmune && hayColision(this.taza, b)) this.damageTaza(1);
          })          
        };
      })
      this.taza.balas.forEach(b => {
        if (hayColision(e, b)) this.enemigos.splice(i, 1);
      })
    })

    this.taza.balas.forEach((b, i) => {
      if (fueraDeRango(b, this.width, this.height)) {
        this.taza.balas.splice(i, 1);
      }
    })
  }

  nuevoEnemigo() {
    if (this.enemigos.length < 5) {
      this.enemigos.push(new Golpeador(randomInt(this.rightX), 0));
      const disp = new Disparador(randomInt(this.rightX), 0, this.taza.posX, this.taza.posY);
      this.enemigos.push(disp);
      disp.iniciarDisparos();
    }
  }

  accionesEnemigos() {
    this.enemigos.forEach(e => {
      e.abajo(2);
      if (e instanceof Disparador) {
        e.balas.forEach(b => b.mover());
        e.apunX = this.taza.posX;
        e.apunY = this.taza.posY;
      }
    });
  }

  damageTaza(val) {
    this.taza.damage(val);
    this.taza.inmune = true;
    setTimeout(() => { this.taza.inmune = false }, 2000);
  }

  draw(ctx) {
    this.taza.draw(ctx);
    this.enemigos.forEach(e => {
      e.draw(ctx);
      if (e instanceof Disparador) {
        e.balas.forEach(b => b.draw(ctx))
      };
    });
  }
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function hayColision(obj1, obj2) {
  const colisionX = (obj1.posX > obj2.posX && obj1.posX < obj2.posX + 10) || 
    (obj1.posX + 10 > obj2.posX && obj1.posX + 10 < obj2.posX + 10);

  const colisionY = (obj1.posY > obj2.posY && obj1.posY < obj2.posY + 10) || 
    (obj1.posY + 10 > obj2.posY && obj1.posY + 10 < obj2.posY + 10);

  return colisionX && colisionY;
}

function fueraDeRango(obj, w, h) {
  return obj.posX > w || obj.posX < 0 || obj.posY > h || obj.posY < 0;
}

export default Escenario;