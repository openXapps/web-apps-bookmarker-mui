import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { getCategories } from '../../utilities/localstorage';
import { defaultCategory } from '../../utilities/defaultdata';

const CategoryComponent = () => {
  const rrNavigate = useNavigate();
  const [categories, setCategories] = useState({ statusOK: true, data: [] });

  useEffect(() => {
    setCategories(getCategories());
    return () => true;
  }, []);

  const handleEdit = (e) => {
    const categoryId = e.currentTarget.dataset.categoryId;
    rrNavigate('/categoryedit/' + categoryId);
  };

  return (
    <Container maxWidth="sm">
      <Toolbar disableGutters />
      <Box my={2}><Typography variant="h6">Categories</Typography></Box>
      <Paper elevation={0}>
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
      <Box mt={2} />
      <Button
        variant="outlined"
        fullWidth
        onClick={() => rrNavigate(-1)}
      >Back</Button>
    </Container>
  );
};

export default CategoryComponent;