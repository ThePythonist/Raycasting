class Player {
  constructor(x, y, fov=HALF_PI, rayCount = 1000) {
    this.pos = createVector(x, y);
    this.rays = [];
    let deltaAngle = fov / (rayCount-1);
    for (let i = 0; i < rayCount; i++) {
      let angle = -fov/2 + i * deltaAngle;
      this.rays.push(new Ray(angle));
    }
    
    this.viewRange = 400;
  }

  intersects(ray, wall) {
    let x1 = this.pos.x;
    let y1 = this.pos.y;
    let x2 = this.pos.x + ray.dir.x;
    let y2 = this.pos.y + ray.dir.y;
    let x3 = wall.a.x;
    let y3 = wall.a.y;
    let x4 = wall.b.x;
    let y4 = wall.b.y;

    let den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    let u = ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
    if (-1 <= u && u <= 0) {
      let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
      if (t > 0) {
        return createVector(t * (x2 - x1), t * (y2 - y1));
      }
    }

  }

  cast(walls) {
    for (let ray of this.rays) {
      ray.update(mouseX-this.pos.x, mouseY-this.pos.y);
      ray.length = Infinity;
      for (let wall of walls) {
        let p = this.intersects(ray, wall);
        if (p) {
          //ellipse(p.x+this.pos.x, p.y+this.pos.y, 10, 10);
          ray.length = min(ray.length, p.mag());
        }
      }
    }
  }

  move() {
    let forward = createVector(mouseX-this.pos.x, mouseY-this.pos.y);
    let left = p5.Vector.fromAngle(forward.heading()-HALF_PI);
    forward.setMag(500 * DT);
    left.setMag(500 * DT);
    if (keyIsDown(LEFT_ARROW)) {
      this.pos.add(left);
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.pos.sub(left);
    }
    if (keyIsDown(UP_ARROW)) {
      this.pos.add(forward);
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.pos.sub(forward);
    }

    this.pos.x = constrain(this.pos.x, 0, WIDTH);
    this.pos.y = constrain(this.pos.y, 0, HEIGHT);
  }

  draw() {
    stroke(255);
    fill(255, 0, 0);
    strokeWeight(1);
    ellipse(this.pos.x, this.pos.y, 10, 10);

    push();
    translate(this.pos.x, this.pos.y);
    for (let ray of this.rays) {
      ray.draw();
    }
    pop();
  }
  
  render() {
    let bar = WIDTH/this.rays.length;
    push();
    translate(WIDTH+bar/2, HEIGHT/2);
    rectMode(CENTER);
    for (let i=0; i<this.rays.length; i++) {
      let ray = this.rays[i];
      let brightness = map(ray.length*ray.length, 0, this.viewRange*this.viewRange, 255, 0);
      let h = map(ray.length * cos(ray.angle), 0, this.viewRange, HEIGHT, 0);
      fill(brightness);
      noStroke();
      rect(i*bar, 0, bar, h);
    }
    pop();
  }
}
