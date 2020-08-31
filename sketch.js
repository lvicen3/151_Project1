let w;

  
function setup() {
  createCanvas(400,400);
  w = new Walker();
  background(255);
}

function draw() {
  // stroke(0);
  // point(20,20);
  // circle(100,100,100);
  w.step(); 
  w.display();
}

class Walker {
  constructor(){
    this.x = width/2;
    this.y = height/2;
  }

  display(){
    stroke(0);
    point(this.x,this.y);
  }

  step(){
    let follow_mouse = Math.floor(Math.random()*2);
    
    if(follow_mouse){
      this.x < mouseX ? this.x++ : this.x-- ; 
      this.y < mouseY ? this.y++ : this.y-- ;
    } else {
      this.x += (Math.random()*2)-1;
      this.y += (Math.random()*2)-1;
    }

  }
}

function randn_bm() {
  var u = 0, v = 0;
  while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while(v === 0) v = Math.random();
  return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

