import React, { useContext, useEffect } from 'react';
import GlobalContext from '../ContextAPI/Context';
import Product from './Product/Product';
import { Grid } from '@mui/material';
import useStyles from './Styles';

const Products = () => {
    const classes = useStyles();
    const { fetchProducts, products } = useContext(GlobalContext);

    useEffect(() => {
        fetchProducts();
        /* eslint-disable react-hooks/exhaustive-deps */
    }, []);

    if (!products) return null;

    return (
        <Grid container className={classes.container} spacing={2}>
            {products.map((product, i) => (
                <Grid item xs={12} sm={6} key={i} lg={3} md={4}>
                    <Product product={product} />
                </Grid>
            ))}
        </Grid>
    )
}

export default Products;