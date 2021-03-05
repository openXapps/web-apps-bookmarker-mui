import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';

import { useStyles } from './ContentStyles';
import NavigationComponent from './NavigationComponent';
import BookmarksComponent from './BookmarksComponent';

// https://medium.com/swlh/taking-material-ui-for-a-spin-79ec46db72e3

const ContentComponent = ({ history }) => {
  const classes = useStyles();

  return (
    <Box mt={2}>
      <Grid container spacing={1}>
        <Grid item xs={false} sm={3}>
          <Hidden xsDown>
            <Paper className={classes.paper}>
              <NavigationComponent history={history} />
            </Paper>
          </Hidden>
        </Grid>
        <Grid item xs={12} sm={9}>
          <BookmarksComponent history={history} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContentComponent;