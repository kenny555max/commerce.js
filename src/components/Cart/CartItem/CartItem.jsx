import React, { useContext } from 'react';
import GlobalContext from '../../ContextAPI/Context';
import { Card, CardMedia, CardContent, CardActions, Button, Typography, Grid } from '@mui/material';
import useStyles from './Styles.js';

const CartItem = ({ cart }) => {
    const classes = useStyles();
    const { decrementCartItem, removeCartItem, incrementCartItem } = useContext(GlobalContext);

    if (!cart) return null;

  return (
    <Card>
        <CardMedia className={classes.CardMedia} image={cart.image.url} title={cart.name} />
        <CardContent>
            <Grid item className={classes.productdetails}>
                <Typography fontWeight="bold" variant="subtitle2">{cart.name}</Typography>
                <Typography fontWeight="bold" variant="subtitle1">${cart.price.formatted * cart.quantity}</Typography>
            </Grid>
            <Grid item>
                <Typography variant="subtitle2">{cart.description}</Typography>
            </Grid>
        </CardContent>
        <CardActions className={classes.CardActions}>
            <div className={classes.change}>
                <Button size="small" onClick={(e) => decrementCartItem(cart.id, cart.quantity - 1)}>-</Button>
                <Typography variant="subtitle2">{cart.quantity}</Typography>
                <Button size="small" onClick={(e) => incrementCartItem(cart.id, cart.quantity + 1)}>+</Button>
            </div>
            <Button size="small" onClick={(e) => removeCartItem(cart.id)} className={classes.button}>REMOVE</Button>
        </CardActions>
    </Card>
  )
}

export default CartItem;