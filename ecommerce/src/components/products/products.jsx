import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Navbar1 from '../Navbar/Navbarlocal';
import CartItem from './CartItem/CartItem';
import useStyles from './Style';

const Cart = ({ cart1, handlequantity, removecart, emptycart }) => {
  const classes = useStyles();

  const handleEmptyCart = () => emptycart();

  const renderEmptyCart = () => (
    <Typography variant="h3" style={{ fontFamily: 'Rosarivo'}}>You have no items in your shopping cart,
      <Link className={classes.link} to="/"><Button color='secondary' variant='contained' style={{ fontFamily: 'Rosarivo'}}>Return to Home</Button></Link>
    </Typography>
  );

  if (!cart1.line_items) return 'Loading';

  const renderCart = () => (
    <>
      <Grid container spacing={3}>
        {cart1.line_items.map((lineItem) => (
          <Grid item xs={12} sm={4} key={lineItem.id}>
            <CartItem item={lineItem} handlequantity={handlequantity} removecart={removecart} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">Subtotal: {cart1.subtotal.formatted_with_symbol}</Typography>
        <div>
          <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty cart</Button>
          <Button className={classes.checkoutButton} component={Link} to="/checkout" size="large" type="button" variant="contained" color="primary" disabled={!cart1.line_items.length}>Checkout</Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h6" gutterBottom>Your Shopping Cart</Typography>
      { !cart1.line_items.length ? renderEmptyCart() : renderCart() }
    </Container>
  );
};

export default Cart;