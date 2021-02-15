import React from 'react';
import StoreReducer from './StoreReducer';
import {getBookmarks, getTheme} from './InitialContext';

/**
 * Initial context data
 */
const data = {
  theme: getTheme(),
  isLoading: true,
  isEmpty: false,
  bookmarks: getBookmarks()
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