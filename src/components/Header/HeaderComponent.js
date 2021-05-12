import React from 'react';
import { withRouter } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SettingsIcon from '@material-ui/icons/Settings';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';

import useStyles from './HeaderStyles';
import { getDefaultData } from '../../utilities/defaultdata';
import { context } from '../../context/StoreProvider';

const Header = ({ history, location }) => {
  const [state, dispatch] = React.useContext(context);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const localData = getDefaultData();

  const handleMenuToggle = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleHomeButton = () => {
    if (location.pathname !== '/') {
      if (state.activeNav !== 0) dispatch({ type: 'NAV', payload: 0 });
      history.push('/');
    } else {
      window.location.assign('https://www.openapps.co.za');
    }
  };

  const handleRoute = (e) => {
    handleMenuClose();
    // console.log(e.currentTarget.dataset.name);
    history.push(`/${e.currentTarget.dataset.name}`);
  };

  return (
    <>
      <AppBar position="fixed" color="inherit">
        <Container maxWidth="md" disableGutters>
          <Toolbar disableGutters>
            <Box mr={1}>
              <IconButton
                aria-label="home button"
                color="inherit"
                onClick={handleHomeButton}
              >{history.location.pathname === '/' ? <HomeIcon /> : <ArrowBackIcon />}</IconButton></Box>
            <Typography
              className={classes.grow}
              variant="h6"
            >BookMARKER <span className={classes.appVersion}><Hidden xsDown>v{localData.settings.version}</Hidden></span>
            </Typography>
            {history.location.pathname === '/' ? (
              <Box>
                <IconButton
                  color="inherit"
                  onClick={() => history.push('/new')}
                ><AddCircleIcon /></IconButton>
                <IconButton
                  color="inherit"
                  onClick={() => history.push('/settings')}
                ><SettingsIcon /></IconButton>
                <IconButton
                  color="inherit"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenuToggle}
                ><MenuIcon /></IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  getContentAnchorEl={null}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleRoute} data-name='settings'>Settings</MenuItem>
                  <MenuItem onClick={handleRoute} data-name='categories'>Categories</MenuItem>
                  <MenuItem onClick={handleRoute} data-name='download'>Backup my Data</MenuItem>
                  <MenuItem onClick={handleRoute} data-name='upload'>Restore my Backups</MenuItem>
                </Menu>
              </Box>
            ) : (null)}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default withRouter(Header);
