let w;
let mouse_counter = 0;
  
function setup() {
  createCanvas(400,400);
  w = new Walker();
  background(150);
}

function draw() {
  // stroke(0);
  // point(20,20);
  // circle(100,100,100);
  w.step(); 
  w.display();

  if(keyIsPressed)
    if (key == 's' || key == 'S') 
      saveCanvas('sample', 'png');
}

class Walker {
  constructor(){
    this.x = width/2;
    this.y = height/2;
  }

  display(){
    stroke(10);
    // point(this.x,this.y);
    fill(100,150,150);
    if(mouseIsPressed){
      if(mouse_counter < 20)
        mouse_counter++;
      else {
        mouse_counter = 0;
      }
    } 

    ellipse(this.x,this.y,25+3*mouse_counter,25-2*mouse_counter);
    
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

