import React, { useContext } from 'react';
import { Grid, Typography, List, ListItem, ListItemText } from '@mui/material';
import GlobalContext from '../ContextAPI/Context';

const Review = () => {
    const { checkoutToken } = useContext(GlobalContext);

    return (
        <Grid item xs={12}>
            <List disablePadding style={{padding: "20px 0"}}>
                {checkoutToken.line_items.map((cart) => (
                    <ListItem key={cart.id} style={{padding: "10px 0"}}>
                        <ListItemText primary={cart.name} secondary={`Quantity: ${cart.quantity}`} />
                        <Typography variant="subtitle1">{cart.line_total.formatted_with_symbol}</Typography>
                    </ListItem>
                ))}
            </List>
            <div style={{display: "flex",justifyContent: "space-between"}}>
                <ListItemText>Total:</ListItemText>
                <Typography variant="subtitle1" fontWeight="bold">{checkoutToken.live.subtotal.formatted_with_symbol}</Typography>
            </div>
        </Grid>
    )
}

export default Review;