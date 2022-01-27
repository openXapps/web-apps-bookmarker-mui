import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import { useStyles } from './NavigationStyles';
import { getCategories } from '../../utilities/localstorage';
import { context } from '../../context/StoreProvider';

const NavigationComponent = () => {
  const [state, dispatch] = useContext(context);
  const classes = useStyles();
  const rrLocation = useLocation();
  const rrNavigate = useNavigate();
  const [categories, setCategories] = useState({ statusOK: true, data: [] });

  useEffect(() => {
    setCategories(getCategories());
    return () => true;
  }, []);

  const handleNav = (e, i) => {
    const event = e.currentTarget.innerText;
    switch (event) {
      case 'Popular':
        dispatch({ type: 'NAV', payload: 0 });
        if (rrLocation.pathname !== '/') rrNavigate('/');
        break;
      case 'Favourites':
        dispatch({ type: 'NAV', payload: 1 });
        if (rrLocation.pathname !== '/favourites') rrNavigate('/favourites');
        break;
      default:
        if (i !== undefined) dispatch({ type: 'NAV', payload: i + 2 });
        if (rrLocation.pathname !== '/category/:id') rrNavigate('/category/' + e.currentTarget.dataset.catId);
        break;
    }
  };

  return (
    <Paper>
      <List disablePadding>
        <ListItem button disableGutters onClick={handleNav} selected={state.activeNav === 0}>
          <ListItemText primary="Popular" className={classes.listItemText} />
        </ListItem>
        <ListItem button disableGutters onClick={handleNav} selected={state.activeNav === 1}>
          <ListItemText primary="Favourites" className={classes.listItemText} />
        </ListItem>
        <Divider />
        {categories.statusOK ? (
          categories.data.map((v, i) => {
            return (
              <div key={i}>
                <ListItem
                  button
                  disableGutters
                  data-cat-id={v.categoryId}
                  onClick={(e) => handleNav(e, i)}
                  selected={state.activeNav === (i + 2)}
                ><ListItemText primary={v.category} className={classes.listItemText} /></ListItem>
              </div>
            );
          })
        ) : (null)}
      </List>
    </Paper>
  );
};

export default NavigationComponent;