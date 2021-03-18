import React, { useEffect, useState, useRef, createContext } from 'react';

import Spaceship from './Spaceship';

export const Collide = createContext({ explode: () => {} });

const Spaceships = ({ star, ships }) => {
  const timeRef = useRef([]);
  const [exploded, setExploded] = useState([]);

  useEffect(() => () => timeRef.current.forEach((t) => clearTimeout(t)));

  const unexplode = (id) => {
    setExploded((col) => col.filter((c) => c.id !== id));
  };

  const explode = (id) => {
    setExploded((c) => [...c, id]);
    timeRef.current.push(setTimeout(() => unexplode(id), 1000));
  };

  return (
    <Collide.Provider value={{ explode }}>
      <group>
        {ships.map((ship) => {
          return (
            <Spaceship
              key={ship.id}
              star={star}
              ship={ship}
              exploded={exploded}
            />
          );
        })}
      </group>
    </Collide.Provider>
  );
};

export default Spaceships;
