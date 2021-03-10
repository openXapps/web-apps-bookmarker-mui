import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Switch from '@material-ui/core/Switch';
// import Snackbar from '@material-ui/core/Snackbar';
// import Alert from '@material-ui/lab/Alert';

import useStyles from './EditorStyles';

const initalData = {
    categoryId: '',
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
        // Effect clean-up function
        return () => true;
    }, []);

    const handleChange = ({ target: { name, value } }) => {
        // console.log('Edit: onChange.name/value...', name, value);
        setFields({
            ...fields,
            [name]: value,
        })
    };

    const handleFavourite = () => {
        setFields({
            ...fields,
            favourite: !fields.favourite,
        })
    };

    const handleSave = () => {
        return true;
    };

    // console.log('Edit: history...', history);
    // console.log('Edit: match.....', match);

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" mt={2}>
                <Typography variant="h6" className={classes.hGutter}>{mode}</Typography>
                <Box className={classes.hGutter}></Box>

                <Paper component="form" autoComplete="off">
                    <Box p={2}>
                        <TextField label="Category" variant="outlined" name="category" onChange={handleChange} fullWidth color="secondary" />
                        <Box className={classes.hGutter}></Box>
                        <TextField label="Site Name" variant="outlined" name="siteName" onChange={handleChange} fullWidth color="secondary" />
                        <Box className={classes.hGutter}></Box>
                        <TextField label="Site URL" variant="outlined" name="siteURL" onChange={handleChange} fullWidth color="secondary" />
                        <Box className={classes.hGutter}></Box>
                        <Box className={classes.switchContainer}>
                            <Typography>Favourite</Typography>
                            <Switch
                                name="favourite"
                                checked={fields.favourite}
                                onChange={handleFavourite}
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