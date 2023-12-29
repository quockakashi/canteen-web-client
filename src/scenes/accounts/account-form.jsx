import { Card, CardActions, CardContent, Grid, Stack, TextField, Typography, alpha, useMediaQuery, useTheme } from "@mui/material";
import { ActionButton } from "../../components/action-button";
import FileInput from "../../components/file-input";
import SelectInput from "../../components/select-input";
import { useState } from "react";
import axios from 'axios'
import { Mode } from "@mui/icons-material";

const listAccount=[
    {value:'admin', text:'Admin'},
    {value:'user', text:'Employee'}
]
export default function AccountsForm({editMode=false, handleCancel, onSuccess, user}) {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const handleSave = () => {
    };

    const [ nameInput, setNameInput ] = useState( editMode ? user.name : '');
    const [ phoneInput, setPhoneInput ] = useState( editMode ? user.phone : '');
    const [ emailInput, setEmailInput ] = useState( editMode ? user.email : '' );
    const [ addressInput, setAddressInput ] = useState(editMode ? user.address : '');
    const [ passwordInput, setPasswordInput ] = useState('');
    const [ roleInput, setRoleInput ] = useState(editMode ? user.role : 'user');
    const [ image, setImage ] = useState(editMode ? user.image : ''); 
    const [ file, setFile ] = useState(null);

    const continueHandler = (e) => {
        let formData = new FormData();
        formData.append('name', nameInput);
        formData.append('address', addressInput);
        formData.append('phone', phoneInput);
        formData.append('email', emailInput);
        if(passwordInput.trim()) {
            formData.append('password', passwordInput.trim());
        }
        formData.append('role', roleInput);
        if(file) {
            formData.append('image', file);
        }

        if(editMode) {
            axios.patch(`${process.env.REACT_APP_BASE_URL}/api/users/${user._id}`, formData).then(res => onSuccess(res.data.data._id));
        } else {
            axios.post(`${process.env.REACT_APP_BASE_URL}/api/users`, formData).then(res => onSuccess(res.data.data._id));
        }

    }

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
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        fullWidth />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Phone number: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        fullWidth />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Email: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                        value={emailInput}
                        onInput={(e) => setEmailInput(e.target.value)}
                        fullWidth />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Address: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                        value={addressInput}
                        onChange={(e) => setAddressInput(e.target.value)}
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
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        fullWidth />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Role: </Typography>
                    </Grid>
                    <Grid item xs={8} md={5}>
                        <SelectInput 
                        defaultValue={roleInput}
                        handleChange={setRoleInput}
                        listItem={listAccount} />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Image: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <FileInput defaultImage={image} onChange={setFile}/>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions sx={{alignItems: 'center', justifyContent: 'center', gap: 2}}>
                <ActionButton bgcolor={alpha(theme.palette.error.dark, 0.8)} label={'Cancel'} handleClick={handleCancel} />
                <ActionButton bgcolor={alpha(theme.palette.success.main, 0.8)} label={'Continue'} 
                handleClick={continueHandler} />
            </CardActions>
        </Card>
    );
} 