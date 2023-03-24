// @ts-nocheck
import { RadioGroup } from "@headlessui/react";
import { Box, Grid, Button } from "@mui/material";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { usePaths } from "@/lib/paths";
import { translate } from "@/lib/translations";
import { ProductDetailsFragment } from "@/saleor/api";

import { useRegions } from "../RegionsProvider";
import { Sonsie_One } from "@next/font/google";

export interface VariantSelectorProps {
  product: ProductDetailsFragment;
  selectedVariantID?: string;
}

export function VariantSelector({
  product,
  selectedVariantID,
  pdpLayout,
}: VariantSelectorProps) {
  const paths = usePaths();
  const router = useRouter();
  const { formatPrice } = useRegions();

  const [selectedVariant, setSelectedVariant] = useState(selectedVariantID);

  const { variants } = product;

  const { frameCode, frameImage } = pdpLayout;

  const cars = ["Saab", "Volvo", "BMW"];

  function getCity(city) {
    return city === "BMW";
  }

  // Skip displaying selector when theres less than 2 variants
  if (!variants || variants.length === 1) {
    return null;
  }

  const onChange = (value: string) => {
    setSelectedVariant(value);
    void router.replace(
      paths.products
        ._slug(product.slug)
        .$url({ ...(value && { query: { variant: value } }) }),
      undefined,
      {
        shallow: true,
        scroll: false,
      }
    );
  };

  return (
    <div className="w-full">
      <RadioGroup value={selectedVariant} onChange={onChange}>
        <div className="space-y-4">
          {variants.map((variant) => (
            <RadioGroup.Option key={variant.id} value={variant.id}>
              <div>
                <RadioGroup.Label>
                  {translate(variant, "name")}
                </RadioGroup.Label>
              </div>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}

export default VariantSelector;