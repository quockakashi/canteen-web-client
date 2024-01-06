import React, {useMemo, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment'
import { Box, Button, ButtonGroup, IconButton, Link, Toolbar, Tooltip, Typography, alpha, useMediaQuery, useTheme } from '@mui/material';
import CategoriesTableToolbar from './categories-table-toolbar';
import { CheckCircleOutlineOutlined, Circle, CircleOutlined, EditOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ActionButton } from '../../components/action-button';
import axios from 'axios';
import { useEffect } from 'react';
export const ActionsBox = ({id}) => {
    const navigate = useNavigate();
    const theme = useTheme();

    const handleEditBtnClick = (e) => {
        e.stopPropagation();
        navigate(`/categories/edit/${id}`);
    }

    return (
        <ButtonGroup>
            <ActionButton bgcolor={theme.palette.warning.main} label="Edit" handleClick={handleEditBtnClick} small="true" />
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




export default function CategoriesTable({data}) {
  let categories=data;
    const theme = useTheme();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
   
    console.log(selected);
    const columns = useMemo(()=>(
      [
        { 
            field: '_id',
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
            field: 'products',
            headerName: 'Total Product',
            renderCell: (params) => (<Box display='flex' width={1} justifyContent='space-between' px={3} gap={1}><Typography>{params.row.products}</Typography> </Box>),
            flex: 1,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            renderCell: (params) => <ActionsBox id={params.row._id}/>,
            flex: 1
        }
      ]),[categories])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categories.length) : 0;


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
        getRowId={(row) => row._id}
        rows={categories}
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
