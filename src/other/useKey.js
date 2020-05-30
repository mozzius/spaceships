import { useState, useEffect, useCallback } from 'react';

const useKey = (keyCode) => {
  const [isPressed, setIsPressed] = useState(false);

  const onDown = useCallback(
    ({ code: pressed }) => {
      if (keyCode === pressed) setIsPressed(true);
    },
    [keyCode]
  );

  const onUp = useCallback(
    ({ code: pressed }) => {
      if (keyCode === pressed) setIsPressed(false);
    },
    [keyCode]
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
