
import { alpha, useTheme } from '@mui/material';
import Chart from 'react-apexcharts';

export default function RevenueCategoriesPieChart() {
  const theme = useTheme()
  return (
    <Chart
      type='donut'
      width={300}
      height={300}
      series={[45, 67, 89, 34, 43, 98]}

      options={{
        chart: {
          sparkline: {
            enabled: true,
          },
        },
        labels: ['USA', 'China', 'Russia', 'India', 'UK', 'Vietnam'],
        legend: {
          position: 'bottom'
        },
        plotOptions: {
          pie: {
            expandOnClick: false,
            donut: {
              background: 'transparent',
            },
          }
        },
        chart: {
          background: null,
        },
        stroke:{
          colors: [theme.palette.primary.light],
          width: 3
         },
         states: {
          hover: {
            filter: {
              type: 'none',
            }
          },
          active: {
            filter: {
              type: 'none'
            }
          }
         }
      }}

    >

    </Chart>
  )
}