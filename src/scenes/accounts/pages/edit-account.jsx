import { Box,  Container, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import StyledModal from "../../../components/modal";
import { useEffect, useState } from "react";
import SuccessConfirmModal from "../../../components/success-confirm-modal";
import { Helmet } from "react-helmet";
import AccountsForm from "../account-form";
import axios from 'axios';

export default function EditAccountPage() {
    const navigate = useNavigate();
    const params = useParams();
    const [openCancelModal, setOpenCancelModal] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const { id } = useParams();
    const [user, setUser] = useState(null);
    useEffect(() => {
        axios.get(`http://localhost:5000/api/users/${id}`).then(res => setUser(res.data.data));
    })


    const handleCancel = () => setOpenCancelModal(true);
    const successHandler = (id) => {
        setOpenSuccessModal(true);
    }
    
    return (
        <Container maxWidth='xl'>
            <Helmet>
                <title>Edit Account - Canteen Dashboard</title>
            </Helmet>
            <Stack direction='row'  justifyContent={'space-between'} alignItems={'center'} mb={4}>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    <Typography variant="h2" fontWeight='bold'>Accounts</Typography>
                    <Typography variant="subtitle2">
                        Edit Account &nbsp; <Typography component="span" color="primary.dark" >#{params.id}</Typography>
                    </Typography>
                </Box>
            </Stack>
            <Box mt={4} display='flex' width={1} justifyContent='center'>
                {user && <AccountsForm
                editMode
                user={
                    user
                }
                handleCancel={handleCancel} 
                onSuccess={successHandler}/>}
            </Box>

            <StyledModal open={openCancelModal} handleClose={() => setOpenCancelModal(false)} handleContinue={() => {
                setOpenCancelModal(false);
                navigate('/accounts')
            }} title={'Are you sure to continue?'} content={'If you continue, the current category data will be removed'} />

            <SuccessConfirmModal 
            open={openSuccessModal} 
            handleClose={() => navigate('/accounts')}
            handleContinue={() => {
                setOpenSuccessModal(false);
                navigate(`/accounts/edit/${id}`)
            }}
            title={'Account updated Successfully'}
            content={`User updated with ID: ${id}`}
            link={`/accounts/${id}`}    
            />
        </Container>
    )
}