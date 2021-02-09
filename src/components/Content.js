import React from 'react';
import Box from '@material-ui/core/Box';

const Content = () => {

  return (
    <Box p={2} bgcolor='primary.light'
    >{[...new Array(30)].map((v, i) => {
      return <p key={i}>{i} - Cras mattis consectetur purus sit amet fermentum.</p>
    })
      }
    </Box>
  );
};

export default Content;