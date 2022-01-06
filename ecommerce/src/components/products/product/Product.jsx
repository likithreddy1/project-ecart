import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './style';

const Product = ({product,addToCart}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={product.image.url} title={product.name} />
      <div className={classes.cardbackground}>
      <CardContent>
        <div className={classes.cardContent}   >
          <Typography gutterBottom variant="h5"component="h2" style={{fontSize:'3vh',color:"black",fontFamily: 'Rosarivo'}}>
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2" style={{fontSize:'3vh',color:"black",fontFamily: 'Rosarivo'}}>
            {product.price.formatted_with_symbol}
          </Typography>
        </div>
              </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label="Add to Cart" onClick={()=>addToCart(product.id,1)}>
          <AddShoppingCart className={classes.AddShoppingCart} style={{color:'#C7DFC1'}}/>
        </IconButton>
      </CardActions>
      </div>
    </Card>
  );
};

export default Product;