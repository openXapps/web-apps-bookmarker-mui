import React from 'react';
import { reducer } from '../reducers/reducer';
import {getBookmarks, getTheme} from './init';

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

const Store = (props) => {
  const [state, dispatch] = React.useReducer(reducer, data);
  return (
    <context.Provider value={[state, dispatch]}>
      {props.children}
    </context.Provider>
  );
};

export default Store;