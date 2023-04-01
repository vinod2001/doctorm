import { CardElement, CardNumberElement, CardExpiryElement, CardCvcElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

import { usePaths } from "@/lib/paths";
import { useCheckout } from "@/lib/providers/CheckoutProvider";
import {
  CheckoutDetailsFragment,
  useCheckoutCompleteMutation,
  useCheckoutPaymentCreateMutation,
  LanguageCodeEnum,
} from "@/saleor/api";

import { formatPrice } from "@/lib/util";

import { CompleteCheckoutButton } from "../CompleteCheckoutButton";

export const STRIPE_GATEWAY = "saleor.payments.stripe";
import {
  Box, Button,
  Grid, styled,Card, Typography
} from "@mui/material";
import TextField from '@mui/material/TextField';
import Looks5Icon from '@mui/icons-material/Looks5';
import {checkoutSectionHeaderActive} from '../EmailSection';

interface StripeCardFormInterface {
  checkout: CheckoutDetailsFragment;
}

function StripeCardForm({ checkout }: StripeCardFormInterface) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { resetCheckoutToken } = useCheckout();
  const [checkoutPaymentCreateMutation] = useCheckoutPaymentCreateMutation();
  const [checkoutCompleteMutation] = useCheckoutCompleteMutation();
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const paths = usePaths();
  const locale = router.query.locale?.toString();
  const totalPrice = formatPrice(checkout.totalPrice?.gross, locale);
  const payLabel = `Pay ${totalPrice}`;

  const redirectToOrderDetailsPage = (orderId: string) => {
    resetCheckoutToken();
    void router.push(paths.order._orderId(orderId).$url());
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsPaymentProcessing(true);

    if (elements === null || stripe === null) {
      setIsPaymentProcessing(false);

      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error("Card element not initialized");
      setIsPaymentProcessing(false);
      return;
    }

    // Create Stripe payment
    const paymentMethodResult = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: checkout.billingAddress
        ? {
          email: checkout.email || "",
          phone: checkout.billingAddress.phone || "",
          name: `${checkout.billingAddress.firstName} ${checkout.billingAddress.lastName}`,
          address: {
            line1: checkout.billingAddress.streetAddress1,
            city: checkout.billingAddress.city,
            country: checkout.billingAddress.country.code,
            postal_code: checkout.billingAddress.postalCode,
          },
        }
        : undefined,
    });

    if (paymentMethodResult.error || !paymentMethodResult.paymentMethod) {
      console.error("[error]", paymentMethodResult.error);
      setIsPaymentProcessing(false);
      return;
    }

    // Send Stripe payment data to the Saleor
    const { errors: paymentCreateErrors } = await checkoutPaymentCreateMutation({
      variables: {
        checkoutToken: checkout.token,
        paymentInput: {
          gateway: "saleor.payments.stripe",
          amount: checkout.totalPrice?.gross.amount,
          token: paymentMethodResult.paymentMethod.id
        },
      },
    });

    if (paymentCreateErrors) {
      console.error(paymentCreateErrors);
      setIsPaymentProcessing(false);
      return;
    }

    // Try to complete the checkout
    const { data: completeData, errors: completeErrors } = await checkoutCompleteMutation({
      variables: {
        checkoutToken: checkout.token,
      },
    });
    if (completeErrors) {
      console.error("complete errors:", completeErrors);
      setIsPaymentProcessing(false);
      return;
    }

    let order = completeData?.checkoutComplete?.order;
    // Additional payment action is needed (ex. 3D Secure)
    if (completeData?.checkoutComplete?.confirmationNeeded) {
      // Parse data for the Stripe
      const confirmationData = JSON.parse(
        completeData?.checkoutComplete?.confirmationData || ""
      ) as { client_secret: string };

      // Execute additional action at Stripe
      const stripeConfirmationResponse = await stripe.confirmCardPayment(
        confirmationData.client_secret,
        {
          payment_method: paymentMethodResult.paymentMethod.id,
        }
      );

      if (stripeConfirmationResponse.error) {
        console.error("Stripe payment confirmation error: ", stripeConfirmationResponse.error);
        setIsPaymentProcessing(false);
        return;
      }

      // Try to complete checkout
      const { data: confirmedCompleteData, errors: confirmedCompleteErrors } =
        await checkoutCompleteMutation({
          variables: {
            checkoutToken: checkout.token
          },
        });

      if (confirmedCompleteErrors) {
        console.error(
          "Errors during checkout completion after the confirmation: ",
          confirmedCompleteErrors
        );
        setIsPaymentProcessing(false);
        return;
      }
      order = confirmedCompleteData?.checkoutComplete?.order;
    }

    // If there are no errors during payment and confirmation, order should be created
    if (order) {
      redirectToOrderDetailsPage(order.id);
    } else {
      console.error("Order was not created");
    }
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      {/* <CardElement /> */}
      <Box sx={{width:'300px'}}>
        <Box>
          <Typography>
          Card Number*
          </Typography>
          <Box sx={{border:'0px solid #000', borderRadius:'5px',p:1, background:'#d4d4d4'}}>
          <CardNumberElement />
          </Box>
        </Box>
        <Box>
          <Typography>
          Expiry Date*
          </Typography>
          <Box sx={{border:'0px solid #000', borderRadius:'5px',p:1, background:'#d4d4d4'}}>
          <CardExpiryElement/>
          </Box>
        </Box>
        <Box>
          <Typography>
          CVC*
          </Typography>
          <Box sx={{border:'0px solid #000', borderRadius:'5px',p:1, background:'#d4d4d4'}}>
          <CardCvcElement/>
          </Box>
        </Box>
        
        
      </Box>
      <CompleteCheckoutButton
        isProcessing={isPaymentProcessing}
        isDisabled={!stripe || !elements || isPaymentProcessing}
      >
        {payLabel}
      </CompleteCheckoutButton>
    </form>
  );
}

interface StripeCreditCardSectionInterface {
  checkout: CheckoutDetailsFragment;
  locale: LanguageCodeEnum;
}

export function StripeCreditCardSection({ checkout, locale }: StripeCreditCardSectionInterface) {
  const stripeGateway = checkout.availablePaymentGateways.find(
    (gateway) => gateway.id === STRIPE_GATEWAY
  );
  const stripeApiKey = stripeGateway?.config.find((conf) => conf.field === "api_key")?.value;

  if (!stripeApiKey) {
    return (
      <div className="py-8">
        <h3 className="text-lg font-medium text-gray-900">Payment Details</h3>
        <p>Stripe cannot be initialized - missing configuration</p>
      </div>
    );
  }
  const stripePromise = loadStripe(stripeApiKey);

  return (
    <div className="py-8">
      <Elements stripe={stripePromise}>
        <StripeCardForm checkout={checkout} />
      </Elements>
    </div>
  );
}

export default StripeCreditCardSection;
