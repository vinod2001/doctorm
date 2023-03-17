// @ts-nocheck
import React from "react";
import { Roboto } from "@next/font/google";
import { Box, Grid, Theme, Link } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import Carousel from "react-material-ui-carousel";

function PdpSection() {
  return (
    <Grid container xs={12}>
      <Grid xs={6} sx={{ border: "0px solid" }}>
        <Box>test</Box>
      </Grid>
      <Grid xs={6} sx={{ border: "0px solid" }}>
        <Box>hello</Box>
      </Grid>
    </Grid>
  );
}

export default PdpSection;
