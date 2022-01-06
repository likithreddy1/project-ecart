import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

import useStyles from './Style';

const CartItem = ({ item,removecart,handlequantity}) => {
  const handleUpdateCartQty = (lineItemId, newQuantity) => handlequantity(lineItemId, newQuantity);

  const handleRemoveFromCart = (lineItemId) => removecart(lineItemId);
  const classes = useStyles();
  return (
    <Card className="cart-item">
      {/* <CardMedia image={item.image.url} alt={item.name} className={classes.media} /> */}
      <CardContent className={classes.cardContent}>
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="subtext">{item.line_total.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions className={classes.cartActions}>
        <div className={classes.buttons}>
          <Button type="button" size="small"onClick={()=>handleUpdateCartQty(item.id,item.quantity-1)}>-</Button>
          <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
          <Button type="button" size="small"onClick={()=>handleUpdateCartQty(item.id,item.quantity+1)}>+</Button>
        </div>
        <Button variant="contained" type="button" color="secondary" onClick={()=>handleRemoveFromCart(item.id)}>Remove</Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;