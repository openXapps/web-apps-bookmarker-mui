import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { getBookmarks } from '../../utilities/localstorage';
import { useStyles } from './BookmarksStyles';

// https://material-ui.com/components/speed-dial/

const BookmarksComponent = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    const [bookmarks, setBookmarks] = React.useState([]);

    React.useEffect(() => {
        setBookmarks(getBookmarks());
        return () => true;
    }, []);

    return (
        <Box className={classes.root}>
            <List disablePadding>
                {bookmarks.statusOK ? (
                    bookmarks.data.map((v, i) => {
                        return (
                            <div key={i}>
                                <ListItem button disableGutters>
                                    <ListItemText
                                        className={classes.bookmarkText}
                                        primary={v.siteName}
                                        primaryTypographyProps={matches ? ({ variant: 'body1' }) : ({ variant: 'h5' })}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end">
                                            <MoreVertIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </div>
                        );
                    })
                ) : (null)}
            </List>
        </Box>
    );
};

export default BookmarksComponent;