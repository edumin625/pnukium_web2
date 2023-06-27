//웹캠 인식 변수
let video ;

//posenet 변수
let poseNet ;

//눈 인식변수
let rightEye ;
let leftEye ;
 
//코 인식변수
let nose ;

//관절 변수
let skeleton ;
function setup() {
  createCanvas(400, 400);
  
  //웹캠 인식
  video = createCapture(VIDEO) ;
  video.size(width, height) ;
  video.hide(); 
  
  //posenet 
  //posenet 로드확인
  poseNet = ml5.poseNet(video, modelLoaded); 
  //사용자의 포즈를 감지
  poseNet.on('pose', gotPoses);
}

//posenet 로드확인
function modelLoaded() {
  console.log("model load")
}

//사용자의 포즈를 감지
function gotPoses(poses) {
  console.log(poses);
  //코
  nose = poses[0].pose.nose ;
  
  //눈
  rightEye = poses[0].pose.rightEye;
  leftEye  = poses[0].pose.leftEye;
  
  //관절정보
  //관절정보
  skeleton = poses[0].skeleton ;
}

function draw() {
  background(0);
  
  if (nose) {
    fill(255);
    ellipse(rightEye.x, rightEye.y,20,30) ;
    ellipse(leftEye.x, leftEye.y,20,30) ;
    
    fill(0);
    circle( rightEye.x, rightEye.y, 10) ;
    circle( leftEye.x, leftEye.y, 10) ;
    
    fill(255);
    circle( nose.x, nose.y, 10) ; 
  }
  
  if (skeleton) {
    for(let item of skeleton) {
      let a = item[0];
      let b = item[1];
      stroke(255);
      strokeWeight(4);
      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
  }
}

