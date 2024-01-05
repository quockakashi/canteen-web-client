import React, {useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment'
import { Box,IconButton,alpha, useTheme } from '@mui/material';
import EnhancedTableToolbar from "./order-toolbar-table";
import OrderModal from './order-modal';
import axios from 'axios'
import {CancelOutlined, CheckCircleOutline} from '@mui/icons-material'

const switchStatusBgColor = (status, theme) => {
    switch(status.toLowerCase()) {
        case 'completed': 
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
        field: '_id',
        headerName: 'ID',
        flex: 0.5 
    },
    { 
        field: 'products',
        headerName: 'Products', 
        valueGetter: (params) => {
          return params.row.products.map(elem => elem.product.name).join(', ')
        },
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
    },
    {
      headerName: 'Set Status',
      sortable: false,
      renderCell: (params) => {
        const status = params.row.status;
        if(status == 'processing') {
          return <Box>
            <IconButton sx={{mr: 1}} color='success.main' onClick={async(e) => {
              e.stopPropagation();
              await axios.get(`${process.env.REACT_APP_BASE_URL}/api/orders/edit-status?id=${params.row._id}&status=completed`);
              params.row.status = 'completed';
            }}><CheckCircleOutline /></IconButton>
            <IconButton onClick={async(e) => {
              e.stopPropagation();
              await axios.get(`${process.env.REACT_APP_BASE_URL}/api/orders/edit-status?id=${params.row._id}&status=canceled`);
              params.row.status = 'canceled';
            }}><CancelOutlined /></IconButton>
          </Box>
        } else if (status == 'completed') {
            return <Box>
              <IconButton onClick={async(e) => {
                e.stopPropagation();
              await axios.get(`${process.env.REACT_APP_BASE_URL}/api/orders/edit-status?id=${params.row._id}&status=canceled`);
              params.row.status = 'canceled';
            }}><CancelOutlined /></IconButton>
            </Box>
        }
      }
    }
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
    const [ detailOrder, setDetailOrder] = useState(null);
    const [ sortModel, setSortModel ] = useState([{
      field: 'createdAt',
      sort: 'desc'
    }])
    const [ rows, setRows ] = useState([]);
    useEffect(() => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/orders`).then((res) => setRows(res.data.data))
    }, [])

    const loadOrders = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/orders`).then((res) => setRows(res.data.data))
    };

    const columns = [
      { 
          field: '_id',
          headerName: 'ID',
          flex: 0.5 
      },
      { 
          field: 'products',
          headerName: 'Products', 
          valueGetter: (params) => {
            return params.row.products.map(elem => elem.product.name).join(', ')
          },
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
      },
      {
        headerName: 'Set Status',
        sortable: false,
        renderCell: (params) => {
          const status = params.row.status;
          if(status == 'processing') {
            return <Box>
              <IconButton sx={{mr: 1}} color='success.main' onClick={async(e) => {
                e.stopPropagation();
                await axios.get(`${process.env.REACT_APP_BASE_URL}/api/orders/edit-status?id=${params.row._id}&status=completed`);
                loadOrders();
              }}><CheckCircleOutline /></IconButton>
              <IconButton onClick={async(e) => {
                e.stopPropagation();
                await axios.get(`${process.env.REACT_APP_BASE_URL}/api/orders/edit-status?id=${params.row._id}&status=canceled`);
                loadOrders();
              }}><CancelOutlined /></IconButton>
            </Box>
          } else if (status == 'completed') {
              return <Box>
                <IconButton onClick={async(e) => {
                  e.stopPropagation();
                await axios.get(`${process.env.REACT_APP_BASE_URL}/api/orders/edit-status?id=${params.row._id}&status=canceled`);
                loadOrders();
              }}><CancelOutlined /></IconButton>
              </Box>
          }
        }
      }
  ];

  const handleRowClick = (params) => {
    setDetailOrder(params.row);
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
        <EnhancedTableToolbar theme={theme} numSelected={selected.length} handleFilter={(status) => {
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/orders?status=${status}`).then((res) => setRows(res.data.data))
        } } />
      <DataGrid
        getRowId={row  => row._id}
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
      {detailOrder && <OrderModal open={openDetailOrder} order={detailOrder} handleClose={() => setOpenDetailOrder(false)}></OrderModal>}
    </Box>
  );
}
