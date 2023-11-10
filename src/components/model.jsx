import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { IconButton, Stack, Typography, alpha, useTheme } from '@mui/material';
import { Close } from '@mui/icons-material';


const boxStyle = (theme) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: theme.palette.common.white,
    height: 300,
    boxShadow: 24,
    p: 4,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 32px'
});
  

export default function StyledModal({open, handleClose, title, content, handleContinue}) {
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
            <Typography variant="h6" component="h2" fontSize={24} mb={6}>
            {title}
            </Typography>
            <Typography variant='body1'>
            {content}
            </Typography>
            <Stack direction='row' position='absolute' bottom={15} justifyContent='center' width={1} right={0} spacing={4}>
            <Button variant="contained"
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
                >Cancel
                </Button>
            <Button 
            variant="contained"
            onClick={handleContinue}
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
                }}>Continue</Button>
            </Stack>
        </Box>
    </Modal>
  )
};