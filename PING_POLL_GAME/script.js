document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("pong");
  const ctx = canvas.getContext("2d");

  // Increase the ball speed
  let ballSpeedX = 12;
  let ballSpeedY = 12;

  // Increase the paddle speed
  const paddleSpeed = 12;

  // Define the paddle properties
  const paddleWidth = 10;
  const paddleHeight = 100;
  let leftPaddleY = (canvas.height - paddleHeight) / 2;
  let rightPaddleY = (canvas.height - paddleHeight) / 2;

  // Define the ball properties
  const ballSize = 10;
  let ballX = canvas.width / 2;
  let ballY = canvas.height / 2;

  // Define the game score
  let leftScore = 0;
  let rightScore = 0;

  // Define keyboard state
  const keys = {};

  // Handle key down event
  document.addEventListener("keydown", function (event) {
    keys[event.key] = true;
  });

  // Handle key up event
  document.addEventListener("keyup", function (event) {
    delete keys[event.key];
  });

  // Update the canvas
  function updateCanvas() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the paddles
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
    ctx.fillRect(
      canvas.width - paddleWidth,
      rightPaddleY,
      paddleWidth,
      paddleHeight
    );

    // Draw the ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fill();

    // Update the ball position
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Check for collisions with paddles
    if (
      ballX < paddleWidth &&
      ballY > leftPaddleY &&
      ballY < leftPaddleY + paddleHeight
    ) {
      ballSpeedX = -ballSpeedX;
    } else if (
      ballX > canvas.width - paddleWidth &&
      ballY > rightPaddleY &&
      ballY < rightPaddleY + paddleHeight
    ) {
      ballSpeedX = -ballSpeedX;
    }

    // Check for ball hitting top or bottom walls
    if (ballY < 0 || ballY > canvas.height) {
      ballSpeedY = -ballSpeedY;
    }

    // Check for ball going out of bounds
    if (ballX < 0) {
      rightScore++;
      resetBall();
    } else if (ballX > canvas.width) {
      leftScore++;
      resetBall();
    }

    // Update the score
    ctx.font = "30px Arial";
    ctx.fillText(leftScore + " - " + rightScore, canvas.width / 2 - 30, 30);

    // Move the left paddle based on user input
    if (keys["ArrowUp"] && leftPaddleY > 0) {
      leftPaddleY -= paddleSpeed;
    } else if (
      keys["ArrowDown"] &&
      leftPaddleY < canvas.height - paddleHeight
    ) {
      leftPaddleY += paddleSpeed;
    }

    // Computer-controlled right paddle
    const rightPaddleCenter = rightPaddleY + paddleHeight / 2;

    if (ballY < rightPaddleCenter - 10) {
      rightPaddleY -= paddleSpeed;
    } else if (ballY > rightPaddleCenter + 10) {
      rightPaddleY += paddleSpeed;
    }

    // Request animation frame
    requestAnimationFrame(updateCanvas);
  }

  // Reset the ball position
  function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 7;
    ballSpeedY = 7;
  }

  // Start the game loop
  updateCanvas();
});
