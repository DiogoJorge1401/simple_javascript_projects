import { Vector } from './types';

export class Paddle {
  private paddleImage = new Image()
  private moveLeft = false
  private moveRight = false

  constructor(
    private speed: number,
    private paddleWidth: number,
    private paddleHeight: number,
    private position: Vector,
    image: string
  ) {
    this.paddleImage.src = image


    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)
  }

  get image() {
    return this.paddleImage
  }

  get pos() {
    return this.position
  }

  get width() {
    return this.paddleWidth
  }

  get height() {
    return this.paddleHeight
  }

  get isMovingLeft() {
    return this.moveLeft
  }

  get isMovingRight() {
    return this.moveRight
  }

  movePaddle() {
    if (this.moveLeft) this.pos.x -= this.speed
    if (this.moveRight) this.pos.x += this.speed
  }

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft')
      this.moveLeft = true
    else if (e.code === 'ArrowRight' || e.key === 'ArrowRight')
      this.moveRight = true
  }

  handleKeyUp = (e: KeyboardEvent) => {
    if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft')
      this.moveLeft = false
    else if (e.code === 'ArrowRight' || e.key === 'ArrowRight')
      this.moveRight = false
  }
}