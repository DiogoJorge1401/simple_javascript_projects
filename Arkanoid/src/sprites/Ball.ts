import { Vector } from './types';

export class Ball {
  private ballImage = new Image()
  private speed: Vector

  constructor(
    private ballSize: number,
    private position: Vector,
    speed: number,
    image: string
  ) {
    this.ballImage.src = image
    this.speed = {
      x: speed,
      y: -speed
    }
  }

  get image() {
    return this.ballImage
  }

  get pos() {
    return this.position
  }

  get width() {
    return this.ballSize
  }

  get height() {
    return this.ballSize
  }

  changeYDirection() {
    this.speed.y = -this.speed.y
  }

  changeXDirection() {
    this.speed.x = -this.speed.x
  }

  moveBall() {
    this.pos.x += this.speed.x
    this.pos.y += this.speed.y
  }
}