import React from 'react';
import StoreReducer from './StoreReducer';
import {
  // initialUse,
  getSettings,
  getBookmarks
} from '../utilities/localstorage';

/**
 * Initial state
 */
const data = {
  isLoading: true,
  isEmpty: false,
  theme: getSettings().data.theme,
  bookmarks: getBookmarks().data,
};

export const context = React.createContext(data);

const StoreProvider = (props) => {
  const [state, dispatch] = React.useReducer(StoreReducer, data);
  // initialUse(false);
  return (
    <context.Provider value={[state, dispatch]}>
      {props.children}
    </context.Provider>
  );
};

export default StoreProvider;