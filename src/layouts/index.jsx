import { Box } from "@mui/material";
import Header from "./header";
import Nav from "./nav";
import { useState } from "react";

export default function DashboardLayout({children}) {
    const [openNav, setOpenNav] = useState(false);
    return (
        <>
            <Header openNav={openNav} onOpenNav={() => setOpenNav(true)} />
            <Box
                sx={{
                    minHeight: 1,
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row'},
                }}>
                <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)}/>
                <Box>
                    {children}
                </Box>
            </Box>
        </>
    )
}