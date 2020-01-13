import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100; //USD cents
  const publishableKey = "pk_test_9LU78oXtdp4y0aZRgkVxOnYx00Bvk601Oc";

  const onToken = token => {
    console.log(token);
    alert("Payment successfull");
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
