import { Search } from "@mui/icons-material";
import { Box, InputBase, ListItem, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import { useState } from "react";

const listSortedItem = [
    {
        value: 'newest',
        text: 'Newest'
    },
    {
        value: 'price-asc',
        text: 'Price: Low-High'
    },
    {
        value: 'price-desc',
        text: 'Price: High-Low'
    },
    {
        value: 'sold-asc',
        text: 'Sold: Low-High'
    },
    {
        value: 'sold-desc',
        text: 'Sold: High-Low'
    }
]

export default function ProductToolbar({...other}) {
    const [sortedBy, setSortedBy] = useState(listSortedItem[0].value)

    const handleChangeSortedBy = (e) => setSortedBy(e.target.value)

    return (
        <Toolbar sx={{display: 'flex', gap: '12px', ...other}}>
            <Box 
                display='flex' alignItems='center'
                px={1.5}
                py={0.75}
                borderRadius={5}
                boxShadow='5px 5px 5px rgba(0, 0, 0, 0.1)'
                >
                <InputBase placeholder="Search product..." />
                <Search />
            </Box>
            <Box display='flex' alignItems='center'>
                <Typography mr={1}variant='subtitle2'>Sorted by: </Typography>
                <Select
                    value={sortedBy}
                    onChange={handleChangeSortedBy}
                    sx={{
                        height: '36px',
                        color: 'black',
                        "&.MuiOutlinedInput-root": {
                            "& fieldset": {
                                border: '2px',
                                boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.2)',
                                borderRadius: 4,
                            },
                        }
                  }}>
                    {listSortedItem.map(item => <MenuItem key={item.value} value={item.value}>{item.text}</MenuItem>)}
                </Select>
            </Box>
        </Toolbar>
    )
}