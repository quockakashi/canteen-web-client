import { Button, Stack, Typography, alpha, useTheme } from "@mui/material";
import StyledModal from "../../components/modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateOrderFooter({total, onContinue, onCanceled, handleContinue}) {
    const theme = useTheme();
    const [openModal, setOpenModal] = useState(false);

    const navigate = useNavigate();
    return (
        <Stack direction='row' spacing={2} height={72} alignItems='center' justifyContent='end' paddingRight={4}>
            <Typography variant="h4" fontWeight='bold' color={theme.palette.grey[800]}>
                Total: {total} VND
            </Typography>
            <Button 
            onClick={handleContinue}
            variant="contained"
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
                onClick={() => setOpenModal(true)}
                >Cancel</Button>

                <StyledModal open={openModal} handleClose={() => setOpenModal(false)} title={'Are you sure?'} content='If you continue, content of the current order will be removed.' handleContinue={() => navigate('/orders')}/>
        </Stack>
    )
}