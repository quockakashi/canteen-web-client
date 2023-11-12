import { MenuItem, Select } from "@mui/material";
import { useState } from "react";

export default function SelectInput({listItem, handleChange}) {
    const [ value, setValue ] = useState(listItem[0].value);
    const onChange = (e) => {
        setValue(e.target.value);
    }
    
    return (
        <Select
          value={value}
          onChange={onChange}
          fullWidth
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
          }}
        >
          {listItem.map((item => 
            <MenuItem key={item.value} value={item.value}>
              {item.text}
            </MenuItem>)
          )}
        </Select>
    )
}