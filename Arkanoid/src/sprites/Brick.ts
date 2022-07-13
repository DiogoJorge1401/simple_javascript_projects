import { Vector } from './types';

export class Brick {
  private brickImage = new Image()

  constructor(
    private brickWidth: number,
    private brickHeight: number,
    private position: Vector,
    private brickEnergy: number,
    image: string
  ) {
    this.brickImage.src = image
  }

  get image() {
    return this.brickImage
  }

  get pos() {
    return this.position
  }

  get width() {
    return this.brickWidth
  }

  get height() {
    return this.brickHeight
  }

  get energy() {
    return this.brickEnergy
  }


  set energy(eng: number) {
    this.brickEnergy = eng
  }
}