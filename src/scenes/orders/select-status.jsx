import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material';

export default function SelectStatus({handleFilter}) {
  const [status, setStatus] = React.useState('all');
  const theme = useTheme();

  const handleChange = (event) => {
    setStatus(event.target.value);
    if(event.target.value == 'all') {
      handleFilter('');
    } else {
      handleFilter(event.target.value);
    }
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 150, borderColor: 'red', }} size="small" variant='outlined' >
        <InputLabel>Status Filter</InputLabel>
      <Select
        label='Status Filter'
        value={status}
        onChange={handleChange}
        sx={{
            "&.MuiOutlinedInput-root": {
                "& fieldset": {
                    border: '2px',
                    boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.2)',
                    borderRadius: 4
                },
                
              }
        }}
      >
        <MenuItem value={'all'}>All</MenuItem>
        <MenuItem value={'completed'}>Completed</MenuItem>
        <MenuItem value={'processing'}>Processing</MenuItem>
        <MenuItem value={'canceled'}>Canceled</MenuItem>
      </Select>
    </FormControl>
  );
}