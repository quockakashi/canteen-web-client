import { Box, Container, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StyledModal from "../../../components/modal";
import { useState } from "react";
import { Helmet } from "react-helmet";
import ReceiveStockForm from "../receive-stock-form";
import ConfirmModal from "../../../components/confirm-modal";
export default function ReceiveStockPage() {
    const theme = useTheme();
    const isSmallDownScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const navigate = useNavigate();
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const handleConfirm = (id) => {
        setOpenConfirmModal(true);
    }
    
    
    return (
        <Container maxWidth='xl'>
            <Helmet>
                <title>Receive stock - Canteen Dashboard</title>
            </Helmet>
            <Stack direction='row'  justifyContent={'space-between'} alignItems={'center'} mb={4}>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    <Typography variant="h2" fontWeight='bold'>Storage</Typography>
                    <Typography variant="subtitle2">
                        Receive stock
                    </Typography>
                </Box>
            </Stack>
            <Box mt={4} display='flex' width={1} justifyContent='center'>
                <ReceiveStockForm handleConfirm={handleConfirm}/>
            </Box>

            <ConfirmModal 
            open={openConfirmModal} 
            handleClose={()=>{
                setOpenConfirmModal(false);
            }}
            handleConfirm={() => {
                setOpenConfirmModal(false);
            }}
            title={'Success receive batch of goods'}
            />
        </Container>
    )
}