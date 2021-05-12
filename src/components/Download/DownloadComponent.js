import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

// import { useStyles } from './DownloadStyles';
import { getDownloadableData } from '../../utilities/localstorage';

const DownloadComponent = ({ history }) => {
  // const classes = useStyles();
  const inputRef = React.useRef(null);
  const [snackState, setSnackState] = React.useState({
    severity: 'success',
    message: 'Copied to clipboard',
    show: false
  });
  const [isCopied, setIsCopied] = React.useState(false);
  const [siteData, setSiteData] = React.useState('');

  React.useEffect(() => {
    setSiteData(getDownloadableData());
    // Effect clean-up function
    return () => true;
  }, []);

  const handleSnackState = () => {
    setSnackState({ ...snackState, show: false });
  };

  // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
  const handleDataCopy = () => {
    // console.log('Download: inputRef...', inputRef.current.value);
    navigator.clipboard.writeText(inputRef.current.value)
      .then(() => {
        setIsCopied(true);
        setSnackState({ ...snackState, show: true });
      });
  };

  return (
    <Container maxWidth="md">
      <Box my={2}>
        <Typography variant="h6">Download</Typography>
      </Box>
      <Typography>Copy your site data in the text box below</Typography>
      <Box my={2}>
        <TextField
          multiline
          id="bm-site-data-download"
          defaultValue={siteData}
          inputRef={inputRef}
          variant="outlined"
          rows={15}
          rowsMax={15}
          fullWidth={true}
          disabled
        ></TextField></Box>
      <Grid
        container
        alignItems="center"
        spacing={1}
        justify="space-between"
      ><Grid item xs={12} sm={6}>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleDataCopy}
            disabled={isCopied}
          >{isCopied ? 'Copied' : 'Copy'}</Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => history.goBack()}
          >Back</Button>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={snackState.show}
        autoHideDuration={4000}
        onClose={handleSnackState}
      ><Alert elevation={6} onClose={handleSnackState} severity={snackState.severity}>
          {snackState.message}
        </Alert></Snackbar>
    </Container>
  );
};

export default DownloadComponent;