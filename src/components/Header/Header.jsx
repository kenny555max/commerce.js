import React, { useContext } from 'react';
import GlobalContext from '../ContextAPI/Context';
import { AppBar, Button, Toolbar, Typography, Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../img/commerce.png';
import useStyles from './Styles';

const Header = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const location = useLocation();
  const { carts } = useContext(GlobalContext);
  
  return (
    <AppBar position="static" className={classes.AppBar}>
      <Toolbar className={classes.Toolbar}>
        <Link to="/" className={classes.logo}>
          <img src={logo} width="40px" height="40px" alt="logo" />
          <Typography variant="h6" marginLeft="10px" fontWeight="bold">Commerce.js</Typography>
        </Link>
        {location.pathname === "/products" && (
          <div className="">
            <Badge component={Link} to="/cart" badgeContent={0}
             color="success">
              <ShoppingCart />
            </Badge>
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header;