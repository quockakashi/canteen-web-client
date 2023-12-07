import { Box, Container, Stack, Typography, useMediaQuery, useTheme,Grid, TextField, alpha } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import {KeyOutlined} from "@mui/icons-material";
import { useState } from "react";
import { ActionButton } from "../../../components/action-button";


export default function ProfilePage() {
    const theme = useTheme();
    const isSmallDownScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"))
    const navigate = useNavigate();
    const [changeDetailAccount,setChangeDetailAccount]=useState(false);
    const [openChangePw, setOpenChangePw] = useState(false);
    return (
        <Container maxWidth='xl'>
            <Helmet>
                <title>Accounts - Canteen Dashboard</title>
            </Helmet>
            <Stack direction='row'  justifyContent={'space-between'} alignItems={'center'} mb={4}>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    <Typography variant="h2" fontWeight='bold'>Profile</Typography>
                    <Typography variant="subtitle2">
                        My profile
                    </Typography>
                </Box>
            </Stack>
            <Stack  direction="row" spacing={8} maxWidth={isMediumScreen ? '800px': '100%'} mx="auto">
                <Stack alignSelf="flex-start" bgcolor={alpha(theme.palette.primary.main, 0.2)} sx={{justifyContent: 'center', alignItems: 'center'}} borderRadius={4} padding="16px 48px">
                    <Box component="img" src="/imgs/watermelon.jpg" width={200} height={200} border={`solid 5px ${theme.palette.primary.light}`} sx={{objectFit: 'cover', objectPosition: 'center', borderRadius: '50%', marginBottom: '24px'}}/>
                    <Typography variant="h4" fontWeight="bold">Nguyễn Văn Minh</Typography>
                    <Typography variant="subtitle2">Admin</Typography>
                </Stack>
                <Stack component="form" spacing={2} flex={1}>
                        <Grid container alignItems="center">
                            <Grid item xs={4}>
                                <Typography component="label" htmlFor="name">Name:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                             <TextField fullWidth value="Nguyễn Văn Minh" id="name">
                            </TextField>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center">
                            <Grid item xs={4}>
                                <Typography component="label" htmlFor="name">Phone Number:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                             <TextField fullWidth value="+84 241251214" id="phone">
                            </TextField>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center">
                            <Grid item xs={4}>
                                <Typography component="label" htmlFor="name">Email</Typography>
                            </Grid>
                            <Grid item xs={8}>
                             <TextField fullWidth value="minhng@gmail.com" id="email">
                            </TextField>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center">
                            <Grid item xs={4}>
                                <Typography component="label" htmlFor="name">Address</Typography>
                            </Grid>
                            <Grid item xs={8}>
                             <TextField fullWidth value="Thủ Đức, Hồ Chí Minh" id="address">
                            </TextField>
                            </Grid>
                        </Grid>
                        <Stack spacing={2}>
                            <ActionButton label={openChangePw ? 'Cancel changing' : "Change password"} bgcolor={!openChangePw ?theme.palette.warning.main : theme.palette.error.main} icon={<KeyOutlined />} handleClick={() => setOpenChangePw(prevState => !prevState)} maxWidth="200px"/>
                            {openChangePw && 
                            <>
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography component="label" htmlFor="name">New password</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField size="small" type="password" fullWidth id="password" >
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography component="label" 
                                            htmlFor="name">Confirm password</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField size="small" fullWidth
                                            type="password" id="address">
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </>}
                        </Stack>
                        <ActionButton bgcolor={theme.palette.success.main} label="Save" />
                    </Stack>
            </Stack>
        </Container>
    )
}