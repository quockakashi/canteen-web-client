import { Add, Remove } from "@mui/icons-material";
import { ButtonGroup, IconButton, Input, TextField } from "@mui/material";
import { useState } from "react";

export default function QuantityInput2({defaultValue=0, nonNegative=false, handleChangeValue}) {
    const [ value, setValue ] = useState
    (defaultValue);
    const handleChange = (e) => {
        handleChangeValue(parseInt(e.target.value));
        setValue(parseInt(e.target.value));
    }
    
    const onIncreaseQty = () => {
        handleChangeValue(value + 1);
        setValue((value) => value + 1);
        
    };

    const onDecreaseQty = () => {
        handleChangeValue(value - 1);
        setValue((value) => value - 1);

    }

    return (
    <ButtonGroup 
        sx={{
            display: 'flex', gap: 0.2,
            alignItems: 'center',
            width: '100%',
        }}
    >
        <IconButton disabled={nonNegative && value <= 0 || !Number.isInteger(value)} onClick={onDecreaseQty}> 
        <Remove /> </IconButton>
        <TextField  value={value} onChange={handleChange} sx={{
            "& fieldset": { border: 'none', height: '50px' },
            border: 'none', maxWidth: '56px', display: 'flex', justifyContent: 'center'}} type="number" ></TextField>
        <IconButton disabled={!Number.isInteger(value)} onClick={onIncreaseQty}><Add /></IconButton>
    </ButtonGroup>);
};