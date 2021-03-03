import React from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { getBookmarks } from '../../utilities/localstorage';
import { useStyles } from './BookmarksStyles';

// const listText = (props) => {
//     return (
//         <Box
//             component="div"
//             textOverflow="ellipsis"
//             overflow="hidden"
//         >{props.siteName}</Box>
//     );
// };

const BookmarksComponent = () => {
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
                                        // disableTypography={true}
                                        // primary={listText({ siteName: v.siteName })}
                                        primary={v.siteName}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end">
                                            <FavoriteIcon className={classes.favIcon} />
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