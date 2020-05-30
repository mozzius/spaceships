import React, { useRef, useMemo, Suspense } from 'react';
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
      {
        id: nanoid(),
        controls: {
          boost: 'ArrowUp',
          left: 'ArrowLeft',
          right: 'ArrowRight',
          shoot: 'ShiftRight',
        },
      },
    ];
  }, []);

  return (
    <>
      <div className="controls">
        <h3>Spaceships!</h3>
        <p>
          Player 1: WA<span>S</span>D, Space to shoot
        </p>
        <p>Player 2: Arrow Keys, RightShift to shoot</p>
        <p>Bullets don't do anything yet, sorry ;_;</p>
      </div>
      <Canvas>
        <Suspense fallback={null}>
          <Star ref={starRef} />
          <Spaceships star={starRef} ships={ships} />
          <Space />
          <ambientLight />
        </Suspense>
      </Canvas>
    </>
  );
};

export default App;
