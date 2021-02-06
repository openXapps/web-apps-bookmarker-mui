import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import spacing from '@material-ui/system/sizing';

const App = () => {
  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        // component="div"
        align="center"
      >The all new BookMARKER</Typography>
      <Box
        // className="m-3"
        // style={{ backgroundColor: "blue" }}
        fontSize={{ xs: 'h6.fontSize', sm: 'h4.fontSize', md: 'h3.fontSize' }}
        p={{ xs: 2, sm: 3, md: 4 }}
        mx="auto"
        align="center"
      >The all new BookMARKER</Box>
    </Container>
  );
};

export default App;