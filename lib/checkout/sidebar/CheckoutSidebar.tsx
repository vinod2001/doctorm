import React from "react";
import { useIntl } from "react-intl";

import { CartSummary } from "./CartSummary";
import { CheckoutDetailsFragment } from "@/saleor/api";

interface CheckoutSidebarProps {
  checkout: CheckoutDetailsFragment;
}

export function CheckoutSidebar({ checkout }: CheckoutSidebarProps) {
  return (
    <div>
      <CartSummary checkout={checkout} />
    </div>
  );
}

export default CheckoutSidebar;
