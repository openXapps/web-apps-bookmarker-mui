import React from 'react';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { useStyles } from './NavigationStyles';
import { getCategories } from '../../utilities/localstorage';
import { context } from '../../context/StoreProvider';

const NavigationComponent = ({ history, location }) => {
  const [state, dispatch] = React.useContext(context);
  const classes = useStyles();
  const [categories, setCategories] = React.useState({ statusOK: true, data: [] });

  React.useEffect(() => {
    setCategories(getCategories());
    return () => true;
  }, []);

  const handleNav = (e, i) => {
    const event = e.currentTarget.innerText;
    switch (event) {
      case 'Popular':
        dispatch({ type: 'NAV', payload: 0 });
        if (location.pathname !== '/') history.push('/');
        break;
      case 'Favourites':
        dispatch({ type: 'NAV', payload: 1 });
        if (location.pathname !== '/favourites') history.push('/favourites');
        break;
      default:
        if (i !== undefined) dispatch({ type: 'NAV', payload: i + 2 });
        if (location.pathname !== '/category/:id') history.push('/category/' + e.currentTarget.dataset.catId);
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