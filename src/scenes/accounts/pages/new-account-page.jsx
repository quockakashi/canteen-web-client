import { Box,  Container, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StyledModal from "../../../components/modal";
import { useState } from "react";
import SuccessConfirmModal from "../../../components/success-confirm-modal";
import { Helmet } from "react-helmet";
import AccountsForm from "../account-form";

export default function CreateAccountPage() {
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
                <title>Create Account - Canteen Dashboard</title>
            </Helmet>
            <Stack direction='row'  justifyContent={'space-between'} alignItems={'center'} mb={4}>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    <Typography variant="h2" fontWeight='bold'>Accounts</Typography>
                    <Typography variant="subtitle2">
                        Create Account
                    </Typography>
                </Box>
            </Stack>
            <Box mt={4} display='flex' width={1} justifyContent='center'>
                <AccountsForm 
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