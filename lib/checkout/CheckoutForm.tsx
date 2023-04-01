import React from "react";

import { useCheckout } from "@/lib/providers/CheckoutProvider";
import { useRegions } from "@/components/RegionsProvider";
import { CheckoutDetailsFragment } from "@/saleor/api";

import { BillingAddressSection } from "./BillingAddressSection";
import { EmailSection } from "./EmailSection";
import { PaymentSection } from "./payments/PaymentSection";
import { ShippingAddressSection } from "./ShippingAddressSection";
import { ShippingMethodSection } from "./ShippingMethodSection";
import {
  Box, Button,
  Grid, styled,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { Roboto } from "@next/font/google";

interface CollapsedSections {
  billingAddress: boolean;
  shippingAddress: boolean;
  shippingMethod: boolean;
  payment: boolean;
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const sectionsManager = (checkout?: CheckoutDetailsFragment): CollapsedSections => {
  // Will hide sections which cannot be set yet during the checkout
  // Start with all the sections hidden
  const state: CollapsedSections = {
    billingAddress: true,
    shippingAddress: true,
    shippingMethod: true,
    payment: true,
  };
  if (!checkout || !checkout.email) {
    return state;
  }
  state.billingAddress = false;
  if (!checkout.billingAddress) {
    return state;
  }
  state.shippingAddress = false;
  if (checkout.isShippingRequired && !checkout.shippingAddress) {
    return state;
  }
  state.shippingMethod = false;
  if (checkout.isShippingRequired && !checkout.shippingMethod) {
    return state;
  }
  state.payment = false;
  return state;
};

export function CheckoutForm({ locale }) {
  const { checkout } = useCheckout();
  if (!checkout) {
    return null;
  }

  const collapsedSections = sectionsManager(checkout);

  return (
    <section className={roboto.className}>
      <Box sx={{mb:2}}>
        <EmailSection checkout={checkout} locale={locale} />
      </Box>
      <Divider/>
      <Box sx={{mb:2}}>
        <BillingAddressSection active={!collapsedSections.billingAddress} checkout={checkout} locale={locale} />
      </Box>
      <Divider/>
      {checkout.isShippingRequired && (
        <Box sx={{mb:2}}>
          <ShippingAddressSection active={!collapsedSections.shippingAddress} checkout={checkout} locale={locale} />
        </Box>
      )}
      <Divider/>
      {/* {checkout.isShippingRequired && (
        <Box sx={{mb:2}}>
          <ShippingMethodSection active={!collapsedSections.shippingMethod} checkout={checkout} locale={locale} />
        </Box>
      )} */}
      <Box sx={{mb:2}}>
          <ShippingMethodSection active={!collapsedSections.shippingMethod} checkout={checkout} locale={locale} />
        </Box>
      <Divider/>
      <Box className="checkout-section-container">
        <PaymentSection active={!collapsedSections.payment} checkout={checkout} locale={locale} />
      </Box>
    </section>
  );
}

export default CheckoutForm;

