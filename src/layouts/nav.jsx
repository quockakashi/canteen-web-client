import { AttachMoney, AttachMoneyOutlined, CategoryOutlined, FaceOutlined, HomeOutlined, LocalDiningOutlined, LogoutOutlined, MoneyOutlined, ShoppingCartOutlined, StorageOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography, alpha, useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import {useLocation, useNavigate} from 'react-router-dom'

const navItems = [
    {
      text: "Dashboard",
      icon: <HomeOutlined />,
      url: '/home',
    },
    {
      text: "Orders",
      icon: <ShoppingCartOutlined />,
      url: '/orders',
    },
    {
      text: "Storage",
      icon: <StorageOutlined />,
      url: '/storage',
    },
    {
        text: "Categories",
        icon: <CategoryOutlined />,
        url: '/categories',
    },
    {
      text: "Products",
      icon: <LocalDiningOutlined />,
      url: '/products',
    },
    {
      text: "Revenue",
      icon: <AttachMoneyOutlined />,
      url: '/revenue',
    },
    {
        text: 'Accounts',
        icon: <FaceOutlined />,
        url: '/accounts',
    },

  ];

export default function Nav({ openNav, onCloseNav }) {
    const {pathname} = useLocation();
    const theme = useTheme();
    const isNonMobile = useMediaQuery(theme.breakpoints.up('lg'));
    const navigate = useNavigate();


    useEffect(() => {
        if(openNav) {
            onCloseNav();
        }
    }, [pathname]);

    return (
        <Box
        width='280px'>
            <Drawer
                variant={isNonMobile ? 'permanent' : 'temporary'}
                open={openNav}
                onClose={onCloseNav}
                sx={{
                    position: 'relative',
                    width: '280px',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                      width: '280px',
                      boxSizing: 'border-box',
                      bgcolor: theme.palette.primary.main
                    },
                  }}
            >
                <Stack position='relative' overflow='auto' height='auto' flex={1}>
                <Box
                    sx={{
                        my: 3,
                        mx: 2.5,
                        py: 2,
                        px: 2.5,
                        display: 'flex',
                        borderRadius: 1.5,
                        alignItems: 'center',
                        bgcolor: theme.palette.primary.light
                    }}
                >
                    <Avatar sx={{ml: 1.5}}>
        
                    </Avatar>
                    <Stack alignItems='center' px={2} color={theme.palette.primary.dark} justifyContent='center' textAlign='center' width={1}>
                        <Typography variant='h5' fontSize={16} fontWeight='bold'>DMM</Typography>
                        <Typography fontSize={12} variant='subtitle2'>Admin</Typography>
                    </Stack>
                </Box>
                <List sx={{
                    display: "flex",
                    flexDirection: 'column',
                    px: 2.5,
                    gap: 0.4
                }}>
                {navItems.map(({ text, icon, url }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem",}}>
                      {text}
                    </Typography>
                  );
                }

                return (
                  <ListItem key={url} disablePadding>
                    <ListItemButton
                    sx={{
                        borderRadius: 4,
                        py: 2,
                        backgroundColor: pathname.startsWith(`${url}`) ? alpha(theme.palette.primary.dark, 0.6) : 'none',
                        '&:hover': {
                            backgroundColor: pathname.startsWith(`${url}`) ? alpha(theme.palette.primary.dark, 0.6) : 'none',
                        }
                    }}
                      onClick={() => {
                        navigate(url)
                      }}
                    >
                      <ListItemIcon 
                        sx={{
                          ml: "2rem",
                          color: theme.palette.primary.contrastText
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} sx={{ color: theme.palette.primary.contrastText }} />

                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
                </Stack>
                <Stack  sx={{alignContent: 'center', justifyContent: 'center', width: 1, my: 1.5}}>
                <Button  startIcon={<LogoutOutlined />} sx={{width: '100px', color: theme.palette.primary.contrastText, mx: 'auto', px: 2, py: 1, borderRadius: 8}}>Logout</Button>
            </Stack>
            </Drawer>
        </Box>
    )
}