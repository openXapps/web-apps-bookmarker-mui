import React from 'react';
import { useParams } from 'react-router-dom';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {
    updateLastClicked,
    getPopular,
    getByCategory,
    getFavourites,
} from '../../utilities/localstorage';
import { useStyles } from './BookmarksStyles';

const BookmarksComponent = ({ history }) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    const { id } = useParams();
    const [bookmarks, setBookmarks] = React.useState([]);

    React.useEffect(() => {
        const route = history.location.pathname;
        let data = {};
        switch (route) {
            case '/':
                data = getPopular();
                if (data.statusOK) setBookmarks(data);
                break;
            case '/favourites':
                data = getFavourites();
                if (data.statusOK) setBookmarks(data);
                break;
            default:
                data = getByCategory(id);
                if (data.statusOK) setBookmarks(data);
                break;
        }
        // console.log('Bookmarks: route...', route);
        // console.log('Bookmarks: id......', id);
        // console.log('Bookmarks: data....', data);

        // Clean-up function
        return () => true;
    }, [history.location.pathname, id]);

    const handleEdit = (e) => {
        // console.log('Bookmarks: edit.siteId...', e.currentTarget.dataset.siteId);
        const siteId = e.currentTarget.dataset.siteId;
        history.push('/edit/' + siteId);
    };

    const handleLastClicked = (e) => {
        console.log(e.currentTarget.dataset.siteId);
        updateLastClicked(e.currentTarget.dataset.siteId);
    };

    return (
        <Box width="100%" pl={{sm:1}}>
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
                                    rel="noopener"
                                    data-site-id={v.siteId}
                                    onClick={handleLastClicked}>
                                    <ListItemText
                                        className={classes.bookmarkText}
                                        primary={v.siteName}
                                        primaryTypographyProps={matches ? ({ variant: 'body1' }) : ({ variant: 'h5' })}
                                    />
                                    <ListItemSecondaryAction>
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