import * as React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { ButtonGroup, Card, CardContent, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,tableCellClasses, useTheme } from '@mui/material';
import { Close } from '@mui/icons-material';
import { StatusBox } from './order-table';
import styled from '@emotion/styled';
import OrdersPage from './pages';
import { current } from '@reduxjs/toolkit';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePdf from './invoice-pdf';


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

  export const OrderDetailTable = ({products}) => {
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
            {products.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row" >
                  {row.product.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                <StyledTableCell align="center">{row.product.price}</StyledTableCell>
                <StyledTableCell align="center">{row.product.price * row.quantity}</StyledTableCell>
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

  

export default function OrderModal({open, handleClose, order}) {
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
                display='inline-block' variant='subtitle2'>#{order._id}</Typography></Typography>
            </CardContent>
            <CardContent component={Stack} spacing={1}>
                <Typography>Created At: {new Date(order.createdAt).toLocaleDateString('en-UK', {dateStyle: 'medium'})}</Typography>
                <Stack direction='row' alignItems='center' spacing={0.5}>
                    <Typography>Status: </Typography>
                    <StatusBox status={order.status}></StatusBox>
                </Stack>
                <ButtonGroup sx={{mb: 2}}>
                    <Button sx={{textTransform: 'none'}}><PDFDownloadLink document={<InvoicePdf order={order} />} >Export invoice</PDFDownloadLink></Button>
                </ButtonGroup>
                <Stack spacing={1}>
                    <OrderDetailTable products={order.products} />
                    <Typography 
                    fontWeight='bold'
                    alignSelf='flex-end'>Total: {order.products.reduce((accumulate, current) => {return accumulate += current.product.price * current.quantity}, 0)} VND</Typography>
                </Stack>
            </CardContent>
        </Card>
    </Modal>
  )
};