import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { getCategories } from '../../utilities/localstorage';
import { defaultCategory } from '../../utilities/defaultdata';

const CategoryComponent = ({ history }) => {
  const [categories, setCategories] = React.useState({ statusOK: true, data: [] });

  React.useEffect(() => {
    setCategories(getCategories());
    return () => true;
  }, []);

  const handleEdit = (e) => {
    const categoryId = e.currentTarget.dataset.categoryId;
    history.push('/categoryedit/' + categoryId);
  };

  return (
    <Container maxWidth="sm">
      <Box my={2}>
        <Typography variant="h6">Categories</Typography>
      </Box>
      <Paper>
        <List>
          {categories.statusOK ? (
            categories.data.map((v, i) => {
              return (
                <div key={i}>
                  <ListItem data-category-id={v.categoryId}>
                    <ListItemText
                      primary={v.category}
                      primaryTypographyProps={{ variant: 'h6' }}
                    />
                    {v.categoryId !== defaultCategory[0].categoryId ? (
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          data-category-id={v.categoryId}
                          onClick={handleEdit}
                        ><MoreVertIcon /></IconButton>
                      </ListItemSecondaryAction>
                    ) : (null)}
                  </ListItem>
                </div>
              );
            })
          ) : (null)}
        </List>
      </Paper>
    </Container>
  );
};

export default CategoryComponent;