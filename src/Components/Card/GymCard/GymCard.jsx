import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardActionArea, CardContent, CardActions, Rating } from '@mui/material';
import Typography from '@mui/material/Typography';
import styles from './ProductCard.module.css';

export default function GymCard({ gym }) {
    console.log(gym);
    return (
        <Card className={styles.main_card}>
            <CardActionArea className={styles.card_action}>
                <CardContent>
                <Typography gutterBottom variant="h6" sx={{ textAlign: "center", textTransform: 'uppercase', fontWeight: 'bold' }}>
                        {gym.gym_name}
                    </Typography>
                </CardContent>
                <Box className={styles.cart_box}>
                    <img alt={gym.gym_image} src={gym.gym_image} loading='lazy' className={styles.cart_img} />
                </Box>
            </CardActionArea>
            <CardActions className={styles.card_actions}>
                <Typography variant="h6" color="primary">
                    ₹{gym.gym_price}
                </Typography>
            </CardActions>

            <CardActions>
            <Typography>
                    <Rating precision={0.5} name="read-only" value={3} readOnly />
                </Typography>
            </CardActions>
        </Card>
    );
}
