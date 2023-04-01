import React, { useState } from "react";
import { useIntl } from "react-intl";

import { notNullable } from "@/lib/util";
import { CheckoutDetailsFragment, useCheckoutBillingAddressUpdateMutation, LanguageCodeEnum } from "@/saleor/api";
import { messages } from "@/lib/i18n";
import { AddressDisplay } from "./AddressDisplay";
import { AddressForm, AddressFormData } from "./AddressForm";
import { useUser } from "@/lib/useUser";
import Typography from "@mui/material/Typography";
import {
  Box, Button,
  Grid, styled,Card
} from "@mui/material";
import TextField from '@mui/material/TextField';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import {checkoutSectionHeaderActive} from './EmailSection'
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
      <Box sx={{display:'flex',alignItems:'center', mt:2}}>
        <Box><LooksTwoIcon/></Box><Typography
            sx={checkoutSectionHeaderActive}
          >
            {t.formatMessage(messages.billingAddressCardHeader)}
          </Typography>
      </Box>
      
      {active &&
        (
          <Box>
        <Card sx={{p:2}}>
          {editing ? (
          <>
            <AddressForm
              existingAddressData={checkout.billingAddress || undefined}
              toggleEdit={() => setEditing(false)}
              updateAddressMutation={updateMutation}
            />
          </>
        ) : (
          <Box sx={{mt:2}}>
            {!!checkout.billingAddress && <AddressDisplay address={checkout.billingAddress} />}
            <Button variant="contained" sx={{mt:2}} onClick={() => setEditing(true)}>
              {t.formatMessage(messages.changeButton)}
            </Button>
          </Box>
        )}
        </Card>
        </Box>
        )}
        
    </>
  );
}

export default BillingAddressSection;
