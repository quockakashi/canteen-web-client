import { Box, Button, Container, Grid, Stack, Typography, alpha, colors, useMediaQuery, useTheme } from "@mui/material";
import { Helmet } from "react-helmet";
import SummaryCard from "../../../components/summay-card";
import OrderTable from "../order-table";
import { Add, FileDownload } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ImgBgSummaryBox from "../../../components/summary-box-with-bg";

export default function OrdersPage() {
    const theme = useTheme();
    const isSmallDownScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const navigate = useNavigate();

    return (
        <Container maxWidth='xl'>
            <Helmet>
                <title>Orders Management - Canteen Dashboard</title>
            </Helmet>
            <Stack direction='row'  justifyContent={'space-between'} alignItems={'center'} mb={4}>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    <Typography variant="h2" fontWeight='bold'>Oders</Typography>
                    <Typography variant="subtitle2">
                        Orders Management
                    </Typography>
                </Box>
                <Stack direction='row' alignItems={'center'} spacing={2}>
                    <Button onClick={() => navigate('new-oder')} variant="contained" sx={{...(isSmallDownScreen ? {
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                    } : {
                        py: 1
                    }), textTransform: 'none'}}
                    >
                        {<Add />} {!isSmallDownScreen &&  `Add new order`}
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

            <Grid mb={4} container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                        <ImgBgSummaryBox
                            details={false}
                            label={'Orders'}
                            value={'10K'}
                            imgUrl={"url('/imgs/order-bg-box.svg')"}
                            bgcolor={alpha(theme.palette.blue.main, 0.7)}
                        />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <ImgBgSummaryBox
                        details={false}
                        label={'Processing'}
                        value={'20'}
                        imgUrl={"url('/imgs/processing-bg.svg')"}
                        bgcolor={alpha(theme.palette.warning.main, 0.7)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                <ImgBgSummaryBox
                        details={false}
                        label={'Finished'}
                        value={'9.580'}
                        imgUrl={"url('/imgs/complete-bg.svg')"}
                        bgcolor={alpha(theme.palette.success.main, 0.7)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <ImgBgSummaryBox
                            details={false}
                            label={'Canceled'}
                            value={'400'}
                            imgUrl={"url('/imgs/cancel-bg.svg')"}
                            bgcolor={alpha(theme.palette.error.main, 0.7)}
                        />
                </Grid>
            </Grid>
            <OrderTable />
        </Container>
    )
}