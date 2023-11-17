import { Box, Button, Container, Grid, Stack, Typography, alpha, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Error404Page() {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Container  maxWidth='xl' sx={{height: 1}}>
            <Helmet>
                <title>Dashboard - Canteen Dashboard</title>
            </Helmet>
            <Stack
                textAlign='center'
                width={1}
                height={1}
                justifyContent='center'
                alignItems='center'
            >
                <Typography variant="h4" mb='16px' fontSize={32}>
                    Page not found!
                </Typography>
                <Typography maxWidth={500} variant="body1" mb='48px'>
                Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your spelling.
                </Typography>
                <Box mb='32px' component='img' src="/imgs/404-error.svg" width={400}></Box>
                <Button onClick={() => navigate('/home')} variant="contained" sx={{width: 100}} >
                    Go Home
                </Button>
            </Stack>
        </Container>
    )
}