import React, { useContext } from 'react';
import GlobalContext from '../../ContextAPI/Context';
import { Card, CardMedia, CardContent, CardActions, Button, Typography, Grid } from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';
import useStyles from './Styles.js';

const Product = ({ product }) => {
    const classes = useStyles();
    const { addToCart } = useContext(GlobalContext);

    if (!product) return;

  return (
    <Card>
      <CardMedia className={classes.media} image={product.image.url} title={product.name} />
        <CardContent>
            <Grid item className={classes.productdetails}>
                <Typography fontWeight="bold" variant="subtitle2">{product.name}</Typography>
                <Typography fontWeight="bold" variant="subtitle1">${product.price.formatted}</Typography>
            </Grid>
            <Grid item>
            <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" component="p" />
            </Grid>
        </CardContent>
        <CardActions className={classes.CardActions}>
            <Button size="small" onClick={(e) => addToCart(product.id, 1)} className={classes.button}>
                <ShoppingCartOutlined />
            </Button>
        </CardActions>
    </Card>
  )
}

export default Product;