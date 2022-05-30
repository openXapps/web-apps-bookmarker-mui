import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Toolbar from '@mui/material/Toolbar';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';

import { context } from '../../context/StoreProvider';
import { saveLocalStorage, getSettings } from '../../utilities/localstorage';
import { storageObject, defaultPopularMarkers } from '../../utilities/defaultdata';

const Settings = () => {
  const rrNavigate = useNavigate();
  const [state, dispatch] = useContext(context);
  const settings = getSettings().data;
  const [_confirmOnDelete, setConfirmOnDelete] = useState(settings.confirmOnDelete);
  // const [_hideEmptyCategories, setHideEmptyCategories] = useState(settings.hideEmptyCategories);

  // Managed by state and persistence
  const handleTheme = () => {
    const _isDark = !state.theme.isDark;
    const _template = _isDark ? 'dark' : 'light';
    saveLocalStorage(storageObject.setting, { ...settings, theme: { isDark: _isDark, template: _template } });
    dispatch({ type: 'THEME', payload: { isDark: _isDark, template: _template } });
  };

  // Managed by persistence only
  const handleConfirmOnDelete = () => {
    saveLocalStorage(storageObject.setting, { ...settings, confirmOnDelete: !_confirmOnDelete });
    setConfirmOnDelete(!_confirmOnDelete);
  };

  const handlePopularMarker = (event, value) => {
    saveLocalStorage(storageObject.setting, { ...settings, listLimit: value });
  };

  // Managed by persistence only
  // const handleHideEmptyCategories = () => {
  //   saveLocalStorage(storageObject.setting, { ...settings, hideEmptyCategories: !_hideEmptyCategories });
  //   setHideEmptyCategories(!_hideEmptyCategories);
  // };

  return (
    <Container maxWidth="sm">
      <Toolbar disableGutters />
      <Box my={2}><Typography variant="h6">Application settings</Typography></Box>
      <Paper elevation={0}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap={false} p={2}>
          <Typography>Dark Mode</Typography>
          <Switch
            checked={state.theme.isDark}
            onChange={handleTheme}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap={false} p={2}>
          <Typography>Confirm On Delete</Typography>
          <Switch
            checked={_confirmOnDelete}
            onChange={handleConfirmOnDelete}
          />
        </Box>
        <Box p={2} mr={2}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Typography sx={{ mr: 3 }}>Popular</Typography>
            <Slider
              defaultValue={settings.listLimit}
              step={5}
              marks={defaultPopularMarkers}
              min={defaultPopularMarkers[0].value}
              max={defaultPopularMarkers[defaultPopularMarkers.length - 1].value}
              onChangeCommitted={handlePopularMarker}
            />
          </Stack>
        </Box>
        <Box p={2} />
        {/* <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap={false} p={2}>
          <Typography>Hide Empty Categories</Typography>
          <Switch
            checked={_hideEmptyCategories}
            onChange={handleHideEmptyCategories}
          />
        </Box> */}
      </Paper>
      <Box mt={2} />
      <Button
        variant="outlined"
        fullWidth
        onClick={() => rrNavigate(-1)}
      >Back</Button>
    </Container>
  );
};

export default Settings;