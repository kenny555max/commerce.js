import React, { useContext } from 'react';
import { Grid, Typography, Button, Divider } from '@mui/material';
import Review from './Review';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import GlobalContext from '../ContextAPI/Context';

const Payment = ({customerInfo}) => {
    const { checkoutToken, commerce, setCarts, nextStep, setOrder, setErrorMessage, setActiveStep } = useContext(GlobalContext);

    const stripe = useStripe();
    const elements = useElements();
    
    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();

        setCarts(newCart);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (elements == null) {
          return;
        }
    
        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement),
        });

        if (error) {
            console.log(error);
        }else{
            try{
                const orderData = {
                    line_items: checkoutToken.live.line_items,
                    customer: {
                        firstname: customerInfo.firstName,
                        lastname: customerInfo.lastName,
                        email: customerInfo.email
                    },
                    shipping: {
                        name: "Local Shipping Option",
                        street: customerInfo.address,
                        town_city: customerInfo.city,
                        county_state: customerInfo.shippingSubdivision,
                        postal_zip_code: customerInfo.zip,
                        country: customerInfo.shippingCountry
                    },
                    fulfillment: {
                        shipping_method: customerInfo.shippingOption
                    },
                    billing: {
                        name: customerInfo.firstName,
                        street: customerInfo.address,
                        town_city: customerInfo.city,
                        county_state: customerInfo.shippingSubdivision,
                        postal_zip_code: customerInfo.zip,
                        country: customerInfo.shippingCountry
                    },
                    payment: {
                        gateway: 'stripe',
                        stripe: {
                            payment_method_id: paymentMethod.id
                        }
                    }
                }
                
                const incomingOrder = await commerce.checkout.capture(checkoutToken.id, orderData);
            
                console.log(incomingOrder);
                setOrder(incomingOrder);
                // refreshCart();

                nextStep();
            }catch(error){
                console.log(error);
            }
        }
    }

    return (
        <Grid container marginTop="40px">
            <Typography variant="subtitle1">Order summary</Typography>
            <Review />
            <Divider />
            <Typography variant="subtitle1" margin="10px 0">Payment Method</Typography>
            <form onSubmit={handleSubmit} style={{width: "100%"}}>
                <CardElement />
                <div style={{display: "flex", marginTop: "15px", justifyContent: "space-between"}}>
                    <Button type="submit" onClick={() => setActiveStep((prevStep) => prevStep - 1)} variant="outlined">Back</Button>
                    <Button type="submit" variant="contained" color="primary" disabled={!stripe || !elements}>
                        Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                    </Button>
                </div>
            </form>
        </Grid>
    )
}

export default Payment;