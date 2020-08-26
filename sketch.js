// const { FILL } = require("./p5");

let x = 0;
let speed = 3;

function setup() {
  // put setup code here
  createCanvas(400,400);

}

function draw() {
  background(100,100,100);

  fill(20,30,100);
  rect(x,20,100,100);
  // ellipse(120,120,20,100);
  // fill(150);
  
  if (x>width-100){
    speed =  -1*speed;x
  } 
  
  x+= speed;

}