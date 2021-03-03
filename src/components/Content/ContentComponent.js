import React from 'react';
import Box from '@material-ui/core/Box';

import NavigationComponent from './NavigationComponent';
import BookmarksComponent from './BookmarksComponent';

const ContentComponent = () => {
  return (
    <Box display="flex" mt={1}>
      <NavigationComponent />
      <BookmarksComponent />
    </Box>
  );
};

export default ContentComponent;