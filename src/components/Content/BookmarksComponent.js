import React from 'react';
import { useParams } from 'react-router-dom';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ClearIcon from '@material-ui/icons/Clear';

import {
  updateLastClicked,
  getPopular,
  getByCategory,
  getFavourites,
} from '../../utilities/localstorage';
import { useStyles } from './BookmarksStyles';

const BookmarksComponent = ({ history, location }) => {
  const theme = useTheme();
  const breakpointSM = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const { id } = useParams();
  const [bookmarks, setBookmarks] = React.useState({ statusOK: false, data: [] });
  const [search, setSearch] = React.useState('');
  const [showSearch, setShowSearch] = React.useState(false);
  const [reload, setReload] = React.useState(false);

  React.useEffect(() => {
    let result = { statusOK: false, data: [] };
    switch (location.pathname) {
      case '/':
        result = getPopular();
        setShowSearch(true);
        if (result.statusOK) setBookmarks(result);
        break;
      case '/favourites':
        result = getFavourites();
        setShowSearch(false);
        if (result.statusOK) setBookmarks(result);
        break;
      default:
        result = getByCategory(id);
        setShowSearch(false);
        if (result.statusOK) setBookmarks(result);
        break;
    }
    setSearch('');
    // console.log('BookmarksComponent: Reload effect ran...');

    // Clean-up function
    return () => setReload(false);
  }, [location.pathname, id, reload]);

  // Reset search on empty string
  React.useEffect(() => {
    // console.log('BookmarksComponent: Search effect ran...');
    if (search.length === 0) setReload(true);

    // Clean-up function
    return () => true;
  }, [search]);

  // Handle search field persistence
  const handleSearch = (e) => {
    setSearch(e.currentTarget.value);
  };

  // Perform search from search field
  const doSearch = (e) => {
    e.preventDefault();
    let data = [];
    if (search.length > 0) {
      data = bookmarks.data.filter((v) => {
        return (
          v.siteName.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          v.siteURL.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
      });
      if (data.length > 0) setBookmarks({ ...bookmarks, data: data });
    } else {
      setReload(true);
    }
  };

  // Clear the search field and reload bookmarks
  const handleSearchClear = () => {
    setSearch('');
    setReload(true);
  };

  // Route to bookmark editor
  const handleEdit = (e) => {
    const siteId = e.currentTarget.dataset.siteId;
    history.push('/edit/' + siteId);
  };

  // Record last accessed bookmark
  const handleLastClicked = (e) => {
    console.log(e.currentTarget.dataset.siteId);
    updateLastClicked(e.currentTarget.dataset.siteId);
  };

  return (
    <Box>
      <Hidden smDown>
        {showSearch ? (
          <form onSubmit={doSearch} noValidate autoComplete="off">
            <Box className={classes.searchContainer}>
              <InputBase
                className={classes.searchField}
                placeholder="Search..."
                value={search}
                onChange={handleSearch}
                inputProps={{ 'aria-label': 'search bookmarks', 'type': 'search' }}
              />
              <IconButton
                className={classes.searchButton}
                aria-label="clear search"
                onClick={handleSearchClear}
              ><ClearIcon /></IconButton>
            </Box>
          </form>
        ) : (null)}
      </Hidden>
      <Box width="100%" pl={{ sm: 1 }}>
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
                      primaryTypographyProps={breakpointSM ? ({ variant: 'body1' }) : ({ variant: 'h5' })}
                      secondary={v.category ? v.category : null}
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
    </Box>
  );
};

export default BookmarksComponent;