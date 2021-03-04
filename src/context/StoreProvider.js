import React from 'react';
import StoreReducer from './StoreReducer';
import {
  initialUse,
  getSettings,
} from '../utilities/localstorage';

/**
 * Initial state
 * Loads default site data if first use
 */
initialUse(false);
const data = {
  isLoading: true,
  isEmpty: false,
  theme: getSettings().data.theme,
  view: getSettings().data.defaultView,
};

export const context = React.createContext(data);

const StoreProvider = (props) => {
  const [state, dispatch] = React.useReducer(StoreReducer, data);
  return (
    <context.Provider value={[state, dispatch]}>
      {props.children}
    </context.Provider>
  );
};

export default StoreProvider;