import React, { forwardRef } from 'react';
import { useLoader } from 'react-three-fiber';
import { TextureLoader } from 'three';

const Star = forwardRef((_, ref) => {
  const texture = useLoader(TextureLoader, 'assets/star.png');
  return (
    <mesh ref={ref} userData={{ noIntersect: true }}>
      <circleBufferGeometry attach="geometry" args={[0.05, 32]} />
      <meshBasicMaterial attach="material" map={texture} transparent />
    </mesh>
  );
});

export default Star;
