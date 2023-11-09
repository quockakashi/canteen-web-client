import { AppBar, Avatar, Box, Button, IconButton, InputBase, Stack, Toolbar, alpha, duration, useMediaQuery, useTheme } from "@mui/material";
import { DarkModeOutlined, LightModeOutlined, Menu as MenuIcon, NotificationsOutlined, Search as SearchIcon, SettingsOutlined } from "@mui/icons-material";

export default function Header({}) {
    const theme = useTheme();
    const isNonMobile = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <AppBar
            sx={{
                boxShadow: 'none',
                height: 64,
                transition: theme.transitions.create(['height'], {
                    duration: theme.transitions.duration.shorter
                }),
                background: alpha(theme.palette.primary.main, 0.8)
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
                        <IconButton>
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
                        <IconButton>
                            <SearchIcon sx={{
                            color: `${theme.palette.primary.dark}`
                        }}/>
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
                    <Button sx={{
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