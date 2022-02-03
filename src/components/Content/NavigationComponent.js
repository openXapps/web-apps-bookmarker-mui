import { useState, useEffect, useContext } from 'react';

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
  const [categories, setCategories] = useState({ statusOK: true, data: [] });

  // console.log('NavigationComponent: Rendering...');

  useEffect(() => {
    setCategories(getCategories());

    return () => true;
  }, []);

  const handleNav = (e, index) => {
    // console.log('NavigationComponent: menu........', e.currentTarget.innerText);
    // console.log('NavigationComponent: index.......', index);
    // console.log('NavigationComponent: categoryId..', e.currentTarget.dataset.catId);
    dispatch({ type: 'NAV', payload: {
      menu: e.currentTarget.innerText,
      activeNav: index,
      categoryId: e.currentTarget.dataset.catId
    } });
  };

  // console.log('NavigationComponent: state.navState.....', state.navState);

  return (
    <Paper elevation={5}>
      <List disablePadding>
        <ListItem
          button
          disableGutters
          data-cat-id=""
          onClick={(e) => handleNav(e, -1)}
          selected={state.navState.activeNav === -1}
        ><ListItemText primary="Popular" className={classes.listItemText} /></ListItem>
        <ListItem
          button
          disableGutters
          data-cat-id=""
          onClick={(e) => handleNav(e, -2)}
          selected={state.navState.activeNav === -2}
        ><ListItemText primary="Favourites" className={classes.listItemText} /></ListItem>
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