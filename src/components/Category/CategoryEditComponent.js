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

// import useStyles from './CategoryStyles';
import {
  // getCategories,
  getCategoryById,
} from '../../utilities/localstorage';

const initalFieldData = {
  categoryId: '',
  category: '',
};

const CategoryEdit = ({ history, match }) => {
  // const classes = useStyles();
  // const categories = getCategories().statusOK ? getCategories().data : [];
  const [snackState, setSnackState] = React.useState({
    severity: 'success',
    message: 'Category saved',
    show: false
  });
  const [fields, setFields] = React.useState(initalFieldData);

  // Initial effect when component renders
  React.useEffect(() => {
    const id = match.params.id;
    let _category = [];
    // Route should be /categories/:id
    _category = getCategoryById(id).data;
    if (Array.isArray(_category)) {
      if (_category.length === 1) {
        setFields({
          categoryId: _category.categoryId,
          category: _category.category
        });
      }
    }

    // Effect clean-up function
    return () => true;
  }, [match.params.id]);

  const handleFieldChange = ({ target: { name, value } }) => {
    // console.log('CategoryEdit: on change name........', name);
    // console.log('CategoryEdit: on change value.......', value);
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
    // TODO - save category here
    setSnackState({ severity: 'success', message: 'Category saved', show: true });
  };

  const handleDelete = () => {
    // TODO - delete category here, but move all attached
    // bookmarks to Uncategorized first
    setFields(initalFieldData);
    setSnackState({ severity: 'success', message: 'Category deleted', show: true });
  };

  const handleSnackState = () => {
    setSnackState({ ...snackState, show: false });
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" mt={2}>
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
          </Box>
        </Paper>
        <Box my={{ xs: 0.5, sm: 2 }} />
        <Grid container alignItems="center">
          <Grid item xs={12} sm={3}>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleSave}
            >Save</Button>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box pl={{ xs: 0, sm: 1 }} pt={{ xs: 0.5, sm: 0 }}>
              <Button
                variant="outlined"
                fullWidth
                color="secondary"
                onClick={handleDelete}
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
      </Box>
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

export default CategoryEdit;