document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const doodler = document.createElement("div");
  const platformCount = 5;
  const platforms = [];

  let score = 0;
  let doodlerLeftSpace = 0;
  let startPoint = 150;
  let doodlerBottomSpace = startPoint;

  let upTimerId;
  let downTimerId;
  let leftTimerId;
  let rightTimerId;

  let isGameOver = false;
  let isJumping = false;
  let isGoingLeft = false;
  let isGoingRight = false;

  class Platform {
    constructor(platBottom) {
      this.bottom = platBottom;
      this.left = Math.random() * 315;
      this.visual = document.createElement("div");
      this.showVisual();
    }

    showVisual() {
      const visual = this.visual;
      visual.classList.add("platform");
      visual.style.left = `${this.left}px`;
      visual.style.bottom = `${this.bottom}px`;

      grid.appendChild(visual);
    }

    setBottom(bottom) {
      this.bottom = bottom;
      this.visual.style.bottom = `${bottom}px`;
    }
  }

  start();

  function start() {
    if (!isGameOver) {
      createPlatforms();
      createDoodler();
      setInterval(movePlatforms, 20);
      jump();
      window.addEventListener("keyup", control);
    }
  }

  function createDoodler() {
    doodler.classList.add("doodler");
    grid.appendChild(doodler);
    doodlerLeftSpace = platforms[0].left;
    doodler.style.left = `${doodlerLeftSpace}px`;
    doodler.style.bottom = `${doodlerBottomSpace}px`;
  }

  function createPlatforms() {
    for (let i = 0; i < platformCount; i++) {
      const platGap = 600 / platformCount;
      const newPlatBottom = 100 + i * platGap;
      const newPlatform = new Platform(newPlatBottom);
      platforms.push(newPlatform);
    }
  }

  function movePlatforms() {
    const minimumToGoDown = 200;
    if (doodlerBottomSpace > minimumToGoDown)
      platforms.forEach((plat) => {
        plat.setBottom(plat.bottom - 4);
        if (plat.bottom < 10) {
          let firstPlatform = plat.visual;
          firstPlatform.classList.remove("platform");
          platforms.shift();
          let newPlatform = new Platform(600);
          platforms.push(newPlatform);
        }
      });
  }

  function jump() {
    clearInterval(downTimerId);
    isJumping = true;
    score++
    upTimerId = setInterval(() => {
      doodlerBottomSpace += 20;
      doodler.style.bottom = `${doodlerBottomSpace}px`;
      if (doodlerBottomSpace > startPoint + 200) fall();
    }, 20);
  }

  function fall() {
    clearInterval(upTimerId);

    isJumping = false;

    downTimerId = setInterval(() => {
      doodlerBottomSpace -= 5;

      doodler.style.bottom = `${doodlerBottomSpace}px`;

      if (doodlerBottomSpace <= 0) gameOver();

      platforms.forEach((plat) => {
        if (
          doodlerBottomSpace >= plat.bottom &&
          doodlerBottomSpace <= plat.bottom + 15 &&
          doodlerLeftSpace + 60 >= plat.left &&
          doodlerLeftSpace <= plat.left + 85 &&
          !isJumping
        ) {
          startPoint = doodlerBottomSpace;
          jump();
        }
      });
    }, 20);
  }

  function control(e) {
    if (isGameOver) return;

    if (e.key === "ArrowLeft") moveLeft();
    else if (e.key === "ArrowRight") moveRight();
    else if (e.key === "ArrowUp") moveStraight();

    function moveRight() {
      if (isGoingLeft) {
        clearInterval(leftTimerId);
        isGoingLeft = false;
      }
      isGoingRight = true;
      rightTimerId = setInterval(() => {
        if (doodlerLeftSpace <= 340) {
          doodlerLeftSpace += 5;
          doodler.style.left = `${doodlerLeftSpace}px`;
          return;
        }
        moveLeft();
      }, 20);
    }

    function moveLeft() {
      if (isGoingRight) {
        clearInterval(rightTimerId);
        isGoingRight = false;
      }
      isGoingLeft = true;
      leftTimerId = setInterval(() => {
        if (doodlerLeftSpace >= 0) {
          doodlerLeftSpace -= 5;
          doodler.style.left = `${doodlerLeftSpace}px`;
          return;
        }
        moveRight();
      }, 20);
    }

    function moveStraight() {
      isGoingRight = false;
      isGoingLeft = false;
      clearInterval(rightTimerId);
      clearInterval(leftTimerId);
    }
  }

  function gameOver() {
    isGameOver = true;
    while (grid.firstChild) grid.removeChild(grid.firstChild);
    grid.innerHTML = score;
    clearInterval(upTimerId);
    clearInterval(downTimerId);
    clearInterval(rightTimerId);
    clearInterval(leftTimerId);
    alert("Game Over");
  }
});
