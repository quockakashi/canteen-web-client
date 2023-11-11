import { TrendingDown, TrendingUp } from "@mui/icons-material";
import { Box, Link, Stack, Typography, useTheme } from "@mui/material";

export default function SummaryBox({label, value, imgUrl, bgcolor, width='auto', increaseAmount}) {
    const theme = useTheme();
    return (
        <Box
            display='flex'
            flexDirection='column'
            component='div'
            width={width}
            height={140}
            bgcolor={bgcolor ? bgcolor : theme.palette.primary.light}
            sx={{
                py: '12px',
                px: '16px',
                borderRadius: 4,
                backgroundImage: increaseAmount > 0 ? "url('/imgs/happy-bg.svg')" : "url('/imgs/sad-bg.svg')",
                backgroundSize: '120px 100px',
                backgroundPosition: 'bottom 5px right 10px',
                backgroundRepeat: 'no-repeat',
            }}
            >
                <Typography variant="h5" fontSize={18}>{label}</Typography>
                <Typography variant="body1" fontSize={24} fontWeight='bold'>{value}</Typography>

                <Stack direction='row' alignItems='center'>
                    {increaseAmount > 0 
                        ? (
                            <>
                                <TrendingUp sx={{'&.MuiSvgIcon-root': {color: theme.palette.success.main}}}  /> 
                                <Typography 
                                color={theme.palette.success.main}
                                ml={2} 
                                variant="subtitle1">+{increaseAmount}%</Typography>
                            </> 
                        ) : (
                            <>  
                                <TrendingDown sx={{'&.MuiSvgIcon-root': {color: theme.palette.error.main}}} />
                                <Typography 
                                color={theme.palette.error.main}
                                ml={2}
                                variant="subtitle1"> {increaseAmount}%</Typography>
                            </>
                        )}
                </Stack>
            </Box>
    );
}