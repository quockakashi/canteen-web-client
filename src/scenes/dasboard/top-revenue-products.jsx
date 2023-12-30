import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useMediaQuery } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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


export default function RevenueProductTable({rows}) {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'))
    const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: isMediumScreen ? '800px' :   isSmallScreen ? '600px' : '500px' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell align="right">Total Revenue (VND)</StyledTableCell>
            <StyledTableCell align="right">Total selling</StyledTableCell>
            <StyledTableCell align="right">Created At</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.total}</StyledTableCell>
              <StyledTableCell align="right">{row.count}</StyledTableCell>
              <StyledTableCell align="right">{new Date(row.createdAt).toLocaleDateString('en-UK', {dateStyle: 'medium'})}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
