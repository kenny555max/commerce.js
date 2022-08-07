import React, { useContext, useEffect } from 'react';
import GlobalContext from '../ContextAPI/Context';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';
import { Typography, Grow, Grid, Button, CircularProgress } from '@mui/material';
import useStyles from './Styles';

const Cart = () => {
    const classes = useStyles();
    const { fetchCart, carts, emptyCart } = useContext(GlobalContext);

    useEffect(() => {
        fetchCart();
    },[]);

    if (carts.length === 0) return <CircularProgress />;

    return (
        <Grow in>
            <Grid container className={classes.container}>
                <Grid xs={12} item>
                    <Typography variant="h5" marginBottom="10px" textTransform="capitalize">your shopping cart</Typography>
                </Grid>
                <Grid item xs={12} container spacing={2}>
                    {carts.line_items.map((cart) => (
                        <Grid item key={cart.id} xs={12} sm={6} md={4}>
                            <CartItem cart={cart} />
                        </Grid>
                    ))}
                </Grid>
                <Grid xs={12} item container className={classes.action}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5">Subtotal: {carts.subtotal.formatted_with_symbol}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.buttons}>
                        <Button size="large" onClick={(e) => emptyCart()} className={classes.buttonEmpty} variant="contained">EMPTY CART</Button>
                        <Button size="large" component={Link} to={`/checkout?cartId=${carts.id}`} style={{marginLeft: "10px"}} className={classes.buttonCheckout} variant="contained">CHECKOUT</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grow>
    )
}

export default Cart;