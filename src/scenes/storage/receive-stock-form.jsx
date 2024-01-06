import { ListItemButton,Popper,Fade,List,Box, Card, CardActions, CardContent, Checkbox, Container, Grid,IconButton, Input, Stack, TextField, TextareaAutosize, Typography, alpha, useMediaQuery, useTheme } from "@mui/material";
import { ActionButton } from "../../components/action-button";
import FileInput from "../../components/file-input";
import QuantityInput from "../../components/quantity-input";
import SelectInput from "../../components/select-input";
import {InputBase} from "@mui/material";
import { Search } from "@mui/icons-material";
import axios from 'axios';
import { useState } from "react";
import DatePicker  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
// CSS Modules, react-datepicker-cssmodules.css// 
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default function ReceiveStockForm({handleConfirm}) {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const [openPopper, setOpenPopper] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchProducts,setSearchProducts]=useState([]);
    const [product, setProduct] = useState([]);
    const [date,setDate]=useState(new Date());
    const [amount,setAmount]=useState(0);
    const handleReceive = () => {
        let formData=new FormData();
        formData.append('product_id',product._id);
        formData.append('importDate',new Date());
        formData.append('expiredDate',date);
        formData.append('amount',amount);
        let obj={};
        for(let key of formData.keys()){
            obj[key]=formData.get(key);
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/batches`, obj).then(res => handleConfirm(res.data._id));
    };
    const handleChangeSearchInput = async (event) => {
        const value = event.currentTarget.value;
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/products?search=${value}`);
        const products = response.data.data;
        setSearchProducts(products);
        console.log(products);
      }
  
      const handleFocusInput = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenPopper(true);
      }
  
      const handleBlurInput = (event) => {
        setOpenPopper(false);
      }
    return (
        <Container>
            <Stack direction={'row'}>
            <Box 
                display='flex'
                px={1.5}
                py={0.75}
                borderRadius={5}
                boxShadow='5px 5px 5px rgba(0, 0, 0, 0.1)'
                width={'23%'}
                gap={'12px'}
                >
                <InputBase placeholder="Search product" justifyContent={'left'} onChange={handleChangeSearchInput} onFocus={handleFocusInput} onBlur={handleBlurInput}>
            </InputBase>            
            </Box>            
            <IconButton>
                <Search/>
            </IconButton>
            </Stack>
            <Popper open={openPopper} anchorEl={anchorEl} placement='bottom-start' transition sx={{mt: 3}}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box sx={{bgcolor: 'background.paper' }}>
            <List>
                {searchProducts.map((product, index) => (
                  <ListItemButton id={index} disabled={!product.stock} onClick={() => setProduct(product)}>
                      <Box component={'img'} src={product.image}width={30} height={30}></Box>
                      <Typography ml={3}>
                        {product.name}
                      </Typography>
                  </ListItemButton>
                ))}
              </List>
            </Box>
          </Fade>
        )}
      </Popper>
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
                mt:2
            }}
        >
            
            <CardContent component={Stack} spacing={2}>
            <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Product ID: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField disabled={true} value={product._id} fullWidth />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Product Name: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField disabled={true} value={product.name} fullWidth />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Amount: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField fullWidth onChange={(e)=>setAmount(parseInt(e.target.value))}/>
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Expired date: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <DatePicker selected={date} label="Basic date picker" value={date} onChange={(value)=>setDate(value)} />
                    </Grid>
                </Grid>
            </CardContent>

            <CardActions sx={{alignItems: 'center', justifyContent: 'center', gap: 2}}>
                <ActionButton bgcolor={alpha(theme.palette.success.main, 0.8)} label={'Receive'} 
                handleClick={handleReceive} />
            </CardActions>
        </Card>
        </Container>
    );
} 