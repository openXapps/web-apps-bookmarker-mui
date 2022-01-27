import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Hidden from '@mui/material/Hidden';
import Container from '@mui/material/Container';

import useStyles from './HeaderStyles';
import { getDefaultData } from '../../utilities/defaultdata';
import { context } from '../../context/StoreProvider';

const Header = () => {
  const [state, dispatch] = useContext(context);
  const navigate = useNavigate();
  const rrLocation = useLocation();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const localData = getDefaultData();

  const handleMenuToggle = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleHomeButton = () => {
    if (rrLocation.pathname !== '/') {
      if (state.activeNav !== 0) dispatch({ type: 'NAV', payload: 0 });
      // Causes extra stack in history, not good for PWA
      // navigate('/');
      navigate('/', {replace: true});
    } else {
      window.location.assign('https://www.openapps.co.za');
    }
  };

  const handleRoute = (e) => {
    handleMenuClose();
    // console.log(e.currentTarget.dataset.name);
    navigate(`/${e.currentTarget.dataset.name}`);
    // navigate(`/${e.currentTarget.dataset.name}`, {replace: true});
  };

  return (
    <AppBar position="fixed" color="inherit">
      <Container maxWidth="md" disableGutters>
        <Toolbar disableGutters>
          <Box mr={1}>
            <IconButton
              aria-label="home button"
              color="inherit"
              onClick={handleHomeButton}
            >{rrLocation.pathname === '/' ? <HomeIcon /> : <ArrowBackIcon />}</IconButton></Box>
          <Typography
            className={classes.grow}
            variant="h6"
          >BookMARKER <span className={classes.appVersion}><Hidden xsDown>v{localData.settings.version}</Hidden></span>
          </Typography>
          {rrLocation.pathname === '/' ? (
            <Box>
              <IconButton
                color="inherit"
                onClick={() => navigate('/new')}
              ><AddCircleIcon /></IconButton>
              <IconButton
                color="inherit"
                onClick={() => navigate('/settings')}
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
  );
};

export default Header;
