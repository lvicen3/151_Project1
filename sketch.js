let G = 5;

const particles = [];
const colors2 = [['red','rgba(255,0,0,255)'],['green','rgba(0,255,0,255)'],['blue','rgba(0,0,255,255)']];
let colors;
const lines = [];


function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);

  colors  = [
    ['red', color('#ff124f')],
    ['fuschia', color('#ff0a0')],
    ['pink', color('#fe75fe')],
    ['light purple', color('#7a04eb')],
    ['dark purple', color('#120458')]
  ];

  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }
}

function draw(){

    particles.forEach((p,index)=>{   
        p.update();
        p.draw();
        p.checkParticles(particles.slice(index));
    });
    if(mouseIsPressed){
        particles.push(new Particle(mouseX,mouseY));
    }
}

function mousePressed(){
    particles.push(new Particle(mouseX,mouseY));
}


class Particle{
    constructor(x=-1,y=-1){
      // Set init position
      if(x < 0 || y < 0){
          this.pos = createVector(random(width),random(height));
      } else {
          this.pos = createVector(x,y);
      }

      // Particle properties
      this.size = 5;
      this.mass = random(1,5);
      this.color = random(colors);

      // Movement properties
      this.vel = createVector(random(-2,2),random(-2,2));
      this.acc = createVector(0,0);
    }
    
    draw(){
      noStroke();
      fill(this.color[1]);
      // circle(this.pos.x,this.pos.y,this.size);
    }

    update(){
      this.vel.add(this.acc);
      this.acc.set(0,0);
      this.pos.add(this.vel);
      this.edges();
    }

    edges(){
      if(this.pos.x < 0 || this.pos.x > width){
          this.vel.x *= -1;
      }
      if(this.pos.y < 0 || this.pos.y > height){
          this.vel.y *= -1;
      }
    }

    checkParticles(particles){
      particles.forEach(particle =>{
        const d = dist(this.pos.x,this.pos.y,particle.pos.x,particle.pos.y);
        if(this.color[0] == particle.color[0] && d < 100 && this !== particle){
          stroke(this.color[1]);
          line(this.pos.x,this.pos.y,particle.pos.x,particle.pos.y);
          this.attract(particle);
        }
        
      });
    }

    // PHYSICS METHODS
    applyForce(force){
      let f = p5.Vector.div(force,this.mass);
      this.acc.add(f);
    }

    attract(particle){
      let force = p5.Vector.sub(this.pos,particle.pos);
      let distanceSq = constrain(force.magSq(),100,1000);
      let strength = (G * (this.mass*particle.mass))/ distanceSq;

      force.setMag(strength);
      particle.applyForce(force);
    }
}

class Line{
  constructor(x1,y1,x2,y2,color){
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
    this.color = color;
  }
  draw(){
    stroke(this.color[1]);
    line(this.x1,this.y1,this.x2,this.y2);
  }
}