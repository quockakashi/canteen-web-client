import { AppBar, Avatar, Box, Button, Fade, IconButton, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Popper, Stack, Toolbar, Typography, alpha, duration, useMediaQuery, useTheme } from "@mui/material";
import { ArrowForwardIosOutlined, DarkModeOutlined, LightModeOutlined, LogoutOutlined, Menu as MenuIcon, NotificationsOutlined, Search as SearchIcon, SettingsOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ openNav, onOpenNav }) {
    const theme = useTheme();
    const isNonMobile = useMediaQuery(theme.breakpoints.up('lg'));

    const [ openPopper, setOpenPopper ] = useState(false);
    const [ anchorEl, setAnchorEl ] = useState(null);
    const navigate = useNavigate();

    const handleOpenPopper = (e) => {
        const anchorEl = e.currentTarget;
        setAnchorEl(anchorEl);
        setOpenPopper((prevState) => !prevState);
    }

    const handleViewProfileClick = (e) => {
        setOpenPopper(false);
        navigate('/profile');
    }

    return (
        <AppBar
            sx={{
                boxShadow: 'none',
                height: 64,
                transition: theme.transitions.create(['height'], {
                    duration: theme.transitions.duration.shorter
                }),
                background: alpha(theme.palette.primary.main, 0.8),
                ...(isNonMobile && {
                    width: `calc(100% - ${280}px)`
                })
            }}
        >
            <Toolbar
                sx={{
                    height: 1,
                    px: { lg: 5 },
                    justifyContent:"space-between",
                    alignItems: "center",
                    '& .MuiSvgIcon-root': {
                        color: theme.palette.primary.contrastText
                    }
                }}>
                <Stack direction='row' alignItems='center' spacing={1}>
                {
                    !isNonMobile && (
                        <IconButton onClick={onOpenNav}>
                            <MenuIcon
                             />
                        </IconButton>
                    )
                }
                    <Box display='flex' alignItems='center'
                    bgcolor={theme.palette.common.white}
                    borderRadius={4}
                    px={2}
                    boxShadow={`0 5px 5px 0 ${alpha(theme.palette.common.black, 0.2)}`}
                    >
                        <InputBase placeholder="Search..."
                        sx={{
                            color: `${theme.palette.primary.dark}`
                        }}/>
                        <IconButton sx={{
                            '& .MuiSvgIcon-root': {
                                color: `${theme.palette.primary.dark}`
                            }
                        }}>
                            <SearchIcon/>
                        </IconButton>
                    </Box>
                </Stack>
                <Stack direction='row' alignItems='center' spacing={0.5}>
                    <IconButton>
                        {
                            theme.palette.mode === 'light' ? <DarkModeOutlined /> : <LightModeOutlined />
                        }
                    </IconButton>
                    <IconButton >
                        <NotificationsOutlined />
                    </IconButton>
                    <Popper open={openPopper} anchorEl={anchorEl} placement="bottom-end" transition sx={{zIndex: 9999}}>
                        {({ TransitionProps}) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper sx={{bgcolor: theme.palette.common.white, width: 200}}>
                                    <List disablePadding sx={{padding: '2px 4px'}}>
                                        <ListItem disablePadding>
                                            <ListItemButton onClick={handleViewProfileClick}>
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    <Avatar sx={{width: 30, height: 30}} />
                                                    <Typography fontWeight="bold">Minh Trần</Typography>
                                                </Stack>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{
                                                display: 'flex',
                                                justifyContent: "space-between"
                                            }}>
                                                <ListItemIcon>
                                                    <LogoutOutlined />
                                                </ListItemIcon>
                                                <Typography sx={{flex: 1}}>
                                                    Logout
                                                </Typography>
                                                <ArrowForwardIosOutlined />
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                </Paper>
                            </Fade>
                        )}
                    </Popper>
                    <Button onClick={handleOpenPopper} sx={{
                        maxWidth: '35px !important',
                        maxHeight: 35,
                        borderRadius: '50%'
                    }}
                    >
                        <Avatar sx={{
                            width: 35,
                            height: 35,
                        }} >
                        </Avatar>
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    )

}