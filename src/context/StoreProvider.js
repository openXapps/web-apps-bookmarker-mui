import { createContext, useReducer } from 'react';
import StoreReducer from './StoreReducer';
import { getDefaultData } from '../utilities/defaultdata';
import { initialUse, getSettings } from '../utilities/localstorage';

/**
 * Initial state
 * Loads default site data on first use
 */
initialUse();

// Initialize context data
const contextData = {
  theme: getSettings().data.theme,
  navState: getDefaultData().navState,
};

export const context = createContext(contextData);

const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(StoreReducer, contextData);
  return (
    <context.Provider value={[state, dispatch]}>
      {props.children}
    </context.Provider>
  );
};

export default StoreProvider;