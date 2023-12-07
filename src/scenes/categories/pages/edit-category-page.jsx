import { Box, Button, Container, Grid, Stack, Typography, alpha, colors, useMediaQuery, useTheme } from "@mui/material";
import SummaryCard from "../../../components/summay-card";
import { Add, FileDownload } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import CategoriesTable from "../categories-table";
import CreateCategoryForm from "../create-category-form";
import StyledModal from "../../../components/modal";
import { useState } from "react";
import SuccessConfirmModal from "../../../components/success-confirm-modal";
import { Helmet } from "react-helmet";

export default function EditCategoryPage() {
    const theme = useTheme();
    const isSmallDownScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const navigate = useNavigate();
    const [openCancelModal, setOpenCancelModal] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [ successCategoryId, setSuccessCategoryId] = useState('');
    const params = useParams();

    const handleCancel = () => setOpenCancelModal(true);
    const handleSuccess = (id) => {
        setOpenSuccessModal(true);
        setSuccessCategoryId(id);
    }
    
    return (
        <Container maxWidth='xl'>
            <Helmet>
                <title>Edit Category - Canteen Dashboard</title>
            </Helmet>
            <Stack direction='row'  justifyContent={'space-between'} alignItems={'center'} mb={4}>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    <Typography variant="h2" fontWeight='bold'>Categories</Typography>
                    <Typography variant="subtitle2">
                        Edit Category <Typography component="span" color="primary.dark">#{params.id}</Typography>
                    </Typography>
                </Box>
            </Stack>
            <Box mt={4} display='flex' width={1} justifyContent='center'>
                <CreateCategoryForm 
                    editMode={true}  
                    handleCancel={handleCancel} 
                    handleSuccess={handleSuccess}
                    category={{
                        name: 'Milks and milk product',
                        description: '',
                        enabled: true,
                    }}
                />
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
            title={'Category Edited Successfully'}
            content={`The category was edited with ID: ${successCategoryId}`}
            link={`/categories/${successCategoryId}`}    
            />
        </Container>
    )
}