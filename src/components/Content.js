import React from 'react';
// import { use } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { context } from '../context/StoreProvider';

const Content = () => {
  const [{ atHome }, dispatch] = React.useContext(context);

  React.useEffect(() => {
    if (!atHome) {
      console.log('Content: Set atHome to...', !atHome);
      dispatch({ type: 'ATHOME', payload: true });
    }
    // Effect clean-up function
    return () => true;
  }, [atHome, dispatch])

  // console.log('Content: history...', history);

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