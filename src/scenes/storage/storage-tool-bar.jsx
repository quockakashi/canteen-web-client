import { Search } from "@mui/icons-material";
import { Box, InputBase, ListItem, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import { useState } from "react";

export default function StorageToolbar({...other}) {

    return (
        <Toolbar sx={{display: 'flex', gap: '12px', ...other}}>
            <Box 
                display='flex' alignItems='center'
                px={1.5}
                py={0.75}
                borderRadius={5}
                boxShadow='5px 5px 5px rgba(0, 0, 0, 0.1)'
                >
                <InputBase placeholder="Search batch of goods..." />
                <Search />
            </Box>            
        </Toolbar>
    )
}