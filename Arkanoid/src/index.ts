import { Ball, Brick, Paddle } from './sprites';
import { CanvasView } from './view/CanvasView';
import PADDLE_IMG from './images/paddle.png'
import BALL_IMG from './images/ball.png'
import {
  PADDLE_SPEED,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_STARTX,
  BALL_SPEED,
  BALL_SIZE,
  BALL_STARTX,
  BALL_STARTY,
} from './setup';
import { createBricks } from './helpers';
import { Collision } from './Collision';

let isGameOver = false
let score = 0;

type Fn = (view: CanvasView) => void

const setGameOver: Fn = (view) => {
  view.drawInfo('Game Over!')
  isGameOver = false
}

const setGameWin: Fn = (view) => {
  view.drawInfo('Game Won!')
  isGameOver = false
}

const gameLoop = (
  view: CanvasView,
  bricks: Brick[],
  paddle: Paddle,
  ball: Ball,
  collision: Collision
) => {
  view.clear()

  view.drawBricks(bricks)
  view.drawSprite(paddle)
  view.drawSprite(ball)
  ball.moveBall()

  if (
    paddle.isMovingLeft && paddle.pos.x > 0
    ||
    paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width
  )
    paddle.movePaddle()

  collision.checkBallCollision(ball, paddle, view)

  const collidingBrick = collision.isCollidingBricks(ball, bricks)

  if (collidingBrick) {
    score += 1
    view.drawScore(score)
  }


  if (ball.pos.y > view.canvas.height) isGameOver = true

  if (!bricks.length) return setGameWin(view)

  if(isGameOver) return setGameOver(view)

  requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collision))
}

const startGame: Fn = (view) => {
  const collision = new Collision()
  score = 0
  view.drawInfo('')
  view.drawScore(score)

  const briks = createBricks()
  const paddle = new Paddle(
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    {
      x: PADDLE_STARTX,
      y: view.canvas.height - PADDLE_HEIGHT
    },
    PADDLE_IMG
  )
  const ball = new Ball(
    BALL_SIZE,
    {
      x: BALL_STARTX,
      y: BALL_STARTY
    },
    BALL_SPEED,
    BALL_IMG
  )

  gameLoop(view, briks, paddle, ball, collision)
}

const view = new CanvasView('#playField')

view.initStartButton(startGame)