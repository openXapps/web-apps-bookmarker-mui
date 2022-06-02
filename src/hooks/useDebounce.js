import { useState, useEffect } from 'react';

// https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
// https://usehooks.com/useDebounce/

// Although this is an awesome Hook, its been 
// replaced by React's useDeferredValue

/**
 * React Hook that works well with search fields that needs a delay
 * @param {string} value String value to return after timeout
 * @param {number} valueLength Length of value before debouncing
 * @param {number} delay Number of milliseconds to delay
 * @returns Debounced string after timeout
 */
const useDebounce = (value, valueLength, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    let handler = null;
    if (value && value.length >= valueLength) {
      // console.log('useDebounce: useEffect start timer');
      handler = setTimeout(() => {
        // console.log('useDebounce: useEffect set value...', value);
        setDebouncedValue(value);
      }, delay);
    }

    // Effect clean-up or setTimeout after unmount
    return () => {
      if (handler) {
        // console.log('useDebounce: useEffect clear timer');
        clearTimeout(handler);
      }
    }
  }, [value, delay, valueLength]);

  return debouncedValue;
};

export default useDebounce;
