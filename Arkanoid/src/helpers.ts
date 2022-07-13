import {
  BRICK_ENERGY,
  BRICK_HEIGHT,
  BRICK_IMAGES,
  BRICK_PADDING,
  BRICK_WIDTH,
  LEVEL,
  STAGE_COLS,
  STAGE_PADDING
} from './setup';
import { Brick } from './sprites';

export const createBricks = () => {
  return LEVEL.reduce((bks, lvl, idx) => {
    const row = Math.floor((idx + 1) / STAGE_COLS)
    const col = idx % STAGE_COLS

    const x = STAGE_PADDING + col * (BRICK_WIDTH + BRICK_PADDING)
    const y = STAGE_PADDING + row * (BRICK_HEIGHT + BRICK_PADDING)

    if (lvl === 0) return bks

    return [
      ...bks,
      new Brick(
        BRICK_WIDTH,
        BRICK_HEIGHT,
        { x, y },
        BRICK_ENERGY[lvl],
        BRICK_IMAGES[lvl]
      )
    ]
  }, [] as Brick[])
}
