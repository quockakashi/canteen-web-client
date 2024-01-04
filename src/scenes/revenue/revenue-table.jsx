import React, {useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment'
import { Box, Stack, Typography, useTheme } from '@mui/material';
import FilledSelect from '../../components/filled-select-form';
import axios from 'axios';


const columns = [
    { 
        field: 'date', 
        headerName: 'Time', 
        flex: 1,
        align: 'center',
        headerAlign: 'center'
    },
    {
        field: 'total',
        headerName: 'Amount (VND)',
        flex: 1,
        align: 'center',
        headerAlign: 'center'
    },
];




export default function RevenueTable() {
    const theme = useTheme();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [data, setData] = useState([]);
    useEffect(() => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/revenue/by-days`).then(res => setData(res.data.data));
    }, [])


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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;


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
        rows={data}
        getRowId={(row) => row.date}
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
