import Chart from 'react-apexcharts';

export default function LineChart() {
    return (
        <Chart width='100%'
        series= {[
            {
              name: "Milk",
              data: [28, 29, 33, 36, 32, 32, 33]
            },
            {
              name: "Low - 2013",
              data: [9, 12, 14, 18, 17, 13, 13]
            },
            {
                name: "High - 2013",
                data: [12, 22, 32, 30, 26, 31, 30]
            },
            {
                name: "High - 2013",
                data: [15, 20, 25, 24, 28, 29, 33]
            }
          ]}
        options={{
            chart: {
              height: 280,
              type: 'line',
              dropShadow: {
                enabled: false,
              },
              toolbar: {
                show: false
              },
              zoom: {
                enabled: false
              },
    
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'right',
                fontSize: '12px',
                fontFamily: 'Inter, sanserif'
            },
            stroke: {
                width: '3',
                curve: 'smooth',
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                labels: {
                    style: {
                        fontSize: '14px',
                        fontFamily: 'Inter, sanserif'
                    }
                }
            },
            yaxis: {
                min: 5,
                max: 40,
                style: {
                    fontSize: '14px',
                    fontFamily: 'Inter,sans-serif'
                }
            },
            dataLabels: {
                style: {
                    fontSize: '14px',
                    fontFamily: 'Inter,sans-serif'
                }
            },
            tooltip: {
                style: {
                    fontSize: '14px',
                    fontFamily: 'Inter,sans-serif'
                }
            }
        }}

        >
        </Chart>
    )
}