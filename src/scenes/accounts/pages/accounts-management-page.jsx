import { Box, Button, Container, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Add, ImportExport, Minus } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import AccountsTable from "../accounts-table";
import AccountModal from "../account-modal";
import { useState } from "react";

export default function AccountsManagementPage() {
    const theme = useTheme();
    const isSmallDownScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const navigate = useNavigate();
    const [openCreateAccount,setOpenCreateAccount]=useState(false);

    return (
        <Container maxWidth='xl'>
            <Helmet>
                <title>Accounts Management - Canteen Dashboard</title>
            </Helmet>
            <Stack direction='row'  justifyContent={'space-between'} alignItems={'center'} mb={4}>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    <Typography variant="h2" fontWeight='bold'>Accounts</Typography>
                    <Typography variant="subtitle2">
                        Management accounts
                    </Typography>
                </Box>
                <Button onClick={() => setOpenCreateAccount(true)} variant="contained" sx={{...(isSmallDownScreen ? {
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                    } : {
                        py: 1
                    }), textTransform: 'none'}}
                    >
                    {<Add/>} {!isSmallDownScreen &&  `New account`}
                </Button>
            </Stack>
            <AccountsTable type={true}/>
            <AccountsTable type={false}/>
            <AccountModal open={openCreateAccount} mode={'Create'} handleClose={() => setOpenCreateAccount(false)}></AccountModal>
        </Container>
    )
}