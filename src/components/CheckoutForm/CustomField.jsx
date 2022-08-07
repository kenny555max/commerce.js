import React from 'react';
import { TextField, Grid } from '@mui/material';

const CustomField = ({ name, label, value, onChange }) => {
    
    return (
        <Grid item xs={12} sm={6}>
            <TextField
                name={name}
                label={label}
                onChange={onChange}
                fullWidth
                value={value}
                required
            />
        </Grid>
    )
}

export default CustomField;