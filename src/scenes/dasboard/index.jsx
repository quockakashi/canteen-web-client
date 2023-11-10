import { Box, Container, Grid, Stack, Typography, alpha, useTheme } from "@mui/material";
import SummaryCard from "../../components/summay-card";
import { Dining, LocalDining, MonetizationOn as MonetizationOnIcon, People, Sell as SellIcon } from "@mui/icons-material";
import RevenueBarChar from "./revenue-bar-chart";
import RevenueCategoriesPieChart from "./revenue-by-categories-chart";
import RevenueProductTable from "./top-revenue-products";

export default function Dashboard() {
    const theme = useTheme();
    return (
        <Container maxWidth='xl'>
            <Typography variant="h2" fontWeight='bold'>Dashboard</Typography>
            <Typography variant="subtitle2" mb={4}>
                Welcome {'Minh Tran'}!
            </Typography>

            <Grid mb={4} container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryCard bgColor={alpha(theme.palette.warning.main, 0.4)} title={'Weekly Revenue'} value={'$1200'} increase={12} compareTo={'week'} icon={<MonetizationOnIcon sx={{fontSize: 54}}/>}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryCard bgColor={alpha(theme.palette.blue.main, 0.4)}  title={'Orders'} value={'24k'} increase={-4.2} compareTo={'month'} icon={<SellIcon sx={{fontSize: 54}}/>}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryCard bgColor={alpha(theme.palette.success.main, 0.4)} title={'Products'} value={'54'} icon={<LocalDining sx={{fontSize: 54}}/>}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryCard bgColor={alpha(theme.palette.error.main, 0.4)} title={'Account'} value={'32'} icon={<People sx={{fontSize: 54}}/>}/>
                </Grid>
            </Grid>

            
            <Grid container spacing={2} mb={4}>
                <Grid 
                    item
                    xs={12}
                    md={7}
                    display='flex'
                    justifyContent='center'
                    >
                    <Box width='auto' bgcolor={theme.palette.primary.light}
                    pr={4}
                    py={4}
                    borderRadius='12px'
                    >
                        <Typography pl={3.5}
                        mb={3} variant="h5"
                        fontWeight='bold'>Revenue month by month</Typography>

                        <RevenueBarChar/>
                    </Box>
                </Grid>
                <Grid 
                    item
                    xs={12}
                    md={5}
                    maxWidth={400}
                    display='flex'
                    justifyContent='center'
                    >
                    <Box width='auto' bgcolor={theme.palette.primary.light}
                    px={4}
                    py={4}
                    borderRadius='12px'
                    >
                        <Typography pl={3.5}
                        mb={3} variant="h5"
                        fontWeight='bold'>Revenue month by month</Typography>

                        <RevenueCategoriesPieChart />
                    </Box>
                </Grid>
            </Grid>

            <Box display='flex' justifyContent='center'>
                <Stack>
                    <Typography variant="h5" fontWeight='bold' mb={3}>Top 10 revenue products</Typography>
                    <RevenueProductTable />
                </Stack>
            </Box>
        </Container>
    )
}