import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'

import { revenueByMonthsData } from '../data'
import { useTheme } from '@mui/material'
import { Box, Stack, Typography, alpha, useMediaQuery } from '@mui/material';

export const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box 
            width={90} 
            height={75} 
            bgcolor={alpha('#ffffff', 0.9)}
            textAlign='center'
            borderRadius='6px' 
            display='flex'
            flexDirection='column'  
        >
            <Stack 
            bgcolor={alpha('#666', 0.4)}
            width={1}
             height={36} textAlign='center' justifyContent='center' alignItems='center'
             borderRadius='6px 6px 0 0'
            >
                <Typography fontWeight='bold'>
                    {label}
                </Typography>
            </Stack>

            <Stack 
            width={1}
            flex={1}
            justifyContent='center' alignItems='center'>
                <Typography>${payload[0].value}</Typography>
            </Stack>
        </Box>
      )
    }
  
    return null;
  };

export default function 
CustomBarChart() {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

    return (
    <BarChart width={isLargeScreen ?  700 : isMediumScreen ? 550 : 500} height={250} data={revenueByMonthsData} barGap={5} barSize={18}>
        <CartesianGrid vertical={false} stroke={theme.palette.grey[400]} />
        <XAxis 
            dataKey="name"
            axisLine={false}
            tickLine={false}
            style={{ fontSize: "10px" }} />
        <YAxis 
            axisLine={false}
            tickLine={false}
            style={{ fontSize: "10px" }}/>
        <Tooltip content={<CustomTooltip />} filterNull cursor={{fill: 'transparent'}} />
        <Bar dataKey="dollars" fill={theme.palette.primary.dark} radius={[5, 5, 0, 0]} />
    </BarChart>)
} 