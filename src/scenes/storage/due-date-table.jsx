import React, {useMemo, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment'
import { Box, IconButton, Toolbar, Tooltip, Typography, alpha, useTheme } from '@mui/material';





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
  const columns =useMemo(()=> ([
    { 
        field: '_id',
        headerName: 'ID',
        flex: 0.5 
    },
    { 
        field: 'product',
        headerName: 'Product', 
        flex: 1.5, 
        sortable: false,
        renderCell: (params) =>{return <Box>
          <Typography>{params.row.product.name}</Typography>
        </Box>
        }        
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
]),[data]);

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
      
        rows={data}    
        getRowId={(row)=> row._id }    
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
