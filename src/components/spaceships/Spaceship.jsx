import React, { useRef, useState, useEffect } from 'react';
import { random } from 'lodash';
import { useFrame, useThree, useLoader } from 'react-three-fiber';

import useKey from '../../other/useKey';
import { TextureLoader } from 'three';

// constants
const gravity = 0.001;

// helper funcs
const toVec3 = ({ x, y }) => [x, y, 0];
const randomPos = () => ({ x: random(-3, 3, true), y: random(-3, 3, true) });
const square = (x) => x * x;
const pythag = ({ x, y }) => Math.sqrt(square(x) + square(y));
const vecDir = ({ x, y }) => Math.atan2(y, x);

const Spaceship = ({ ship }) => {
  const { mouse, viewport } = useThree();
  const texture = useLoader(TextureLoader, '/assets/spaceship.png');

  const [pos, setPos] = useState(randomPos());
  const [rot, setRot] = useState(0);

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
      let position = posRef.current;
      let rotation = rotRef.current;

      // rotate craft
      if (left) rotation += 0.02;
      if (right) rotation -= 0.02;
      // constrain (-2pi to +2pi)
      rotation = rotation % (2 * Math.PI);

      // check if in sun
      const diameter = 0.05;
      if (Math.abs(position.x) < diameter && Math.abs(position.y) < diameter) {
        position = randomPos();
      } else {
        // sun gravity
        const distance = pythag(position);
        const direction = vecDir(position);
        const force = gravity / square(distance);

        const velocity = {
          x: -force * Math.cos(direction),
          y: -force * Math.sin(direction),
        };

        // boosting
        const thrust = 0.01;
        const boost = boosting
          ? {
              x: thrust * Math.cos(rotation + Math.PI / 2),
              y: thrust * Math.sin(rotation + Math.PI / 2),
            }
          : { x: 0, y: 0 };

        position = {
          x: position.x + velocity.x + boost.x,
          y: position.y + velocity.y + boost.y,
        };
      }

      setPos(position);
      setRot(rotation);
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
      <meshStandardMaterial attach="material" map={texture} />
    </mesh>
  );
};

export default Spaceship;
