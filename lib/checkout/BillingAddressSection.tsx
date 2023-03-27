import React, { useState } from "react";
import { useIntl } from "react-intl";

import { notNullable } from "@/lib/util";
import { CheckoutDetailsFragment, useCheckoutBillingAddressUpdateMutation, LanguageCodeEnum } from "@/saleor/api";
import { Button } from "@mui/material";
import { messages } from "@/lib/i18n";
import { AddressDisplay } from "./AddressDisplay";
import { AddressForm, AddressFormData } from "./AddressForm";
import { useUser } from "@/lib/useUser";

export interface BillingAddressSection {
  active: boolean;
  checkout: CheckoutDetailsFragment;
  locale: LanguageCodeEnum
}

export function BillingAddressSection({ active, checkout, locale }: BillingAddressSection) {
  const t = useIntl();
  const { authenticated } = useUser();
  const [editing, setEditing] = useState(!checkout.billingAddress);
  const [checkoutBillingAddressUpdate] = useCheckoutBillingAddressUpdateMutation({});


  const updateMutation = async (formData: AddressFormData) => {
    const { data } = await checkoutBillingAddressUpdate({
      variables: {
        address: {
          ...formData,
        },
        token: checkout.token,
        locale: locale,
      },
    });
    setEditing(false);
    return data?.checkoutBillingAddressUpdate?.errors.filter(notNullable) || [];
  };

  return (
    <>
      <div className="mt-4 mb-4">
        <h2
          className={active ? "checkout-section-header-active" : "checkout-section-header-disabled"}
        >
          {t.formatMessage(messages.billingAddressCardHeader)}
        </h2>
      </div>
      {active &&
        (editing ? (
          <>
            <AddressForm
              existingAddressData={checkout.billingAddress || undefined}
              toggleEdit={() => setEditing(false)}
              updateAddressMutation={updateMutation}
            />
          </>
        ) : (
          <section className="flex justify-between items-center mb-4">
            {!!checkout.billingAddress && <AddressDisplay address={checkout.billingAddress} />}
            <Button onClick={() => setEditing(true)}>
              {t.formatMessage(messages.changeButton)}
            </Button>
          </section>
        ))}
    </>
  );
}

export default BillingAddressSection;
