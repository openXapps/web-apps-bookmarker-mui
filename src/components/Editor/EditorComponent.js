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
// import Snackbar from '@material-ui/core/Snackbar';
// import Alert from '@material-ui/lab/Alert';

import useStyles from './EditorStyles';
import { getCategories, getCategoryByName } from '../../utilities/localstorage';

const initalData = {
    categoryId: '',
    categoryValue: '',
    categoryInputValue: '',
    favourite: false,
    siteId: '',
    siteName: '',
    siteURL: '',
};

const EditorComponent = ({ history, match }) => {
    const classes = useStyles();
    const [fields, setFields] = React.useState(initalData);
    const [mode, setMode] = React.useState('Loading...');
    const [isSaved, setIsSaved] = React.useState(false);
    const [isValid, setIsValid] = React.useState(true);
    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        const route = match.path;
        switch (route) {
            case '/edit/:id':
                setMode('Edit bookmark');
                break;
            case '/new':
                setMode('New bookmark');
                break;
            default:
                break;
        }
        setCategories(getCategories().data);
        // Effect clean-up function
        return () => true;
    }, [match.path]);

    const handleChange = ({ target: { name, value } }) => {
        // console.log('Edit: handleChange.name....', name);
        // console.log('Edit: handleChange.value...', value);
        setFields({
            ...fields,
            [name]: value,
        });
        if (isSaved) setIsSaved(false);
    };

    const handleSave = () => {
        let passedValidation = true;
        let categoryId = '';

        if (!fields.categoryInputValue) passedValidation = false;
        if (!fields.siteName) passedValidation = false;
        if (!fields.siteURL) passedValidation = false;

        if (passedValidation && getCategoryByName(fields.categoryInputValue).statusOK) {
            if (getCategoryByName(fields.categoryInputValue).data.length > 1) {
                categoryId = getCategoryByName(fields.categoryInputValue).data[0].categoryId;
                console.log('Edit: categoryId...', categoryId);
            } else {
                // TODO need to generate new UUID
                console.log('Edit: new category...', fields.categoryInputValue);
            }
        }

        setIsValid(passedValidation);
        setIsSaved(passedValidation);
    };

    // console.log('Edit: history...', history);
    // console.log('Edit: match.....', match);

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" mt={2}>
                <Typography variant="h6">{mode}</Typography>
                <Box className={classes.hGutter}></Box>
                <Paper component="form" autoComplete="off">
                    <Box p={2}>
                        <Autocomplete
                            value={fields.categoryValue}
                            onChange={(e, v) => handleChange({ target: { name: 'categoryValue', value: v } })}
                            inputValue={fields.categoryInputValue}
                            onInputChange={(e, v) => handleChange({ target: { name: 'categoryInputValue', value: v } })}
                            freeSolo
                            options={categories.map((v) => v.category)}
                            renderInput={(params) => (
                                <TextField {...params}
                                    name="category"
                                    label="Category"
                                    // margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    color="secondary" />
                            )}
                        />
                        <Box className={classes.hGutter}></Box>
                        <TextField label="Site Name" variant="outlined" name="siteName" onChange={handleChange} fullWidth color="secondary" />
                        <Box className={classes.hGutter}></Box>
                        <TextField label="Site URL" variant="outlined" name="siteURL" onChange={handleChange} fullWidth color="secondary" />
                        <Box className={classes.hGutter}></Box>
                        <Box className={classes.switchContainer}>
                            <Typography>Favourite</Typography>
                            <Switch
                                checked={fields.favourite}
                                onChange={() => handleChange({ target: { name: 'favourite', value: !fields.favourite } })}
                            />
                        </Box>
                    </Box>
                </Paper>
                <Grid
                    container
                    alignItems="center"
                    className={classes.hGutter}
                    justify="space-between"
                ><Grid item>
                        <Button
                            variant="outlined"
                            color={isValid ? 'default' : 'secondary'}
                            onClick={handleSave}
                            disabled={isSaved}
                        >{isSaved ? 'Saved' : 'Save'}</Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            onClick={() => history.goBack()}
                        >{isSaved ? 'Back' : 'Cancel'}</Button>
                    </Grid>
                </Grid>
            </Box>

            {/* <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={snackState.show}
                autoHideDuration={4000}
                onClose={handleSnackState}
            ><Alert onClose={handleSnackState} severity={snackState.severity}>
                    {snackState.message}
                </Alert></Snackbar> */}
        </Container>
    );
};

export default EditorComponent;