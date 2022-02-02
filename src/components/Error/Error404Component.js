import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Error404Component = () => {
    return (
        <Container maxWidth="md">
            <Toolbar disableGutters />
            <Box mt={2}><Typography variant="h6">404 - Page not found</Typography></Box>
        </Container>
    );
};

export default Error404Component;