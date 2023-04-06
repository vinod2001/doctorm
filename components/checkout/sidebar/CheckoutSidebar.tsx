import React from "react";

import { CartSummary } from "./CartSummary";
import { CheckoutDetailsFragment, LanguageCodeEnum } from "@/saleor/api";

interface CheckoutSidebarProps {
  checkout: CheckoutDetailsFragment;
  locale: LanguageCodeEnum;
}

export function CheckoutSidebar({ checkout, locale }: CheckoutSidebarProps) {
  return (
    <div>
      <CartSummary checkout={checkout} locale={locale} />
    </div>
  );
}

export default CheckoutSidebar;
