import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Hidden from '@mui/material/Hidden';
import Container from '@mui/material/Container';

import NavigationComponent from './NavigationComponent';
import BookmarksComponent from './BookmarksComponent';

// https://medium.com/swlh/taking-material-ui-for-a-spin-79ec46db72e3

const ContentComponent = () => {

  return (
    <Box mt={{ sm: 2 }}>
      <Container maxWidth="md" disableGutters>
        <Grid container>
          <Grid item xs={false} sm={3}>
            <Hidden xsDown>
              <NavigationComponent />
            </Hidden>
          </Grid>
          <Grid item xs={12} sm={9}>
            <BookmarksComponent />
          </Grid>
        </Grid>
      </Container>
    </Box >
  );
};

export default ContentComponent;