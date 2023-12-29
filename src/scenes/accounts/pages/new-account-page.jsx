import { Box,  Container, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StyledModal from "../../../components/modal";
import { useState } from "react";
import SuccessConfirmModal from "../../../components/success-confirm-modal";
import { Helmet } from "react-helmet";
import AccountsForm from "../account-form";

export default function CreateAccountPage() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [openCancelModal, setOpenCancelModal] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [ id, setId] = useState('');

    const handleCancel = () => setOpenCancelModal(true);
    const successHandler = (id) => {
        setOpenSuccessModal(true);
        setId(id);
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
                handleCancel={handleCancel} onSuccess={successHandler}/>
            </Box>

            <StyledModal open={openCancelModal} handleClose={() => setOpenCancelModal(false)} handleContinue={() => {
                setOpenCancelModal(false);
                navigate('/accounts')
            }} title={'Are you sure to continue?'} content={'If you continue, the current account data will be removed'} />

            <SuccessConfirmModal 
            open={openSuccessModal} 
            handleClose={() => navigate('/accounts')}
            handleContinue={() => {
                setOpenSuccessModal(false);
                navigate('/accounts/new-account')
            }}
            title={'Accounts Created Successfully'}
            content={`Account was created with ID: ${id}`}
            link={`/accounts/${id}`}    
            />
        </Container>
    )
}