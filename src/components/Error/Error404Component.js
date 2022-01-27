import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

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