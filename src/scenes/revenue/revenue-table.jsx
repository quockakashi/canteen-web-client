import React, {useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment'
import { Box, Stack, Typography, useTheme } from '@mui/material';
import FilledSelect from '../../components/filled-select-form';


const columns = [
    { 
        field: 'Time', 
        headerName: 'Time', 
        flex: 1,
        valueGetter: (params) => {
            return moment(params.row.time).format('DD/MM/YYYY');
        },
        align: 'center',
        headerAlign: 'center'
    },
    {
        field: 'amount',
        headerName: 'Amount',
        flex: 1,
        valueGetter: (params) => {
            return params.row.amount + ' VND'
        },
        align: 'center',
        headerAlign: 'center'
    },
];

const rows = [
    {
        id: 1,
        'time': '2022-10-16T14:45:00.000Z',
        'amount': 10000,
      },
      {
        id: 2,
        time: '2022-10-16T14:45:00.000Z',
        'amount': 10000,
      },
      {
        id: 3,
        time: '2022-10-17T09:20:00.000Z',
        'amount': 10000,
      },
      {
        id: 4,
        time: '2022-10-18T08:15:00.000Z',
        'amount': 10000,
      },
      {
        id: 5,
        time: '2022-10-19T17:00:00.000Z',
        'amount': 10000,
      },
      {
        id: 6,
        time: '2022-10-20T13:10:00.000Z',
        'amount': 10000,
      },
      {
        id: 7,
        time: '2022-10-21T11:45:00.000Z',
        'amount': 10000,
      },
      {
        id: 8,
        time: '2022-10-22T20:30:00.000Z',
        'amount': 10000,
      },
      {
        id: 9,
        time: '2022-10-23T09:05:00.000Z',
        'amount': 10000,
      },
      {
        id: 10,
        time: '2022-10-24T16:40:00.000Z',
        'amount': 10000,
      },
];



export default function RevenueTable() {
    const theme = useTheme();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

const listItem = [
    {value: 'by-day', text: 'By Day'},
    {value: 'by-month', text: 'By Month'},
]

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


  return (
    <Box
        component="div"
        id='revenue-table'
        sx={{
            "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.secondary[100],
                borderBottom: "none",
              },
        }}
    >
    <Stack direction='row' alignItems='center' mb={2}>
        <Typography fontWeight='bold' variant='h5'>Revenue Details</Typography>
        <FilledSelect 
                ml={4} 
                listItem={listItem} 
                width={200}
                defaultValue={'by-day'}  />
    </Stack>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={false}
        sx={{
            '& .MuiDataGrid-columnHeadersInner': {
                bgcolor: '#0000'
            }
        }}
        disableRowSelectionOnClick
        disableColumnMenu
      />
    </Box>
  );
}
