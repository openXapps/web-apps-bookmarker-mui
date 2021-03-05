import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
// import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {
    getBookmarks,
    getByCategory,
    getFavourites,
} from '../../utilities/localstorage';
import { useStyles } from './BookmarksStyles';

const BookmarksComponent = ({history}) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    const [bookmarks, setBookmarks] = React.useState([]);

    React.useEffect(() => {
        // setBookmarks(getBookmarks());
        setBookmarks(getByCategory('017cf222-887b-11e9-bc42-526af7764f64'))
        return () => true;
    }, []);

    const handleEdit = (e) => {
        // console.log('Bookmarks: edit.siteId...', e.currentTarget.dataset.siteId);
        const siteId = e.currentTarget.dataset.siteId;
        history.push('/edit/' + siteId);
    };

    console.log('Bookmarks: bookmarks...', bookmarks);

    return (
        <Box className={classes.root}>
            <List disablePadding>
                {bookmarks.statusOK ? (
                    bookmarks.data.map((v, i) => {
                        return (
                            <div key={i}>
                                <ListItem
                                    disableGutters
                                    button
                                    component="a"
                                    href={v.siteURL}
                                    target="_blank"
                                    rel="noopener">
                                    <ListItemText
                                        className={classes.bookmarkText}
                                        primary={v.siteName}
                                        primaryTypographyProps={matches ? ({ variant: 'body1' }) : ({ variant: 'h5' })}
                                    />
                                    <ListItemSecondaryAction>
                                        {/* <Link href="https://www.google.co.za" target="_blank" rel="noopener"><EditIcon /></Link> */}
                                        {/* <Link href={`/edit/${v.siteId}`}><MoreVertIcon /></Link> */}
                                        <IconButton
                                            edge="end"
                                            data-site-id={v.siteId}
                                            onClick={handleEdit}
                                        ><MoreVertIcon /></IconButton>
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