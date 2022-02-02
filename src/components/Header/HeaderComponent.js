import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import useMediaQuery from '@mui/material/useMediaQuery';
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
import Container from '@mui/material/Container';

import useStyles from './HeaderStyles';
import { getDefaultData } from '../../utilities/defaultdata';
import { context } from '../../context/StoreProvider';

const HeaderComponent = () => {
  const [state, dispatch] = useContext(context);
  const smallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const rrLocation = useLocation();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const localData = getDefaultData();

  // console.log('HeaderComponent: Rendering...');

  const handleMenuToggle = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  /**
   * TODO
   * Fix the home button. Why is it dispatching state?
   */
  const handleHomeButton = () => {
    if (rrLocation.pathname !== '/') {
      if (state.activeNav !== localData.navState.activeNav) {
        dispatch({ type: 'NAV', payload: localData.navState });
      }
      navigate('/', { replace: true });
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
    <AppBar color="inherit">
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
          >BookMARKER {smallScreen ? null : (
            <span className={classes.appVersion}>v{localData.settings.version}</span>
          )}
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
                sx={{ mr: { sm: 0.5 } }}
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

export default HeaderComponent;
