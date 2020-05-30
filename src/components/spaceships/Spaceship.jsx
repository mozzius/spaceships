import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from 'react-three-fiber';

import useKey from '../../other/useKey';
import { TextureLoader } from 'three';
import Projectile from './Projectile';
import {
  pythag,
  vecDir,
  randomPos,
  square,
  gravity,
  toVec3,
} from '../../other/physics';

// constants
const thrust = 0.001;
const rotationFix = Math.PI / 2;
const defaultControls = {
  boost: 'KeyW',
  left: 'KeyA',
  right: 'KeyD',
  shoot: 'Space',
};

const Spaceship = ({ ship: { controls = defaultControls } }) => {
  const texture = useLoader(TextureLoader, '/assets/spaceship.png');

  const [pos, setPos] = useState(randomPos());
  const [vel, setVel] = useState({ x: 0, y: 0 });
  const [rot, setRot] = useState(vecDir(pos) + rotationFix);

  const posRef = useRef(pos);
  const velRef = useRef(vel);
  const rotRef = useRef(rot);
  const mesh = useRef();

  // click move (debug)
  const [clicked, setClicked] = useState(false);

  // keys
  const boosting = useKey(controls.boost);
  const left = useKey(controls.left);
  const right = useKey(controls.right);
  const shooting = useKey(controls.shoot);

  useEffect(() => {
    posRef.current = pos;
  }, [pos]);

  useEffect(() => {
    velRef.current = vel;
  }, [vel]);

  useEffect(() => {
    rotRef.current = rot;
  }, [rot]);

  useFrame(({ mouse, viewport }, delta) => {
    if (!clicked) {
      let position = posRef.current;
      let rotation = rotRef.current;
      let velocity = velRef.current;

      // rotate craft
      if (left) rotation += 1 * delta;
      if (right) rotation -= 1 * delta;
      // constrain (-2pi to +2pi)
      rotation = rotation % (2 * Math.PI);

      // check if in sun
      const diameter = 0.05;
      if (Math.abs(position.x) < diameter && Math.abs(position.y) < diameter) {
        position = randomPos();
        velocity = { x: 0, y: 0 };
      } else {
        // sun gravity
        const distance = pythag(position);
        const direction = vecDir(position);
        // mess with the equation to make it flatter
        // https://www.desmos.com/calculator/qzn51zkknu
        const acceleration = -(gravity / square(distance + 0.3));

        // calculate current velocity from gravity
        // and from the boost
        velocity = {
          x:
            velocity.x +
            acceleration * Math.cos(direction) +
            (boosting ? thrust * Math.cos(rotation + rotationFix) : 0),
          y:
            velocity.y +
            acceleration * Math.sin(direction) +
            (boosting ? thrust * Math.sin(rotation + rotationFix) : 0),
        };

        // update position
        position = {
          x: position.x + velocity.x * delta,
          y: position.y + velocity.y * delta,
        };
      }

      setPos(position);
      setRot(rotation);
      setVel(velocity);
    } else {
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;

      setPos({ x, y });
    }
  });

  return (
    <group>
      <mesh
        position={toVec3(pos)}
        rotation={[0, 0, rot]}
        ref={mesh}
        onClick={() => setClicked((c) => !c)}
      >
        <planeBufferGeometry attach="geometry" args={[0.1, 0.2]} />
        <meshStandardMaterial attach="material" map={texture} />
      </mesh>
      <Projectile
        position={pos}
        velocity={vel}
        rotation={rot}
        shooting={shooting}
        ship={mesh}
      />
    </group>
  );
};

export default Spaceship;
