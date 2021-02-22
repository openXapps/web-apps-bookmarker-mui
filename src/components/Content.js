import React from 'react';
import Categories from './Categories';
import Bookmarks from './Bookmarks';

const Content = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Categories />
      <Bookmarks />
    </div>
  );
};

export default Content;