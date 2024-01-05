import { Alert, AlertTitle, Box, Button, Checkbox, Container, IconButton, InputAdornment, OutlinedInput, Stack,  Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { loginSchema } from "../../schemas";
import axios from 'axios';
export default function LoginPage() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState(false);
    const [hasWarning, setHasWarning] = useState(false)

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(true);
    const handleMouseDownPassword = () => setShowPassword(false);
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const onSuccess=()=>(navigate('/home'));
    const loginHandler= async (event) => {
       
        if(!email || !password) {
            setHasWarning(true);
            setTimeout(() => {
                setHasWarning(false);
            }, 3000);
            return;
        } else {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, {email, password, rememberMe: true});
            if(response.status == 200) {
                navigate('/home');
            } 
            } catch(error) {
                setHasError(true);
                setTimeout(() => {
                    setHasError(false);
                }, 3000);
            }
        }
    }
    return (
        <Container 
            maxWidth='xl' 
            sx={{
                width: 1,
                display: 'flex', justifyContent: 'center',
                alignItems: 'center',
                height: 1,
                bgcolor: theme.palette.primary.light
            }}>
            <Helmet>
                <title>Login - Canteen Dashboard</title>
            </Helmet>
            {hasWarning && <Alert variant="filled" severity="warning" sx={{position: 'absolute', top: 10, right: 10}}>
                <AlertTitle>Warning</AlertTitle>
                Warning — <strong>missing email or password</strong>
            </Alert>}
            {hasError && <Alert variant="filled" severity="error" sx={{position: 'absolute', top: 10, right: 10}}>
                <AlertTitle>Error</AlertTitle>
                Error — <strong>invalid credentials!</strong>
            </Alert>}
            {
                isMediumScreen && 
                <Stack textAlign='center' mr={'56px'}>
                <Box component='img' src="/imgs/login-bg.svg" width={400}/>
                <Typography mt={2} variant="subtitle2" color={theme.palette.primary.dark} >*This project is intended for study purposes only.</Typography>
                </Stack>
            }
                    <Stack 
                    bgcolor={theme.palette.common.white}
                    sx={{
                        width: 380
                    }}
                    padding='16px 24px'
                    boxShadow='6px 6px 6px  rgba(0, 0, 0, 0.05)'
                    borderRadius='12px'

                >
                    <Typography 
                        variant="h3"
                        mb='16px'
                    >Welcome back!</Typography>
                    <Stack mb={2}>
                    <Typography 
                                    component='label'
                                        variant="subtitle1"
                                        htmlFor="email">
                                        Email
                                    </Typography>
                                    <OutlinedInput 
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        id='email'
                                    type="text"/>
        
                    </Stack>
                    <Stack mb={2}>
                        <Typography  
                                       component='label' variant="subtitle1" htmlFor="password">Password
                                    </Typography>
                                    <OutlinedInput
                                        fullWidth
                                        name="password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                    </Stack>

                    <Stack direction='row' alignItems='center' spacing={0.5}>
                        <Typography component='label' htmlFor="remember-me">Remember me</Typography>
                        <Checkbox />
                    </Stack>
                    
                    <Typography mb={3} variant="subtitle2" visibility={false}>
                        If you forgot your password, please contact to admin!
                    </Typography>
                    
                    <Button size="large" type="submit" variant="contained" onClick={loginHandler}>
                        Login
                    </Button>
                </Stack>
        </Container>
    )
}