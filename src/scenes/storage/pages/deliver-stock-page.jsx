import { Box, Container, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StyledModal from "../../../components/modal";
import { useState } from "react";
import SuccessConfirmModal from "../../../components/success-confirm-modal";
import { Helmet } from "react-helmet";
import DeliverStockForm from "../deliver-stock-form";
import ConfirmModal from "../../../components/confirm-modal";

export default function DeliverStockPage() {
    const theme = useTheme();
    const isSmallDownScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const navigate = useNavigate();
    const [openConfirmModal, setOpenConfirmModal] = useState(false);

    const handleConfirm = () => {
        setOpenConfirmModal(true);
    }
    
    
    return (
        <Container maxWidth='xl'>
            <Helmet>
                <title>Deliver stock - Canteen Dashboard</title>
            </Helmet>
            <Stack direction='row'  justifyContent={'space-between'} alignItems={'center'} mb={4}>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    <Typography variant="h2" fontWeight='bold'>Storage</Typography>
                    <Typography variant="subtitle2">
                        Deliver stock
                    </Typography>
                </Box>
            </Stack>
            <Box mt={4} display='flex' width={1} justifyContent='center'>
                <DeliverStockForm handleConfirm={handleConfirm}/>
            </Box>

            <ConfirmModal 
            open={openConfirmModal} 
            handleClose={()=>{
                setOpenConfirmModal(false);
            }}
            handleConfirm={() => {
                setOpenConfirmModal(false);
            }}
            title={'Confirm deliver batch of goods'}
            content={`The batch of product ID: `}
            />
        </Container>
    )
}