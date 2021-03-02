import React from 'react';
import Box from '@material-ui/core/Box';

import { getBookmarks } from '../../utilities/localstorage';

const BookmarksComponent = () => {
    const [bookmarks, setBookmarks] = React.useState([]);

    React.useEffect(() => {
        setBookmarks(getBookmarks());
        return () => true;
    }, []);

    return (
        <Box>
            {bookmarks.statusOK ? (
                bookmarks.data.map((v, i) => {
                    return (
                        <div key={i}>{v.siteName}</div>
                    );
                })
            ) : (null)}
        </Box>
    );
};

export default BookmarksComponent;