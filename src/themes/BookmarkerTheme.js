import React from 'react';
import { BookmarkContext } from '../context/BookmarkStore'
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        type: 'dark'
    }
});

const BookmarkTheme = () => {
    const [state, dispatch] = React.useContext(BookmarkContext);
    return
}

export default theme;