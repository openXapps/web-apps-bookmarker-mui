import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import useStyles from './FooterStyles';

const FooterComponent = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.footerBar}>
      <Container maxWidth="md" disableGutters>
        <Toolbar disableGutters className={classes.toolboxPadding}>
          <Typography variant="body1" color="inherit">Im a FOOTER</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default FooterComponent;