import { Box, Card, CardActions, CardContent, Checkbox, Container,IconButton, Grid, Input, Stack, TextField, TextareaAutosize, Typography, alpha, useMediaQuery, useTheme } from "@mui/material";
import { ActionButton } from "../../components/action-button";
import FileInput from "../../components/file-input";
import QuantityInput from "../../components/quantity-input";
import SelectInput from "../../components/select-input";
import {InputBase} from "@mui/material";
import { Search } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import { beBY } from "@mui/material/locale";

export default function DeliverStockForm({handleConfirm}) {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

    const handleDeliver = () => {
        handleConfirm();
    };

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
                <InputBase placeholder="Search batch(id, product)" justifyContent={'left'}>
            </InputBase>
            
            </Box>

            <IconButton>
                <Search/>
            </IconButton>
            </Stack>
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
                        <Typography>Batch ID: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField disabled={true} fullWidth />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Product Name: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField disabled={true} fullWidth />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Amount: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField disabled={true} fullWidth />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Category: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField disabled={true} fullWidth />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Expired date: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField disabled={true} fullWidth multiline rows={2} />
                    </Grid>
                </Grid>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <Typography>Received date: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField disabled={true} fullWidth multiline rows={2} />
                    </Grid>
                </Grid>
            </CardContent>

            <CardActions sx={{alignItems: 'center', justifyContent: 'center', gap: 2}}>
                <ActionButton bgcolor={alpha(theme.palette.error.dark, 0.8)} label={'Deliver'} 
                handleClick={handleDeliver} />
            </CardActions>
        </Card>
        </Container>
    );
} 