import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { ButtonGroup, Card, CardContent, CardHeader, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, alpha, tableCellClasses, useMediaQuery, useTheme } from '@mui/material';
import { Add, Close, TurnLeft } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { StatusBox } from './order-table';
import styled from '@emotion/styled';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.primary.light,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  
  export const OrderDetailTable = () => {
      const theme = useTheme();
    return (
      <TableContainer component={Paper}>
        <Table sx={{width: 1}}>
          <TableHead>
            <TableRow>
              <StyledTableCell >Product</StyledTableCell>
              <StyledTableCell align="center">Quantity</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="right">Subtotal</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row" >
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.calories}</StyledTableCell>
                <StyledTableCell align="center">{row.fat}</StyledTableCell>
                <StyledTableCell align="center">{row.carbs}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }


const boxStyle = (theme) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    backgroundColor: theme.palette.common.white,
    boxShadow: 24,
    p: 4,
    borderRadius: 12,
    padding: '24px 32px'
});

  

export default function OrderModal({open, handleClose, id}) {
    const theme = useTheme();
  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Card style={boxStyle(theme)} component={Stack}>
            <IconButton 
                onClick={handleClose} 
                sx={{position: 'absolute', top: 24, right: 24}}>
                <Close />
            </IconButton>
            <CardContent sx={{width: 1, pb: 0}} >
                <Typography variant='h5'>Order <Typography
                color='primary'
                display='inline-block' variant='subtitle2'>#{id}</Typography></Typography>
            </CardContent>
            <CardContent component={Stack} spacing={1}>
                <Typography>Created At: 22/10/2023</Typography>
                <Stack direction='row' alignItems='center' spacing={0.5}>
                    <Typography>Status: </Typography>
                    <StatusBox status={'processing'}></StatusBox>
                </Stack>
                <ButtonGroup sx={{mb: 2}}>
                    <Button sx={{textTransform: 'none'}}>Export invoice</Button>
                </ButtonGroup>
                <Stack spacing={1}>
                    <OrderDetailTable />
                    <Typography 
                    fontWeight='bold'
                    alignSelf='flex-end'>Total: 100000 VND</Typography>
                </Stack>
            </CardContent>
        </Card>
    </Modal>
  )
};