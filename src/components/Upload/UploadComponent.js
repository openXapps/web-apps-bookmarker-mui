import { useState, useEffect } from 'react';
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

import useFileReader from '../../hooks/useFileReader';
import UploadFileButton from './UploadFileButton';
import { validator } from './UploadValidator';
import { overwriteData } from './UploadLoader';
import { storageObject } from '../../utilities/defaultdata';

const UploadComponent = () => {
  const rrNavigate = useNavigate();
  // const inputRef = useRef(null);
  const [{ frResult, frError, frLoading, frLoaded }, setFrFile] = useFileReader('readAsText');
  const [snackState, setSnackState] = useState({ severity: 'success', message: 'x', show: false });
  const [bookmarksString, setBookmarksString] = useState('');
  const [bookmarksObject, setBookmarksObject] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const [isError, setIsError] = useState(false);

  // Effect to set bookamrks from file
  useEffect(() => {
    setBookmarksString(frResult);
    return () => true;
  }, [frResult]);

  const handleValidation = () => {
    console.log('Upload: bookmarksString...', bookmarksString);
    const validation = validator(bookmarksString);
    if (validation.ok) {
      !isValid && setIsValid(true);
      isError && setIsError(false);
      isSaved && setIsSaved(false);
      setBookmarksObject(validation.result)
      setSnackState({ severity: 'success', message: 'Validation SUCCESS', show: true });
    } else {
      isValid && setIsValid(false);
      !isError && setIsError(true);
      setSnackState({ severity: 'error', message: 'Validation FAILED', show: true });
    }
  };

  const handleOverwriteData = () => {
    console.log('handleOverwriteData: bookmarksObject...', bookmarksObject);
    // saveLocalStorage(storageObject.category, bookmarksObject.categories);
    // saveLocalStorage(storageObject.bookmark, bookmarksObject.bookmarks);
    !isSaved && setIsSaved(true);
    setSnackState({ severity: 'success', message: 'Data overwrite SUCCESS', show: true });
  };

  const handleLoadFileInput = (e) => {
    setFrFile(e.currentTarget.files[0]);
  };

  const handleLoadFileReset = () => {
    setBookmarksString('');
    if (isError) setIsError(!isError);
    if (isValid) setIsValid(!isValid);
    if (!isSaved) setIsSaved(!isSaved);
  }

  const handleSnackState = () => {
    setSnackState({ ...snackState, show: false });
  };

  return (
    <Container maxWidth="md">
      <Toolbar />
      <Box my={2}><Typography variant="h6">Upload</Typography></Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ flexGrow: 1 }}>Paste your site data in the text box below</Typography>
        <Button
          sx={{ ml: 2 }}
          variant="outlined"
          onClick={handleValidation}
          disabled={isValid}
          color={isError ? 'error' : 'primary'}
        >{isValid ? 'Validated' : 'Validate'}</Button>
      </Box>
      <Box my={2}>
        <TextField
          multiline
          id="bm-site-data-upload"
          // inputRef={inputRef}
          inputProps={{ spellCheck: false }}
          variant="outlined"
          rows={15}
          fullWidth={true}
          disabled={isValid}
          error={isError}
          value={bookmarksString}
          onChange={(e) => setBookmarksString(e.currentTarget.value)}
        ></TextField></Box>
      <Grid
        container
        alignItems="center"
        justify="space-between"
        spacing={1}
      ><Grid item xs={12} sm={4}>
          <UploadFileButton
            handleLoadFileInput={handleLoadFileInput}
            handleLoadFileReset={handleLoadFileReset}
            buttonLabel={frLoading ? 'Loading' : 'Open File'}
            isLoading={frLoading}
            color={frError ? 'error' : 'primary'}
            disabled={frLoaded}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant="outlined"
            fullWidth
            disabled={isValid}
            onClick={handleOverwriteData}
          >{isSaved ? 'Saved' : 'Save'}</Button>
        </Grid>
        <Grid item xs={12} sm={4}>
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
        autoHideDuration={2500}
        onClose={handleSnackState}
      ><Alert elevation={6} onClose={handleSnackState} severity={snackState.severity}>
          {snackState.message}
        </Alert></Snackbar>
    </Container>
  );
};

export default UploadComponent;