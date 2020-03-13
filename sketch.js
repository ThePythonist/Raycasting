const WIDTH = 400;
const HEIGHT = 400;

const DT = 0.01;

let walls = [];
let wallCount = 5;

let player;

function setup() {
  createCanvas(2*WIDTH, HEIGHT);
  
  player = new Player(random(0, WIDTH), random(0, HEIGHT));
  
  for (let i =0; i< wallCount; i++) {
    walls.push(new Wall());
  }
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(3);
  line(WIDTH, 0, WIDTH, HEIGHT);
  
  for (let wall of walls) {
    wall.draw();
  }
    
  player.move();
  player.cast(walls);
  player.draw();
  
  player.render();
}
