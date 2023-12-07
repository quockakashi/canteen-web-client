import { Card, CardActions, CardContent, Grid, Stack, TextField, Typography, alpha, useMediaQuery, useTheme } from "@mui/material";
import { ActionButton } from "../../components/action-button";
import FileInput from "../../components/file-input";
import SelectInput from "../../components/select-input";
import { useState } from "react";
const listAccount=[
    {value:0, text:'Admin'},
    {value:1, text:'Employee'}
]
export default function AccountsForm({editMode=false, handleCancel, handleContinue, user}) {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const handleSave = () => {
    };
    const [ userName, setUsername ] = useState( editMode ? user.name : '');
    const [ userPhone, setUserPhone ] = useState( editMode ? user.phonenumber : '');
    const [ userEmail, setUserEmail ] = useState( editMode ? user.email : '' );
    const [ userAddress, setUserAddress ] = useState(editMode ? user.address : '');
    const [ password, setPassword ] = useState('');
    const [ userRole, setUserRole ] = useState(editMode ? user.role : 0);
    const [ userImage, setUserImage ] = useState(editMode ? user.image : ''); 

    return (
        <Card 
            component='form' 
            sx={{
                width: isMediumScreen ? 800 : 600,
                bgcolor: alpha(theme.palette.primary.light, 0.6),
                py: 4,
                px: isMediumScreen ? 10 : 4,
                borderRadius:4,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
            }}
        >
            <CardContent component={Stack} spacing={2}>

                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Name: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                        value={userName}
                        fullWidth />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Phone number: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                        value={userPhone}
                        fullWidth />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Email: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                        value={userEmail}
                        fullWidth />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Address: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                        value={userAddress}
                        fullWidth />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Password: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                        placeholder={editMode ? 'Leave blank if you do not want to change password' : ''}
                        value={password}
                        fullWidth />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Role: </Typography>
                    </Grid>
                    <Grid item xs={8} md={5}>
                        <SelectInput defaultValue={userRole}  listItem={listAccount} />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Image: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <FileInput defaultImage={userImage}/>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions sx={{alignItems: 'center', justifyContent: 'center', gap: 2}}>
                <ActionButton bgcolor={alpha(theme.palette.error.dark, 0.8)} label={'Cancel'} handleClick={handleCancel} />
                <ActionButton bgcolor={alpha(theme.palette.success.main, 0.8)} label={'Continue'} 
                handleClick={handleContinue} />
            </CardActions>
        </Card>
    );
} 