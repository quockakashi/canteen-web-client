import React, {useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment'
import { Box, IconButton, Toolbar, Tooltip,Stack, Typography, alpha, useTheme } from '@mui/material';
import AccountModal from './account-modal';

const columns = [
    { 
        field: 'id',
        headerName: 'ID',
        flex: 0.5 
    },
    { 
        field: 'name',
        headerName: 'Name', 
        flex: 1.5, 
        sortable: false,
    },
    { 
        field: 'phonenumber', 
        headerName: 'Phone Number', 
        flex: 2.0,
        sortable: false,
    },
    { 
      field: 'address', 
      headerName: 'Address', 
      sortable: false,      
    }, 
    { 
      field: 'email', 
      headerName: 'Email', 
      sortable: false,      
    }, 
];

const rows = [
    {
        id: 1,
        name: 'Albert',
        phonenumber: '0124 578 962',
      },
      {
        id: 2,
        name: 'Albert',
        phonenumber: '0124 578 962',
      },
      {
        id: 3,
        name: 'Albert',
        phonenumber: '0124 578 962',
      },
      {
        id: 4,
        name: 'Albert',
        phonenumber: '0124 578 962',
      },
      {
        id: 5,
        name: 'Albert',
        phonenumber: '0124 578 962',
      },
];



export default function AccountsTable({type}) {
    const theme = useTheme();
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);    
    const [ openDetailAccount, setOpenDetailAccount] = useState(false);
    const [ detailAccountId, setDetailAccountId] = useState('');
    let accounts_type= (type==false) ?'Employee':'Administrator';
  const handleRowClick = (params) => {
    setDetailAccountId(params.row.id);
    setOpenDetailAccount(true);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


  return (
    <Stack direction='column'  justifyContent={'space-between'} alignItems={'left'} mb={4}>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'left'}>
            <Typography variant="subtitle2">
               {accounts_type}
            </Typography>
        </Box>
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
            columnVisibilityModel={
              {address: false,
               email: false,
              }
            }
            onRowClick={handleRowClick}
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
        rowSelectionModel={selected}
        onRowSelectionModelChange={(newSelected) => setSelected(newSelected)}
        />
        </Box>
        <AccountModal open={openDetailAccount} id={detailAccountId} mode={'View'} handleClose={() => setOpenDetailAccount(false)}></AccountModal>
    </Stack>
  );
}
