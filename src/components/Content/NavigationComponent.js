import { useState, useEffect, useContext } from 'react';

import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import { getCategories } from '../../utilities/localstorage';
import { context } from '../../context/StoreProvider';
import { navState } from '../../utilities/defaultdata';

const NavigationComponent = () => {
  const [state, dispatch] = useContext(context);
  const [categories, setCategories] = useState({ statusOK: true, data: [] });

  useEffect(() => {
    setCategories(getCategories());

    return () => true;
  }, []);

  const handleNav = (e, index) => {
    // console.log('NavigationComponent: menu........', e.currentTarget.innerText);
    // console.log('NavigationComponent: index.......', index);
    // console.log('NavigationComponent: categoryId..', e.currentTarget.dataset.catId);
    dispatch({
      type: 'NAV', payload: {
        menu: e.currentTarget.innerText,
        activeNav: index,
        categoryId: e.currentTarget.dataset.catId
      }
    });
  };

  return (
    <Paper elevation={5}>
      <List disablePadding>
        <ListItem
          button
          disableGutters
          data-cat-id=""
          onClick={(e) => handleNav(e, navState.POPULAR)}
          selected={state.navState.activeNav === navState.POPULAR}
        ><ListItemText primary="Popular" sx={{ pl: 1 }} /></ListItem>
        <ListItem
          button
          disableGutters
          data-cat-id=""
          onClick={(e) => handleNav(e, navState.FAVOURITES)}
          selected={state.navState.activeNav === navState.FAVOURITES}
        ><ListItemText primary="Favourites" sx={{ pl: 1 }} /></ListItem>
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
                  selected={state.navState.activeNav === (i)}
                ><ListItemText primary={v.category} sx={{ pl: 1 }} /></ListItem>
              </div>
            );
          })
        ) : (null)}
      </List>
    </Paper>
  );
};

export default NavigationComponent;