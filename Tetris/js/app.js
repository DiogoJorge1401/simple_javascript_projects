document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const displaySquares = document.querySelectorAll(".previous-grid div");
  const startBtn = document.querySelector("button");
  const scoreDisplay = document.querySelector(".score-display");
  const lineDisplay = document.querySelector(".lines-display");

  const width = 10;
  const height = 20;

  let currentPosition = 4;
  let squares = Array.from(grid.querySelectorAll("div"));
  let timerId;
  let isStarted = false;
  let score = 0;
  let lines = 0;
  let currentIndex = 0;

  function control(e) {
    if (!isStarted) return;
    if (e.keyCode === 39) moveRight();
    else if (e.keyCode === 38) rotate();
    else if (e.keyCode === 37) moveLeft();
    else if (e.keyCode === 40) moveDown();
  }

  document.addEventListener("keyup", control);

  const lTretominoe = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const theTetrominos = [
    lTretominoe,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
  ];

  let currentRotation = 0;
  let random = getNextRandom();
  let current = theTetrominos[random][currentRotation];

  function draw() {
    current.forEach((el) => {
      squares[currentPosition + el].classList.add("block");
    });
  }

  function undraw() {
    current.forEach((el) => {
      squares[currentPosition + el].classList.remove("block");
    });
  }

  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  function moveRight() {
    undraw();
    const isAtRightEdge = current.some(
      (el) => (currentPosition + el) % width === width - 1
    );
    if (!isAtRightEdge) currentPosition += 1;
    if (
      current.some((el) =>
        squares[currentPosition + el].classList.contains("block2")
      )
    ) {
      currentPosition -= 1;
    }
    draw();
  }

  function moveLeft() {
    undraw();
    const isAtRightEdge = current.some(
      (el) => (currentPosition + el) % width === 0
    );
    if (!isAtRightEdge) currentPosition -= 1;
    if (
      current.some((el) =>
        squares[currentPosition + el].classList.contains("block2")
      )
    ) {
      currentPosition += 1;
    }

    draw();
  }

  function rotate() {
    undraw();
    currentRotation++;
    if (currentRotation === current.length) currentRotation = 0;
    current = theTetrominos[random][currentRotation];
    draw();
  }

  const displayWidth = 4;
  const displayIndex = 0;
  let nextRandom = 0;

  const smallTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2],
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
    [1, displayWidth, displayWidth + 1, displayWidth + 2],
    [0, 1, displayWidth, displayWidth + 1],
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
  ];

  function displayShape() {
    displaySquares.forEach((el) => {
      el.classList.remove("block");
    });

    smallTetrominoes[nextRandom].forEach((el) => {
      displaySquares[displayIndex + el].classList.add("block");
    });
  }

  function freeze() {
    if (
      current.some(
        (el) =>
          squares[currentPosition + el + width].classList.contains("block3") ||
          squares[currentPosition + el + width].classList.contains("block2")
      )
    ) {
      current.forEach((el) =>
        squares[currentPosition + el].classList.add("block2")
      );
      random = nextRandom;
      nextRandom = getNextRandom();
      current = theTetrominos[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
      gameOver();
      addScore();
    }
  }

  startBtn.addEventListener("click", () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
      isStarted = false;
      return;
    }

    isStarted = true;

    draw();
    timerId = setInterval(moveDown, 1000);
    nextRandom = getNextRandom();
    displayShape();
  });

  function getNextRandom() {
    return Math.floor(Math.random() * theTetrominos.length);
  }

  function gameOver() {
    if (
      current.some((el) =>
        squares[currentPosition + el].classList.contains("block2")
      )
    ) {
      scoreDisplay.innerHTML = "end";
      clearInterval(timerId);
    }
  }

  function addScore() {
    for (currentIndex = 0; currentIndex < 199; currentIndex += width) {
      const row = [
        currentIndex,
        currentIndex + 1,
        currentIndex + 2,
        currentIndex + 3,
        currentIndex + 4,
        currentIndex + 5,
        currentIndex + 6,
        currentIndex + 7,
        currentIndex + 8,
        currentIndex + 9,
      ];
      console.log(currentIndex);
      if (row.every((el) => squares[el].classList.contains("block2"))) {
        score += 10;
        lines++;
        scoreDisplay.innerHTML = score;
        lineDisplay.innerHTML = lines;
        row.forEach((el) => {
          squares[el].classList.remove("block2") ||
            squares[el].classList.remove("block");
        });
        const squaresRemoved = squares.splice(row, width);
        squares = squaresRemoved.concat(squares)
        squares.forEach(el=>grid.appendChild(el))
      }
    }
  }
});
