import React, { Suspense } from 'react';

import Spaceship from './Spaceship';

const Spaceships = ({ star, ships }) => {
  return (
    <Suspense fallback={null}>
      <group>
        {ships.map((ship) => {
          return <Spaceship key={ship.id} star={star} ship={ship} />;
        })}
      </group>
    </Suspense>
  );
};

export default Spaceships;
