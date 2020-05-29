import React, { forwardRef } from 'react';

const Star = forwardRef((_, ref) => (
  <mesh ref={ref}>
    <circleBufferGeometry attach="geometry" args={[0.05, 32]} />
    <meshBasicMaterial attach="material" color="white" />
  </mesh>
));

export default Star;
