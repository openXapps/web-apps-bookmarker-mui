import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { useStyles } from './UploadStyles';
import { validator } from './UploadValidator';
import { mergeData, overwriteData } from './UploadLoader';

const UploadComponent = ({ history }) => {
  const classes = useStyles();
  const inputRef = React.useRef(null);
  const [snackState, setSnackState] = React.useState({
    severity: 'success',
    message: 'Validation SUCCESS',
    show: false
  });
  const [isValid, setIsValid] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [buttonState, setButtonState] = React.useState({
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
      <Box mt={2} />
      <Typography variant="h6">Upload</Typography>
      <Box mt={2} />
      <Grid
        container
        alignItems="center"
        justify="space-between"
        wrap="nowrap"
      ><Grid item>
          <Typography className={classes.grow}>Paste your site data in the text box below</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={handleValidation}
            disabled={isValid}
          >{isValid ? 'Done' : 'Validate'}</Button>
        </Grid>
      </Grid>
      <Box mt={2} />
      <TextField
        multiline
        id="bm-site-data-upload"
        inputRef={inputRef}
        inputProps={{ spellCheck: false }}
        variant="outlined"
        rows={15}
        rowsMax={15}
        fullWidth={true}
        disabled={isValid}
        error={isError}
      ></TextField>
      <Box mt={2} />
      <Grid
        container
        alignItems="center"
        justify="space-between"
      ><Grid item>
          <Button
            variant="outlined"
            disabled={buttonState.locked}
            onClick={handleMergeData}
          >{buttonState.merge}</Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            disabled={buttonState.locked}
            onClick={handleOverwriteData}
          >{buttonState.overwrite}</Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={() => history.goBack()}
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