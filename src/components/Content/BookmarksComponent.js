import { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

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

import {
  updateLastClicked,
  getPopular,
  getByCategory,
  getFavourites,
} from '../../utilities/localstorage';
import { useStyles } from './BookmarksStyles';

const BookmarksComponent = () => {
  const theme = useTheme();
  const breakpointSM = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const rrParams = useParams();
  const rrLocation = useLocation();
  const rrNavigate = useNavigate();
  const [bookmarks, setBookmarks] = useState({ statusOK: false, data: [] });
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [reload, setReload] = useState(false);

  const memorizedContent = useCallback(() => {
    let result = { statusOK: false, data: [] };
    switch (rrLocation.pathname) {
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
        result = getByCategory(rrParams.id);
        setShowSearch(false);
        if (result.statusOK) setBookmarks(result);
        break;
    }
    setSearch('');
  }, [rrLocation.pathname, rrParams.id]);

  useEffect(() => {
    // let result = { statusOK: false, data: [] };
    // switch (rrLocation.pathname) {
    //   case '/':
    //     result = getPopular();
    //     setShowSearch(true);
    //     if (result.statusOK) setBookmarks(result);
    //     break;
    //   case '/favourites':
    //     result = getFavourites();
    //     setShowSearch(false);
    //     if (result.statusOK) setBookmarks(result);
    //     break;
    //   default:
    //     result = getByCategory(rrParams.id);
    //     setShowSearch(false);
    //     if (result.statusOK) setBookmarks(result);
    //     break;
    // }
    // setSearch('');
    // console.log('BookmarksComponent: Reload effect ran...');
    memorizedContent();

    // Clean-up function
    return () => setReload(false);
  }, [memorizedContent, reload]);

  // Reset search on empty string
  useEffect(() => {
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

  // Route to bookmark editor
  const handleEdit = (e) => {
    const siteId = e.currentTarget.dataset.siteId;
    rrNavigate('/edit/' + siteId);
  };

  // Record last accessed bookmark
  const handleLastClicked = (e) => {
    // console.log(e.currentTarget.dataset.siteId);
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