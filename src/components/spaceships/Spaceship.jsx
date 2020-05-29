import React, { useRef, useState, useEffect } from 'react';
import { random } from 'lodash';
import { useFrame, useThree } from 'react-three-fiber';

import useKey from '../../other/useKey';

// constants
const gravity = 0.01;

// helper funcs
const toVec3 = ({ x, y }) => [x, y, 0];
const initialPos = () => ({ x: random(-3, 3, true), y: random(-3, 3, true) });
const square = (x) => x * x;
const pythag = ({ x, y }) => Math.sqrt(square(x) + square(y));
const vecDir = ({ x, y }) => Math.atan(y / x);

const Spaceship = ({ star, ship: { color } }) => {
  const [pos, setPos] = useState(initialPos());
  const [rot, setRot] = useState(0);
  const { mouse, viewport } = useThree();
  const posRef = useRef(pos);
  const rotRef = useRef(rot);
  const mesh = useRef();

  // click move (debug)
  const [clicked, setClicked] = useState(false);

  // keys
  const boosting = useKey('w');
  const left = useKey('a');
  const right = useKey('d');

  useEffect(() => {
    posRef.current = pos;
  }, [pos]);

  useEffect(() => {
    rotRef.current = rot;
  }, [rot]);

  useFrame(() => {
    if (!clicked) {
      if (posRef.current) {
        let position = posRef.current;
        let rotation = rotRef.current;

        // rotate craft
        if (left) rotation += 0.01;
        if (right) rotation -= 0.01;
        rotation = rotation % Math.pi;

        // sun gravity
        const distance = pythag(position);
        const direction = vecDir(position);
        const force = gravity / square(distance);

        const velocity = {
          x: force * Math.sin(direction),
          y: force * Math.cos(direction) + (boosting ? 0.01 : 0),
        };

        // boosting
        const thrust = 0.5;
        const boost = boosting
          ? {
              x: thrust * Math.sin(rotation),
              y: thrust * Math.cos(rotation),
            }
          : { x: 0, y: 0 };

        position = {
          x: position.x + velocity.x + boost.x,
          y: position.y + velocity.y + boost.y,
        };

        setPos(position);
        setRot(rotation);
      }
    } else {
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;

      setPos({ x, y });
    }
  });

  return (
    <mesh
      position={toVec3(pos)}
      rotation={[0, 0, rot]}
      ref={mesh}
      onClick={() => setClicked((c) => !c)}
    >
      <planeBufferGeometry attach="geometry" args={[0.1, 0.2]} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  );
};

export default Spaceship;
