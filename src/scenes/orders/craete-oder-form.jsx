import React, {useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment'
import { Box, ButtonGroup, IconButton, Stack, Toolbar, Tooltip, Typography, alpha, useMediaQuery, useTheme } from '@mui/material';
import EnhancedTableToolbar from "./order-toolbar-table";
import CreateNewOrderToolbar from './create-order-toolbar';
import { Add, Remove } from '@mui/icons-material';
import CreateOrderFooter from './create-order-footer';
import QuantityInput from '../../components/quantity-input';


const increaseQtyHandler = (e) => {
    e.stopPropagation();
}

const decreaseQtyHandler = (e) => {
    e.stopPropagation();
}


const columns = [
    { 
        field: 'id',
        headerName: 'Product ID',
        flex: 0.5 
    },
    { 
        field: 'name',
        headerName: 'Product Name', 
        flex: 1.5, 
        sortable: false,
    },
    {
        field: 'price',
        headerName: 'Price',
        flex: 1,
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        renderCell: (params) => {
            return <Stack><QuantityInput defaultValue={1} nonNegative={true} /></Stack>
        },
        flex: 1.5,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
    },
    {
        field: 'subTotal',
        headerName: 'Sub Total',
        valueGetter: (params) => {
            return params.row.quantity * params.row.price;
        },
        flex: 1
    }
];


const rows = [
    {
        id: 1,
        name: 'Watermelon',
        price: 200,
        total: 50,
        status: 'Processing',
        quantity: 1,
      },
      {
        id: 2,
        name: 'Watermelon',
        price: 200,
        total: 75,
        status: 'Finished',
        quantity: 1,
      },
      {
        id: 3,
        name: 'Watermelon',
        price: 200,
        total: 30,
        status: 'Finished',
        quantity: 1,
      },
      {
        id: 4,
        name: 'Watermelon',
        price: 200,
        total: 45,
        status: 'Canceled',
        quantity: 1,
      },
      {
        id: 5,
        name: 'Watermelon',
        price: 200,
        total: 60,
        status: 'Processing',
        quantity: 1,
      },
      {
        id: 6,
        name: 'Watermelon',
        price: 200,
        total: 80,
        status: 'Processing',
        quantity: 1,
      },
];


export default function CreateOrderForm({handleContinue}) {
    const theme = useTheme();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


  return (
    <Box
        mx='auto'
        maxWidth={isMediumScreen ? '900px' : 1}
        minWidth={600}
        sx={{
            "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.secondary[100],
                borderBottom: "none",
              },
        }}
    >
        <CreateNewOrderToolbar numSelected={selected.length} />
      <DataGrid
        rows={rows}
        columns={columns}

        checkboxSelection
        sx={{
            '& .MuiDataGrid-columnHeadersInner': {
                bgcolor: '#0000'
            }
        }}
        rowSelectionModel={selected}
        onRowSelectionModelChange={(newSelected) => setSelected(newSelected)}
        components={{
            Footer: () => <CreateOrderFooter total={1000} handleContinue={handleContinue}/>
        }}

        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        disableRowSelectionOnClick
      />
    </Box>
  );
}
