import { Card, CardActions, CardContent, Checkbox, Grid, Stack, TextField, Typography, alpha, useMediaQuery, useTheme } from "@mui/material";
import { ActionButton } from "../../components/action-button";
import { useState } from "react";

export default function CreateCategoryForm({editMode, category, handleCancel, handleSuccess}) {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const [ catName, setCatName ] = useState(editMode ? category.name : '');
    const [ description, setDescription ] = useState( editMode ? category.description : '');
    const [ enabled, setEnabled ] = useState( editMode ? category.enabled : true );

    const handleContinue = () => {
        console.log('Hello');
        handleSuccess('2421412');
    };

    return (
        <Card 
            component='form' 
            sx={{
                width: isMediumScreen ? 800 : 500,
                bgcolor: alpha(theme.palette.primary.light, 0.6),
                py: 4,
                px: isMediumScreen ? 10 : 4,
                borderRadius:4,
                display: 'flex',
                flexDirection: 'column',
                gap: 4
            }}
        >
            <CardContent component={Stack} spacing={2}>
                <Grid container alignItems='center'>
                        <Grid item xs={4}>
                            <Typography>Category Name: </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                            value={catName}
                            fullWidth/>
                        </Grid>
                    </Grid>
                    <Grid container alignItems='center'>
                        <Grid item xs={4}>
                            <Typography>Description: </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                            value={description} fullWidth multiline rows={2} />
                        </Grid>
                    </Grid>
                    <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Enabled: </Typography>
                    </Grid>
                <Grid item xs={8}>
                    <Checkbox checked={enabled ? 'checked' : ''} sx={{px: 0}}/>
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