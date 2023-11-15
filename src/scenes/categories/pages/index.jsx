import { Box, Button, Container, Grid, Stack, Typography, alpha, colors, useMediaQuery, useTheme } from "@mui/material";
import SummaryCard from "../../../components/summay-card";
import { Add, FileDownload } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CategoriesTable from "../categories-table";
import { Helmet } from "react-helmet";

export default function CategoriesPage() {
    const theme = useTheme();
    const isSmallDownScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const navigate = useNavigate();

    return (
        <Container maxWidth='xl'>
            <Helmet>
                <title>Categories Management - Canteen Dashboard</title>
            </Helmet>
            <Stack direction='row'  justifyContent={'space-between'} alignItems={'center'} mb={4}>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    <Typography variant="h2" fontWeight='bold'>Categories</Typography>
                    <Typography variant="subtitle2">
                        Categories Management
                    </Typography>
                </Box>
                <Stack direction='row' alignItems={'center'} spacing={2}>
                    <Button onClick={() => navigate('new-category')} variant="contained" sx={{...(isSmallDownScreen ? {
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                    } : {
                        py: 1
                    }), textTransform: 'none'}}
                    >
                        {<Add />} {!isSmallDownScreen &&  `Add new category`}
                    </Button>
                    <Button variant="contained" sx={{...(isSmallDownScreen ? {
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                    } : {
                        py: 1
                    }), textTransform: 'none'}}
                    >
                        {<FileDownload />} {!isSmallDownScreen &&  `Export file`}
                    </Button>
                </Stack>
            </Stack>
            <CategoriesTable />
        </Container>
    )
}