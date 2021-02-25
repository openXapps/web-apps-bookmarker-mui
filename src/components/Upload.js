import React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

// import { saveLocalStorage } from '../utilities/localstorage';
import { validator } from '../utilities/validator';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  },
  hGutter: {
    marginTop: theme.spacing(2),
  },
  vGutter: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(0),
    },
  },
  validator: {
    display: 'flex',
    alignItems: 'center'
  },
  grow: {
    flexGrow: 1,
  },
}));

const Upload = ({ history }) => {
  const classes = useStyles();
  const inputRef = React.useRef(null);
  const [snackState, setSnackState] = React.useState({
    severity: 'success',
    message: 'Validation SUCCESS',
    show: false
  });
  const [isValid, setIsValid] = React.useState(false);

  const handleSnackState = () => {
    setSnackState({ ...snackState, show: false });
  };

  const handleValidation = () => {
    // console.log('Upload: inputRef...', inputRef.current.value);
    // TODO validation of data
    if (validator(inputRef.current.value)) {
      setSnackState({ severity: 'success', message: 'Validation SUCCESS', show: true });
      setIsValid(true);
    } else {
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
          color={!isValid ? 'default' : 'secondary'}
        >{isValid ? 'Done' : 'Validate'}</Button>
      </Box>
      <div className={classes.hGutter}></div>
      <TextField
        multiline
        id="bm-site-data"
        // value={bookmarks}
        inputRef={inputRef}
        // onChange={handleTextChanges}
        variant="outlined"
        rows={25}
        rowsMax={25}
        fullWidth={true}
        disabled={isValid}
      ></TextField>
      <Grid
        container
        alignItems="center"
        className={classes.hGutter}
        justify="space-between"
      ><Grid item>
          <Button
            variant="outlined"
            // className={classes.vGutter}
            disabled={!isValid}
          >Append</Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            // className={classes.vGutter}
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
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackState.show}
        autoHideDuration={3000}
        onClose={handleSnackState}
      ><Alert onClose={handleSnackState} severity={snackState.severity}>
          {snackState.message}
        </Alert></Snackbar>
    </div>
  );
};

export default Upload;