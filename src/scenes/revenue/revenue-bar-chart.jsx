import { Stack, Typography } from "@mui/material";
import FilledSelect from "../../components/filled-select-form";
import CustomBarChart from "../../components/barchart";
import PrimaryStackContainer from "../../components/primary-light-container";


const listItem = [
    {value: 'last-seven-days', text: 'Last seven days'},
    {value: 'last-six-months', text: 'Last six months'},
    {value: 'last-twelve-months', text: 'Last twelve months'},
]

export default function RevenueBarChart() {
    return (
        <PrimaryStackContainer gap={4}>
            <Stack direction='row' alignItems='center' alignSelf='flex-start' >
                <Typography variant="h5" fontWeight='bold'>Revenue By Months</Typography>
                <FilledSelect 
                ml={4} 
                listItem={listItem} 
                width={200}
                defaultValue={'last-seven-days'}  />
            </Stack>
            <CustomBarChart />
        </PrimaryStackContainer>
    )
}