import { random } from 'lodash';

// helper functions
export const randomPos = () => ({
  x: random(-3, 3, true),
  y: random(-3, 3, true),
});
export const square = (x) => x * x;
export const pythag = ({ x, y }) => Math.sqrt(square(x) + square(y));
export const vecDir = ({ x, y }) => Math.atan2(y, x);
export const toVec3 = ({ x, y }) => [x, y, 0];
export const toUnitVec = ({ x, y }) => {
  const length = pythag({ x, y });
  return { x: x / length, y: y / length };
};
export const toUnitVec3 = ({ x, y }) => ({ x, y, z: 0 });
export const betweenVec = ({ x: ax, y: ay }, { x: bx, y: by }) => ({
  x: bx - ax,
  y: by - bx,
});

// constants
export const gravity = 0.001;
