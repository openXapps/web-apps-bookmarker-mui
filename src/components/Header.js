import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';

import { context } from '../context/StoreProvider';
import useHeaderStyle from './HeaderStyle';

const Header = () => {
  const classes = useHeaderStyle();
  const { goBack } = useHistory();
  const [drawerState, setDrawerState] = React.useState(false);
  const [state, dispatch] = React.useContext(context);

  React.useEffect(() => {
    console.log('Header: state.atHome...', state.atHome);
    // Effect clean-up function
    return () => true;
    // *eslint-disable-next-line react-hooks/exhaustive-deps*
  }, [state.atHome])

  const handleRouteState = () => {
    setDrawerState(!drawerState);
    dispatch({ type: 'ATHOME', payload: false })
  };

  const handleGoHome = () => {
    dispatch({ type: 'ATHOME', payload: true })
    goBack();
  };

  const handleTheme = () => {
    const _isDark = !state.theme.isDark;
    const _template = _isDark ? 'dark' : 'light';
    dispatch({ type: 'THEME', payload: { isDark: _isDark, template: _template } });
  };

  // console.log('Header: location...', location);

  return (
    <div className={classes.root}>
      <AppBar
        position='fixed'
      ><Toolbar>
          {state.atHome ? (
            <IconButton
              color='inherit'
              onClick={() => setDrawerState(!drawerState)}
              edge='start'
              className={classes.menuButton}
            ><MenuIcon /></IconButton>
          ) : (
              // https://material-ui.com/components/links/
              <Fab
                className={classes.menuButton}
                size="small"
                color="primary"
                aria-label="edit"
                onClick={handleGoHome}
              ><ChevronLeftIcon /></Fab>
            )
          }
          <Typography
            variant='h6'
            className={classes.title}
          >BookMARKER</Typography>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={state.theme.isDark}
                  onChange={handleTheme}
                />
              }
              label='Dark Mode'
            />
          </FormGroup>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Drawer
        className={classes.drawer}
        open={drawerState}
        onClose={() => setDrawerState(false)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton
            onClick={() => setDrawerState(!drawerState)}
          ><ChevronLeftIcon /></IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            component={RouterLink}
            to="/settings"
            onClick={handleRouteState}
          ><ListItemText>Settings</ListItemText></ListItem>
          <ListItem
            button
            component={RouterLink}
            to="/download"
            onClick={handleRouteState}
          ><ListItemText>Download Site Data</ListItemText></ListItem>
          <ListItem
            button
            component={RouterLink}
            to="/upload"
            onClick={handleRouteState}
          ><ListItemText>Upload Site Data</ListItemText></ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Header;

/**
 * {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
 */