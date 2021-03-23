import React from 'react';
import { v1 as uuidv1 } from 'uuid';
// uuidv1()

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

const sceneText = {
    mode: ['Loading...', 'Edit bookmark', 'New bookmark'],
    save: ['Saved', 'Update', 'Save New'],
    delete: ['Delete', 'Deleted'],
    exit: ['Back', 'Cancel'],
};

const EditorComponent = ({ history, match }) => {
    const classes = useStyles();
    const [fields, setFields] = React.useState(initalData);
    const [sceneIndexMode, setSceneIndexMode] = React.useState(0);
    const [sceneIndexSave, setSceneIndexSave] = React.useState(0);
    const [sceneIndexDelete, setSceneIndexDelete] = React.useState(0);
    const [sceneIndexExit, setSceneIndexExit] = React.useState(0);
    const [isSaved, setIsSaved] = React.useState(true);
    // const [isSavedAs, setIsSavedAs] = React.useState(false);
    const [isDeleted, setIsDeleted] = React.useState(false);
    const [isInvalid, setIsInvalid] = React.useState(false);
    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        const route = match.path;
        const id = match.params.id ? match.params.id : '';
        // console.log('Edit: id...', id);
        let bookmark = [];
        let category = '';
        switch (route) {
            case '/edit/:id':
                setSceneIndexMode(1);
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
                        setIsSaved(true);
                    }
                }
                break;
            case '/new':
                setSceneIndexMode(2);
                setSceneIndexSave(2);
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
        if (sceneIndexMode === 1 && sceneIndexSave !== 1) setSceneIndexSave(1);
        if (sceneIndexMode === 2 && sceneIndexSave !== 2) setSceneIndexSave(2);
        if (isDeleted) setIsDeleted(false);
        if (sceneIndexDelete !== 0) setSceneIndexSave(0);
        if (isInvalid) setIsInvalid(false);
    };

    const validateForm = () => {
        let passedValidation = true;
        let category = {};

        if (!fields.categoryInputValue) passedValidation = false;
        if (!fields.siteName) passedValidation = false;
        if (!fields.siteURL) passedValidation = false;
        if (passedValidation) {
            category = getCategoryByName(fields.categoryInputValue);
            if (!category.statusOK) {
                setFields({ ...fields, categoryId: uuidv1() });
            } else {
                setFields({ ...fields, categoryId: category.data[0].categoryId });
            }
        }

        return passedValidation;
    };

    const handleSave = () => {
        let passedValidation = false;
        passedValidation = validateForm();
        console.log('Edit: on save pass validation...', passedValidation);

        setIsInvalid(!passedValidation);
        setIsSaved(passedValidation);
        if (passedValidation) setSceneIndexSave(0);
        if (isDeleted) setIsDeleted(false);
        if (sceneIndexDelete !== 0) setSceneIndexDelete(0);
    };

    const handleSaveAs = () => {
        let passedValidation = false;
        passedValidation = validateForm();
        setIsInvalid(!passedValidation);
        setIsSaved(passedValidation);
        setIsDeleted(false);
    };

    const handleDelete = () => {
        setIsDeleted(true);
    };

    // console.log('Edit: history...', history);
    // console.log('Edit: match.....', match);
    console.log('Edit: isSaved.......', isSaved);
    console.log('Edit: isInvalid.....', isInvalid);
    console.log('Edit: isDeleted.....', isDeleted);
    console.log('Edit: disable save..', (isSaved || !isDeleted || !isInvalid));

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" mt={2}>
                <Typography variant="h6">{sceneText.mode[sceneIndexMode]}</Typography>
                <Box mt={{ xs: 1, sm: 2 }} />
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
                <Box my={{ xs: 0.5, sm: 2 }} />
                <Grid
                    container
                    alignItems="center"
                >
                    <Grid item xs={12} sm={3}>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={handleSave}
                            disabled={isSaved || isDeleted || isInvalid}
                        >{sceneText.save[sceneIndexSave]}</Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Box pl={{ xs: 0, sm: 1 }} pt={{ xs: 0.5, sm: 0 }}>
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={handleSaveAs}
                            // disabled={isInvalid}
                            >Save As</Button></Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Box pl={{ xs: 0, sm: 1 }} pt={{ xs: 0.5, sm: 0 }}>
                            <Button
                                variant="outlined"
                                fullWidth
                                color="secondary"
                                onClick={handleDelete}
                            // disabled={isDeleted}
                            >{sceneText.delete[sceneIndexDelete]}</Button></Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Box pl={{ xs: 0, sm: 1 }} pt={{ xs: 0.5, sm: 0 }}>
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={() => history.goBack()}
                            >{sceneText.exit[sceneIndexExit]}</Button></Box>
                    </Grid>
                </Grid>
            </Box>
            <Box mt={2} />
            <Typography variant="h6">siteId : {fields.siteId}</Typography>
            <Typography variant="h6">categoryId : {fields.categoryId}</Typography>
        </Container>
    );
};

export default EditorComponent;