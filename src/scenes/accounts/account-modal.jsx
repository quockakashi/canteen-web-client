import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { ButtonGroup, Card, CardContent, CardHeader, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, alpha, tableCellClasses, useMediaQuery, useTheme } from '@mui/material';
import { Add, Close, TurnLeft } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import AccountsForm from './account-form';


const boxStyle = (theme) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    backgroundColor: theme.palette.common.white,
    boxShadow: 24,
    p: 4,
    borderRadius: 12,
    padding: '24px 32px'
});

  

export default function AccountModal({open, handleClose, id, mode}) {
    const theme = useTheme();
  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Card style={boxStyle(theme)} component={Stack} maxHeight={'70%'} sx={{overflowY:'auto'}}>
            <IconButton 
                onClick={handleClose}
                sx={{position: 'absolute', top: 20, right: 20}}>
                <Close />
            </IconButton>
            <CardContent sx={{width: 'auto', pb: 0} } mt={3} >
                <AccountsForm mode={mode}/>
            </CardContent>
        </Card>
    </Modal>
  )
};