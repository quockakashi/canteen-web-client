import { Box, Container, Grid, Stack, Typography, alpha, useTheme } from "@mui/material";
import SummaryCard from "../../../components/summay-card";
import RevenueProductTable from "../top-revenue-products";
import { useNavigate } from "react-router-dom";
import ImgBgSummaryBox from "../../../components/summary-box-with-bg";
import CustomBarChart from "../../../components/barchart";
import CustomPieChart from "../../../components/pie-chart";
import PrimaryStackContainer from "../../../components/primary-light-container";
import { Helmet } from "react-helmet";
import axios from 'axios';
import { useEffect, useState } from "react";

export default function Dashboard() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [summaryData, setSummaryData] = useState({
        weeklyRevenue: 'loading...',
        totalOrders: 'loading...',
        totalProducts: 'loading...',
        totalAccounts: 'loading...'
    });
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/dashboard/summary`).then((res) => setSummaryData(res.data.data));
    }, [])
    const [weeklyData, setWeeklyData] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/revenue/by-period?by=12-months`).then(res => {setWeeklyData(res.data.data)})
    }, []);
    const [categoryRevenue, setCategoryRevenue] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/revenue/by-categories`).then(res => {setCategoryRevenue(res.data.data)})
    }, []);
    const [topProducts, setTopProducts] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/revenue/top-products`).then(res => {setTopProducts(res.data.data)})
    }, []);
    console.log(topProducts)
    

    return (
        <Container maxWidth='xl'>
            <Helmet>
                <title>Dashboard - Canteen Dashboard</title>
            </Helmet>
            <Typography variant="h2" fontWeight='bold'>Dashboard</Typography>
            <Typography variant="subtitle2" mb={4}>
                Welcome {'Minh Tran'}!
            </Typography>

            <Grid mb={4} container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <ImgBgSummaryBox
                        label={'Weekly Revenue'}
                        value={`${summaryData.weeklyRevenue} VND`}
                        imgUrl={"url('/imgs/money-bg-box.svg')"}
                        bgcolor={alpha(theme.palette.warning.main, 0.7)}
                        linkColor={theme.palette.warning.lighter}
                        handleClick={() => navigate('/revenue')}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <ImgBgSummaryBox
                        label={'Orders'}
                        value={`${summaryData.totalOrders}`}
                        imgUrl={"url('/imgs/order-bg-box.svg')"}
                        bgcolor={alpha(theme.palette.blue.main, 0.7)}
                        linkColor={theme.palette.blue.lighter}
                        handleClick={() => navigate('/orders')}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                <ImgBgSummaryBox
                        label={'Products'}
                        value={`${summaryData.totalProducts}`}
                        imgUrl={"url('/imgs/product-bg-box.svg')"}
                        bgcolor={alpha(theme.palette.success.main, 0.7)}
                        linkColor={theme.palette.success.lighter}
                        handleClick={() => navigate('/products')}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <ImgBgSummaryBox
                            label={'Account'}
                            value={`${summaryData.totalAccounts}`}
                            imgUrl={"url('/imgs/account-bg-box.svg')"}
                            bgcolor={alpha(theme.palette.error.main, 0.7)}
                            linkColor={theme.palette.error.lighter}
                            handleClick={() => navigate('/accounts')}
                        />
                </Grid>
            </Grid>

            
            <Grid container spacing={4} mb={4} justifyContent='center' alignItems='center'>
                <Grid 
                    item
                    xs={12}
                    md={7}
                    >
                    <PrimaryStackContainer>
                        <Stack>
                            <Typography ml={2.5} mb={4} variant="h5" fontWeight='bold'>Revenue month by month</Typography>
                            <CustomBarChart data={weeklyData}/>
                        </Stack>
                    </PrimaryStackContainer>
                </Grid>
                <Grid 
                    item
                    xs={12}
                    md={5}
                    >
                    <PrimaryStackContainer>
                        <Stack>
                            <Typography ml={1} mb={4} variant="h5" fontWeight='bold'>Revenues by category</Typography>
                            <CustomPieChart data={categoryRevenue}/>
                        </Stack>
                    </PrimaryStackContainer>
                </Grid>
            </Grid>

            <Box display='flex' justifyContent='center'>
                <Stack>
                    <Typography variant="h5" fontWeight='bold' mb={3}>Top revenue by products</Typography>
                    <RevenueProductTable rows={topProducts} />
                </Stack>
            </Box>
        </Container>
    )
}