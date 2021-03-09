import React from 'react';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';

import { useStyles } from './NavigationStyles';
import { getCategories, saveLocalStorage, getSettings } from '../../utilities/localstorage';

const NavigationComponent = ({ history }) => {
    const settings = getSettings();
    const classes = useStyles();
    const [categories, setCategories] = React.useState([]);
    const [active, setActive] = React.useState(0);

    React.useEffect(() => {
        setCategories(getCategories());
        return () => true;
    }, []);

    const handleNav = (e, i) => {
        const event = e.currentTarget.innerText;
        // console.log('Navigation: innerText....', event);
        switch (event) {
            case 'Popular':
                // console.log('Navigation: Popular......', event);
                saveLocalStorage('gd-bm-settings', { ...settings.data, route: '/' });
                if (history.location.pathname !== '/') history.push('/');
                setActive(0);
                break;
            case 'Favourites':
                // console.log('Navigation: Favourites...', event);
                saveLocalStorage('gd-bm-settings', { ...settings.data, route: '/favourites' });
                if (history.location.pathname !== '/favourites') history.push('/favourites');
                setActive(1);
                break;
            default:
                // console.log('Navigation: Dataset......', e.currentTarget.dataset.catId);
                saveLocalStorage('gd-bm-settings', { ...settings.data, route: '/category/' + e.currentTarget.dataset.catId });
                if (history.location.pathname !== '/category/:id') history.push('/category/' + e.currentTarget.dataset.catId);
                // console.log('Navigation: index....', i);
                if (i !== undefined) setActive(i + 2);
                break;
        }
    };

    // console.log('Nav: location...', history.location);

    return (
        <Box className={classes.root}>
            <Box display={{ xs: 'none', sm: 'none', md: 'block' }}>
                <Box className={classes.searchContainer}>
                    <InputBase
                        className={classes.searchField}
                        placeholder="Search..."
                    />
                    <IconButton className={classes.searchButton}>
                        <SearchIcon />
                    </IconButton>
                </Box>
            </Box>
            <List disablePadding>
                <ListItem button disableGutters onClick={handleNav} selected={active === 0}>
                    <ListItemText primary="Popular" className={classes.listItemText} />
                </ListItem>
                <ListItem button disableGutters onClick={handleNav} selected={active === 1}>
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
                                    selected={active === (i + 2)}
                                ><ListItemText primary={v.category} className={classes.listItemText} /></ListItem>
                            </div>
                        );
                    })
                ) : (null)}
            </List>
        </Box >
    );
};

export default NavigationComponent;