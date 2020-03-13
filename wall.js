class Wall {
  constructor() {
    this.a = createVector(random(0, WIDTH), random(0, HEIGHT));
    this.b = createVector(random(0, WIDTH), random(0, HEIGHT));
  }
  
  draw() {
    stroke(255);
    strokeWeight(1);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
