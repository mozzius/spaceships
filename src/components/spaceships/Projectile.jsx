import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';

import { pythag, vecDir, square, gravity, toVec3 } from '../../other/physics';

// constants
const cooldownPeriod = 500; //ms
const speed = 1;
const lifespan = 10; //s
const rotationFix = Math.PI / 2;
const shipLength = 0.1;

const Projectile = ({ ship, position, velocity, rotation, shooting }) => {
  const [projectiles, setProjectiles] = useState([]);
  const [cooldown, setCooldown] = useState(false);
  const projRef = useRef(projectiles);
  const timeRef = useRef();

  useEffect(() => {
    projRef.current = projectiles;
  }, [projectiles]);

  useEffect(() => {
    if (cooldown) {
      timeRef.current = setTimeout(() => setCooldown(false), cooldownPeriod);
    }
    return () => clearTimeout(timeRef.current);
  }, [cooldown]);

  useFrame(({ clock, raycaster, scene }, delta) => {
    let bullets = projRef.current;

    if (!cooldown && shooting) {
      const time = clock.getElapsedTime();
      bullets.push({
        time,
        position: {
          x: position.x + (shipLength / 2) * Math.cos(rotation + rotationFix),
          y: position.y + (shipLength / 2) * Math.sin(rotation + rotationFix),
        },
        velocity: {
          x: velocity.x + speed * Math.cos(rotation + rotationFix),
          y: velocity.y + speed * Math.sin(rotation + rotationFix),
        },
      });
      setCooldown(true);
    }

    // update physics
    setProjectiles(
      bullets
        .map(({ time, position, velocity }) => {
          // timeout
          if (time + lifespan < clock.getElapsedTime()) return null;

          // sun gravity
          const distance = pythag(position);
          const direction = vecDir(position);
          // mess with the equation to make it flatter
          // https://www.desmos.com/calculator/qzn51zkknu
          const acceleration = -(gravity / square(distance + 0.3));

          // calculate current velocity from gravity
          // and from the boost
          velocity = {
            x: velocity.x + acceleration * Math.cos(direction),
            y: velocity.y + acceleration * Math.sin(direction),
          };

          // update position
          position = {
            x: position.x + velocity.x * delta,
            y: position.y + velocity.y * delta,
          };

          return {
            time,
            position,
            velocity,
          };
        })
        .filter(Boolean)
    );
  });

  return (
    <group>
      {projectiles.map(({ time, position }) => {
        return (
          <mesh position={toVec3(position)} key={`t-${time}`}>
            <circleBufferGeometry attach="geometry" args={[0.01, 32]} />
            <meshBasicMaterial attach="material" color="white" />
          </mesh>
        );
      })}
    </group>
  );
};

export default Projectile;
