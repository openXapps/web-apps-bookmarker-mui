import React from 'react';
// import { use } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { context } from '../context/StoreProvider';
import Categories from './Categories';
import Bookmarks from './Bookmarks';

const Content = () => {
  const [{ atHome }, dispatch] = React.useContext(context);

  React.useEffect(() => {
    if (!atHome) {
      console.log('Content: Set atHome to...', !atHome);
      dispatch({ type: 'ATHOME', payload: true });
    }
    // Effect clean-up function
    return () => true;
  }, [atHome, dispatch])

  // console.log('Content: history...', history);

  return (
    <div style={{ display: 'flex' }}>
      <Categories />
      <Bookmarks />
    </div>
  );
};

export default Content;