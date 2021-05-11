import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// import useStyles from './CategoryStyles';
import {
  // getCategories,
  getCategoryById,
  updateCategory,
  getBookmarks,
  deleteCategory,
  getSettings,
} from '../../utilities/localstorage';

const initialFieldData = {
  categoryId: '',
  category: '',
};

const CategoryEditComponent = ({ history, match }) => {
  // const classes = useStyles();
  // const categories = getCategories().statusOK ? getCategories().data : [];
  const [snackState, setSnackState] = React.useState({
    severity: 'success',
    message: 'Category saved',
    show: false
  });
  const [dialogDeleteOpen, setDialogDeleteOpen] = React.useState(false);
  const [fields, setFields] = React.useState(initialFieldData);
  const [canBeSaved, setCanBeSaved] = React.useState(true);
  const [canBeDeleted, setCanBeDeleted] = React.useState(true);

  // Initial effect when component renders
  React.useEffect(() => {
    let _category = [];
    // Route should be /categories/:id
    _category = getCategoryById(match.params.id).data;
    if (Array.isArray(_category)) {
      // console.log('Effect: _category........', _category);
      if (_category.length === 1) {
        setFields({
          ...initialFieldData,
          categoryId: _category[0].categoryId,
          category: _category[0].category,
        });
      }
    }

    // Effect clean-up function
    return () => true;
  }, [match.params.id]);

  const handleFieldChange = ({ target: { name, value } }) => {
    // console.log('CategoryEditComponent: on change name........', name);
    // console.log('CategoryEditComponent: on change value.......', value);
    // console.log('------------------------------------------------');
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handleSave = () => {
    if (!fields.category) {
      setSnackState({ severity: 'error', message: 'Category cannot be blank', show: true });
      return;
    }
    updateCategory(fields);
    setSnackState({ severity: 'success', message: 'Category saved', show: true });
  };

  const doDeleteAction = () => {
    let counter = 0;
    const bookmarks = getBookmarks();
    if (bookmarks.statusOK) {
      bookmarks.data.forEach((v) => {
        // console.log('CategoryEditComponent: bookmark.siteName...', v.siteName);
        counter += v.categoryId === fields.categoryId ? 1 : 0;
      });
      if (counter > 0) {
        setSnackState({
          severity: 'error',
          message: 'Cannot delete category. First remove ' + counter + ' attached bookmark' + (counter > 1 ? 's' : ''),
          show: true
        });
      } else {
        deleteCategory(fields.categoryId);
        setCanBeSaved(false);
        setFields(initialFieldData);
        setSnackState({ severity: 'success', message: 'Category deleted', show: true });
      }
      setCanBeDeleted(false);
    }
  };

  const handleDelete = () => {
    const settings = getSettings();
    if (settings.statusOK) {
      if (settings.data.confirmOnDelete) {
        setDialogDeleteOpen(true);
      } else {
        doDeleteAction();
      }
    }
  };

  const handleDeleteYes = () => {
    setDialogDeleteOpen(false);
    doDeleteAction();
  };

  const handleDialogDeleteClose = () => {
    setDialogDeleteOpen(false);
  };

  const handleSnackState = () => {
    setSnackState({ ...snackState, show: false });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={2} />
      <Typography variant="h6">Edit category</Typography>
      <Box mt={{ xs: 1, sm: 2 }} />
      <Paper component="form" autoComplete="off">
        <Box p={2}>
          <Box mt={{ xs: 1, sm: 2 }} />
          <TextField
            label="Category"
            variant="outlined"
            name="category"
            value={fields.category}
            onChange={handleFieldChange}
            fullWidth
          />
          <Box mt={2} />
        </Box>
      </Paper>
      <Box my={{ xs: 1, sm: 2 }} />
      <Grid container alignItems="center">
        <Grid item xs={12} sm={3}>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleSave}
            disabled={!canBeSaved}
          >Save</Button>
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
      </Grid><Dialog
        open={dialogDeleteOpen}
        onClose={handleDialogDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete Action</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
          >Continue to delete this category?</DialogContentText>
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

export default CategoryEditComponent;