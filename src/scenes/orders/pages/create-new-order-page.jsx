import { Container, Stack, Typography, useTheme } from "@mui/material";
import CreateOrderForm from "../craete-oder-form";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import SuccessConfirmModal from "../../../components/success-confirm-modal";
import OrderModal from "../order-modal";
import { PDFDownloadLink} from "@react-pdf/renderer";
import InvoicePdf from "../invoice-pdf";

export default function CreateOrderPage() {
    const theme = useTheme();
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const navigate = useNavigate();
    const [ detailOrderId, setDetailOrderId ] = useState(null);
    const [ openDetailOrder, setOpenDetailOrder ] = useState(false);
    const [successOrder, setSuccessOrder] = useState(null);

    const handleSuccess = useMemo(() => (() => {
        setOpenSuccessModal(false);
        navigate('');
    }));

    const handleClose = useMemo(() => (() => {
        setOpenSuccessModal(false);
        navigate('/orders');
    }))

    const handleSuccessOrder = (order) => {
        console.log(order)
        setSuccessOrder(order);
        setOpenSuccessModal(true);
    }

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
            <CreateOrderForm handleContinue={handleSuccessOrder} />
            {successOrder && <SuccessConfirmModal handleContinue={handleSuccessOrder} open={openSuccessModal} handleClose={handleClose}
            title={'Order Created'} content={
                <Stack spacing={2}>
                    <Typography variant="body1">The order created successfully with ID: {successOrder._id}</Typography>
                    <Stack direction='row' justifyContent='center' spacing={2}>
                        <PDFDownloadLink className="link" document={<InvoicePdf order={successOrder} />} >Export invoice</PDFDownloadLink>
                    </Stack>
                </Stack>
            }/>} 
            { detailOrderId && <OrderModal open={openDetailOrder} handleClose={() => setOpenDetailOrder(false)} id={detailOrderId} />}
        </Container>
    )
}