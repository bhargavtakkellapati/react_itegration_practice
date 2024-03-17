import React, { useState, useCallback } from 'react';

const ClickCounter = () => {
  const [count, setCount] = useState(0);

  const clickHandler = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={clickHandler}>Increment</button>
    </div>
  );
};
export default ClickCounter