import React, { useState, useEffect } from "react";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import {
  Typography,
  Stepper,
  Paper,
  Step,
  StepLabel,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
import Navbar1 from '../../Navbar/Navbarlocal';
import {Link} from 'react-router-dom'
import useStyles from "./style.js";
import { commerce } from "../../../lib/commerce";
import StripeContainer from "../StripeContainer";
const steps = ["shipping address", "payment details"];
function Checkout({ cart, order, error, handleCaptureCheckout }) {
  const [activeStep, setactiveStep] = useState(0);
  const [checkOutToken, setCheckOutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyles();
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });

        setCheckOutToken(token);
      } catch (error) {}
    };
    generateToken();
  }, [cart]);
  let Confirmation = () => (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase!</Typography>
        <Divider className={classes.divider} />
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/product">Back to home</Button>
    </>
  )

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
      </>
    );
  }
  function nextStep() {
    setactiveStep((prev) => prev + 1);
  }
  function backStep() {
    setactiveStep((prev) => prev - 1);
  }
  const next = (data) => {
    setShippingData(data);
    nextStep();
  };
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkOutToken={checkOutToken} next={next} />
    ) : (
      <StripeContainer
        shippingData={shippingData}
        checkOutToken={checkOutToken}
        backStep={backStep}
        handleCaptureCheckout={handleCaptureCheckout}
        nextStep={nextStep}
        order={order}
      />
    );

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkOutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
}

export default Checkout;
