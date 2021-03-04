import React from 'react';
import Box from '@material-ui/core/Box';

import NavigationComponent from './NavigationComponent';
import BookmarksComponent from './BookmarksComponent';

const ContentComponent = ({ location, history }) => {
  return (
    <Box display="flex" mt={1}>
      <NavigationComponent location={location} history={history} />
      <BookmarksComponent location={location} history={history} />
    </Box>
  );
};

export default ContentComponent;