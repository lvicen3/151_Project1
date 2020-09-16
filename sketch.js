/**
 * Author: Lorenzo Vicente
 * Description: p5js sketch for ART151
 */

// Equation "constants"
let G = 2;
let D = 200;

const particles = [];

let colors;
let points = false;
let dSlider;
let gSlider;
let initNParticle;
let canvasCounter = 0;
let palettes;

function setup(){
  // Set canvas
  let canvas = createCanvas(window.innerWidth, window.innerHeight);

  // Define the color palettes
  palettes = new ColorPalettes();
  colors = palettes.getCurrentPalette();

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
  initNParticle = (window.innerWidth*window.innerHeight)/100000;
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

  //Check if sliders should be shown
  if(mouseX >= window.innerWidth-200 && mouseY <= 100){
    dSlider.show();
    gSlider.show();
  }
  else{
    dSlider.hide();
    gSlider.hide();
  }

  // Get slider values
  D = dSlider.value();
  G = gSlider.value();
}

function mousePressed(){
  // Create cluster around mouse, except if in slider range
  if(mouseX < window.innerWidth - 200 && mouseY > 100)
    for (let i = 0; i < 5; i++) 
      particles.push(new Particle(random(mouseX-20,mouseX+20),random(mouseY-20,mouseY+20))); 
}

function keyPressed(){
  switch(key){
    case'd':
    case'D':
      // Show particles and not draw
      points = !points;
      background(0);
      break;
    case'r':
    case'R':
      // Reset picture and particles
      background(0);
      particles.splice(0,particles.length);
      for (let i = 0; i < initNParticle; i++) 
        particles.push(new Particle());
      break;
    case's':
    case'S':
      // Save image as jpg
      canvasCounter++;
      saveCanvas(canvas,`picture${canvasCounter}`,'jpg');
      break;
    case'c':
    case'C':
      // Switch color palette
      background(0);
      colors = palettes.getNextPalette();
      particles.forEach(p=>{
        p.color = random(colors);
      });
  }
  
}

// Container class for arrays of colors
class ColorPalettes{
  constructor(){
    this.currentColor = 0;
    this.palettes = [];

    // Vaporwave aesthetic
    this.palettes.push([
      ['red', color('#ff124f')],
      ['fuschia', color('#ff0a0')],
      ['pink', color('#fe75fe')],
      ['light purple', color('#7a04eb')],
      ['dark purple', color('#120458')]
    ]);
    
    // Light browns
    this.palettes.push([
      ['wheat', color('#edd4b2')],
      ['tumbleweed', color('#d0a98f')],
      ['dark byzantium', color('#4d243d')],
      ['pale silver', color('#cac2b5')],
      ['almond', color('#ecdcc9')]
    ]);

    // Blue to red
    this.palettes.push([
      ['blue sapphire', color('#086788')],
      ['blue green', color('#07a0c3')],
      ['jonquil', color('#f0c808')],
      ['papaya whip', color('#fff1d0')],
      ['max red', color('#dd1c1a')]
    ]);

    // Greyscale
    this.palettes.push([
      ['battleship grey', color('#8a8a8a')],
      ['quick silver', color('#a3a3a3')],
      ['davys grey', color('#525252')],
      ['gray x 11 gray', color('#b8b8b8')],
      ['cultured', color('#f7f7f7')]
    ]);

  }

  getCurrentPalette(){
    return this.palettes[this.currentColor];
  }
  
  getNextPalette(){
    if(++this.currentColor >= this.palettes.length)
      this.currentColor = 0;
    return this.palettes[this.currentColor];
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