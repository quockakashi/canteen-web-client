import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { IconButton, Stack, Typography, alpha, useTheme } from '@mui/material';
import { Add, Close, TurnLeft, Done } from '@mui/icons-material';
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

  

export default function ConfirmModal({open, handleClose, title, content, handleConfirm}) {
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
            <Typography variant="h6" component="h2" fontSize={24} mb={4} mt={2}>
            {title}
            </Typography>
            {content}
            <Stack direction='row' position='absolute' bottom={15} justifyContent='center' width={1} right={0} spacing={4}>
            <Button 
            variant="contained"
            onClick={handleConfirm}
            startIcon={<Done />}
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
                }}>Confirm</Button>
            </Stack>
        </Box>
    </Modal>
  )
};