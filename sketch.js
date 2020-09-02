const particles = [];

function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    
    // const particlesLength = Math.floor(window.innerWidth/10);

    // for(let i = 0; i < particlesLength; i++){
    //     particles.push(new Particle());
    // }
    

}

function draw(){
    background(55, 100, 144);

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

    }
    
    draw(){
        noStroke();
        fill('rgba(255,255,255,0.5');
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
        if(this.size < 0 || this.size > 10)
            this.z_vel *= -1;
    }

    checkParticles(particles){
        particles.forEach(particle =>{
            const d = dist(this.pos.x,this.pos.y,particle.pos.x,particle.pos.y);

            if(d < 120){
                stroke('rgba(255,255,255,0.1)');
                line(this.pos.x,this.pos.y,particle.pos.x,particle.pos.y);
            }
        });
    }

}