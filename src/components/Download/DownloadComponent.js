import { useState, useEffect, useRef } from 'react';
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

// import { useStyles } from './DownloadStyles';
import { getDownloadableData } from '../../utilities/localstorage';

const DownloadComponent = () => {
  // const classes = useStyles();
  const rrNavigate = useNavigate();
  const inputRef = useRef(null);
  const [snackState, setSnackState] = useState({
    severity: 'success',
    message: 'Copied to clipboard',
    show: false
  });
  const [isCopied, setIsCopied] = useState(false);
  const [siteData, setSiteData] = useState('');

  useEffect(() => {
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
    // Doesn't work on IP URL, only localhost and HTTPS
    // stackoverflow.com/questions/51805395/navigator-clipboard-is-undefined
    navigator.clipboard.writeText(inputRef.current.value)
      .then(() => {
        setIsCopied(true);
        setSnackState({ ...snackState, show: true });
      });
  };

  return (
    <Container maxWidth="md">
      <Toolbar disableGutters />
      <Box my={2}><Typography variant="h6">Download</Typography></Box>
      <Typography>Copy your site data in the text box below</Typography>
      <Box my={2}>
        <TextField
          multiline
          id="bm-site-data-download"
          defaultValue={siteData}
          inputRef={inputRef}
          variant="outlined"
          maxRows={15}
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
            onClick={() => rrNavigate(-1)}
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