import React, { useEffect, useState } from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Review from "./Review";
import axios from "axios";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const public_key =
  "pk_test_51KER1gSFwkcuCOaPiTIsN1lHIxbyOWkgacf47Z20dT1VdHtsi9yhUE76Nwp7byl7bMH4KrbwC0IZVhcF5QnnWn9b0017VtbsSX";
const stripeTestPromise = loadStripe(public_key);
function PaymentForm(props) {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    console.log(elements);
    e.preventDefault();
    const  payment = await stripe.createPaymentMethod({
      type: "card",
      card: {
        number: "4242424242424242",
        exp_month: 1,
        exp_year: 2023,
        cvc: "314",
      },
    });
    console.log(payment);
    if (!payment.error) {
      try {
        const { id } = payment.paymentMethod;
        const response = await axios.post("https://localhost:3000/payment", {
          amount: 1000,
          id,
        });

        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(payment.error.message);
    }
    const orderData = {
      line_items: props.checkOutToken.live.line_items,
      customer: {
        firstname: props.shippingData.firstName,
        lastname: props.shippingData.lastName,
        email: props.shippingData.email,
      },
      shipping: {
        name: "International",
        street: props.shippingData.address1,
        town_city: props.shippingData.city,
        county_state: props.shippingData.shippingSubdivision,
        postal_zip_code: props.shippingData.zip,
        country: props.shippingData.shippingCountry,
      },
      fulfillment: { shipping_method: props.shippingData.shippingOption },
    };
    props.handleCaptureCheckout(props.checkOutToken.id, orderData);
    props.nextStep();
  };
  return (
    <>
      {!success ? (
        <Elements stripe={stripeTestPromise}>
          <Review token={props.checkOutToken} />
          <Divider />
          <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
            Payment Method
          </Typography>
          <form onSubmit={(e) => handleSubmit(e)}>
            <CardElement />
            <br /> <br />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="outlined" onClick={props.backStep}>
                Back
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Pay {props.checkOutToken.live.subtotal.formatted_with_symbol}
              </Button>
            </div>
          </form>
        </Elements>
      ) : (
        <div>
          <h2>you just bought a product</h2>
        </div>
      )}
    </>
  );
}

export default PaymentForm;
