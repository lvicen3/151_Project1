let G = 2;
let D = 200;

const particles = [];

let colors;
let points = false;
let dSlider;
let gSlider;
let initParticle;
// const colors2 = [['red','rgba(255,0,0,255)'],['green','rgba(0,255,0,255)'],['blue','rgba(0,0,255,255)']];



function setup(){
  createCanvas(window.innerWidth, window.innerHeight);

  initNParticle = (window.innerWidth*window.innerHeight)/100000;
  console.log(initNParticle);
  // Define the color palettes
  colors  = [
    
    ['red', color('#ff124f')],
    ['fuschia', color('#ff0a0')],
    ['pink', color('#fe75fe')],
    ['light purple', color('#7a04eb')],
    ['dark purple', color('#120458')]
  ];

  // Set black clear blackground
  background(0);

  // Distance Slider creation and styling
  dSlider = createSlider(10,300,150,10);
  dSlider.position(window.innerWidth- 100  ,10);
  dSlider.style('width','70px');
  dSlider.hide();

  // Gravity Slider creation and styling
  gSlider = createSlider(0.5,5,1.5,0.1);
  gSlider.position(window.innerWidth - 200 ,10);
  gSlider.style('width','70px');
  gSlider.hide();

  // Create an initial cluster
  for (let i = 0; i < initNParticle; i++) {
    particles.push(new Particle());
  }
}

function draw(){
  if(points)
    background(0);

  // Check and draw every particle
  particles.forEach((p,index)=>{   
      p.update();
      p.draw();
      p.checkParticles(particles.slice(index));
  });

  if(mouseX >= window.innerWidth-200 && mouseY <= 100){
    dSlider.show();
    gSlider.show();
  }
  else{
    dSlider.hide();
    gSlider.hide();
  }

  D = dSlider.value();
  G = gSlider.value();
}

function mousePressed(){
  if(mouseX < window.innerWidth - 200 && mouseY > 100)
    for (let i = 0; i < 5; i++) 
      particles.push(new Particle(random(mouseX-20,mouseX+20),random(mouseY-20,mouseY+20))); 
}

function keyPressed(){
  switch(key){
    case'd':
      points = !points;
      background(0);
      break;
    case'r':
      background(0);
      particles.splice(0,particles.length);
      for (let i = 0; i < initNParticle; i++) 
        particles.push(new Particle());
  }
  
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
      this.mass = random(1,20);
      this.color = random(colors);

      // Movement properties
      this.vel = createVector(random(-2,2),random(-2,2));
      this.acc = createVector(0,0);
    }
    
    draw(){
      if(points){
        noStroke();
        fill(this.color[1]);
        circle(this.pos.x,this.pos.y,this.size);
      }
    }

    update(){
      this.vel.add(this.acc);
      // this.vel.x = constrain(this.vel.x,-5,5);
      // this.vel.y = constrain(this.vel.y,-5,5);
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
        if(this.color[0] == particle.color[0] && d < D && this !== particle){
          if(!points){
            stroke(this.color[1]);
            line(this.pos.x,this.pos.y,particle.pos.x,particle.pos.y);
          }
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