import { Stack, useTheme } from "@mui/material";

export default function PrimaryStackContainer({ px=4, py=2, gap=2, direction='row', children, ...other }) {
    const theme = useTheme();
    return (
        <Stack 
            justifyContent='center'
            alignItems={'center'}
            borderRadius={4}
            px={px} 
            py={py}
            gap={gap}
            bgcolor={theme.palette.primary.light}
            sx={{
                ...other,
            }}
        >
            {children}
        </Stack>
    );
};