import React from 'react';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

import { context } from '../context/StoreProvider';
import { saveLocalStorage, getSettings } from '../utilities/localstorage';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5),
  },
  pageTitle: {

  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
}));

const Settings = () => {
  const classes = useStyles();
  const [state, dispatch] = React.useContext(context);
  const settings = getSettings().data;
  const [_confirmDelete, setConfirmDelete] = React.useState(settings.confirmDelete);

  // Managed by state and persistence
  const handleTheme = () => {
    const _isDark = !state.theme.isDark;
    const _template = _isDark ? 'dark' : 'light';
    saveLocalStorage('gd-bm-settings', { ...settings, theme: { isDark: _isDark, template: _template } });
    dispatch({ type: 'THEME', payload: { isDark: _isDark, template: _template } });
  };

  // // Managed by persistence only
  const handleConfirmDelete = () => {
    saveLocalStorage('gd-bm-settings', { ...settings, confirmDelete: !_confirmDelete })
    setConfirmDelete(!_confirmDelete);
  };

  return (
    <div className={classes.root}>
      <Typography
        className={classes.pageTitle}
        variant="h6"
      >Application Settings</Typography>
      <div className={classes.container}>
        <Typography>Dark Mode</Typography>
        <Switch
          checked={state.theme.isDark}
          onChange={handleTheme}
        />
      </div>
      <div className={classes.container}>
        <Typography>Confirm On Delete</Typography>
        <Switch
          checked={_confirmDelete}
          onChange={handleConfirmDelete}
        />
      </div>
    </div>
  );
};

export default Settings;