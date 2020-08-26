// const { FILL } = require("./p5");

let x = 0;
let y = 0;
let x_speed = 3;
let y_speed = 3;

function setup() {
  // put setup code here
  createCanvas(400,400);
  background(100,100,100);

}

function draw() {
  
  fill(20,30,100);
  if(mouseIsPressed)
  circle(mouseX,mouseY,10,10);
  // ellipse(120,120,20,100);
  // fill(150);
  
  // if (x>width-100 || (x < 0 && x_speed <0)){
  //   x_speed = -1*x_speed;
  // } 
  
  // if (y>height-100 || (y < 0 && y_speed <0)){
  //   y_speed = -1*y_speed;
  // } 


  // x+= x_speed;
  // y+= y_speed;

}