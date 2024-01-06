import React, {useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment'
import { Box, IconButton, Toolbar, Tooltip, Typography, alpha, useTheme } from '@mui/material';

const columns = [
    { 
        field: 'id',
        headerName: 'ID',
        flex: 0.5 
    },
    { 
        field: 'products',
        headerName: 'Products', 
        flex: 1.5, 
        sortable: false,
    },
    { 
        field: 'expiredDate', 
        headerName: 'Expired Date', 
        flex: 1,
        valueGetter: (params) => {
            return moment(params.row.createdAt).format('DD/MM/YYYY');
        } 
    },
    { 
        field: 'amount',
        headerName: 'Amounts', 
        flex: 2, 
        sortable: false,
    },  
];

const rows = [
    {
        id: 1,
        products: 'Milk',
        expiredDate: '2022-10-15T12:30:00.000Z',
        amount: 40,
      },
      {
        id: 2,
        products: 'Milk',
        expiredDate: '2022-10-15T12:30:00.000Z',
        amount: 40,
      },
      {
        id: 3,
        products: 'Milk',
        expiredDate: '2022-10-15T12:30:00.000Z',
        amount: 40,
      },
      {
        id: 4,
        products: 'Milk',
        expiredDate: '2022-10-15T12:30:00.000Z',
        amount: 40,
      },
      {
        id: 5,
        products: 'Milk',
        expiredDate: '2022-10-15T12:30:00.000Z',
        amount: 40,
      },
      {
        id: 6,
        products: 'Milk',
        expiredDate: '2022-10-15T12:30:00.000Z',
        amount: 40,
      },
];



export default function DueDateTable({data}) {
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Box
        minWidth={600}
        sx={{
            "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.secondary[100],
                borderBottom: "none",
              },
        }}
    >
      <DataGrid
        disableRowSelectionOnClick
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        sx={{
            '& .MuiDataGrid-columnHeadersInner': {
                bgcolor: '#0000'
            }
        }}
      />
    </Box>
  );
}
