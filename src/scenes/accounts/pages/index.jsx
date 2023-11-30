import { Box, Button, Container, Stack, Typography, autocompleteClasses, useMediaQuery, useTheme,Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { account } from "../../../data";
import AccountsForm from "../account-form";
import { HdrStrong } from "@mui/icons-material";
import { blueGrey } from "@mui/material/colors";
import AccountModal from "../account-modal";
import { useState } from "react";


export default function AccountsPage() {
    const theme = useTheme();
    const isSmallDownScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const navigate = useNavigate();
    const [changeDetailAccount,setChangeDetailAccount]=useState(false);

    return (
        <Container maxWidth='xl'>
            <Helmet>
                <title>Accounts - Canteen Dashboard</title>
            </Helmet>
            <Stack direction='row'  justifyContent={'space-between'} alignItems={'center'} mb={4}>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    <Typography variant="h2" fontWeight='bold'>Account</Typography>
                    <Typography variant="subtitle2">
                        Profile
                    </Typography>
                </Box>
                <Stack direction='row' alignItems={'center'} spacing={2}>
                    <Button onClick={() => navigate('accounts-management')} variant="contained" sx={{...(isSmallDownScreen ? {
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                    } : {
                        py: 1
                    }), textTransform: 'none'}}
                    >
                        {!isSmallDownScreen &&  `Accounts Management`}
                    </Button>
                    <Button onClick={()=> setChangeDetailAccount(true)}  variant="contained" sx={{...(isSmallDownScreen ? {
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                    } : {
                        py: 1
                    }), textTransform: 'none'}}
                    >
                        {!isSmallDownScreen &&  `Change`}
                    </Button>
                </Stack>
            </Stack>
            <Stack direction='row' spacing={1} justifyContent={'left'} alignItems={'left'} mb={4}>
                <Box 
                    borderRight={2}
                    borderColor={'blue'}
                    component={"img"}
                    sx={{
                        maxWidth: 300,
                        maxHeight: 400,                  
                    }}
                    src='/imgs/watermelon.jpg'/>
                <Stack direction='column'  justifyContent={'left'} alignItems={'left'} mr={8}>
                        <Grid item xs={'auto'} borderBottom={1} borderColor={blueGrey}>
                            <Typography fontSize={25} fontWeight={'bold'}>{account.name} </Typography>
                        </Grid>
                        <Grid item xs={'auto'} ml={1}>
                            <Typography fontSize={15} >{(account.role==1)?'Administrator':'Employee'} </Typography>
                        </Grid>
                        <Grid item xs={'auto'}>
                            <Typography fontSize={20} mt={2}>Address: {account.address} </Typography>
                        </Grid>
                        <Grid item xs={'auto'}>
                            <Typography fontSize={20}>Phone Number: {account.phonenumber} </Typography>
                        </Grid>
                        <Grid item xs={'auto'}>
                            <Typography fontSize={20}>Email: {account.email} </Typography>
                        </Grid>
                        <Grid item xs={'auto'}>
                            <Typography fontSize={20}>Birthdate: {account.dateofbirth} </Typography>
                        </Grid>
                </Stack>
            </Stack>
            <AccountModal open={changeDetailAccount}  mode={'Edit'} handleClose={() => setChangeDetailAccount(false)}></AccountModal>
        </Container>
    )
}