import React from 'react';

import Spaceship from './Spaceship';

const Spaceships = ({ star, ships }) => {
  return (
    <group>
      {ships.map((ship) => {
        return <Spaceship key={ship.id} star={star} ship={ship} />;
      })}
    </group>
  );
};

export default Spaceships;
