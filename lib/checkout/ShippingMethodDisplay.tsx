import { translate } from "@/lib/translations";
import { DeliveryMethodFragment } from "@/saleor/api";
import { formatPrice } from "@/lib/util";
import {
  Box, Button,
  Grid, styled,Card
} from "@mui/material";
import TextField from '@mui/material/TextField';
import {checkoutSectionHeaderActive} from './EmailSection';
import Typography from "@mui/material/Typography";

export interface ShippingMethodDisplayProps {
  method: DeliveryMethodFragment;
}

export function ShippingMethodDisplay({ method }: ShippingMethodDisplayProps) {
  return (
    <Box>
      <Box sx={{fontSize:'16px', fontWeight:'bold'}}>{translate(method, "name")}</Box>
      <Box >
        {method.minimumDeliveryDays || 2}-{method.maximumDeliveryDays || 14}  business days
      </Box>
      <Box className="mt-6 text-sm font-medium text-gray-900"> {formatPrice(method.price, null)}</Box>
    </Box>
  );
}

export default ShippingMethodDisplay;
