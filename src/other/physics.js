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

// constants
export const gravity = 0.001;
