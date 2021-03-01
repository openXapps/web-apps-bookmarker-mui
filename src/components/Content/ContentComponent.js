import React from 'react';
import CategoriesComponent from './CategoriesComponent';
import BookmarksComponent from './BookmarksComponent';

const ContentComponent = () => {
  return (
    <div style={{ display: 'flex' }}>
      <CategoriesComponent />
      <BookmarksComponent />
    </div>
  );
};

export default ContentComponent;