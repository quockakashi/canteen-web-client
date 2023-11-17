import { Box, Button, Container, Grid, Link, Stack, Typography, alpha, colors, useMediaQuery, useTheme } from "@mui/material";
import SummaryCard from "../../../components/summay-card";
import { Add, FileDownload } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ImgBgSummaryBox from "../../../components/summary-box-with-bg";
import SummaryBox from "../../../components/summary-box";
import RevenueBarChart from "../revenue-bar-chart";
import RevenuePieChart from "../revenue-pie-chart";
import RevenueTable from "../revenue-table";
import LineChart from "../../../components/line-chart";
import RevenueLineChart from "../revenue-line-chart";
import { Helmet } from "react-helmet";

const scrollToIndex = () => {
    const element = document.getElementById('revenue-table');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

export default function RevenuePage() {
    const theme = useTheme();
    const isSmallDownScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const navigate = useNavigate();

    return (
        <Container maxWidth='xl'>
            <Helmet>
                <title>Revenue Management - Canteen Dashboard</title>
            </Helmet>
            <Stack direction='row'  justifyContent={'space-between'} alignItems={'center'} mb={4}>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    <Typography variant="h2" fontWeight='bold'>Revenue</Typography>
                    <Typography variant="subtitle2">
                        Revenue Management
                    </Typography>
                </Box>
                <Stack direction='row' alignItems={'center'} spacing={2}>
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
                        label={'Total'}
                        value={'100M VND'}
                        imgUrl={"url('/imgs/revenue.svg')"}
                        bgcolor={theme.palette.primary.light}
                        linkColor={theme.palette.primary.dark}
                        handleClick={scrollToIndex}
                    /> 
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryBox 
                        label={'Today'} 
                        value={'100K VND'} 
                        increaseAmount={10}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryBox 
                        label={'This month'} 
                        value={'10M VND'} 
                        increaseAmount={10}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryBox 
                        label={'This year'} 
                        value={'80M VND'} 
                        increaseAmount={-10}
                    />
                </Grid>
            </Grid>

            <Grid  container spacing={4} justifyContent='center' alignItems='center'>
                <Grid item xs={12} md={7}>
                    <RevenueBarChart />
                </Grid>
                <Grid item xs={12} md={5}>
                    <RevenuePieChart />
                </Grid>
                <Grid item xs={12} md={4.5}>
                    <RevenueTable />
                </Grid>
                <Grid item xs={12} md={6.5}>
                    <RevenueLineChart />
                </Grid>
            </Grid>
        </Container>
    )
}