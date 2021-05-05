import React from 'react';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import { context } from '../../context/StoreProvider';
import { saveLocalStorage, getSettings } from '../../utilities/localstorage';
import { storageObject } from '../../utilities/defaultdata';
import { useStyles } from './SettingsStyles';
import { Paper } from '@material-ui/core';

const Settings = () => {
  const classes = useStyles();
  const [state, dispatch] = React.useContext(context);
  const settings = getSettings().data;
  const [_confirmDelete, setConfirmDelete] = React.useState(settings.confirmDelete);
  const [_hideEmptyCategories, setHideEmptyCategories] = React.useState(settings.hideEmptyCategories);

  // Managed by state and persistence
  const handleTheme = () => {
    const _isDark = !state.theme.isDark;
    const _template = _isDark ? 'dark' : 'light';
    saveLocalStorage(storageObject.setting, { ...settings, theme: { isDark: _isDark, template: _template } });
    dispatch({ type: 'THEME', payload: { isDark: _isDark, template: _template } });
  };

  // // Managed by persistence only
  const handleConfirmDelete = () => {
    saveLocalStorage(storageObject.setting, { ...settings, confirmOnDelete: !_confirmDelete });
    setConfirmDelete(!_confirmDelete);
  };

  const handleHideEmptyCategories = () => {
    saveLocalStorage(storageObject.setting, { ...settings, hideEmptyCategories: !_hideEmptyCategories });
    setHideEmptyCategories(!_hideEmptyCategories);
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
        <Box className={classes.container}>
          <Typography>Hide Empty Categories</Typography>
          <Switch
            checked={_hideEmptyCategories}
            onChange={handleHideEmptyCategories}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default Settings;