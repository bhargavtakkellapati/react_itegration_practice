import { useState, useRef, useLayoutEffect } from 'react';

function UseLayoutEffect() {
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) {
      const { height } = ref.current.getBoundingClientRect();
      setTooltipHeight(height);
    }
  }, []); 

  return (
    <div ref={ref}>
     
    </div>
  );
}

export default UseLayoutEffect;