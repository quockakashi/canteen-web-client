import { Box, Button, Container, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import AccountsTable from "../accounts-table";
import { Add } from "@mui/icons-material";

export default function AccountsManagementPage() {
    const theme = useTheme();
    const isSmallDownScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const navigate = useNavigate();

    return (
        <Container maxWidth='xl'>
            <Helmet>
                <title>Accounts Management - Canteen Dashboard</title>
            </Helmet>
            <Stack direction='row'  justifyContent={'space-between'} alignItems={'center'} mb={4}>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    <Typography variant="h2" fontWeight='bold'>Accounts</Typography>
                    <Typography variant="subtitle2">
                        Management accounts
                    </Typography>
                </Box>
                <Button onClick={() => navigate('./new-account')} variant="contained" sx={{...(isSmallDownScreen ? {
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                    } : {
                        py: 1
                    }), textTransform: 'none'}}
                    >
                    {<Add/>} {!isSmallDownScreen &&  `New account`}
                </Button>
            </Stack>
            <AccountsTable/>
        </Container>
    )
}