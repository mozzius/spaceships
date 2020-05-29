import React, { useRef, useMemo } from 'react';
import { Canvas } from 'react-three-fiber';
import { nanoid } from 'nanoid';

import Spaceships from './components/spaceships';
import Space from './components/Space';
import './App.css';
import Star from './components/Star';

const App = () => {
  const starRef = useRef();

  const ships = useMemo(() => {
    return [
      { id: nanoid(), color: 'red' },
      // { id: nanoid(), color: 'orange' },
    ];
  }, []);

  return (
    <Canvas>
      <Star ref={starRef} />
      <Spaceships
        star={starRef}
        ships={ships}
      />
      <ambientLight />
      <Space />
    </Canvas>
  );
};

export default App;
