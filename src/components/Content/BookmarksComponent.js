import { useState, useEffect, useContext, useDeferredValue } from 'react';
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
import StarIcon from '@mui/icons-material/Star';

import { updateLastClicked, filterBookmarks } from '../../utilities/localstorage';
import { context } from '../../context/StoreProvider';
import { navState } from '../../utilities/defaultdata';
// import useDebounce from '../../hooks/useDebounce';

// Search field debounce threshold
const searchFieldThreshold = 3;

const BookmarksComponent = () => {
  const rrNavigate = useNavigate();
  const [state,] = useContext(context);
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [searchField, setSearchField] = useState('');
  const searchFieldDeferred = useDeferredValue(searchField);
  // const searchFieldDebounced = useDebounce(searchField, searchFieldThreshold, 1000);
  const showSearch = state.navState.activeNav === navState.POPULAR;

  // Effect to manage bookmark navigation and filtering
  useEffect(() => {
    if (searchFieldDeferred.length >= searchFieldThreshold && state.navState.activeNav === navState.POPULAR) {
      // Search filtering active
      let searchedBookmarks = [];
      searchedBookmarks = filterBookmarks(state.navState, 1000).data.filter((v) => {
        return (
          v.siteName.toLowerCase().indexOf(searchFieldDeferred.toLowerCase()) > -1 ||
          v.siteURL.toLowerCase().indexOf(searchFieldDeferred.toLowerCase()) > -1
        );
      });
      setFilteredBookmarks(searchedBookmarks.length > 0 ? searchedBookmarks : []);
    } else {
      // Navigate filtering active
      // Set list limit according to screen size and active nav
      const limit = state.navState.activeNav === navState.POPULAR ? (
        smallScreen ? 1000 : 0) : 1000;
      setFilteredBookmarks(filterBookmarks(state.navState, limit).data);
    }
    return () => true;
  }, [searchFieldDeferred, state.navState, smallScreen]);

  // Handle search field persistence
  const handleSearchFields = (e) => {
    setSearchField(e.currentTarget.value);
    if (!e.currentTarget.value) setFilteredBookmarks(filterBookmarks(state.navState, 0).data);
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
        <form onSubmit={e => e.preventDefault()} noValidate autoComplete="off">
          <InputBase
            sx={{ ml: 2 }}
            placeholder="Search..."
            value={searchField}
            onChange={handleSearchFields}
            inputProps={{ 'aria-label': 'search bookmarks', 'type': 'search' }}
          />
        </form>
      ) : null}
      <Box width="100%" pl={{ sm: 1 }}>
        <List disablePadding>
          {filteredBookmarks.map((v) => {
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
                    sx={{ pl: 1, fontSize: { sm: 10 } }}
                    primary={v.siteName}
                    primaryTypographyProps={smallScreen ? ({ variant: 'body1' }) : ({ variant: 'h5' })}
                    secondary={v.category ? v.category : null}
                  />
                  {v.favourite ? (
                    <StarIcon sx={{ mr: 1 }} color="primary" fontSize="small" />
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
          })}
        </List>
      </Box>
    </Box>
  );
};

export default BookmarksComponent;