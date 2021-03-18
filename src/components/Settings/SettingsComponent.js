import React from 'react';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import { context } from '../../context/StoreProvider';
import { saveLocalStorage, getSettings } from '../../utilities/localstorage';
import { useStyles } from './SettingsStyles';
import { Paper } from '@material-ui/core';

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
    <Container maxWidth="sm">
      <Box mt={2} />
      <Typography
        className={classes.pageTitle}
        variant="h6"
      >Application settings</Typography>
      <Box className={classes.hGutter}></Box>
      <Paper>
        <Box className={classes.container}>
          <Typography>Dark Mode</Typography>
          <Switch
            checked={state.theme.isDark}
            onChange={handleTheme}
          />
        </Box>
        <Box className={classes.container}>
          <Typography>Confirm On Delete</Typography>
          <Switch
            checked={_confirmDelete}
            onChange={handleConfirmDelete}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default Settings;