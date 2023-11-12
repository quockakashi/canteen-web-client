import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, IconButton, Stack, alpha, useTheme } from '@mui/material';
import { CheckCircleOutlineOutlined, CircleOutlined } from '@mui/icons-material';
import { ActionButton } from '../../components/action-button';

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
            <Box py={0.5} px={2} bgcolor={alpha(theme.palette.primary.main, 0.6)} borderRadius={2}>
                <Typography variant='subtitle2'>{product.category}</Typography>
            </Box>
        </Stack>
        <Typography mb={1} variant='body1' fontSize={16} >{product.price}</Typography>
        <Typography variant='body1' fontSize={12} >ID: 1232412</Typography>
        <Stack direction='row' alignItems={'center'} spacing={1}>
            <Typography variant='body1' fontSize={12} >Enabled: </Typography>
            <EnableButton isEnabled={product.enabled} />
        </Stack>
      </CardContent>
      <CardActions>
        <ActionButton bgcolor={theme.palette.error.main} small={true} label={'Delete'} />
        <ActionButton bgcolor={theme.palette.blue.dark} small={true} label={'Edit'} />
        <ActionButton bgcolor={theme.palette.warning.main} small={true} label={'Details'} />
      </CardActions>
    </Card>
  );
}