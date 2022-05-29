import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import Clear from '@mui/icons-material/Clear';

// import useStyles from './CategoryStyles';
import {
  getCategoryById,
  updateCategory,
  getByCategory,
  deleteCategory,
  deleteBookmark,
  getSettings,
} from '../../utilities/localstorage';

const initialFieldData = {
  categoryId: '',
  category: '',
};

const initialBookmarks = {
  statusOK: false,
  data: []
};

const CategoryEditComponent = () => {
  const [snackState, setSnackState] = useState({
    severity: 'success',
    message: 'Category saved'
  });
  const rrNavigate = useNavigate();
  const rrParams = useParams();
  const [snackShow, setSnackShow] = useState(false);
  const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
  const [fields, setFields] = useState(initialFieldData);
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [canBeDeleted, setCanBeDeleted] = useState(initialBookmarks.statusOK);

  // Initial effect when component renders
  useEffect(() => {
    let _category = [];
    // Route should be /categories/:id
    _category = getCategoryById(rrParams.id).data;
    if (Array.isArray(_category)) {
      if (_category.length === 1) {
        setFields({ categoryId: _category[0].categoryId, category: _category[0].category });
        setBookmarks(getByCategory(_category[0].categoryId));
      }
    }
    return () => true;
  }, [rrParams.id]);

  // Set delete button state based on bookmarks state
  useEffect(() => {
    if (bookmarks.statusOK) setCanBeDeleted(false);
    if (!bookmarks.statusOK) setCanBeDeleted(true);
    return () => true;
  }, [bookmarks.statusOK]);

  // Control input fields
  const handleFieldChange = ({ target: { name, value } }) => {
    setFields({ ...fields, [name]: value });
  };

  // Save category to storage
  const handleSave = () => {
    if (snackShow) setSnackShow(!snackShow);
    if (!fields.category) {
      setSnackState({ severity: 'error', message: 'Category cannot be blank' });
      setSnackShow(true);
      setFields({ ...fields, category: getCategoryById(fields.categoryId).data[0].category });
      return;
    }
    updateCategory(fields);
    setSnackState({ severity: 'success', message: 'Category saved' });
    setSnackShow(true);
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

  // Check for any attached bookmarks, then delete category
  // else snack on an error message
  const doDeleteAction = () => {
    deleteCategory(fields.categoryId);
    rrNavigate(-1);
  };

  const handleDialogDeleteClose = () => {
    setDialogDeleteOpen(false);
  };

  const handleDeleteBookamrk = (e) => {
    deleteBookmark(e.currentTarget.dataset.siteId);
    setBookmarks(getByCategory(fields.categoryId));
  };

  const handleSnackShow = () => {
    setSnackShow(!snackShow);
  };

  return (
    <Container maxWidth="sm">
      <Toolbar disableGutters />
      <Box my={2}><Typography variant="h6">Edit category</Typography></Box>
      <Paper component="form" autoComplete="off">
        <Box p={2}>
          <Box my={2}>
            <TextField
              label="Category"
              variant="outlined"
              name="category"
              value={fields.category}
              onChange={handleFieldChange}
              fullWidth
            />
          </Box>
        </Box>
      </Paper>
      <Box mt={2} />
      <Grid
        container
        alignItems="center"
        justify="space-between"
        spacing={1}
      ><Grid item xs={12} sm={4}>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleSave}
          >Save</Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant="outlined"
            fullWidth
            color="secondary"
            onClick={handleDelete}
            disabled={!canBeDeleted}
          >Delete</Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => rrNavigate(-1)}
          >Back</Button>
        </Grid>
      </Grid>
      {bookmarks.statusOK ? (
        <Box width="100%" mt={2}>
          <Divider />
          <List disablePadding>
            {bookmarks.data.map((v) => {
              return (
                <div key={v.siteId}>
                  <ListItem>
                    <ListItemText primary={v.siteName} />
                    <ListItemSecondaryAction>
                      <IconButton
                        data-site-id={v.siteId}
                        onClick={handleDeleteBookamrk}
                      ><Clear /></IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </div>
              );
            })}
          </List>
        </Box>
      ) : null}
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
          >Continue to delete this category?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteYes} color="primary">Yes</Button>
          <Button onClick={handleDialogDeleteClose} color="primary" autoFocus>No</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackShow}
        autoHideDuration={4000}
        onClose={handleSnackShow}
      ><Alert elevation={6} onClose={handleSnackShow} severity={snackState.severity}>
          {snackState.message}
        </Alert></Snackbar>
    </Container>
  );
};

export default CategoryEditComponent;