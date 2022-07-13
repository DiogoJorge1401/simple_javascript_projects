import { Brick, Paddle, Ball } from './sprites';
import { CanvasView } from './view/CanvasView';

export class Collision {

  checkBallCollision(ball: Ball, paddle: Paddle, view: CanvasView) {
    if (
      ball.pos.x + ball.width >= paddle.pos.x &&
      ball.pos.x <= paddle.pos.x + paddle.width&&
      ball.pos.y + ball.height >= paddle.pos.y &&
      ball.pos.y <= paddle.pos.y + paddle.height
    )
      ball.changeYDirection()

    if (
      ball.pos.x <= 0 ||
      ball.pos.x + ball.width >= view.canvas.width
    )
      ball.changeXDirection()

    if (ball.pos.y <= 0)
      ball.changeYDirection()
  }


  isCollidingBricks(ball: Ball, bricks: Brick[]) {
    return bricks.some((brick, idx) => {
      const isColliding = this.isCollidingBrick(ball, brick);

      if (isColliding) {
        ball.changeYDirection()

        if (brick.energy === 1)
          bricks.splice(idx, 1)
        else
          brick.energy--
      }
      return isColliding

    })
  }

  isCollidingBrick(ball: Ball, brick: Brick) {
    if (
      ball.pos.x <= brick.pos.x + brick.width &&
      ball.pos.x + ball.width >= brick.pos.x &&
      ball.pos.y <= brick.pos.y + brick.height &&
      ball.pos.y + ball.height >= brick.pos.y
    )
      return true
    return false
  }

}