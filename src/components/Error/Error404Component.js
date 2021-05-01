import React from 'react';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const Error404Component = () => {
    return (
        <Container maxWidth="md">
            <Box mt={2}>
                <Typography variant="h6">404 - Page not found</Typography>
            </Box>
        </Container>
    );
};

export default Error404Component;