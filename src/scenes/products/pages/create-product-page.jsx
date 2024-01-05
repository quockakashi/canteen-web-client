import { Box, Button, Container,  Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FileDownload } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import StyledModal from "../../../components/modal";
import { useState } from "react";
import SuccessConfirmModal from "../../../components/success-confirm-modal";
import CreateProductForm from "../create-product-form";
import { Helmet } from "react-helmet";

export default function CreateProductPage() {
    const theme = useTheme();
    const isSmallDownScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const navigate = useNavigate();
    const [openCancelModal, setOpenCancelModal] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [ successCategoryId, setSuccessCategoryId] = useState('');

    const handleCancel = () => setOpenCancelModal(true);
    const handleSuccess = (id) => {
        setOpenSuccessModal(true);
        setSuccessCategoryId(id);
    }
    
    return (
        <Container maxWidth='xl'>
            <Helmet>
                <title>Create Product - Canteen Dashboard</title>
            </Helmet>
            <Stack direction='row'  justifyContent={'space-between'} alignItems={'center'} mb={4}>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    <Typography variant="h2" fontWeight='bold'>Products</Typography>
                    <Typography variant="subtitle2">
                        Create Product
                    </Typography>
                </Box>
                <Stack direction='row' alignItems={'center'} spacing={2}>
                    <Button variant="contained" sx={{...(isSmallDownScreen ? {
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                    } : {
                        py: 1
                    }), textTransform: 'none'}}
                    >
                        {<FileDownload />} {!isSmallDownScreen &&  `Export file`}
                    </Button>
                </Stack>
            </Stack>
            <Box mt={4} display='flex' width={1} justifyContent='center'>
                <CreateProductForm handleCancel={handleCancel} handleSucces={handleSuccess} editMode={false}/>
            </Box>

            <StyledModal open={openCancelModal} handleClose={() => setOpenCancelModal(false)} handleContinue={() => {
                setOpenCancelModal(false);
                navigate('/products')
            }} title={'Are you sure to continue?'} content={'If you continue, the current product data will be removed'} />

            <SuccessConfirmModal 
            open={openSuccessModal} 
            handleClose={() => navigate('/products')}
            handleContinue={() => {
                setOpenSuccessModal(false);
                navigate('/products/new-product')
            }}
            title={'Product Created Successfully'}
            content={`The product was created with ID: ${successCategoryId}`}
            link={`/products/${successCategoryId}`}    
            />
        </Container>
    )
}