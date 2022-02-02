import useMediaQuery from '@mui/material/useMediaQuery';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import NavigationComponent from './NavigationComponent';
import BookmarksComponent from './BookmarksComponent';

// https://medium.com/swlh/taking-material-ui-for-a-spin-79ec46db72e3

const ContentComponent = () => {
  const smallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

  // console.log('ContentComponent: Rendering...');

  return (
    <Container maxWidth="md" disableGutters>
      <Toolbar disableGutters/>
      <Box mt={{ sm: 2 }}>
        <Grid container>
          {smallScreen ? null : (
            <Grid item xs={false} sm={3}>
              <NavigationComponent />
            </Grid>
          )}
          <Grid item xs={12} sm={9}>
            <BookmarksComponent />
          </Grid>
        </Grid>
      </Box >
    </Container>
  );
};

export default ContentComponent;