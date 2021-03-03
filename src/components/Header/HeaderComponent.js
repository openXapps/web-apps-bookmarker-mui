import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';

import useStyles from './HeaderStyles';
import { getDefaultData } from '../../utilities/defaultdata';

const Header = ({ history, location }) => {
  const classes = useStyles();
  const [drawerState, setDrawerState] = React.useState(false);
  const localData = getDefaultData();

  // console.log('Header: data...', data);

  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
      ><Toolbar>
          <IconButton
            aria-label="home button"
            className={classes.leftButton}
            color="inherit"
            onClick={() => history.push('/')}
          >{location.pathname === '/' ? <HomeIcon /> : <ChevronLeftIcon />}</IconButton>
          <Typography
            variant="h6"
            className={classes.grow}
          >BookMARKER</Typography>
          {location.pathname === '/' ? (
            <>
              <IconButton
                color="inherit"
                onClick={() => history.push('/settings')}
              ><SettingsIcon /></IconButton>
              <IconButton
                color="inherit"
                onClick={() => setDrawerState(!drawerState)}
              ><MenuIcon /></IconButton>
            </>
          ) : (null)}
        </Toolbar>
      </AppBar>
      {/* <Toolbar /> */}
      <Drawer
        className={classes.drawer}
        anchor="right"
        open={drawerState}
        onClose={() => setDrawerState(false)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton
            onClick={() => setDrawerState(!drawerState)}
          ><ChevronRightIcon /></IconButton>
          <Typography>v{localData.settings.version}</Typography>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            component={RouterLink}
            to="/settings"
            onClick={() => setDrawerState(false)}
          ><ListItemText>Settings</ListItemText></ListItem>
          <ListItem
            button
            component={RouterLink}
            to="/download"
            onClick={() => setDrawerState(false)}
          ><ListItemText>Download Site Data</ListItemText></ListItem>
          <ListItem
            button
            component={RouterLink}
            to="/upload"
            onClick={() => setDrawerState(false)}
          ><ListItemText>Upload Site Data</ListItemText></ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default withRouter(Header);
