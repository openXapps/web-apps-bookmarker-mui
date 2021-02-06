import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { context } from '../context/store';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  const [state, dispatch] = React.useContext(context);

  const handleTheme = () => {
    const _isDark = !state.theme.isDark;
    const _template = _isDark ? 'dark' : 'light';
    dispatch({ type: 'THEME_SWITCH', payload: { isDark: _isDark, template: _template } });
  };

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton edge='start' className={classes.menuButton} aria-label='menu'>
            <MenuIcon />
          </IconButton>
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
              label="Dark Mode"
            />
          </FormGroup>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;