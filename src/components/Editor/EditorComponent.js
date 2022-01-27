import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Switch from '@mui/material/Switch';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import useStyles from './EditorStyles';
import { validateForm, saveBookmark } from './EditorUtils';
import { defaultCategory } from '../../utilities/defaultdata';
import {
  getCategories,
  getCategoryById,
  getBookmarkById,
  deleteBookmark,
  getSettings,
} from '../../utilities/localstorage';

const initialFieldData = {
  categoryValue: defaultCategory[0],
  categoryInputValue: '',
  favourite: false,
  siteId: '',
  siteName: '',
  siteURL: '',
};

const sceneText = {
  mode: ['Loading...', 'Edit bookmark', 'New bookmark'],
  save: ['Update', 'Save New'],
};

const EditorComponent = () => {
  const classes = useStyles();
  const rrNavigate = useNavigate();
  const rrLocation = useLocation();
  const rrParams = useParams();
  const categories = getCategories().statusOK ? getCategories().data : defaultCategory;
  const [snackState, setSnackState] = useState({
    severity: 'success',
    message: 'Bookmark saved',
    show: false
  });
  const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
  const [fields, setFields] = useState(initialFieldData);
  const [sceneIndexMode, setSceneIndexMode] = useState(0);
  const [sceneIndexSave, setSceneIndexSave] = useState(0);
  const [canBeSavedAs, setCanBeSavedAs] = useState(false);
  const [canBeDeleted, setCanBeDeleted] = useState(false);

  // Trying to optimize the component so it doesn't re-render ... WTF not working!
  const memorizedPath = useCallback(() => {
    let bookmark = [];
    switch (rrLocation.pathname) {
      case '/edit/' + rrParams.id:
        bookmark = getBookmarkById(rrParams.id).data;
        if (Array.isArray(bookmark)) {
          if (bookmark.length === 1) {
            setFields({
              categoryValue: {
                categoryId: bookmark[0].categoryId,
                category: getCategoryById(bookmark[0].categoryId).data[0].category
              },
              categoryInputValue: '',
              favourite: bookmark[0].favourite,
              siteId: bookmark[0].siteId,
              siteName: bookmark[0].siteName,
              siteURL: bookmark[0].siteURL,
            });
            setSceneIndexMode(1);
            setCanBeSavedAs(true);
            setCanBeDeleted(true);
          }
        }
        break;
      case '/new':
        setSceneIndexMode(2);
        setSceneIndexSave(1);
        break;
      default:
        break;
    }
  }, [rrLocation.pathname, rrParams.id]);

  // Initial effect when component renders based on router match
  useEffect(() => {
    memorizedPath();

    // Effect clean-up function
    return () => true;
  }, [memorizedPath]);

  const handleFieldChange = ({ target: { name, value } }) => {
    // console.log('Edit: on change name........', name);
    // console.log('Edit: on change value.......', value);
    // console.log('------------------------------------------------');
    if (name === 'categoryValue' && value === null) {
      setFields({
        ...fields,
        categoryValue: { categoryId: '', category: '' },
      });
    } else {
      setFields({
        ...fields,
        [name]: value,
      });
    }
  };

  const handleSave = () => {
    let validation = false;
    let ids = { siteId: '', categoryId: '' };
    validation = validateForm(fields);
    // console.log('Edit: on save pass validation...', validation);
    if (!validation.status) {
      setSnackState({ severity: 'error', message: validation.message, show: true });
      return;
    }
    ids = saveBookmark(fields);
    if (fields.siteId !== ids.siteId || fields.categoryValue.categoryId !== ids.categoryId) {
      setFields({
        ...fields,
        siteId: ids.siteId,
        categoryValue:
        {
          category: fields.categoryInputValue,
          categoryId: ids.categoryId,
        },
      });
    }
    if (sceneIndexMode === 2) {
      setSceneIndexMode(1);
      setSceneIndexSave(0);
      setCanBeSavedAs(true);
      setCanBeDeleted(true);
    }
    setSnackState({ severity: 'success', message: 'Bookmark saved', show: true });
  };

  const handleSaveAs = () => {
    let validation = false;
    let ids = { siteId: '', categoryId: '' };
    const oldBookmark = getBookmarkById(fields.siteId);
    validation = validateForm(fields);
    if (!validation.status) {
      setSnackState({ severity: 'error', message: validation.message, show: true });
      return;
    }
    if (fields.siteURL.trim() === oldBookmark.data[0].siteURL) {
      setSnackState({ severity: 'error', message: 'Site URL not unique', show: true });
      return;
    }
    // Sending an empty siteId for Save As
    ids = saveBookmark({ ...fields, siteId: '' });
    if (fields.siteId !== ids.siteId || fields.categoryValue.categoryId !== ids.categoryId) {
      setFields({
        ...fields,
        siteId: ids.siteId,
        categoryValue:
        {
          category: fields.categoryInputValue,
          categoryId: ids.categoryId,
        },
      });
    }
    setSnackState({ severity: 'success', message: 'Bookmark saved', show: true });
  };

  const handleDelete = () => {
    const settings = getSettings();
    if (settings.statusOK) {
      if (settings.data.confirmOnDelete) {
        setDialogDeleteOpen(true);
      } else {
        deleteBookmark(fields.siteId);
        setFields(initialFieldData);
        setSceneIndexMode(2);
        setSceneIndexSave(1);
        setCanBeSavedAs(false);
        setCanBeDeleted(false);
        setSnackState({ severity: 'success', message: 'Bookmark deleted', show: true });
      }
    }
  };

  const handleDeleteYes = () => {
    setDialogDeleteOpen(false);
    deleteBookmark(fields.siteId);
    setFields(initialFieldData);
    setSceneIndexMode(2);
    setSceneIndexSave(1);
    setCanBeSavedAs(false);
    setCanBeDeleted(false);
    setSnackState({ severity: 'success', message: 'Bookmark deleted', show: true });
  };

  const handleDialogDeleteClose = () => {
    setDialogDeleteOpen(false);
  };

  const handleSnackState = () => {
    setSnackState({ ...snackState, show: false });
  };

  // console.log('Edit: JUST BEFORE RENDER...');
  // console.log('Edit: path..................', path);
  // console.log('Edit: rrLocation............', rrLocation);
  // console.log('Edit: rrParams..............', rrParams);
  // console.log('Edit: fields................', fields);
  // console.log('Edit: categoryInputValue....', fields.categoryInputValue);
  // console.log('Edit: categoryValue.........', fields.categoryValue);
  // console.log('Edit: canBeSaved............', canBeSaved);
  // console.log('Edit: canBeDeleted..........', canBeDeleted);
  // console.log('Edit: disable save..........', (canBeSaved || !canBeDeleted || !isInvalid));

  return (
    <Container maxWidth="sm">
      <Box mt={2} />
      <Typography variant="h6">{sceneText.mode[sceneIndexMode]}</Typography>
      <Box my={{ xs: 1, sm: 2 }} />
      <Paper component="form" autoComplete="off">
        <Box p={2}>
          <Box mt={{ xs: 1, sm: 2 }} />
          <Autocomplete
            freeSolo
            value={fields.categoryValue}
            onChange={(e, v) => handleFieldChange({ target: { name: 'categoryValue', value: v } })}
            inputValue={fields.categoryInputValue}
            onInputChange={(e, v) => handleFieldChange({ target: { name: 'categoryInputValue', value: v } })}
            // options={categories.map((option) => option.category)}
            options={categories}
            // getOptionLabel={(option) => option.category}
            // https://github.com/mui-org/material-ui/issues/18344
            getOptionLabel={option => typeof option === 'string' ? option : option.category}
            renderInput={(params) => (
              <TextField {...params} label="Category" variant="outlined" fullWidth />
            )}
          />
          <Box mt={2} />
          <TextField
            label="Site Name"
            variant="outlined"
            name="siteName"
            value={fields.siteName}
            onChange={handleFieldChange}
            fullWidth
          />
          <Box mt={2} />
          <TextField
            label="Site URL"
            variant="outlined"
            name="siteURL"
            value={fields.siteURL}
            onChange={handleFieldChange}
            fullWidth
          />
          <Box mt={2} />
          <Box className={classes.switchContainer}>
            <Typography>Favourite</Typography>
            <Switch
              checked={fields.favourite}
              onChange={() => handleFieldChange({ target: { name: 'favourite', value: !fields.favourite } })}
            />
          </Box>
        </Box>
      </Paper>
      <Box my={{ xs: 1, sm: 2 }} />
      <Grid container alignItems="center">
        <Grid item xs={12} sm={3}>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleSave}
          // disabled={!canBeSaved}
          >{sceneText.save[sceneIndexSave]}</Button>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box pl={{ xs: 0, sm: 1 }} pt={{ xs: 0.5, sm: 0 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleSaveAs}
              disabled={!canBeSavedAs}
            >Save As</Button></Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box pl={{ xs: 0, sm: 1 }} pt={{ xs: 0.5, sm: 0 }}>
            <Button
              variant="outlined"
              fullWidth
              color="secondary"
              onClick={handleDelete}
              disabled={!canBeDeleted}
            >Delete</Button></Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box pl={{ xs: 0, sm: 1 }} pt={{ xs: 0.5, sm: 0 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => rrNavigate(-1)}
            >Back</Button></Box>
        </Grid>
      </Grid>
      <Dialog
        open={dialogDeleteOpen}
        onClose={handleDialogDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete Action</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
          >Continue to delete this bookmark?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteYes} color="primary">Yes</Button>
          <Button onClick={handleDialogDeleteClose} color="primary" autoFocus>No</Button>
        </DialogActions>
      </Dialog>
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

export default EditorComponent;