import Signup from "../home/Signup";
import Navbar from "../home/Navbar";
import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import theme from "../home/theme";
import HomeApp from "../home/HomeApp";
import Home from "../home/Home";
import { Grid } from "@material-ui/core";
import Login from "../home/Login";
import Products from "./products/products";
import Navbar1 from "./Navbar/Navbarlocal";
import { commerce } from "../lib/commerce";
import Cart from "./Cart/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from "./CheckoutForm/Checkout/Checkout";
export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setcart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  //handles logs
  //fetch data
  const fetchdata = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  //fetch cart
  const fetchCart = async () => {
    setcart(await commerce.cart.retrieve());
  };

  //useEffect for fetching data
  useEffect(() => {
    fetchdata();
    fetchCart();
  }, []);

  //handlecart

  const handleCart = async (productid, quantity) => {
    const item = await commerce.cart.add(productid, quantity);
    setcart(item.cart);
  };

  //update cart quantity
  const handlequantity = async (productid, quantity) => {
    const { cart } = await commerce.cart.update(productid, { quantity });
    setcart(cart);
  };

  //remove from cart
  const removecart = async (productid) => {
    const response = await commerce.cart.remove(productid);
    setcart(response.cart);
  };

  // empty your cart

  const emptycart = async () => {
    const response = await commerce.cart.empty();
    setcart(response.cart);
  };
  //handleCaptureCheckout
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    setcart({});
    refreshCart();
  };

  //refresh our cart
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setcart(newCart);
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
       <Route path='/' element={<HomeApp/>}/>
          <Route
            path="/product"
            element={<Products products={products} addToCart={handleCart}  totalitems={cart.total_items}/>}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart1={cart}
                handlequantity={handlequantity}
                removecart={removecart}
                emptycart={emptycart}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                order={order}
                handleCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
