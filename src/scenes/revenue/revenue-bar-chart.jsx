import { Stack, Typography } from "@mui/material";
import FilledSelect from "../../components/filled-select-form";
import CustomBarChart from "../../components/barchart";
import PrimaryStackContainer from "../../components/primary-light-container";
import axios from 'axios';
import { useEffect, useState } from "react";


const listItem = [
    {value: '7-days', text: 'Last seven days'},
    {value: '12-months', text: 'Last twelve months'},
]

export default function RevenueBarChart() {

    const [data, setData] = useState([]);
    const [value, setValue] = useState('12-months');
    const getData = (param) => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/revenue/by-period?by=${param}`).then(res => setData(res.data.data));
    }

    useEffect(() => {
        getData(value)
    }, [value]);

    return (
        <PrimaryStackContainer gap={4}>
            <Stack direction='row' alignItems='center' alignSelf='flex-start' >
                <Typography variant="h5" fontWeight='bold'>Revenue Stats</Typography>
                <FilledSelect 
                ml={4} 
                listItem={listItem} 
                width={200}
                value={value}
                handleChange={(value) => setValue(value)}/>
            </Stack>
            <CustomBarChart data={data} />
        </PrimaryStackContainer>
    )
}