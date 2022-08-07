import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import GlobalContext from '../../ContextAPI/Context';
import { Paper, Grow, Typography, Stepper, StepLabel, Step, Toolbar, Container } from '@mui/material';
import AddressForm from '../AddressForm';
import Payment from '../Payment';
import Confirm from '../Confirm';
import useStyles from './Styles';

import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51LQLRUDg5tVD7nwYr1Azn4WBW9DqzY39dnGJD0OlOD5MGQ5PtMjG6vojS7Y7OK5DZAjOHM9yLEhd1oskVm1vDlkB00naNLzLQU');

const steps = ["Shipping address", "Payment details"];

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const Checkout = () => {
    const classes = useStyles();
    const query = useQuery();
    const cartId = query.get("cartId");
    const { generateToken, activeStep, checkoutToken } = useContext(GlobalContext);
    const [customerInfo, sendCustomerInfo] = useState({});

    useEffect(() => {
       if (cartId) generateToken(cartId);
    },[cartId]);

    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} sendCustomerInfo={sendCustomerInfo} /> : <Elements stripe={stripePromise}><Payment customerInfo={customerInfo} /></Elements>

    return(
        <Grow in>
            <Container className={classes.container}>
                <Paper elevation={2} className={classes.paper}>
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h6" fontWeight="bold" textAlign="center" width="100%">Checkout</Typography>
                    </Toolbar>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirm /> : checkoutToken && <Form />}
                </Paper>
            </Container>
        </Grow>
    )
}

export default Checkout;