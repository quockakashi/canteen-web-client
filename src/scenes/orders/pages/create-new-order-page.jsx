import { Container, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import CreateOrderForm from "../craete-oder-form";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import SuccessConfirmModal from "../../../components/success-confirm-modal";
import OrderModal from "../order-modal";
import { PDFDownloadLink, View } from "@react-pdf/renderer";
import InvoicePdf from "../invoice-pdf";

export default function CreateOrderPage() {
    const theme = useTheme();
    const isSmallDownScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const navigate = useNavigate();
    const [ detailOrderId, setDetailOrderId ] = useState(null);
    const [ openDetailOrder, setOpenDetailOrder ] = useState(false);

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
            <Helmet>
                <title>Create Order - Canteen Dashboard</title>
            </Helmet>
            <Typography variant="h2" fontWeight='bold'>Orders</Typography>
            <Typography variant="subtitle2" mb={4}>
                Create new orders
            </Typography>
            <CreateOrderForm handleContinue={handleContinue} />
            <SuccessConfirmModal handleContinue={handleSuccess} open={openSuccessModal} handleClose={handleClose}
            title={'Order Created'} content={
                <Stack spacing={2}>
                    <Typography variant="body1">The order created successfully with ID: 23412412</Typography>
                    <Stack direction='row' justifyContent='center' spacing={2}>
                        <PDFDownloadLink className="link" document={<InvoicePdf />} >Export invoice</PDFDownloadLink>
                        <Link 
                            className='link' onClick={() => {
                                setDetailOrderId(1);
                                setOpenDetailOrder(true);
                            }}>View details</Link>
                    </Stack>
                </Stack>
            }/>
            { detailOrderId && <OrderModal open={openDetailOrder} handleClose={() => setOpenDetailOrder(false)} id={detailOrderId} />}
        </Container>
    )
}