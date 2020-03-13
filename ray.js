class Ray {
  constructor (angle) {
    this.angle = angle;
    this.update();
    this.length = Infinity;
  }
  
  update(x, y) {
    this.dir = p5.Vector.fromAngle(this.angle + atan2(y, x));
  }
  
  draw () {
    if (this.length < Infinity) {
      stroke(255, 0, 0, 128);
      strokeWeight(1);
      line(0, 0, this.length * this.dir.x, this.length * this.dir.y);
    }
  }
}
