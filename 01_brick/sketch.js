//사각형변수
//x좌표, y좌표, 너비, 높이
let rx, ry;
const rw = 150, rh = 30 ;

//사각형 움직임
const step = 10;   

//원 변수
//원중심
let cx, cy ;

//원반지름
const cr = 15 ;

//원 이동방향
let cdirx = 1, cdiry = -1;

//원 움직임
const cspeed = 5;

//점수 변수
let score = 0;

//이미지 소리 리소스 가져오기
let song1 , song2 ;
let bkimg ;


//처음을 체크하는 플래그변수
let sflag = true ;

 

function preload() {
  //소리 로드
  song1 = loadSound('./sound/Blop.mp3')
  song2 = loadSound('./sound/Blop2.mp3')
  
  //이미지 로드
  bkimg = loadImage('./img/logo.png')
   
}

//초기화 함수
function initDraw() {
  //사각형의 처음 위치
  rx = width /2 - rw /2 ;
  ry = height - rh ;
  
  
  //원의 처음 위치
  cx = floor(width / 2) ;
  cy = floor(height / 2) ;
  
  
  //score 
  score = 0 ; 
  
  //화면지우기
  removeElements();
 
}

//사각형 그리기
function rectDraw() {
  //키보드로 제어
  if (keyIsDown(LEFT_ARROW)) rx = rx - step ;
  if (keyIsDown(RIGHT_ARROW)) rx = rx + step ;
  
  
  //사각형이 캔버스 안쪽으로 들어오도록
  if (rx < 0) rx = 0 ;
  if (rx >= width - rw) rx = width - rw ;
  
  //사각형 그리기 
  rect(rx, ry, rw, rh) ;
}

//원 그리기 함수
function circleDraw() {
  //막대에 닿은 경우 
  if ( cx >= rx && cx <= rx + rw &&  cy >= ry-cr) {
    cdiry = -cdiry ;
    cy = ry-cr ;

    //점수 올리기
    score = score + 1 ;
    song1.play()
  }
  else if ( cy > ry-cr) {
    cy = floor(height / 2) ; 
    
    //점수 내리기
    score = score - 1 
    song2.play() 
  }
  
  //왼쪽 오른쪽 벽면 
  
  if (cx <= cr || cx >= width - cr) {
    cdirx = -cdirx ;
    cx = cx + cdirx * random(cr*2) ;
    
  }
  
  if (cy <= cr || cy >= height - cr) {
    cdiry = -cdiry ;
    cy = cy + cdiry * random(cr*2) ;
  }
  
  //새로운 중심 만들기
  cx = cx + cdirx * cspeed ;
  cy = cy + cdiry * cspeed ;
  
  //원 그리기 
  circle(cx, cy, cr*2);
}


function setup() { 
  createCanvas(600, 400);
  initDraw();
}

//점수 표시하기 
function showScore() { 
  textSize(32);
  text('점수 : ' + score, 10, 30);
}

//시작 버튼만들기
function startBt() {
  button = createButton('시작하기');
  button.size(200, 50) ;
  button.position(width/2-100, height/5 * 3);
  button.style('font-size', '28px') ;
  button.mousePressed(changeFlag);
}

//시작버튼 
function changeFlag() {
  removeElements();
  sflag = false ;
}

//종료하기
function stopBt() {
  button = createButton('다시하기');
  button.size(200, 50) ;
  button.position(width/2-100, height/5 * 3);
  button.style('font-size', '28px') ;
  button.mousePressed(initDraw);
}

function draw() {
  background(bkimg); 
  
  if (sflag) {
    startBt();
  }
  else {
    if (score <= -5) {
      stopBt();
    }
    else {
      showScore() ;
      rectDraw() ;
      circleDraw() ;    
    }
  }
  
}

