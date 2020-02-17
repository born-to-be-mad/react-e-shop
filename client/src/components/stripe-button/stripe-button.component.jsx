import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100; //USD cents
  const publishableKey = "pk_test_9LU78oXtdp4y0aZRgkVxOnYx00Bvk601Oc";

  const onToken = token => {
    console.log("Making payment with the token:" + token);
    axios({
      url: "payment",
      method: "POST",
      data: {
        amount: priceForStripe,
        token
      }
    })
      .then(response => {
        alert("Payment successfull");
      })
      .catch(error => {
        console.log("Payment failed: ", error);
        alert("Payment failed. Please check your credit card");
      });
  };

  return (
    <StripeCheckout
      label=" Pay Now"
      name="E-shop Ltd."
      billingAddress
      shippingAddress
      image="" //link to image
      description={`Your total ois $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
