//canvas
var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext('2d');

// score 
var scoreText = document.getElementById("score");
var score = 0;
var numBricks = 0;
var rowCount = 3;
var colCount = 11;
var bricks = [];
var offsetLeft = 5;
var offsetTop = 10;
var rightPress = false;
var leftPress = false;

// score increases when touching brick by 1 

// score resets to zero when ball touches bottom

// game resets when ball touches bottolm

function reset() {
  drawBricks();
  ctx.clearRect(ball.x - ball.radius, ball.y - ball.radius, ball.radius*2, ball.radius*2);
 
  ball.x = canvas.width / 2;
  ball.y = canvas.height - 50;
  ball.speed = 5;
  ball.dx = 1;
  ball.dy = -1;
  paddle.x = 110;
  paddle.y = 135;
  drawPaddle();
  
}

// paddle 
var paddle = {
  width: 75,
  height: 10,
  x: 110,
  y: 135
}

// paddle moves left and right
window.addEventListener("keydown", keyDownHandler)
function keyDownHandler(evt) {
  if (evt.keyCode == "39") {
    rightPress = true;
  }
  else if (evt.keyCode == "37") {
    leftPress = true;
  }

  else {
    leftPress = false;
    rightPress = false;
  }

  if (rightPress && paddle.x < canvas.width - paddle.width) {
    ctx.clearRect(paddle.x,paddle.y,paddle.width,paddle.height);
    paddle.x += 2.5;
    drawPaddle();
    rightPress = false;
  }

  else if (leftPress && paddle.x > 0) {
    ctx.clearRect(paddle.x,paddle.y,paddle.width,paddle.height);
    paddle.x -= 2.5;
    drawPaddle();
    leftPress = false;
  }
}

function movePaddle() {
  paddle.x += paddle.dx;

  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.width;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

//draw paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

// paddle is contained in canvas

// when ball touches paddle, ball moves in opposite direction

// bricks 
var brickInfo = {
  width: 35,
  height: 10,
  padding: 10,
  offsetX: 45,
  offsetY: 60

}
function init() {
  var colors = ["red", "orange", "lime"]
  for (var c = 0; c < colCount; c++) {
    bricks[c] = []
    for (var r = 0; r < rowCount; r++) {
      var brick = {
        width: 25,
        height: 7,
        padding: 2,
        x: 0,
        y: 0,
        color: colors[r],
        status: 1
      };
      bricks[c][r] = brick;
      numBricks += 1;
    }
  }
}

function drawBricks() {
  for (var c = 0; c < colCount; c++) {
    for (var r = 0; r < rowCount; r++) {
      var brick = bricks[c][r];
      if (brick.status == 1) {
        brick.x = (c * (brick.width + brick.padding)) + offsetLeft;
        brick.y = (r * (brick.height + brick.padding)) + offsetTop;

        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brick.width, brick.height);
        ctx.fillStyle = brick.color;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
// ball
var ball = {
  radius: 3,
  x: canvas.width / 2,
  y: canvas.height - 50,
  speed: 5,
  dx: 2,
  dy: -2
}


function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath;
}

function moveBall() {
  ctx.clearRect(ball.x - ball.radius, ball.y - ball.radius, ball.radius * 3, ball.radius * 3);
  ball.x += ball.dx;
  ball.y += ball.dy;
  drawBall();

// check if ball x is greater than canvas
  if (ball.y + ball.dy > canvas.height - paddle.height - 12 && ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
    ball.dy *= -1;
  }
// check if ball y is less than or equal to 0
  else if (ball.y + ball.dy <= 0) {
    ball.dy *= -1;
  }
// check if ball x is less than or equal to 0
  else if (ball.x + ball.dx <= 0) {
    ball.dx *= -1;
  }
  else if (ball.x + ball.dx >= canvas.width) {
    ball.dx *= -1;
  }
  else if (ball.y + ball.dy >= canvas.height) {
    reset();
  }
}

/*function brickCollision() {
  for (var c = 0; c < colCount; c++) {
      for (var r = 0; r < rowCount; r++) {
        var thisBrick = bricks[c][r];
  }
  //make brick disappear

  //turn ball around

  //check if any brickks areleft and if we won
} */


setInterval(moveBall, 50)
init()
drawBricks()
drawPaddle()
drawBall()
moveBall()


// when ball touches bricks, bricks disappear

// when ball touches bottom, bricks resets

// ball is contained in canvas

// ball moves randomly, and moves in opposite direction when hitting brick or paddle or walls 

// all of this is contained in a canvas
