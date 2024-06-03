let stars = [];

class Origin_Star{
  constructor(x,y,size,period,color){
    this.x = x;
    this.y = y;
    this.size = size;
    this.period = period;
    this.startTime = millis();
    this.color = color;
  }

  update(){
    let elapsedTime = (0.3 * millis()) - this.startTime;
    this.opacity = map(sin(TWO_PI * elapsedTime / this.period), -1, 1, 50, 255);
  }

  display(){
    let halfSize = this.size / 2;
    let angle = TWO_PI / 5;
    beginShape();
    fill(red(this.color), green(this.color), blue(this.color), this.opacity);

    for( let i=0; i<TWO_PI; i+=angle){
      let x = this.x + cos(i) * this.size;
      let y = this.y + sin(i) * this.size;
      vertex(x, y);
      x = this.x + cos(i + angle / 2) * halfSize;
      y = this.y + sin(i + angle / 2) * halfSize;
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}

function setup(){
  createCanvas(window.innerWidth - 17, 4000);
  let maxStars = 400;
  let minDistance = 30;

  for( let i = 0; i< maxStars; i++){
    let x,y;
    let isFarEnough = false;

    while(!isFarEnough){
      x = random(300,width);
      y = random(-height);
      isFarEnough = true;

      for(let j=0; j<stars.length; j++){
        let d=dist(x,y,stars[j].x, stars[j].y);
        if(d<minDistance){
          isFarEnough = false;
          break;
        }
      }
    }

    const period = random(500,1000);
    let starColor = lerpColor(color("#f6fa70"), color("#22ff00"), random());
    let starSize = random(3,8);
    stars.push(new Origin_Star(x,y,starSize,period, starColor));
  }
}