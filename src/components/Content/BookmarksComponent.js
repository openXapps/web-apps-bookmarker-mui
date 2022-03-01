import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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

import { updateLastClicked, filterBookmarks } from '../../utilities/localstorage';
import { useStyles } from './BookmarksStyles';
import { context } from '../../context/StoreProvider';

const BookmarksComponent = () => {
  const [state,] = useContext(context);
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const rrNavigate = useNavigate();
  const [storedBookmarks, setStoredBookmarks] = useState({ statusOK: false, data: [] });
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [searchField, setSearchField] = useState('');
  const showSearch = state.navState.activeNav === -1;

  // Effect to control storedBookmarks based on activeNav state
  useEffect(() => {
    if (state.navState.activeNav >= -2) {
      // Set list limit according to screen size and active nav
      const limit = state.navState.activeNav === -1 ? (
        smallScreen ? 1000 : 0) : 1000;
      setStoredBookmarks(filterBookmarks(state.navState, limit));
    }
    // Effect clean-up
    return () => true;
  }, [state.navState, smallScreen]);

  // Effect to control filteredBookmarks based on storedBookamrks
  useEffect(() => {
    setFilteredBookmarks(storedBookmarks.data);
    // Effect clean-up
    return () => true;
  }, [storedBookmarks.data]);

  // Handle search field persistence
  const handleSearchFields = (e) => {
    setSearchField(e.currentTarget.value);
    if (!e.currentTarget.value) setFilteredBookmarks(storedBookmarks.data);
  };

  // Perform search event
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchField.length > 2) {
      let searchedBookmarks = [];
      searchedBookmarks = filterBookmarks(state.navState, 1000).data.filter((v) => {
        return (
          v.siteName.toLowerCase().indexOf(searchField.toLowerCase()) > -1 ||
          v.siteURL.toLowerCase().indexOf(searchField.toLowerCase()) > -1
        );
      });
      setFilteredBookmarks(searchedBookmarks.length > 0 ? searchedBookmarks : []);
    }
  };

  // Route to bookmark editor
  const handleEditButton = (e) => {
    rrNavigate('/edit/' + e.currentTarget.dataset.siteId);
  };

  // Set last accessed bookmark
  const handleLastClicked = (e) => {
    updateLastClicked(e.currentTarget.dataset.siteId);
  };

  return (
    <Box>
      {!smallScreen && showSearch ? (
        <form onSubmit={handleSearchSubmit} noValidate autoComplete="off">
          <Box ml={2} display="flex" flexWrap="nowrap" alignItems="center">
            <InputBase
              className={classes.searchField}
              placeholder="Search..."
              value={searchField}
              onChange={handleSearchFields}
              inputProps={{ 'aria-label': 'search bookmarks', 'type': 'search' }}
            />
            <IconButton
              type="submit"
              aria-label="search"
            ><SearchIcon /></IconButton>
          </Box>
        </form>
      ) : null}
      <Box width="100%" pl={{ sm: 1 }}>
        <List disablePadding>
          {storedBookmarks.statusOK ? (
            filteredBookmarks.map((v) => {
              // return i < listLimit && (
              return (
                <div key={v.siteId}>
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
                      primaryTypographyProps={smallScreen ? ({ variant: 'body1' }) : ({ variant: 'h5' })}
                      secondary={v.category ? v.category : null}
                    />
                    {v.favourite ? (
                      <StarIcon className={classes.favIcon} color="primary" fontSize="small" />
                    ) : null}
                    <ListItemSecondaryAction>
                      <IconButton
                        // edge="end"
                        data-site-id={v.siteId}
                        onClick={handleEditButton}
                      ><MoreVertIcon /></IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </div>
              );
            })
          ) : null}
        </List>
      </Box>
    </Box>
  );
};

export default BookmarksComponent;