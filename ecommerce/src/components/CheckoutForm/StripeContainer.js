import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
const public_key =
  "pk_test_51KER1gSFwkcuCOaPiTIsN1lHIxbyOWkgacf47Z20dT1VdHtsi9yhUE76Nwp7byl7bMH4KrbwC0IZVhcF5QnnWn9b0017VtbsSX";
const stripeTestPromise = loadStripe(public_key);
export default function StripeContainer(props) {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm
        shippingData={props.shippingData}
        checkOutToken={props.checkOutToken}
        backStep={props.backStep}
        handleCaptureCheckout={props.handleCaptureCheckout}
        nextStep={props.nextStep}
        
      />
    </Elements>
  );
}
