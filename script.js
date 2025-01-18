// Criar o canvas dinamicamente
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = 800;
canvas.height = 600;
const ctx = canvas.getContext('2d');

// Configurações do jogo
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const BALL_RADIUS = 10;
const PADDLE_SPEED = 6;
const BALL_SPEED = 4;

// Posições iniciais
let paddle1Y = (canvas.height - PADDLE_HEIGHT) / 2;
let paddle2Y = (canvas.height - PADDLE_HEIGHT) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballDX = BALL_SPEED;
let ballDY = BALL_SPEED;
let score1 = 0;
let score2 = 0;

// Controles das raquetes
let paddle1Up = false;
let paddle1Down = false;
let paddle2Up = false;
let paddle2Down = false;

// Eventos de teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'w') paddle1Up = true;
  if (e.key === 's') paddle1Down = true;
  if (e.key === 'ArrowUp') paddle2Up = true;
  if (e.key === 'ArrowDown') paddle2Down = true;
});
document.addEventListener('keyup', (e) => {
  if (e.key === 'w') paddle1Up = false;
  if (e.key === 's') paddle1Down = false;
  if (e.key === 'ArrowUp') paddle2Up = false;
  if (e.key === 'ArrowDown') paddle2Down = false;
});

// Funções de desenho
function drawField() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'white';
  ctx.setLineDash([10, 10]);
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
}

function drawPaddles() {
  ctx.fillStyle = 'white';
  ctx.fillRect(10, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT);
  ctx.fillRect(canvas.width - 20, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI * 2);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = '30px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(score1, canvas.width / 4, 50);
  ctx.fillText(score2, (canvas.width * 3) / 4, 50);
}

// Atualização do jogo
function update() {
  // Movimentar as raquetes
  if (paddle1Up && paddle1Y > 0) paddle1Y -= PADDLE_SPEED;
  if (paddle1Down && paddle1Y < canvas.height - PADDLE_HEIGHT) paddle1Y += PADDLE_SPEED;
  if (paddle2Up && paddle2Y > 0) paddle2Y -= PADDLE_SPEED;
  if (paddle2Down && paddle2Y < canvas.height - PADDLE_HEIGHT) paddle2Y += PADDLE_SPEED;

  // Movimentar a bola
  ballX += ballDX;
  ballY += ballDY;

  // Colisão com as paredes superior e inferior
  if (ballY - BALL_RADIUS < 0 || ballY + BALL_RADIUS > canvas.height) {
    ballDY = -ballDY;
  }

  // Colisão com as raquetes
  if (
    ballX - BALL_RADIUS < 20 &&
    ballY > paddle1Y &&
    ballY < paddle1Y + PADDLE_HEIGHT
  ) {
    ballDX = -ballDX;
  }
  if (
    ballX + BALL_RADIUS > canvas.width - 20 &&
    ballY > paddle2Y &&
    ballY < paddle2Y + PADDLE_HEIGHT
  ) {
    ballDX = -ballDX;
  }

  // Pontuação
  if (ballX < 0) {
    score2++;
    resetBall();
  }
  if (ballX > canvas.width) {
    score1++;
    resetBall();
  }
}

// Resetar a bola para o centro
function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballDX = -ballDX;
  ballDY = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
}

// Loop principal do jogo
function gameLoop() {
  update();
  drawField();
  drawPaddles();
  drawBall();
  drawScore();
  requestAnimationFrame(gameLoop);
}

// Iniciar o jogo
gameLoop();
