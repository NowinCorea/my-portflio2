let stars = []; // 배열 stars를 선언하고 초기화한다. 이 배열은 Star 클래스의 인스턴스를 저장한다.

class Star { // 별 클래스를 정의한다.
  constructor(x, y, size, period, color) { // 별의 속성을 초기화하는 생성자 함수
    this.x = x; // x 좌표
    this.y = y; // y 좌표
    this.size = size; // 크기
    this.period = period; // 깜박임 주기
    this.startTime = millis(); // 깜박임 시작 시간
    this.color = color; // 색상
    //this.rotate = PI/random(2,5); // 회전 각도
    this.rotate = 2; // 회전 각도
  }

  update() { // 별의 깜박임을 업데이트하는 메서드
    let elapsedTime = (0.6 * millis()) - this.startTime; // 경과 시간 계산
    this.opacity = map(sin(TWO_PI * elapsedTime / this.period), -1, 1, 50, 255); // 깜박임에 따른 투명도 계산
  }

  display() { // 별을 화면에 그리는 메서드
    let halfSize = this.size / 2; // 크기의 반값
    let angle = TWO_PI / 5; // 각도
    beginShape(); // 도형 시작
    fill(red(this.color), green(this.color), blue(this.color), this.opacity); // 색상과 투명도 설정
    for (let i = 0; i < TWO_PI; i += angle) { // 360도를 5등분하여 각 점의 위치를 계산한다.
      let x = this.x + cos(i) * this.size;
      let y = this.y + sin(i) * this.size;
      vertex(x, y); // 정점 추가
      x = this.x + cos(i + angle / 2) * halfSize;
      y = this.y + sin(i + angle / 2) * halfSize;
      vertex(x, y); // 정점 추가
    }
    endShape(CLOSE); // 도형 종료
  }
}

function setup() { // 초기 설정 함수
  createCanvas(window.innerWidth, 4000); // 캔버스 생성
  let maxStars = 400; // 최대 별 개수
  let minDistance = 30; // 최소 거리

  for (let i = 0; i < maxStars; i++) { // 최대 별 개수만큼 반복하여 별 생성
    let x, y;
    let isFarEnough = false;

    while (!isFarEnough) { // 다른 별과 충돌하지 않는 위치 찾기
      x = random(500,2000);
      y = random(-height,height); 
      isFarEnough = true; 

      for (let j = 0; j < stars.length; j++) { // 모든 별과의 거리 비교
        let d = dist(x, y, stars[j].x, stars[j].y);
        if (d < minDistance) { // 충돌하는 경우
          isFarEnough = false;
          break; 
        }
      }
    }

    const period = random(500, 1000); // 깜박임 주기 설정
    let starColor = lerpColor(color("#ff6ac1"), color(0, 255, 0), random()); // 별의 색상 설정
    let starSize = random(2, 6); // 별의 크기 설정
    stars.push(new Star(x, y, starSize, period, starColor)); // 생성한 별을 배열에 추가
  }
}

function draw() { // 반복적으로 화면을 그리는 함수
  noFill(); // 도형 내부를 채우지 않음

  // 배경 그리기
  for (let i = 0; i <= height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color(28,17,55), color(15,39,92), inter);
    stroke(c);
    line(0, i, width, i);
  }

  // 모든 별을 업데이트하고 그리기
  for (let i = 0; i < stars.length; i++) {
    noStroke();
    rotate(frameCount/70000);
    stars[i].update(); 
    stars[i].display(); 
  }
}

function windowResized(){ // 창 크기가 변경될 때 캔버스 크기를 조정하는 함수
  resizeCanvas(window.innerWidth, 4000)
}