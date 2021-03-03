import React from 'react';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';

import { useStyles } from './NavigationStyles';
import {
    // getPopular,
    // getFavourites,
    getCategories,
} from '../../utilities/localstorage';

const NavigationComponent = () => {
    const classes = useStyles();
    // const [popular, setPopular] = React.useState([]);
    // const [favourites, setFavourites] = React.useState([]);
    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        // setPopular(getPopular());
        // setFavourites(getFavourites());
        setCategories(getCategories());
        return () => true;
    }, []);

    return (
        <Box className={classes.root}>
            <Box className={classes.searchContainer}>
                <InputBase
                    className={classes.searchField}
                    placeholder="Search..."
                />
                <IconButton className={classes.searchButton}>
                    <SearchIcon />
                </IconButton>
            </Box>
            <List disablePadding>
                <ListItem button disableGutters>
                    <ListItemText primary="Popular" className={classes.listItemText} />
                </ListItem>
                <ListItem button disableGutters>
                    <ListItemText primary="Favourites" className={classes.listItemText} />
                </ListItem>
                <div></div>
                {categories.statusOK ? (
                    categories.data.map((v, i) => {
                        return (
                            <div key={i}>
                                <ListItem button disableGutters>
                                    <ListItemText primary={v.category} className={classes.listItemText} />
                                </ListItem>
                            </div>
                        );
                    })
                ) : (null)}
            </List>
        </Box>
    );
};

export default NavigationComponent;