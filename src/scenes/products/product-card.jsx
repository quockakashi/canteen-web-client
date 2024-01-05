import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, IconButton, Stack, alpha, useTheme } from '@mui/material';
import { CheckCircleOutlineOutlined, CircleOutlined, Refresh } from '@mui/icons-material';
import { ActionButton } from '../../components/action-button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const EnableButton = ({isEnabled}) => {
    const theme = useTheme();
    return (
        <IconButton onClick={(e) => {e.stopPropagation()}}>
            {isEnabled ? <CheckCircleOutlineOutlined sx={{
                '&.MuiSvgIcon-root': {
                    color: theme.palette.success.main,
                }
            }} /> : <CircleOutlined />}
        </IconButton>
    )
}

export default function ProductCard({product}) {
    const theme = useTheme();
    const navigate = useNavigate();

    const handleClickEditBtn = (id) => {
      return navigate(`./edit/${id}`);
  }
  const handleClickDeleteBtn=(id)=>{
    axios.delete(`${process.env.REACT_APP_BASE_URL}/api/products/${product._id}`);
    window.location.reload(false);
  }

  return (
    <Card sx={{ flex:1,  maxWidth: 275, borderRadius: 4, }}>
      <CardMedia
        sx={{ height: 145 }}
        image={product.image}
        title={product.name}
      />
      <CardContent>
        <Stack 
            direction='row' 
            spacing={2} alignItems='center'>
            <Typography gutterBottom variant="h5" component="div">
            {product.name}
            </Typography>
        </Stack>
        <Typography mb={1} variant='body1' fontSize={16} >{product.price}</Typography>
        <Stack direction='row' alignItems={'center'} spacing={1}>
            <Typography variant='body1' fontSize={12} >Enabled: </Typography>
            <EnableButton isEnabled={product.enabled} />
        </Stack>
      </CardContent>
      <CardActions>
        <ActionButton bgcolor={theme.palette.error.main} small={true} label={'Delete'} handleClick={handleClickDeleteBtn} />
        <ActionButton 
          bgcolor={theme.palette.blue.main} 
          small={true} 
          label={'Edit'}
          handleClick={() => handleClickEditBtn(product._id)}
        />
      </CardActions>
    </Card>
  );
}