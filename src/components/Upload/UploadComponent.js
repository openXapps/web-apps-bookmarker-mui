import React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { useStyles } from './UploadStyles';
// import { saveLocalStorage } from '../utilities/localstorage';
import { validator } from './UploadValidator';

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

  const handleSnackState = () => {
    setSnackState({ ...snackState, show: false });
  };

  const handleValidation = () => {
    // console.log('Upload: inputRef...', inputRef.current.value);
    if (!validator(inputRef.current.value)) {
      setSnackState({ severity: 'success', message: 'Validation SUCCESS', show: true });
      setIsValid(true);
      setIsError(false);
    } else {
      setIsError(true);
      setSnackState({ severity: 'error', message: 'Validation FAILED', show: true });
    }
  };

  // console.log('Upload: history...', history);

  return (
    <div className={classes.container}>
      <Typography variant="h6" className={classes.hGutter}>Upload</Typography>
      <Box className={clsx(classes.validator, classes.hGutter)}>
        <Typography className={classes.grow}>Paste your saved site data in the text box below</Typography>
        <Button
          variant="outlined"
          onClick={handleValidation}
          disabled={isValid}
        >{isValid ? 'Done' : 'Validate'}</Button>
      </Box>
      <div className={classes.hGutter}></div>
      <TextField
        multiline
        id="bm-site-data-upload"
        inputRef={inputRef}
        variant="outlined"
        rows={25}
        rowsMax={25}
        fullWidth={true}
        disabled={isValid}
        error={isError}
      ></TextField>
      <Grid
        container
        alignItems="center"
        className={classes.hGutter}
        justify="space-between"
      ><Grid item>
          <Button
            variant="outlined"
            disabled={!isValid}
          >Append</Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            disabled={!isValid}
          >Overwrite</Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={() => history.goBack()}
          >Cancel</Button>
        </Grid>
      </Grid>
      {/* <Box className={classes.hGutter}>
      </Box> */}
      <div className={classes.hGutter}></div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={snackState.show}
        autoHideDuration={4000}
        onClose={handleSnackState}
      ><Alert onClose={handleSnackState} severity={snackState.severity}>
          {snackState.message}
        </Alert></Snackbar>
    </div>
  );
};

export default UploadComponent;