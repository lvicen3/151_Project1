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
  
  // To be called on every draw
  draw(){
    // draws the point if option enabled
    if(points){
      noStroke();
      fill(this.color[1]);
      circle(this.pos.x,this.pos.y,this.size);
    }
  }

  // Change position based on velocity vector
  update(){
    this.vel.add(this.acc);
    this.acc.set(0,0);
    this.pos.add(this.vel);
    this.edges();
  }

  // Check if particle hit an edge, reverse velocity if true
  edges(){
    if(this.pos.x < 0 || this.pos.x > width){
        this.vel.x *= -1;
    }
    if(this.pos.y < 0 || this.pos.y > height){
        this.vel.y *= -1;
    }
  }

  // Check other particles to see if they are in distance to draw and apply G
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

  // Apply force vector to acceleration vector
  applyForce(force){
    let f = p5.Vector.div(force,this.mass);
    this.acc.add(f);
  }

  // Apply gravitational equation and call apply force on other particle
  attract(particle){
    let force = p5.Vector.sub(this.pos,particle.pos);
    let distanceSq = constrain(force.magSq(),100,1000);
    let strength = (G * (this.mass*particle.mass))/ distanceSq;

    force.setMag(strength);
    particle.applyForce(force);
  }
}