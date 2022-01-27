import React from 'react';
import StoreReducer from './StoreReducer';
import {
  initialUse,
  getSettings,
} from '../utilities/localstorage';

/**
 * Initial state
 * Loads default site data on first use
 */
initialUse();

// Initialize context data
const contextData = {
  theme: getSettings().data.theme,
  activeNav: 0
};

export const context = React.createContext(contextData);

const StoreProvider = (props) => {
  const [state, dispatch] = React.useReducer(StoreReducer, contextData);
  return (
    <context.Provider value={[state, dispatch]}>
      {props.children}
    </context.Provider>
  );
};

export default StoreProvider;