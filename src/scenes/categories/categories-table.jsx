import React, {useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment'
import { Box, Button, ButtonGroup, IconButton, Link, Toolbar, Tooltip, Typography, alpha, useMediaQuery, useTheme } from '@mui/material';
import CategoriesTableToolbar from './categories-table-toolbar';
import { CheckCircleOutlineOutlined, Circle, CircleOutlined, EditOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
export const ActionButton = ({icon, bgcolor, label, handleClick}) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Button onClick={handleClick} sx={{bgcolor, textTransform: false}} variant='contained'>
            {icon} {(!isSmallScreen ? <Typography ml={1}>{label}</Typography> : undefined)}
        </Button>
    )
}

export const ActionsBox = ({id}) => {
    const navigate = useNavigate();
    const theme = useTheme();

    const handleEditBtnClick = (e) => {
        e.stopPropagation();
        navigate(`/categories/edit?id=${id}`);
    }

    return (
        <ButtonGroup>
            <ActionButton handleClick={handleEditBtnClick} bgcolor={alpha(theme.palette.blue.main, 0.8)} icon={<EditOutlined />} label='Edit' />
        </ButtonGroup>
    )
}

export const EnableButton = ({isEnabled}) => {
    const theme = useTheme();
    return (
        <IconButton onClick={(e) => {e.stopPropagation()}}>
            {isEnabled ? <CheckCircleOutlineOutlined sx={{
                '&.MuiSvgIcon-root': {
                    color: theme.palette.success.main,
                }
            }} /> : <CircleOutlined />}
        </IconButton>
    )
}


const columns = [
    { 
        field: 'id',
        headerName: 'ID',
        flex: 0.5 
    },
    { 
        field: 'name',
        headerName: 'Name', 
        flex: 1, 
        sortable: false,
    },
    { 
        field: 'enabled', 
        headerName: 'Enabled', 
        flex: 0.5,
        sortable: false,
        renderCell: (params) => <EnableButton isEnabled={params.row.enabled} />
    },
    {
        field: 'totalProduct',
        headerName: 'Total Product',
        renderCell: (params) => (<Box display='flex' width={1} justifyContent='space-between' px={3} gap={1}>{params.row.totalProduct} <Link href={`/products?categories=${params.row.id}`} sx={{textDecoration: 'none'}} variant='body2'>View</Link></Box>),
        flex: 1,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        renderCell: (params) => <ActionsBox id={params.row.id}/>,
        flex: 1
    }
];

const rows = [
    {
        id: 1,
        name: 'Milk and milk products',
        createdAt: '2022-10-15T12:30:00.000Z',
        totalProduct: 50,
        status: 'Processing',
        enabled: true,
      },
      {
        id: 2,
        name: 'Milk and milk products',
        createdAt: '2022-10-16T14:45:00.000Z',
        totalProduct: 75,
        status: 'Finished',
        enabled: true,
      },
      {
        id: 3,
        name: 'Milk and milk products',
        createdAt: '2022-10-17T09:20:00.000Z',
        totalProduct: 30,
        status: 'Finished',
        enabled: false,
      },
      {
        id: 4,
        name: 'Milk and milk products',
        createdAt: '2022-10-18T08:15:00.000Z',
        totalProduct: 45,
        status: 'Canceled',
        enabled: true,
      },
      {
        id: 5,
        name: 'Milk and milk products',
        createdAt: '2022-10-19T17:00:00.000Z',
        totalProduct: 60,
        status: 'Processing',
        enabled: false,
      },
      {
        id: 6,
        name: 'Milk and milk products',
        createdAt: '2022-10-20T13:10:00.000Z',
        totalProduct: 80,
        status: 'Processing',
        enabled: true,
      },
      {
        id: 7,
        name: 'Milk and milk products',
        createdAt: '2022-10-21T11:45:00.000Z',
        totalProduct: 25,
        status: 'Canceled',
        enabled: true,
      },
      {
        id: 8,
        name: 'Milk and milk products',
        createdAt: '2022-10-22T20:30:00.000Z',
        totalProduct: 55,
        status: 'Finished',
        enabled: true,
      },
      {
        id: 9,
        name: 'Milk and milk products',
        createdAt: '2022-10-23T09:05:00.000Z',
        totalProduct: 70,
        status: 'Finished',
        enabled: true,
      },
      {
        id: 10,
        name: 'Milk and milk products',
        createdAt: '2022-10-24T16:40:00.000Z',
        totalProduct: 35,
        status: 'Finished',
        enabled: true,
      },
];



export default function CategoriesTable() {
    const theme = useTheme();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    console.log(selected);

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
        <CategoriesTableToolbar numSelected={selected.length} />
      <DataGrid
        rows={rows}
        columns={columns}
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
    </Box>
  );
}
