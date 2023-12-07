import { Box, Button, Checkbox, Container, IconButton, InputAdornment, OutlinedInput, Stack,  Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { loginSchema } from "../../schemas";

export default function LoginPage() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(true);
    const handleMouseDownPassword = () => setShowPassword(false);
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

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
            {
                isMediumScreen && 
                <Stack textAlign='center' mr={'56px'}>
                <Box component='img' src="/imgs/login-bg.svg" width={400}/>
                <Typography mt={2} variant="subtitle2" color={theme.palette.primary.dark} >*This project is intended for study purposes only.</Typography>
                </Stack>
            }
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                validationSchema={loginSchema}
                onSubmit={() => {console.log('hello')}}
            >
                {(props) => (
                    <Form>
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
                        <Field name="username">
                            {({
                                field,
                                meta
                            }) => (
                                <>
                                    <Typography 
                                        component='label'
                                        variant="subtitle1"
                                        htmlFor="username">
                                        Username
                                    </Typography>
                                    <OutlinedInput 
                                        id={field.name} onChange={field.onChange} value={field.value}
                                        onBlur={field.onBlur}
                                        sx={{
                                            '& fieldset': meta.error&& meta.touched && {
                                                borderColor: theme.palette.error.main
                                            },
                                            '&.MuiInputBase-root:hover fieldset': meta.error&& meta.touched && {
                                                borderColor: theme.palette.error.main
                                            },
                                            '&.Mui-focused fieldset': meta.error&& meta.touched && {
                                                borderColor: `${theme.palette.error.main} !important` 
                                            }
                                        }}
                                    type="text"/>
                                    {meta.error && meta.touched && <Typography 
                                    color='error'
                                    variant="subtitle2">{meta.error}</Typography>}
                                </>
                            )}
                        </Field>
                    </Stack>
                    <Stack mb={2}>
                        <Field name="password">
                            {({field, meta}) => (
                                <>
                                    <Typography  
                                       component='label' variant="subtitle1" htmlFor="password">Password
                                    </Typography>
                                    <OutlinedInput
                                        fullWidth
                                        value={field.value}
                                        onBlur={field.onBlur}
                                        onChange={field.onChange}
                                        id={field.name}
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
                                    sx={{
                                        '& fieldset': meta.error&& meta.touched && {
                                            borderColor: theme.palette.error.main
                                        },
                                        '&:hover fieldset': meta.error&& meta.touched &&  {
                                            borderColor: `${theme.palette.error.main} !important`
                                        },
                                        '&.Mui-focused fieldset': meta.error && meta.touched &&  {
                                            borderColor: `${theme.palette.error.main} !important`
                                        }
                                    }}
                                />
                                {meta.error && meta.touched && <Typography variant="subtitle2" color='error'>{meta.error}</Typography>}
                                </>
                            )}
                        </Field>
                    </Stack>

                    <Stack direction='row' alignItems='center' spacing={0.5}>
                        <Typography component='label' htmlFor="remember-me">Remember me</Typography>
                        <Checkbox />
                    </Stack>

                    <Typography mb={3} variant="subtitle2">
                        If you forgot your password, please contact to admin!
                    </Typography>

                    <Button size="large" type="submit" variant="contained">
                        Login
                    </Button>
                </Stack>
                </Form>
                )}
            </Formik>
        </Container>
    )
}