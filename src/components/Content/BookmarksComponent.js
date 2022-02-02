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
  const [filteredBookmarks, setFilteredBookmarks] = useState({ statusOK: false, data: [] });
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(10);
  const showSearch = state.navState.activeNav === -1;

  // console.log('BookmarksComponent: Rendering...');

  useEffect(() => {
    setStoredBookmarks(filterBookmarks(state.navState));
    setLimit(() => {
      return state.navState.activeNav === -1 ? 10 : 1000;
    });

    // Clean-up function
    return () => true;
  }, [state.navState]);

  useEffect(() => {
    setFilteredBookmarks(storedBookmarks);

    // Clean-up function
    return () => true;
  }, [storedBookmarks]);

  // Handle search field persistence
  const handleSearchFields = (e) => {
    if (!e.currentTarget.value) {
      if (storedBookmarks.data.length > filteredBookmarks.data.length) {
        setFilteredBookmarks(storedBookmarks);
      }
    }
    setSearch(e.currentTarget.value);
  };

  // Perform search event
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    let data = [];
    if (search.length > 0) {
      data = storedBookmarks.data.filter((v) => {
        return (
          v.siteName.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          v.siteURL.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
      });
      if (data.length > 0) setFilteredBookmarks({ ...storedBookmarks, data: data });
    } else {
      setFilteredBookmarks(storedBookmarks);
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
              value={search}
              onChange={handleSearchFields}
              inputProps={{ 'aria-label': 'search bookmarks', 'type': 'search' }}
            />
            <IconButton
              type="submit"
              aria-label="search"
            ><SearchIcon /></IconButton>
          </Box>
        </form>
      ) : (null)}
      <Box width="100%" pl={{ sm: 1 }}>
        <List disablePadding>
          {filteredBookmarks.statusOK ? (
            filteredBookmarks.data.map((v, i) => {
              return i < limit && (
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
                      primaryTypographyProps={smallScreen ? ({ variant: 'body1' }) : ({ variant: 'h5' })}
                      secondary={v.category ? v.category : null}
                    />
                    {v.favourite ? (
                      <StarIcon className={classes.favIcon} color="primary" fontSize="small" />
                    ) : (null)}
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
          ) : (null)}
        </List>
      </Box>
    </Box>
  );
};

export default BookmarksComponent;