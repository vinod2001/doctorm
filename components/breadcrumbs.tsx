// @ts-nocheck
import React from "react";
import { Roboto } from "@next/font/google";
import { Box, Grid, Theme, Link } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const linkDetails = {
  color: "#343434",
};

function BreadcrumbsDetails() {
  const bredcrumbsItems = ["home", "Sunglasses", "Women", "Ray-Ban"];
  return (
    <Box sx={{ ml: 6, mt: 2 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {bredcrumbsItems.map((items, index) =>
          items === "home" ? (
            <Link
              href="/product/pdp"
              key={index}
              sx={linkDetails}
              underline="hover"
            >
              <HomeOutlinedIcon />
            </Link>
          ) : (
            <Link href="#" key={index} sx={linkDetails} underline="hover">
              {items}
            </Link>
          )
        )}
      </Breadcrumbs>
    </Box>
  );
}

export default BreadcrumbsDetails;
