import React from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";

import { AddressDetailsFragment, CheckoutError, CountryCode } from "@/saleor/api";

import { messages } from "../i18n";
import Typography from "@mui/material/Typography";
import {
  Box, Button,
  Grid, styled,
} from "@mui/material";
import TextField from '@mui/material/TextField';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';

export interface AddressFormData {
  firstName: string;
  lastName: string;
  phone: string;
  country: CountryCode;
  streetAddress1: string;
  city: string;
  countryArea: string;
  postalCode: string;
}

export interface AddressFormProps {
  existingAddressData?: AddressDetailsFragment;
  toggleEdit: () => void;
  updateAddressMutation: (address: AddressFormData) => Promise<CheckoutError[]>;
}

export function AddressForm({
  existingAddressData,
  toggleEdit,
  updateAddressMutation,
}: AddressFormProps) {
  const t = useIntl();
  const {
    register: registerAddress,
    handleSubmit: handleSubmitAddress,
    formState: { errors: errorsAddress },
    setError: setErrorAddress,
  } = useForm<AddressFormData>({
    defaultValues: {
      firstName: existingAddressData?.firstName || "",
      lastName: existingAddressData?.lastName || "",
      phone: existingAddressData?.phone || "",
      country: "US",
      streetAddress1: existingAddressData?.streetAddress1 || "",
      city: existingAddressData?.city || "",
      countryArea: existingAddressData?.countryArea || "",
      postalCode: existingAddressData?.postalCode || "",
    },
  });

  const onAddressFormSubmit = handleSubmitAddress(async (formData: AddressFormData) => {
    const errors = await updateAddressMutation(formData);

    // Assign errors to the form fields
    if (errors.length > 0) {
      errors.forEach((e) =>
        setErrorAddress(e.field as keyof AddressFormData, {
          message: e.message || "",
        })
      );
      return;
    }

    // Address updated, we can exit the edit mode
    toggleEdit();
  });
  return (
    <form method="post" onSubmit={onAddressFormSubmit}>
      <Box sx={{mt:2}}>
        <Box className="col-span-full">
          {/* <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            {t.formatMessage(messages.phoneField)}
          </label> */}
          <Box className="mt-1">
            {/* <input
              type="text"
              id="phone"
              className="w-full border-gray-300 rounded-md shadow-sm text-base"
              spellCheck={false}
              {...registerAddress("phone", {
                required: true,
                pattern: /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i,
              })}
            /> */}
            <TextField
              type="text"
              id="phone"
              required
              label={t.formatMessage(messages.phoneField)}
              className="w-full border-gray-300 rounded-md shadow-sm text-base"
              spellCheck={false}
              {...registerAddress("phone", {
                required: true,
                pattern: /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i,
              })}
            />
            {!!errorsAddress.phone && <p>{errorsAddress.phone.message}</p>}
          </Box>
        </Box>

        <Box sx={{mt:1}}>
          {/* <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            {t.formatMessage(messages.firstNameField)}
          </label> */}
          <Box >
            {/* <input
              type="text"
              id="province"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
              spellCheck={false}
              {...registerAddress("firstName", {
                required: true,
              })}
            /> */}
             <TextField
              type="text"
              id="province"
              required
              label={t.formatMessage(messages.firstNameField)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
              spellCheck={false}
              {...registerAddress("firstName", {
                required: true,
              })}
            />
            {!!errorsAddress.firstName && <p>{errorsAddress.firstName.message}</p>}
          </Box>
        </Box>

        <Box sx={{mt:1}}>
          {/* <label htmlFor="province" className="block text-sm font-medium text-gray-700">
            {t.formatMessage(messages.lastNameField)}
          </label> */}
          <Box className="mt-1">
            <TextField
              type="text"
              id="lastName"
              required
              label={t.formatMessage(messages.lastNameField)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
              spellCheck={false}
              {...registerAddress("lastName", {
                required: true,
              })}
            />
            {!!errorsAddress.lastName && <p>{errorsAddress.lastName.message}</p>}
          </Box>
        </Box>

        <Box sx={{mt:1}}>
          {/* <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            {t.formatMessage(messages.addressField)}
          </label> */}
          <Box className="mt-1">
            <TextField
              type="text"
              id="streetAddress1"
              required
              label={t.formatMessage(messages.addressField)}
              className="w-full border-gray-300 rounded-md shadow-sm text-base"
              spellCheck={false}
              {...registerAddress("streetAddress1", {
                required: true,
              })}
            />
            {!!errorsAddress.streetAddress1 && <p>{errorsAddress.streetAddress1.message}</p>}
          </Box>
        </Box>

        <Box sx={{mt:1}}>
          {/* <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            {t.formatMessage(messages.cityField)}
          </label> */}
          <Box className="mt-1">
            <TextField
              type="text"
              id="city"
              required
              label={t.formatMessage(messages.cityField)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
              spellCheck={false}
              {...registerAddress("city", { required: true })}
            />
            {!!errorsAddress.city && <p>{errorsAddress.city.message}</p>}
          </Box>
        </Box>

        <Box sx={{mt:1}}>
          {/* <label htmlFor="countryArea" className="block text-sm font-medium text-gray-700">
            {t.formatMessage(messages.countryAreaField)}
          </label> */}
          <Box>
            <TextField
              type="text"
              id="countryArea"
              required
              label={t.formatMessage(messages.countryAreaField)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
              spellCheck={false}
              {...registerAddress("countryArea", { required: true })}
            />
            {!!errorsAddress.countryArea && <p>{errorsAddress.countryArea.message}</p>}
          </Box>
        </Box>

        {/* <div className="col-span-full sm:col-span-4">
        <label
          htmlFor="province"
          className="block text-sm font-medium text-gray-700"
        >
          Province
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="province"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            spellCheck={false}
          />
        </div>
      </div> */}

        <Box sx={{mt:1}}>
          {/* <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
            {t.formatMessage(messages.postalCodeField)}
          </label> */}
          <Box className="mt-1">
            <TextField
              type="text"
              id="postal-code"
              required
              label={t.formatMessage(messages.postalCodeField)}
              autoComplete="postal-code"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
              spellCheck={false}
              {...registerAddress("postalCode", {
                required: true,
              })}
            />
            {!!errorsAddress.postalCode && <p>{errorsAddress.postalCode.message}</p>}
          </Box>
        </Box>

        <Box sx={{mt:2}}>
          <Button variant="contained" onClick={onAddressFormSubmit}>
            {t.formatMessage(messages.saveButton)}
          </Button>
        </Box>
      </Box>
    </form>
  );
}
