import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
}));

const Address = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle1,
  color: theme.palette.text.secondary,
}));

export default function ProductCard({ gym }) {
  console.log(gym);
  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Item>
          <Box sx={{ marginRight: 2 }}>
            <img alt="Item 1" src={gym.gym_image} loading='lazy' style={{ width: '400px', height: '350px' }} />
          </Box>
          <Box>
            <Typography gutterBottom variant="h5" fontWeight="bold" color="primary">
              {gym.gym_name}
            </Typography>
            <Address variant="subtitle1" gutterBottom>
              {gym.address}
            </Address>
          </Box>
        </Item>
      </Stack>
    </Box>
  );
}
