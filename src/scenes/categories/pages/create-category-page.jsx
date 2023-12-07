import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreateCategoryForm from "../create-category-form";
import StyledModal from "../../../components/modal";
import { useState } from "react";
import SuccessConfirmModal from "../../../components/success-confirm-modal";
import { Helmet } from "react-helmet";

export default function CreateCategoryPage() {
    const theme = useTheme();
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
                <title>Create Category - Canteen Dashboard</title>
            </Helmet>
            <Stack direction='row'  justifyContent={'space-between'} alignItems={'center'} mb={4}>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    <Typography variant="h2" fontWeight='bold'>Categories</Typography>
                    <Typography variant="subtitle2">
                        Create Category
                    </Typography>
                </Box>
            </Stack>
            <Box mt={4} display='flex' width={1} justifyContent='center'>
                <CreateCategoryForm handleCancel={handleCancel} handleSuccess={handleSuccess}/>
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