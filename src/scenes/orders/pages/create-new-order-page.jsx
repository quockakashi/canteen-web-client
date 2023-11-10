import { Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import CreateOrderForm from "../craete-oder-form";
import ConfirmSuccessOrder from "../confirm-success-order";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateOrderPage() {
    const theme = useTheme();
    const isSmallDownScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const navigate = useNavigate();

    const handleSuccess = useMemo(() => (() => {
        setOpenSuccessModal(false);
        navigate('');
    }));

    const handleClose = useMemo(() => (() => {
        setOpenSuccessModal(false);
        navigate('/orders');
    }))

    const handleContinue = useMemo(() => (() => {
        setOpenSuccessModal(true);
    }))

    return (
        <Container maxWidth='xl'>
            <Typography variant="h2" fontWeight='bold'>Orders</Typography>
            <Typography variant="subtitle2" mb={4}>
                Create new orders
            </Typography>
            <CreateOrderForm handleContinue={handleContinue} />
            <ConfirmSuccessOrder handleContinue={handleSuccess} open={openSuccessModal} handleClose={handleClose}/>
        </Container>
    )
}