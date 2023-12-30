import { alpha, useTheme } from '@mui/material';
import Chart from 'react-apexcharts';

export default function CustomPieChart({data}) {
  console.log(data)
  const theme = useTheme()
  return (
    <Chart
      type='donut'
      width={350}
      height={350}
      series={data.map(elem => elem.total)}

      options={{
        chart: {
          sparkline: {
            enabled: true,
          },
        },
        labels: data.map((elem) => elem.category),
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