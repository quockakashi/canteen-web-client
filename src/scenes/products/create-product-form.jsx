import { Card, CardActions, CardContent, Checkbox, Grid, Stack, TextField, Typography, alpha, useMediaQuery, useTheme } from "@mui/material";
import { ActionButton } from "../../components/action-button";
import FileInput from "../../components/file-input";
import QuantityInput from "../../components/quantity-input";
import SelectInput from "../../components/select-input";
import { useState } from "react";

const listCategory = [
    {value: 231123213, text: 'Milk and milk products'},
    {value: 231123214, text: 'Fruit'},
    {value: 231123215, text: 'Milk and milk products'},
    {value: 231123217, text: 'Milk and milk products'},
    {value: 231123218, text: 'Milk and milk products'},
    {value: 231123219, text: 'Milk and milk products'}
]

export default function CreateProductForm({editMode, product, handleCancel, handleSuccess}) {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const [ productName, setProductName ] = useState(editMode ? product.name : '');
    const [ productBrand, setProductBrand ] = useState(editMode ? product.brand : '');
    const [ productCat, setProductCat ] = useState(editMode ? product.category.id : 231123213);
    const [ productDes, setProductDes ] = useState(editMode ? product.description : '');
    const [ productEnabled, setProductEnabled ] = useState(editMode ? product.enabled : true);
    const [ productQuantity, setProductQuantity ] = useState(editMode ? product.quantity : 0);

    const handleContinue = () => {
        console.log('Hello');
        handleSuccess('2421412');
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
                gap: 4
            }}
        >
            <CardContent component={Stack} spacing={2}>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Product Name: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField value={productName} fullWidth />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Brand: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField value={productBrand} fullWidth />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Category: </Typography>
                    </Grid>
                    <Grid item xs={8} md={5}>
                        <SelectInput defaultValue={productCat}  listItem={listCategory} />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Description: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField value={productDes} fullWidth multiline rows={2} />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6} container alignItems='center'>
                        <Grid item xs={8}>
                            <Typography>Enabled: </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Checkbox checked={productEnabled ? 'checked' : ''} sx={{px: 0}}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} container alignItems='center'>
                        <Grid item xs={5}>
                            <Typography>Quantity: </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <QuantityInput defaultValue={productQuantity} nonNegative />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Image: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <FileInput/>
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