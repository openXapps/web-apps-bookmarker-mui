import React from 'react';
import NavigationComponent from './NavigationComponent';
import BookmarksComponent from './BookmarksComponent';

const ContentComponent = () => {
  return (
    <div style={{ display: 'flex' }}>
      <NavigationComponent />
      <BookmarksComponent />
    </div>
  );
};

export default ContentComponent;