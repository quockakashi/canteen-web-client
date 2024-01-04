import { Stack, Typography } from "@mui/material";
import FilledSelect from "../../components/filled-select-form";
import PrimaryStackContainer from "../../components/primary-light-container";
import CustomPieChart from "../../components/pie-chart";
import { useEffect, useState } from "react";
import axios from 'axios';


const listItem = [
    {value: '7-days', text: 'Last seven days'},
    {value: '12-months', text: 'Last twelve months'},
    {value: 'all', text: 'All time'},
]

export default function RevenuePieChart() {
    const [value, setValue] = useState('all');
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/revenue/by-categories?by=${value}`).then(res => setData(res.data.data));
    }, [value]);

    return (
        <PrimaryStackContainer gap={4}>
            <Stack direction='row' alignItems='center' alignSelf='flex-start' >
                <Typography variant="h5" fontWeight='bold'>Revenue By Categories</Typography>
                <FilledSelect 
                ml={4} 
                listItem={listItem} 
                width={200}
                value={value}
                handleChange={(value) => setValue(value)}
                  />
            </Stack>
            <CustomPieChart data={data} />
        </PrimaryStackContainer>
    )
}