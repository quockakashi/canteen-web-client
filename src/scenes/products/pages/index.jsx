import { Box, Button, Container, Grid, Pagination, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Add, FileDownload } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ProductCard from "../product-card";
import { useState } from "react";
import { useEffect } from "react";
import ProductToolbar from "../product.toolbar";
import { Helmet } from "react-helmet";
import axios from 'axios';

export default function ProductsPage() {
    const theme = useTheme();
    const isSmallDownScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const navigate = useNavigate();
    const [productsData,setProductListData]=useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/products`).then(res => {setProductListData(res.data.data)})
    }, []);
    return (
        <Container maxWidth='xl'>
            <Helmet>
                <title>Product Management - Canteen Dashboard</title>
            </Helmet>
            <Stack direction='row'  justifyContent={'space-between'} alignItems={'center'} mb={4}>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    <Typography variant="h2" fontWeight='bold'>Products</Typography>
                    <Typography variant="subtitle2">
                        Products Management
                    </Typography>
                </Box>
                <Stack direction='row' alignItems={'center'} spacing={2}>
                    <Button onClick={() => navigate('new-product')} variant="contained" sx={{...(isSmallDownScreen ? {
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                    } : {
                        py: 1
                    }), textTransform: 'none'}}
                    >
                        {<Add />} {!isSmallDownScreen &&  `Add new product`}
                    </Button>
                    <Button variant="contained" sx={{...(isSmallDownScreen ? {
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                    } : {
                        py: 1
                    }), textTransform: 'none'}}
                    >
                        {<FileDownload />} {!isSmallDownScreen &&  `Export file`}
                    </Button>
                </Stack>
            </Stack>
            <ProductToolbar mb={4} />
            <Grid mb={5} container spacing={4}>
                {productsData.map(product => (
                    <Grid xs={12} sm={6} md={4} lg={3} item key={product._id}
                    display='flex'
                    width={1}
                    justifyContent='center' alignItems='center'>
                        <ProductCard product={product}></ProductCard>
                    </Grid>
                ))}
            </Grid>
            <Stack 
            width={1} justifyContent={'center'} alignItems='center'>
                <Pagination count={10} color="primary" />
            </Stack>
        </Container>
    )
}