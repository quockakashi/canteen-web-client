import React, {useMemo, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Stack, useTheme, useMediaQuery, ButtonGroup } from '@mui/material';
import { ActionButton } from '../../components/action-button';
import { AdminPanelSettings, PeopleAltOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ActionsBox = ({id, onDelete}) => {
  const navigate = useNavigate();
  return (
    <ButtonGroup component={Box}  gap={1}>
      <ActionButton small={true} bgcolor="#FFD666"  label="Edit" handleClick={() => navigate(`./edit/${id}`)}/>
      <ActionButton small
      handleClick={() => {
        if(window.confirm(`Are you sure to delete account ${id}?`)) {
          axios.delete(`${process.env.REACT_APP_BASE_URL}/api/users/${id}`).then(() => onDelete());
        }
      }}
       bgcolor="#FF5630" label="Remove"/>
    </ButtonGroup>)
}


export default function AccountsTable({data, onDelete}) {
    let users = data;
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);    
    const [ openDetailAccount, setOpenDetailAccount] = useState(false);
    const [ detailAccountId, setDetailAccountId] = useState('');

    const columns = useMemo(() => (
      [
        { 
            field: '_id',
            headerName: 'ID',
            flex: 1.5 
        },
        { 
            field: 'name',
            headerName: 'Name', 
            flex: 1, 
            sortable: false,
        },
        { 
            field: 'email', 
            headerName: 'Email', 
            flex: 1,
            sortable: false,
        },
        { 
          field: 'address', 
          headerName: 'Address', 
          sortable: false,     
          flex: 1 
        },
        {
          field: 'role',
          headerName: 'Role',
          sortable: false,
          flex: 1,
          renderCell: (params) => {
            return (
              (params.row.role === 'admin') 
              ? (
                <Box width={75} display="flex" justifyContent="center" alignItems="center" padding={1} bgcolor="#b79cff" borderRadius={1}>
                  <AdminPanelSettings />
                  &nbsp;Admin
                </Box>
              ) 
              : (
                <Box width={75} display="flex" justifyContent="center" alignItems="center" padding={1} bgcolor="#b79cff" borderRadius={1}>
                  <PeopleAltOutlined />
                  &nbsp;User
                </Box>
              )
            )
          }
        },
        {
          headerName: 'Action',
          flex: 1,
          renderCell: (params) => <ActionsBox id={params.row._id} onDelete={() => onDelete(users.filter((user) => user._id !== params.row._id))} />
        }
    ]
    ), [users])


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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;


  return (
    <Stack direction='column'  justifyContent={'space-between'} alignItems={'left'} mb={4}>
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
            onRowClick={handleRowClick}
            columnVisibilityModel={{
              email: !isSmallScreen,
              address: !isSmallScreen,
            }}
            disableRowSelectionOnClick
            rows={users}
            getRowId={(row) => row._id}
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
    </Stack>
  );
}
