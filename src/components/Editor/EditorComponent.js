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

import useStyles from './EditorStyles';
import {
    getCategories,
    getCategoryByName,
    getCategoryById,
    getBookmarkById,
} from '../../utilities/localstorage';

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
    const [isDeleted, setIsDeleted] = React.useState(false);
    const [isValid, setIsValid] = React.useState(true);
    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        const route = match.path;
        const id = match.params.id ? match.params.id : '';
        // console.log('Edit: id...', id);
        let bookmark = [];
        let category = '';
        switch (route) {
            case '/edit/:id':
                setMode('Edit bookmark');
                bookmark = getBookmarkById(id).data;
                // console.log('Edit: bookmark...', bookmark);
                if (Array.isArray(bookmark)) {
                    if (bookmark.length > 0) {
                        category = getCategoryById(bookmark[0].categoryId).data[0].category;
                        setFields({
                            categoryId: bookmark[0].categoryId,
                            categoryValue: category,
                            categoryInputValue: category,
                            favourite: bookmark[0].favourite,
                            siteId: bookmark[0].siteId,
                            siteName: bookmark[0].siteName,
                            siteURL: bookmark[0].siteURL,
                        });
                    }
                }
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
    }, [match.path, match.params]);

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
        setIsDeleted(!passedValidation);
    };

    const handleSaveAs = () => {
        setIsSaved(true);
        setIsDeleted(false);
    };

    const handleDelete = () => {
        setIsDeleted(true);
    };

    // console.log('Edit: history...', history);
    // console.log('Edit: match.....', match);

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" mt={2}>
                <Typography variant="h6">{mode}</Typography>
                <Box mt={2} />
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
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                        <Box mt={2} />
                        <TextField
                            label="Site Name"
                            variant="outlined"
                            name="siteName"
                            value={fields.siteName}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Box mt={2} />
                        <TextField
                            label="Site URL"
                            variant="outlined"
                            name="siteURL"
                            value={fields.siteURL}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Box mt={2} />
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
                            disabled={isSaved || isDeleted}
                        >{isSaved ? 'Saved' : 'Save'}</Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            color={isValid ? 'default' : 'secondary'}
                            onClick={handleSaveAs}
                            disabled={isSaved}
                        >{isSaved ? 'Saved' : 'Save As'}</Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            // color={isValid ? 'default' : 'secondary'}
                            onClick={handleDelete}
                            disabled={isDeleted}
                            color="secondary"
                        >{isDeleted ? 'Deleted' : 'Delete'}</Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            onClick={() => history.goBack()}
                        >{isSaved || isDeleted ? 'Back' : 'Cancel'}</Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default EditorComponent;