import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { useStyles } from './UploadStyles';
import { validator } from './UploadValidator';
import { mergeData, overwriteData } from './UploadLoader';

const UploadComponent = () => {
  const classes = useStyles();
  const inputRef = useRef(null);
  const rrNavigate = useNavigate();
  const [snackState, setSnackState] = useState({
    severity: 'success',
    message: 'Validation SUCCESS',
    show: false
  });
  const [isValid, setIsValid] = useState(false);
  const [isError, setIsError] = useState(false);
  const [buttonState, setButtonState] = useState({
    locked: true,
    merge: 'Merge',
    overwrite: 'Overwrite',
    exit: 'Cancel'
  });

  const handleSnackState = () => {
    setSnackState({ ...snackState, show: false });
  };

  const handleValidation = () => {
    // console.log('Upload: inputRef...', inputRef.current.value);
    if (!validator(inputRef.current.value).hasError) {
      setSnackState({ severity: 'success', message: 'Validation SUCCESS', show: true });
      setIsValid(true);
      setIsError(false);
      setButtonState({ ...buttonState, locked: false });
    } else {
      setIsError(true);
      setSnackState({ severity: 'error', message: 'Validation FAILED', show: true });
    }
  };

  const handleMergeData = () => {
    if (mergeData(inputRef.current.value)) {
      setButtonState({ ...buttonState, locked: true, merge: 'Merge Done', exit: 'Back' });
      setSnackState({ severity: 'success', message: 'Data merge SUCCESS', show: true });
    } else {
      setButtonState({ ...buttonState, locked: false, merge: 'Merge Error' });
      setSnackState({ severity: 'error', message: 'Data merge FAILED', show: true });
    }
  };

  const handleOverwriteData = () => {
    if (overwriteData(inputRef.current.value)) {
      setButtonState({ ...buttonState, locked: true, overwrite: 'Overwrite Done', exit: 'Back' });
      setSnackState({ severity: 'success', message: 'Data overwrite SUCCESS', show: true });
    } else {
      setButtonState({ ...buttonState, locked: false, overwrite: 'Overwrite Error' });
      setSnackState({ severity: 'error', message: 'Data overwrite FAILED', show: true });
    }
  };

  return (
    <Container maxWidth="md">
      <Toolbar disableGutters />
      <Box my={2}><Typography variant="h6">Upload</Typography></Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography className={classes.grow}>Paste your site data in the text box below</Typography>
        <Button
          sx={{ ml: 2 }}
          variant="outlined"
          onClick={handleValidation}
          disabled={isValid}
        >{isValid ? 'Done' : 'Validate'}</Button>
      </Box>
      <Box my={2}>
        <TextField
          multiline
          id="bm-site-data-upload"
          inputRef={inputRef}
          inputProps={{ spellCheck: false }}
          variant="outlined"
          rows={15}
          fullWidth={true}
          disabled={isValid}
          error={isError}
        ></TextField></Box>
      <Grid
        container
        alignItems="center"
        justify="space-between"
        spacing={1}
      ><Grid item xs={12} sm={4}>
          <Button
            variant="outlined"
            fullWidth
            // Merge option not implemented yet
            disabled={true}
            onClick={handleMergeData}
          >{buttonState.merge}</Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant="outlined"
            fullWidth
            disabled={buttonState.locked}
            onClick={handleOverwriteData}
          >{buttonState.overwrite}</Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => rrNavigate(-1)}
          >{buttonState.exit}</Button>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={snackState.show}
        autoHideDuration={2500}
        onClose={handleSnackState}
      ><Alert elevation={6} onClose={handleSnackState} severity={snackState.severity}>
          {snackState.message}
        </Alert></Snackbar>
    </Container>
  );
};

export default UploadComponent;