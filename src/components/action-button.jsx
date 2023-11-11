import { Button, useTheme } from "@mui/material";

export const ActionButton = ({icon, bgcolor, label, handleClick}) => {
    const theme = useTheme();

    return (
        <Button
            fullWidth={false}
            variant='contained' 
            onClick={handleClick} 
            sx=
            {{
                textTransform: 'none',
                bgcolor,
                py: 1,
                px:2,
                '&:hover': {
                    bgcolor,
                },
                '&:active': {
                    bgcolor,
                }
            }}  
            startIcon={icon}
        >
            {label}
        </Button>
    )
}