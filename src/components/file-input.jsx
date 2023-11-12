import { Delete, Remove, Upload, UploadFile } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";

export default function FileInput() {
    const [ image, setImage ] = useState(null);
    const [ fileName, setFileName ] = useState('No image selected');
    const theme = useTheme();
    const handleClick = useMemo(() => ((e) => {
        document.querySelector('#img-input-component').click();
    } ), []);
    const handleChangeImageInput = useMemo(() => ((e) => {
        if(e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    } ), []);
    const handleRemoveImage = useMemo(() => ((e) => {
        document.querySelector('#img-input-component').value = '';
        setImage(null);
        setFileName('');
    } ), []);
    return (
        <Box>
            <Box 
                width={1} 
                height={120} 
                border={`2px dashed ${theme.palette.primary.main}`}
                borderRadius='6px 6px 0 0'
                borderBottom='none'
                display={'flex'}
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                onClick={handleClick}
            >
            {image 
                ? <Box component='img' src={image} maxWidth={170} maxHeight={100} borderRadius='6px' />
                : 
                <>
                    <Upload sx={{'&.MuiSvgIcon-root': {
                        color: theme.palette.primary.main,
                        fontSize: '32px'
                    }}} />
                    <Typography variant="body2" >Select an image</Typography>
                </>
                }
                <input onChange={handleChangeImageInput} id="img-input-component" type="file" hidden accept="image/*"></input>
            </Box>
            <Box 
                display='flex' px={2} py={0.5} 
                justifyContent='space-between'
                alignItems='center'
                bgcolor={theme.palette.primary.main}
                borderRadius='0 0 6px 6px'
            >
                <UploadFile />
                {
                    image 
                        ? <Stack direction='row' alignItems='center' spacing={1.5}>
                            <Typography
                            style={{ maxWidth: '150px', overflow: 'hidden',
                            whiteSpace: 'nowrap'
                            , 
                            textOverflow: 'ellipsis' }}
                            variant='subtitle2'>{fileName}</Typography>
                            <IconButton>
                                <Delete onClick={handleRemoveImage} />
                            </IconButton>
                        </Stack>
                        : <Typography       variant='subtitle2'>No file selected</Typography>
                }
            </Box>
        </Box>
    );
};