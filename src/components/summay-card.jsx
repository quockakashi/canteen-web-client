import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import { paletteSettings } from "../theme/palette";

export default function SummaryCard({title, value, increase, icon, compareTo, bgColor}) {
    const theme = useTheme();
    const isNonMobile = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Card 
            sx={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                minHeight: isNonMobile ? '180px' : '',
                bgcolor: bgColor,
                color: theme.palette.grey[700],
                px: 2,
                borderRadius: '12px'}}>
            <CardContent sx={{
                width: '64px',
                 display: 'flex', justifyContent:'center'}}>
                {icon}
            </CardContent>
            <CardContent 
                sx={{
                    flexGrow: 1,
                    gap: 1,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                <Typography fontSize='32px' fontWeight='bold'>{value}</Typography>
                <Typography variant="h5">{title}</Typography>
                { increase && <Box 
                    display='flex'                justifyContent='space-between'
                    alignItems='center'
                    gap={2}
                    sx={{
                    color: increase > 0 ? theme.palette.success.main : theme.palette.error.main,
                    fontWeight: 'bold'
                    }}
                >
                    <Typography 
                        variant="body2"
                    >
                        {increase > 0 ? '+' : ''} {increase}%
                    </Typography>
                    <Typography>Since last {compareTo}</Typography>
                </Box>}
            </CardContent>
        </Card>
    )
}