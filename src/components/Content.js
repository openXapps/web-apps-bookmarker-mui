import React from 'react';
import Box from '@material-ui/core/Box';

const Content = () => {

  return (
    <Box sx={
      {
        m: 2,
        bgcolor: 'primary.dark',
        ':hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }
    }
    >{[...new Array(30)].map((v, i) => {
      return <p key={i}>{i} - Cras mattis consectetur purus sit amet fermentum.</p>
    })
      }
    </Box>
  );
};

export default Content;