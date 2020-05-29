import { useState, useEffect, useCallback } from 'react';

const useKey = (key) => {
  const [isPressed, setIsPressed] = useState(false);

  const onDown = useCallback(
    ({ key: pressed }) => {
      if (key === pressed) setIsPressed(true);
    },
    [key]
  );

  const onUp = useCallback(
    ({ key: pressed }) => {
      if (key === pressed) setIsPressed(false);
    },
    [key]
  );

  useEffect(() => {
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  }, [onDown, onUp]);

  return isPressed;
};

export default useKey;
