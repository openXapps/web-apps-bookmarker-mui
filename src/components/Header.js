import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { context } from '../context/StoreProvider';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

const Header = () => {
  const classes = useStyles();
  const [drawerState, setDrawerState] = React.useState(false);
  const [state, dispatch] = React.useContext(context);

  const handleTheme = () => {
    const _isDark = !state.theme.isDark;
    const _template = _isDark ? 'dark' : 'light';
    dispatch({ type: 'THEME_SWITCH', payload: { isDark: _isDark, template: _template } });
  };

  return (
    <div className={classes.root}>
      <AppBar
        position='fixed'
      ><Toolbar>
          <IconButton
            color='inherit'
            onClick={() => setDrawerState(!drawerState)}
            edge='start'
            className={classes.menuButton}
          ><MenuIcon /></IconButton>
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
        {/* <div className={classes.drawerHeader}>
          <IconButton
            onClick={() => setDrawerState(!drawerState)}
          ><ChevronLeftIcon /></IconButton>
        </div>
        <Divider /> */}
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Header;