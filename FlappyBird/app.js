document.addEventListener("DOMContentLoaded", () => {
  const gameDisplay = document.querySelector(".game-container");
  const bird = document.querySelector(".bird");
  const ground = document.querySelector(".ground-moving");

  let birdLeft = 220;
  let birdBottom = 100;
  let gravity = 2;
  let isGameOver = false;
  let gap = 430;

  document.addEventListener("keyup", control);

  let gameTimerid = setInterval(startGame, 20);

  generateObstacle();

  function startGame() {
    bird.style.left = `${birdLeft}px`;
    bird.style.bottom = `${birdBottom}px`;
    birdBottom -= 2;
  }

  function jump() {
    if (birdBottom <= 500) birdBottom += 50;
    bird.style.bottom = `${birdBottom}px`;
  }

  function control(e) {
    if (e.keyCode === 32) jump();
  }

  function generateObstacle() {
    if (isGameOver) return;

    const obstacle = document.createElement("div");
    const topObstacle = document.createElement("div");
    const ground = document.querySelector(".ground-moving");

    let randomHeight = Math.random() * 60;
    let obstacleLeft = 500;
    let obstacleBottom = randomHeight;

    obstacle.classList.add("obstacle");
    topObstacle.classList.add("obstacle", "topObstacle");

    obstacle.style.bottom = `${obstacleBottom}px`;
    topObstacle.style.bottom = `${obstacleBottom + gap}px`;

    setObstacleLeft();

    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObstacle);

    let timerId = setInterval(moveObstacle, 10);
    setTimeout(generateObstacle, 2500);

    function moveObstacle() {
      if (isGameOver) return;
      obstacleLeft -= 2;
      setObstacleLeft();

      if (obstacleLeft <= -60) {
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle);
        clearInterval(timerId);
      }

      if (
        (obstacleLeft > 200 &&
          obstacleLeft < 280 &&
          (birdBottom <= obstacleBottom + 150 ||
            birdBottom >= obstacleBottom + gap - 200)) ||
        birdBottom < 0
      ) {
        console.log();
        gameOver();
        clearInterval(timerId);
      }
    }

    function setObstacleLeft() {
      obstacle.style.left = `${obstacleLeft}px`;
      topObstacle.style.left = `${obstacleLeft}px`;
    }
  }

  function gameOver() {
    clearInterval(gameTimerid);
    isGameOver = true;
    document.removeEventListener("keyup", control);
    ground.classList.add("ground");
    ground.classList.remove("ground-moving");
  }
});
