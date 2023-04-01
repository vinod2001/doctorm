import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";

import { translate } from "@/lib/translations";
import { DeliveryMethodFragment, LanguageCodeEnum } from "@/saleor/api";
import { formatPrice } from "@/lib/util";
import {
  Box, Button,
  Grid, styled,Card,Divider
} from "@mui/material";
import TextField from '@mui/material/TextField';
import {checkoutSectionHeaderActive} from './EmailSection';
import Typography from "@mui/material/Typography";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export interface ShippingMethodOptionProps {
  method: DeliveryMethodFragment;
  locale: LanguageCodeEnum;
}

export function ShippingMethodOption({ method }: ShippingMethodOptionProps) {

  return (
    <RadioGroup.Option
      key={method.id}
      value={method}
      className={({ checked, active }) =>
        clsx(
          checked ? "border-transparent" : "border-gray-300",
          active ? "ring-1 ring-blue-500" : "",
          "bg-white border rounded shadow-sm p-4 flex cursor-pointer"
        )
      }
    >
      {({ checked, active }) => (
        <>
          <Box sx={{mb:1, display:'flex', justifyContent:'flex-start', '&:hover':{
            color:'#F7961C'
          }}}>
            <Box><ArrowRightIcon/></Box>
            <Box >
              <RadioGroup.Label as="span" style={{fontSize:'16px', fontWeight:'bold', display:'block'}} className="block text-base font-medium text-gray-900">
                {translate(method, "name")}
              </RadioGroup.Label>
              <RadioGroup.Description
                as="span"
                className="mt-1 flex items-center text-sm text-gray-500"
                style={{paddingLeft:'0px', display:'block'}}
              >
                {method.minimumDeliveryDays || 2}-{method.maximumDeliveryDays || 14} business days
              </RadioGroup.Description>
              <RadioGroup.Description as="span" style={{paddingLeft:'0px', display:'block'}}>
                {formatPrice(method.price, null)}
              </RadioGroup.Description>
            </Box>
          </Box>
          {/* <div
            className={clsx(
              active ? "border" : "border-2",
              checked ? "border-blue-500" : "border-transparent",
              "absolute -inset-px rounded pointer-events-none"
            )}
            aria-hidden="true"
          /> */}
          <Divider sx={{mb:2}}/>
        </>
      )}
    </RadioGroup.Option>
  );
}
