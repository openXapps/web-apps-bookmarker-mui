import React from 'react';

// https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      console.log('useDebounce: effect.timeout.value...', value);
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;