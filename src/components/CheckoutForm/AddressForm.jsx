import React, { useEffect, useContext, useState } from 'react';
import GlobalContext from '../ContextAPI/Context';
import CustomField from './CustomField';
import { Link } from 'react-router-dom';
import { Grid, Button, Typography, InputLabel, MenuItem, Select } from '@mui/material';


const AddressForm = ({checkoutToken, sendCustomerInfo}) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState("");
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const { commerce, setActiveStep } = useContext(GlobalContext);
    const [shippingData, setShippingData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        email: "",
        zip: ""
    });

    const fetchShippingCountries = async (checkoutId) => {
        try {
            const { countries } = await commerce.services.localeListShippingCountries(checkoutId);
            
            setShippingCountry(Object.keys(countries)[0]);
            setShippingCountries(countries);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchShippingSubdivisions = async (checkoutId, country) => {
        try {
            const { subdivisions } = await commerce.services.localeListShippingSubdivisions(checkoutId, country);

            setShippingSubdivision(Object.keys(subdivisions)[0]);
            setShippingSubdivisions(subdivisions);
        } catch (err) {
            console.log(err);
        }
    }
    
    const fetchShippingOptions = async (checkoutId, country, region) => {
        try {
            const options = await commerce.checkout.getShippingOptions(checkoutId, {country, region});

            setShippingOption(options[0].id);
            setShippingOptions(options);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (checkoutToken) fetchShippingCountries(checkoutToken.id);
    },[checkoutToken]);

    useEffect(() => {
        if (shippingCountry) fetchShippingSubdivisions(checkoutToken.id, shippingCountry);
    },[shippingCountry]);

    useEffect(() => {
        if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    },[shippingSubdivision]);

    const onSubmit = (e) => {
        e.preventDefault();

        setShippingData({ ...shippingData, shippingCountry, shippingSubdivision, shippingOption });
        sendCustomerInfo({ ...shippingData, shippingCountry, shippingSubdivision, shippingOption });
        setActiveStep((prevStep) => prevStep + 1);
    }

    return (
        <React.Fragment>
            <Typography variant="subtitle1" padding="10px 0">Shipping address</Typography>
            <form onSubmit={onSubmit}>
                <Grid container spacing={2}>
                    <CustomField required onChange={(e) => setShippingData({ ...shippingData, [e.target.name]: e.target.value})} value={shippingData.firstName} label="First name" name="firstName" />
                    <CustomField required onChange={(e) => setShippingData({ ...shippingData, [e.target.name]: e.target.value})} value={shippingData.lastName} label="Last Name" name="lastName" />
                    <CustomField required onChange={(e) => setShippingData({ ...shippingData, [e.target.name]: e.target.value})} value={shippingData.email} label="Email" name="email" />
                    <CustomField required onChange={(e) => setShippingData({ ...shippingData, [e.target.name]: e.target.value})} value={shippingData.city} label="City" name="city" />
                    <CustomField required onChange={(e) => setShippingData({ ...shippingData, [e.target.name]: e.target.value})} value={shippingData.address} label="Address" name="address" />
                    <CustomField required onChange={(e) => setShippingData({ ...shippingData, [e.target.name]: e.target.value})} value={shippingData.zip} label="Zip" name="zip" />
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                            {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Subdivision</InputLabel>
                        <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                            {Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.label}
                            </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Options</InputLabel>
                        <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                            {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.label}
                            </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} style={{display: "flex", justifyContent: "space-between"}}>
                        <Button type="button" component={Link} to="/cart" size="large" style={{textTransform: "capitalize"}} variant="outlined">Back to cart</Button>
                        <Button type="submit" size="large" style={{textTransform: "capitalize"}} variant="contained" color="primary">Next</Button>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    )
}

export default AddressForm;