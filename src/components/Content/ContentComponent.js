import React from 'react';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';

import NavigationComponent from './NavigationComponent';
import BookmarksComponent from './BookmarksComponent';

// https://medium.com/swlh/taking-material-ui-for-a-spin-79ec46db72e3

const ContentComponent = ({ history, location }) => {

  return (
    <Box mt={{ sm: 2 }}>
      <Container maxWidth="md" disableGutters>
        <Grid container>
          <Grid item xs={false} sm={3}>
            <Hidden xsDown>
              <NavigationComponent history={history} location={location} />
            </Hidden>
          </Grid>
          <Grid item xs={12} sm={9}>
            <BookmarksComponent history={history} location={location} />
          </Grid>
        </Grid>
      </Container>
    </Box >
  );
};

export default ContentComponent;