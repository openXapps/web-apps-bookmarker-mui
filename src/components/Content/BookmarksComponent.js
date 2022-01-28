import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Hidden from '@mui/material/Hidden';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';

import { updateLastClicked, filteredBookmarks } from '../../utilities/localstorage';
import { useStyles } from './BookmarksStyles';
import { context } from '../../context/StoreProvider';

const BookmarksComponent = () => {
  const [state,] = useContext(context);
  const theme = useTheme();
  const breakpointSM = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const rrNavigate = useNavigate();
  const [bookmarks, setBookmarks] = useState({ statusOK: false, data: [] });
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // console.log('BookmarksComponent: Rendering...');

  useEffect(() => {
    // console.log('BookmarksComponent: State effect ran...');
    setBookmarks(filteredBookmarks(state.navState));
    setShowSearch(state.navState.activeNav === -1);

    // Clean-up function
    return () => true;
  }, [state.navState]);

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
      setBookmarks(filteredBookmarks(state.navState));
    }
  };

  // Route to bookmark editor
  const handleEdit = (e) => {
    rrNavigate('/edit/' + e.currentTarget.dataset.siteId);
  };

  // Set last accessed bookmark
  const handleLastClicked = (e) => {
    updateLastClicked(e.currentTarget.dataset.siteId);
  };

  return (
    <Box>
      <Hidden smDown>
        {showSearch ? (
          <form onSubmit={doSearch} noValidate autoComplete="off">
            <Box ml={2} display="flex" flexWrap="nowrap" alignItems="center">
              <InputBase
                className={classes.searchField}
                placeholder="Search..."
                value={search}
                onChange={handleSearch}
                inputProps={{ 'aria-label': 'search bookmarks', 'type': 'search' }}
              />
              <IconButton
                type="submit"
                aria-label="search"
              ><SearchIcon /></IconButton>
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
                    {v.favourite ? (
                      <StarIcon className={classes.favIcon} color="primary" fontSize="small" />
                    ) : (null)}
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