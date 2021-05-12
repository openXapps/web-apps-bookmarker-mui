import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Switch from '@material-ui/core/Switch';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

const EditorComponent = ({ history, match }) => {
  const classes = useStyles();
  const categories = getCategories().statusOK ? getCategories().data : defaultCategory;
  const [snackState, setSnackState] = React.useState({
    severity: 'success',
    message: 'Bookmark saved',
    show: false
  });
  const [dialogDeleteOpen, setDialogDeleteOpen] = React.useState(false);
  const [fields, setFields] = React.useState(initialFieldData);
  const [sceneIndexMode, setSceneIndexMode] = React.useState(0);
  const [sceneIndexSave, setSceneIndexSave] = React.useState(0);
  const [canBeSavedAs, setCanBeSavedAs] = React.useState(false);
  const [canBeDeleted, setCanBeDeleted] = React.useState(false);

  // Initial effect when component renders based on router match
  React.useEffect(() => {
    const route = match.path;
    const id = match.params.id ? match.params.id : '';
    let bookmark = [];
    switch (route) {
      case '/edit/:id':
        bookmark = getBookmarkById(id).data;
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

    // Effect clean-up function
    return () => true;
  }, [match.path, match.params]);

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
  // console.log('Edit: history...............', history);
  // console.log('Edit: match.................', match);
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
      <Box mt={{ xs: 1, sm: 2 }} />
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
              onClick={() => history.goBack()}
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