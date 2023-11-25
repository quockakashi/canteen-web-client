import { Box, Button, Container, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Add, ImportExport, Minus, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import StorageToolbar from "../storage-tool-bar";
import DueDateTable from "../due-date-table";


export default function StoragePage() {
    const theme = useTheme();
    const isSmallDownScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const navigate = useNavigate();
    

    return (
        <Container maxWidth='xl'>
            <Helmet>
                <title>Storage Management - Canteen Dashboard</title>
            </Helmet>
            <Stack direction='row'  justifyContent={'space-between'} alignItems={'center'} mb={4}>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    <Typography variant="h2" fontWeight='bold'>Storage</Typography>
                    <Typography variant="subtitle2">
                        Storage Management
                    </Typography>
                </Box>
                <Stack direction='row' alignItems={'center'} spacing={2}>
                    <Button onClick={() => navigate('receive-stock')} variant="contained" sx={{...(isSmallDownScreen ? {
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                    } : {
                        py: 1
                    }), textTransform: 'none'}}
                    >
                        {<Add />} {!isSmallDownScreen &&  `Receive stock`}
                    </Button>
                    <Button onClick={() => navigate('deliver-stock')} variant="contained" sx={{...(isSmallDownScreen ? {
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                    } : {
                        py: 1
                    }), textTransform: 'none'}}
                    >
                        {<Remove />} {!isSmallDownScreen &&  `Deliver Stock`}
                    </Button>
                </Stack>
            </Stack>
            <StorageToolbar mb={4} />
            <DueDateTable />
        </Container>
    )
}