import React, {useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Fade, List, ListItem, ListItemButton, Popper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import CreateNewOrderToolbar from './create-order-toolbar';
import CreateOrderFooter from './create-order-footer';
import QuantityInput from '../../components/quantity-input';
import axios from 'axios';


const increaseQtyHandler = (e) => {
    e.stopPropagation();
}

const decreaseQtyHandler = (e) => {
    e.stopPropagation();
}


const columns = [
    { 
        field: '_id',
        headerName: 'Product ID',
        flex: 1.5 
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
            return <Stack><QuantityInput defaultValue={1} nonNegative={true} handleChangeValue={(quantity) =>{
              params.row.quantity = quantity
            }} /></Stack>
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


export default function CreateOrderForm({handleContinue}) {
    const theme = useTheme();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

    const [openPopper, setOpenPopper] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchProducts, setSearchProducts] = useState([]);
    const [rows, setRows] = useState([]);

    const handleChangeSearchInput = async (event) => {
      const value = event.currentTarget.value;
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/products?search=${value}`);
      const products = response.data.data;
      setSearchProducts(products);
    }

    const handleFocusInput = (event) => {
      setAnchorEl(event.currentTarget);
      setOpenPopper(true);
    }

    const handleBlurInput = (event) => {
      setOpenPopper(false);
    }

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
        <CreateNewOrderToolbar numSelected={selected.length} handleChange={handleChangeSearchInput} handleFocus={handleFocusInput} handleBlur={handleBlurInput} />
      <DataGrid
        rows={rows}
        columns={columns}

        checkboxSelection
        sx={{
            '& .MuiDataGrid-columnHeadersInner': {
                bgcolor: '#0000'
            }
        }}
        getRowId={row => row._id}
        rowSelectionModel={selected}
        onRowSelectionModelChange={(newSelected) => setSelected(newSelected)}
        components={{
            Footer: () => <CreateOrderFooter total={rows.reduce((sum, current) => current.price * current.quantity + sum, 0)} handleContinue={async() => {
              const productReduce = rows.map((product) => ({
                product: product._id,
                quantity: product.quantity,
              }))

              const json = JSON.stringify({
                products: productReduce
              })
              const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/orders`, json, {
                headers: {
                  'Content-Type': 'application/json',
                }
              })

              const orderId = res.data.data._id;
              const order = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/orders/${orderId}`)
              handleContinue(order.data.data);
            }}/>
        }}

        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        disableRowSelectionOnClick
      />
      <Popper open={openPopper} anchorEl={anchorEl} placement='bottom-start' transition sx={{mt: 3}}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box sx={{bgcolor: 'background.paper' }}>
            <List>
                {searchProducts.map((product, index) => (
                  <ListItemButton id={index} disabled={!product.stock} onClick={() => setRows(prev => {
                    if(rows.find(item => item._id == product._id)) {
                      return [...prev]
                    } else {
                      return [...prev, {...product, quantity: 1}]
                    }
                  })}>
                      <Box component={'img'} src={product.image}width={30} height={30}></Box>
                      <Typography ml={3}>
                        {product.name}
                      </Typography>
                      <Typography variant='subtitle2' ml={3} color={product.stock > 0 ? theme.palette.success.main : theme.palette.danger.main}>
                         {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </Typography>
                  </ListItemButton>
                ))}
              </List>
            </Box>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}
