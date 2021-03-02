import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { useStyles } from './DownloadStyles';
import { getDownloadableData } from '../../utilities/localstorage';

const DownloadComponent = ({ history }) => {
    const classes = useStyles();
    const inputRef = React.useRef(null);
    const [snackState, setSnackState] = React.useState({
        severity: 'success',
        message: 'Copied to clipboard',
        show: false
    });
    const [isCopied, setIsCopied] = React.useState(false);
    const [siteData, setSiteData] = React.useState('');

    React.useEffect(() => {
        setTimeout(() => {
            setSiteData(getDownloadableData());
        }, 500);
        // Effect clean-up function
        return () => true;
    }, []);

    const handleSnackState = () => {
        setSnackState({ ...snackState, show: false });
    };

    // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
    const handleDataCopy = () => {
        // console.log('Download: inputRef...', inputRef.current.value);
        navigator.clipboard.writeText(inputRef.current.value)
            .then(() => {
                setIsCopied(true);
                setSnackState({ ...snackState, show: true });
            });
    };

    return (
        <div className={classes.container}>
            <Typography variant="h6" className={classes.hGutter}>Download</Typography>
            <Typography className={classes.hGutter}>Copy your site data in the text box below</Typography>
            <Box className={classes.hGutter}></Box>
            <TextField
                multiline
                id="bm-site-data-download"
                defaultValue={siteData}
                inputRef={inputRef}
                variant="outlined"
                rows={25}
                rowsMax={25}
                fullWidth={true}
                disabled
            ></TextField>
            <Grid
                container
                alignItems="center"
                className={classes.hGutter}
                justify="space-between"
            ><Grid item>
                    <Button
                        variant="outlined"
                        onClick={handleDataCopy}
                        disabled={isCopied}
                    >{isCopied ? 'Copied' : 'Copy'}</Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="outlined"
                        onClick={() => history.goBack()}
                    >Back</Button>
                </Grid>
            </Grid>
            {/* <Box className={classes.hGutter}></Box> */}
            <div className={classes.hGutter}></div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={snackState.show}
                autoHideDuration={4000}
                onClose={handleSnackState}
            ><Alert onClose={handleSnackState} severity={snackState.severity}>
                    {snackState.message}
                </Alert></Snackbar>
        </div>
    );
};

export default DownloadComponent;