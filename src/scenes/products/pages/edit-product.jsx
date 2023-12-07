import { Box,Container, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import StyledModal from "../../../components/modal";
import { useState } from "react";
import SuccessConfirmModal from "../../../components/success-confirm-modal";
import CreateProductForm from "../create-product-form";
import { Helmet } from "react-helmet";

export default function EditProductPage() {
    const theme = useTheme();
    const isSmallDownScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const params = useParams();
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
                <title>Edit Product - Canteen Dashboard</title>
            </Helmet>
            <Stack direction='row'  justifyContent={'space-between'} alignItems={'center'} mb={4}>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    <Typography variant="h2" fontWeight='bold'>Products</Typography>
                    <Typography variant="subtitle2">
                        Edit Product <Typography component="span" color="primary.dark">#{params.id}</Typography>
                    </Typography>
                </Box>
            </Stack>
            <Box mt={4} display='flex' width={1} justifyContent='center'>
                <CreateProductForm
                 editMode={true}
                 product={{
                    name: 'Watermelon',
                    brand: 'No brand',
                    category: {
                        id: 231123214,
                    },
                    description: 'Milk is very good for your health',
                    enabled: true,
                    quantity: 14,
                    imageUrl: '/imgs/watermelon.jpg',
                 }}
                 handleCancel={handleCancel} handleSuccess={handleSuccess}/>
            </Box>

            <StyledModal open={openCancelModal} handleClose={() => setOpenCancelModal(false)} handleContinue={() => {
                setOpenCancelModal(false);
                navigate('/categories')
            }} title={'Are you sure to continue?'} content={'If you continue, the current category data will be removed'} />

            <SuccessConfirmModal 
            open={openSuccessModal} 
            handleClose={() => navigate('/categories')}
            handleContinue={() => {
                setOpenSuccessModal(false);
                navigate('/categories/new-category')
            }}
            title={'Category Created Successfully'}
            content={`The category was created with ID: ${successCategoryId}`}
            link={`/categories/${successCategoryId}`}    
            />
        </Container>
    )
}