import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography,Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { ShoppingCart } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import useStyles from './style';
import logo from '../products/assets/logo.png'
import {
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";
const Navbar = ({totalitems,setuser}) => {

  const logoutUser = () => {
    signOut(auth);
    setuser();
    
  };
    const classes=useStyles()
    return (
        <AppBar position='fixed' className={classes.appbar} style={{backgroundColor:'#1B224A'}}>
            <Toolbar>
            <img src={logo} alt='commerce.js'height="35px"  />
                <Typography component={Link} to='/' variant='h6' className={classes.title}>
                   E-CART
                </Typography>
                <div className={classes.grow}/>
                <div className={classes.button}>
                <IconButton component={Link} to="/cart"  aria-label="Show cart items">
              <Badge badgeContent={totalitems} color="secondary">
                <ShoppingCart  style={{color:'white',cursor:'pointer'}} />
              </Badge>
            </IconButton>
            </div>
            <ExitToAppIcon onClick={logoutUser} style={{color:'white',padding:'1vh',cursor:'pointer'}} />
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
