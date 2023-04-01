// @ts-nocheck
// import { RadioGroup } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";

import { messages } from "@/lib/i18n";
import { CheckoutDetailsFragment,LanguageCodeEnum } from "@/saleor/api";

import { DUMMY_CREDIT_CARD_GATEWAY, DummyCreditCardSection } from "./DummyCreditCardSection";
import { STRIPE_GATEWAY, StripeCreditCardSection } from "./StripeCreditCardSection";
import Typography from "@mui/material/Typography";
import {
  Box, Button,
  Grid, styled,Card
} from "@mui/material";
import TextField from '@mui/material/TextField';
import Looks5Icon from '@mui/icons-material/Looks5';
import {checkoutSectionHeaderActive} from '../EmailSection';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export interface PaymentSectionProps {
  checkout: CheckoutDetailsFragment;
  active: boolean;
  locale: LanguageCodeEnum;
}

export function PaymentSection({ checkout, active, locale }: PaymentSectionProps) {
  const t = useIntl();
  const existingGateways = [STRIPE_GATEWAY, DUMMY_CREDIT_CARD_GATEWAY];
  const availableGateways = checkout.availablePaymentGateways.filter((g) =>
    existingGateways.includes(g.id)
  );

  const [chosenGateway, setChosenGateway] = useState("");

  const handleGateWay:any = (e:any) => {
    setChosenGateway(e.target.value)
  }
  useEffect(()=>{
    console.log('chosenGateway:'+chosenGateway)
  },[chosenGateway])

  return (
    <>
      <Box sx={{display:'flex',alignItems:'center', mt:2}}>
      <Box><Looks5Icon/></Box><Box sx={checkoutSectionHeaderActive}
          className={active ? "checkout-section-header-active" : "checkout-section-header-disabled"}
        >
          {t.formatMessage(messages.paymentCardHeader)}
        </Box>
      </Box>
      {active && (
        <>
          <Box>
              <Card sx={{p:2}}>
              <Box className="block">
            <Box className="text-gray-700 text-base">
              {t.formatMessage(messages.paymentInstruction)}
            </Box>
           
            <form>
            <FormControl>
            <RadioGroup value={chosenGateway}  onChange={handleGateWay}  className="mt-2">
              {availableGateways.map((gateway) => (
                // <RadioGroup.Option key={gateway.id} value={gateway.id}>
                //   <label className="inline-flex items-center" htmlFor={gateway.id}>
                //     <input
                //       type="radio"
                //       className="form-radio"
                //       name="radio"
                //       value={gateway.id}
                //       id={gateway.id}
                //     />
                //     <span className="ml-2 text-base">{gateway.name}</span>
                //   </label>
                // </RadioGroup.Option>
                <FormControlLabel  key={gateway.id} value={gateway.id} control={<Radio />} label={gateway.name} />
              ))}
            </RadioGroup>
            </FormControl>
            </form>
          </Box>
          {chosenGateway === DUMMY_CREDIT_CARD_GATEWAY && (
            <DummyCreditCardSection checkout={checkout}/>
          )}
          {chosenGateway === STRIPE_GATEWAY && <StripeCreditCardSection checkout={checkout} locale={locale}/>}
              </Card>
              </Box>
          
        </>
      )}
    </>
  );
}

export default PaymentSection;
