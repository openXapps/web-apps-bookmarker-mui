import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// import useStyles from './FooterStyles';

const FooterComponent = () => {
  // const classes = useStyles();

  return (
    <AppBar position="fixed" color="transparent" className={classes.footerBar}>
      <Container maxWidth="md" disableGutters>
        {/* <Toolbar disableGutters className={classes.toolboxPadding}> */}
        <Toolbar disableGutters>
          <Typography variant="body1" color="inherit">Im a FOOTER</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default FooterComponent;