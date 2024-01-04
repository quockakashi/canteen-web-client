import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Stack, useTheme } from '@mui/material';
import { FilterList } from '@mui/icons-material';

export default function FilledSelect({handleChange, listItem, value, ...other}) {
  const theme = useTheme();

  const changeHandler = (event) => {
    handleChange(event.target.value);
  };

  return (
    <Stack direction='row' alignItems='center' gap={2} sx={{...other}}>
      <FilterList />
      <FormControl >
        <Select
          value={value}
          onChange={changeHandler}
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
      </FormControl>
    </Stack>
  );
}