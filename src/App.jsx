import React, { useRef, useMemo } from 'react';
import { Canvas } from 'react-three-fiber';
import { nanoid } from 'nanoid';

import Spaceships from './components/spaceships';
import Space from './components/Space';
import Star from './components/Star';

const App = () => {
  const starRef = useRef();

  const ships = useMemo(() => {
    return [
      { id: nanoid() },
      // { id: nanoid() }
    ];
  }, []);

  return (
    <Canvas>
      <Star ref={starRef} />
      <Spaceships star={starRef} ships={ships} />
      <Space />
      <ambientLight />
    </Canvas>
  );
};

export default App;
