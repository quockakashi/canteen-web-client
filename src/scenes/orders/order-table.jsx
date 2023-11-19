import React, {useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment'
import { Box, IconButton, Toolbar, Tooltip, Typography, alpha, useTheme } from '@mui/material';
import EnhancedTableToolbar from "./order-toolbar-table";
import OrderModal from './order-modal';

const switchStatusBgColor = (status, theme) => {
    switch(status.toLowerCase()) {
        case 'finished': 
            return alpha(theme.palette.success.main, 0.8);
            break;
        case 'processing':
            return alpha(theme.palette.warning.main, 0.8);
            break;
        case 'canceled':
            return alpha(theme.palette.error.main, 0.8);
    }
}

export const StatusBox = ({status}) => {
    const theme = useTheme();
    return (
    <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        bgcolor={switchStatusBgColor(status, theme)}
        width={75}
        py={0.6}
        borderRadius='8px'
        fontSize={12}
        color={theme.palette.common.white}
    >
        {status}
    </Box>
    )
};

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
        field: 'createdAt', 
        headerName: 'Created At', 
        flex: 1,
        valueGetter: (params) => {
            return moment(params.row.createdAt).format('DD/MM/YYYY');
        } 
    },
    {
        field: 'total',
        headerName: 'Total',
        flex: 1,
    },
    {
        field: 'status',
        headerName: 'Status',
        sortable: false,
        renderCell: (params) => <StatusBox status={params.row.status}></StatusBox>,
        flex: 1
    }
];

const rows = [
    {
        id: 1,
        products: ['Product 1', 'Product 2'],
        createdAt: '2022-10-15T12:30:00.000Z',
        total: 50,
        status: 'Processing',
      },
      {
        id: 2,
        products: ['Product 3', 'Product 4', 'Product 5'],
        createdAt: '2022-10-16T14:45:00.000Z',
        total: 75,
        status: 'Finished',
      },
      {
        id: 3,
        products: ['Product 6'],
        createdAt: '2022-10-17T09:20:00.000Z',
        total: 30,
        status: 'Finished',
      },
      {
        id: 4,
        products: ['Product 7', 'Product 8'],
        createdAt: '2022-10-18T08:15:00.000Z',
        total: 45,
        status: 'Canceled',
      },
      {
        id: 5,
        products: ['Product 9', 'Product 10'],
        createdAt: '2022-10-19T17:00:00.000Z',
        total: 60,
        status: 'Processing',
      },
      {
        id: 6,
        products: ['Product 11', 'Product 12', 'Product 13'],
        createdAt: '2022-10-20T13:10:00.000Z',
        total: 80,
        status: 'Processing',
      },
      {
        id: 7,
        products: ['Product 14'],
        createdAt: '2022-10-21T11:45:00.000Z',
        total: 25,
        status: 'Canceled',
      },
      {
        id: 8,
        products: ['Product 15', 'Product 16'],
        createdAt: '2022-10-22T20:30:00.000Z',
        total: 55,
        status: 'Finished',
      },
      {
        id: 9,
        products: ['Product 17', 'Product 18', 'Product 19'],
        createdAt: '2022-10-23T09:05:00.000Z',
        total: 70,
        status: 'Finished',
      },
      {
        id: 10,
        products: ['Product 20'],
        createdAt: '2022-10-24T16:40:00.000Z',
        total: 35,
        status: 'Finished',
      },
];



export default function OrderTable() {
    const theme = useTheme();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [ openDetailOrder, setOpenDetailOrder] = useState(false);
    const [ detailProductId, setDetailProductId] = useState('');
    const [ sortModel, setSortModel ] = useState([{
      field: 'createdAt',
      sort: 'desc'
    }])

  const handleRowClick = (params) => {
    setDetailProductId(params.row.id);
    setOpenDetailOrder(true);
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
        <EnhancedTableToolbar theme={theme} numSelected={selected.length} />
      <DataGrid
        onRowClick={handleRowClick}
        disableRowSelectionOnClick
        rows={rows}
        columns={columns}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{
            '& .MuiDataGrid-columnHeadersInner': {
                bgcolor: '#0000'
            }
        }}
        rowSelectionModel={selected}
        onRowSelectionModelChange={(newSelected) => setSelected(newSelected)}
      />
      <OrderModal open={openDetailOrder} id={detailProductId} handleClose={() => setOpenDetailOrder(false)}></OrderModal>
    </Box>
  );
}
