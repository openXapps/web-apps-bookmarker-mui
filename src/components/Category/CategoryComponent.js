import React from 'react';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {
    getCategories
} from '../../utilities/localstorage';
import useStyles from './CategoryStyles';

const CategoryComponent = () => {
    const classes = useStyles();
    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        setCategories(getCategories());
        return () => true;
    }, []);

    const handleEdit = () => {

    };

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" mt={2}>
                <Typography variant="h6">Categories</Typography>
                <Box mt={2} />
                <List disablePadding>
                    {categories.statusOK ? (
                        categories.data.map((v, i) => {
                            return (
                                <div key={i}>
                                    <ListItem
                                        disableGutters
                                        data-category-id={v.categoryId}
                                    >
                                        <ListItemText
                                            primary={v.category}
                                            primaryTypographyProps={{ variant: 'h5' }}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                edge="end"
                                                data-category-id={v.categoryId}
                                                onClick={handleEdit}
                                            ><MoreVertIcon /></IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </div>
                            );
                        })
                    ) : (null)}
                </List>
                <Box className={classes.hGutter} />
            </Box>
        </Container>
    );
};

export default CategoryComponent;