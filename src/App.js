import React from 'react';
import { GlobalContextProvider } from './components/ContextAPI/Context';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header, Products, Cart, Checkout } from './components';
import { Grow, Grid } from '@mui/material';

function App() {
  return (
    <GlobalContextProvider>
      <Router>
        <Grow in>
          <Grid container>
            <Header />
            <Routes>
              <Route path="/" element={<Navigate to="/products" />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </Grid>
        </Grow>
      </Router>
    </GlobalContextProvider>
  );
}

export default App;