import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { IconButton, Stack, Typography, alpha, useTheme } from '@mui/material';
import { Add, Close, TurnLeft } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import'./components.css'


const boxStyle = (theme) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    backgroundColor: theme.palette.common.white,
    height: 400,
    boxShadow: 24,
    p: 4,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '24px 32px'
});

  

export default function SuccessConfirmModal({open, handleClose, title, content, handleContinue, link}) {
    const theme = useTheme();
  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box style={boxStyle(theme)}>
            <IconButton onClick={handleClose} sx={{position: 'absolute', top: 24, right: 24}}>
                <Close />
            </IconButton>
            <Box component='img' src='/imgs/success-icon.png' width={100} height={100}/>
            <Typography variant="h6" component="h2" fontSize={24} mb={4} mt={2}>
            {title}
            </Typography>
            {content}
            <Stack direction='row' position='absolute' bottom={15} justifyContent='center' width={1} right={0} spacing={4}>
            <Button variant="contained"
            startIcon={<TurnLeft />}
            sx={{
                bgcolor: alpha(theme.palette.error.dark, 0.8),
                textTransform: 'none',
                py: 1,
                px:2,
                '&:hover': {
                    bgcolor: alpha(theme.palette.error.dark, 0.8),
                },
                '&:active': {
                    bgcolor: alpha(theme.palette.error.dark, 0.8),
                }
                }}
                onClick={handleClose}
                >Return
                </Button>
            <Button 
            variant="contained"
            onClick={handleContinue}
            startIcon={<Add />}
            sx={{
                textTransform: 'none',
                bgcolor: alpha(theme.palette.success.dark, 0.8),
                py: 1,
                px:2,
                '&:hover': {
                    bgcolor: alpha(theme.palette.success.dark, 0.8),
                },
                '&:active': {
                    bgcolor: alpha(theme.palette.success.dark, 0.8),
                }
                }}>Continue Create</Button>
            </Stack>
        </Box>
    </Modal>
  )
};