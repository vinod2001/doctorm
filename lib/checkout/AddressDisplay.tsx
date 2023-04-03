import { AddressDetailsFragment } from "@/saleor/api";
import { Box, Button, Grid, styled } from "@mui/material";
export interface AddressDisplayProps {
  address: AddressDetailsFragment;
}

export function AddressDisplay({ address }: AddressDisplayProps) {
  return (
    <Box className="text-base">
      <address style={{ fontSize: "16px", fontStyle: "normal" }}>
        <Box sx={{ mb: 1 }}>
          {address?.firstName} {address?.lastName}
        </Box>
        <Box sx={{ mb: 1 }}>{address?.streetAddress1}</Box>
        <Box sx={{ mb: 1 }}>
          {address?.countryArea} {address?.city}, <br />
          {address?.country.country}
        </Box>
      </address>
      <Box>{address?.phone}</Box>
    </Box>
  );
}

export default AddressDisplay;
