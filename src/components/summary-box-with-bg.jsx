import { useTheme } from "@emotion/react";
import { Box, Link, Typography } from "@mui/material";

export default function ImgBgSummaryBox({label, value, imgUrl, details = true,  bgcolor, linkColor, handleClick, width='auto'}) {
    const theme = useTheme();
    return (
        <Box 
            component='div'
            width={width}
            height={140}
            sx={{
                bgcolor,
                py: '12px',
                px: '16px',
                borderRadius: 4,
                backgroundImage: imgUrl,
                backgroundSize: '100px 90px',
                backgroundPosition: 'bottom 5px right 10px',
                backgroundRepeat: 'no-repeat',
            }}
            >
                <Typography variant="h5" fontSize={18}>{label}</Typography>
                <Typography variant="body1" fontSize={24} fontWeight='bold'>{value}</Typography>

                {
                    details 
                    && 
                    <Link 
                        onClick={handleClick} color={linkColor} 
                        sx={{textDecoration:'none', mt: 4, cursor: 'pointer'}}>Details</Link>}
            </Box>
    );
}