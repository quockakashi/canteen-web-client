import { alpha, useTheme } from '@mui/material';
import Chart from 'react-apexcharts';

export default function CustomPieChart({data}) {
  const theme = useTheme()
  return (
    <Chart
      type='donut'
      width={350}
      height={350}
      series={[45, 67, 89, 34, 43, 98]}

      options={{
        chart: {
          sparkline: {
            enabled: true,
          },
        },
        labels: ['USA', 'China', 'Russia', 'India', 'UK', 'Vietnam'],
        legend: {
          position: 'bottom',
          fontFamily: 'Inter, sanserif'
        },
        plotOptions: {
          pie: {
            expandOnClick: true,
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
          width: 5
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