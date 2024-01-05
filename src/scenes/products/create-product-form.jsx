import { Card, CardActions, CardContent, Checkbox, Grid, Stack, TextField, Typography, alpha, useMediaQuery, useTheme } from "@mui/material";
import { ActionButton } from "../../components/action-button";
import FileInput from "../../components/file-input";
import QuantityInput2 from "../../components/quantity-input2";
import SelectInput2 from "../../components/select-input-2";
import { useEffect, useState } from "react";
import axios from 'axios';


export default function CreateProductForm({editMode, product, handleCancel, handleSucces}) {
    
   
    const theme = useTheme();
    console.log(product);
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const [ productName, setProductName ] = useState((editMode===true)?product.name:'');
    const [ productDes, setProductDes ] = useState((editMode===true)?product.description:'Description');
    const [ productEnabled, setProductEnabled ] = useState((editMode===true)?product.enabled:0);
    const [ productQuantity, setProductQuantity ] = useState((editMode===true)?product.stock:0);
    const [ productPrice, setProductPrice ] = useState((editMode===true)?product.price:0);
    const [ productCat, setProductCat ] = useState((editMode===true)?product.category:[]);
    const [image,setImage]=useState((editMode)?product.image:'');
    const [file,setFile]=useState(null);
    const checkValid=()=>{
        if(!productCat){
            
        }
    }
    const handleContinue = () => {
        console.log('Hello');
        let formData=new FormData();
        formData.append('name',productName);
        formData.append('category',productCat._id);
        formData.append('description',productDes);
        formData.append('enabled',productEnabled);
        formData.append('price',productPrice);
        formData.append('stock',productQuantity);
        if(file){
            formData.append('image',file);
        }
        if(editMode){
            axios.patch(`${process.env.REACT_APP_BASE_URL}/api/products/${product._id}`, formData).then(res=>{handleSucces(res.data._id)});
        }else{
            axios.post(`${process.env.REACT_APP_BASE_URL}/api/products`, formData).then(res=>{handleSucces(res.data._id)});
        }
    };

    const [listCategory,setListCategory]=useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/categories`).then(res => {setListCategory(res.data.data)})
    }, []);
    console.log(listCategory);
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
                        <TextField value={productName} fullWidth onChange={(e)=>setProductName(e.target.value)} />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Category: </Typography>
                    </Grid>
                    <Grid item xs={8} md={5}>
                        <SelectInput2 handleChange={(id)=>setProductCat(listCategory.find(obj=> {return obj._id===id}))} 
                          defaultValue={(editMode)?productCat._id:undefined} listItem={listCategory}   />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Description: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField value={productDes} fullWidth multiline rows={2} onChange={(e)=>setProductDes(e.target.value)} />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Price: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField value={productPrice} fullWidth multiline rows={2}  onChange={(e)=>setProductPrice(e.target.value)}/>
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
                            <QuantityInput2 defaultValue={productQuantity} handleChangeValue={setProductQuantity} nonNegative />
                        </Grid>
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
                handleClick={handleContinue} />
            </CardActions>
        </Card>
    );
} 