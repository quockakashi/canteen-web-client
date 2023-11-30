import { Box, Card, CardActions, CardContent,Button, Checkbox, Grid, Input, Stack, TextField, TextareaAutosize, Typography, alpha, useMediaQuery, useTheme } from "@mui/material";
import { ActionButton } from "../../components/action-button";
import FileInput from "../../components/file-input";
import SelectInput from "../../components/select-input";
import { PlayDisabled } from "@mui/icons-material";
import { useState } from "react";
const listAccount=[
    {value:1, text:'Administrator'},
    {value:0, text:'Employee'}
]
export default function AccountsForm({handleCancel,mode}) {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const instance=(mode==='View')?false:true;
    const [editable,setEditable]=useState(instance);
    const handleSave = () => {
    };
    const handleEdit = () => {
        setEditable(true);
    };
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
                        <TextField disabled={!editable} fullWidth />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Phone number: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField disabled={!editable} fullWidth />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Email: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField disabled={!editable} fullWidth />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Address: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField disabled={!editable} fullWidth />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Password: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField disabled={!editable} fullWidth />
                    </Grid>
                </Grid>
                <Grid display={(mode==='Create')?'flex':'None'} container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Account type: </Typography>
                    </Grid>
                    <Grid item xs={8} md={5}>
                        <SelectInput listItem={listAccount} />
                    </Grid>
                </Grid>
                <Grid display={(editable)?'flex':'None'} container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Image: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <FileInput />
                    </Grid>
                </Grid>
                <Grid display={(mode==='Create')?'None':'flex'} container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Confirm Your Password: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField disabled={!editable} fullWidth />
                    </Grid>
                </Grid>
            </CardContent>

            <CardActions hidden={true} sx={{alignItems: 'center', justifyContent: 'center', gap: 2}}>
                <ActionButton bgcolor={alpha(theme.palette.success.main, 0.8)} label={'Save'} 
                handleClick={handleSave} />
                <ActionButton disabled={!editable} bgcolor={alpha(theme.palette.success.main, 0.8)} label={'Edit'} 
                handleClick={handleEdit} />
            </CardActions>
        </Card>
    );
} 