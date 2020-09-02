// var result = [];
// var t,c;

// function ease(p){
//   return 3*p*p-2*p*p*p;
// }

// function ease(p,g){
//   if(p<0.5)
//     return 0.5*Math.pow(2*p,g);
//   else
//     return 1-0.5 * pow(2*(1-p),g);
// }

// var mn = 0.5*sqrt(3), ia = Math.atan(sqrt(.5));

// function push(){
//   pushMatrix();
//   pushStyle();
// }

// function pop(){
//   popStyle();
//   popMatrix();
// }

// function draw(){
//   if(!recording){
//     t = mouseX/width;
//     c = mouseY/height;

//     draw_();
//   } else {
//     for(let i = 0; i < widh*height; i++)
//       for(let a = 0; a < 3; a++)
//         result[i][a] = 0;

//     c = 0;
//     for(let sa = 0; sa < samplesPerFrame; sa++){
//       t = map(frameCount-1+sa*shutterAngle/samplesPerFrame,0,numFrames,0,1);
//       draw_();
//       loadPixels();
//       for(let i = 0; i < pixels.length; i++){
//         results[i][0] += pixels[i] >> 16 & 0xff;
//         results[i][1] += pixels[i] >> 8 & 0xff;
//         results[i][2] += pixels[i] &  0xff;
        
//       }
//     }

//     loadPixels();
//     for(let i = 0; i < pixels.length;i++)
//       pixels[i] = 0xff << 24 | 
//       result[i][0]*1.0/samplesPerFrame << 16 | 
//       result[i][1]*1.0/samplesPerFrame << 8 | 
//       result[i][2]*1.0/samplesPerFrame;
//   }
// }

/////////////////////////////

const particles = [];
const colors = [['red','rgba(255,0,0,255)'],['green','rgba(0,255,0,255)'],['blue','rgba(0,0,255,255)']];

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw(){
    background(0);

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
      //Position
      if(x < 0 || y < 0){
          this.pos = createVector(random(width),random(height));
      } else {
          this.pos = createVector(x,y);
      }
      this.size = random(5);
      //Velocity
      this.vel = createVector(random(-2,2),random(-2,2));
      this.z_vel = map(random(),0,1,0.05,0.1);
      this.color = random(colors);
    }
    
    draw(){
        noStroke();
        console.log(this.color[1]);
        fill(this.color[1]);
        circle(this.pos.x,this.pos.y,this.size);
    }

    update(){
        this.pos.add(this.vel);
        this.size+=this.z_vel;
        this.edges();
    }

    edges(){
        if(this.pos.x < 0 || this.pos.x > width){
            this.vel.x *= -1;
        }
        if(this.pos.y < 0 || this.pos.y > height){
            this.vel.y *= -1;
        }
        if(this.size < 0 || this.size > 20)
            this.z_vel *= -1;
    }

    checkParticles(particles){
      particles.forEach(particle =>{
        const d = dist(this.pos.x,this.pos.y,particle.pos.x,particle.pos.y);

        if(this.color[0] == particle.color[0]){
          stroke(this.color[1]);
          line(this.pos.x,this.pos.y,particle.pos.x,particle.pos.y);
        }
        
      });
    }

}