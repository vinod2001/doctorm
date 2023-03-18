// @ts-nocheck
// [slug].tsx
import React from "react";
import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import client from "../../client";
import Header from "../../components/header";
import PdpDetail from "../../components/pdpDetail";
import BreadcrumbsDetails from "../../components/breadcrumbs";
import { Box, Grid, Button } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Divider from "@mui/material/Divider";
import { Roboto } from "@next/font/google";
import DoneIcon from "@mui/icons-material/Done";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});
function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const space = {
  mr: 2,
  ml: 2,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
};
const tickColor = {
  color: "#F7961C",
};
const title = {
  fontSize: "28px",
};
const dis = {
  fontSize: "20px",
  mt: 2,
  mb: 4,
};
const productDis = {
  width: "80%",
};
const types = {
  p: 2,
  borderRadius: "50px",
  background: "#F1ECE1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "65%",
  pr: 6,
  pl: 6,
};
const ptComponents = {
  types: {
    image: ({ value, index }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          alt={value.alt || " "}
          loading="lazy"
          src={urlFor(value).fit("max").auto("format")}
        />
      );
    },
  },
};

const thumpComponents = {
  types: {
    image: ({ value, index }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          alt={value.alt || " "}
          loading="lazy"
          src={urlFor(value).fit("max").auto("format")}
          width="80%"
        />
      );
    },
  },
};

const Pdp = ({ pdp }) => {
  const {
    productCarouselImg,
    productThumpnail,
    measurements,
    measurementImages,
    measurementsTitle,
    measurementsDes,
    frameImage,
  } = pdp;

  React.useEffect(() => {
    console.log(productThumpnail);
    console.log(productCarouselImg);
  }, [pdp]);
  return (
    <Grid>
      <Grid item xs={12} className={roboto.className}>
        <Header />
        <BreadcrumbsDetails />
        <Grid container xs={12} sx={{ mt: 10 }}>
          <Grid xs={7} sx={{ border: "0px solid" }}>
            <Box>
              <Carousel width="100%" swipe="true" duration="100">
                {productCarouselImg.map((images, index) => (
                  <Box key={index} sx={{ textAlign: "center" }}>
                    <PortableText value={images} components={ptComponents} />
                  </Box>
                ))}
              </Carousel>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "0px solid",
                ml: 2,
                mr: 2,
                mt: 5,
              }}
            >
              {productThumpnail.map((images, index) => (
                <Box
                  key={index}
                  sx={{
                    border: "0px solid",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "25%",
                  }}
                >
                  <PortableText value={images} components={thumpComponents} />
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid xs={5} sx={{ border: "0px solid" }}>
            <Box sx={productDis}>
              <Box sx={title}>
                <b>Ray-Ban</b> Square Sunglasses
              </Box>
              <Box sx={dis}>
                Men’s sunglasses from RayBan in a classy square silhouette
              </Box>
              <Box sx={types}>
                <Box component="span" sx={space}>
                  <DoneIcon sx={tickColor} />
                  <Box component="span">Aviator</Box>
                </Box>
                <Box component="span">|</Box>
                <Box component="span" sx={space}>
                  <DoneIcon sx={tickColor} />
                  <Box component="span">Standard</Box>
                </Box>
                <Box component="span">|</Box>
                <Box component="span" sx={space}>
                  <DoneIcon sx={tickColor} />
                  <Box component="span">Metal</Box>
                </Box>
              </Box>
              <Box>
                <Box sx={{ fontSize: "20px", mt: 3 }}>
                  <b>Frame Color</b> : Gunmetal
                </Box>
                <Box sx={{ mt: 2 }}>
                  <PortableText value={frameImage} components={ptComponents} />
                </Box>
                <Box sx={{ fontSize: "20px", mt: 3 }}>
                  <b>Lence Color</b> : Green
                </Box>
                <Box sx={{ mt: 2 }}>
                  <RadioButtonCheckedIcon
                    sx={{ color: "#b2be9a", fontSize: "50px" }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box
              sx={{ background: "#F5F5F5", p: 4, mt: 5 }}
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Box sx={{ fontSize: "30px" }}>SAR 550.00</Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#ff9905",
                  "&:hover": {
                    backgroundColor: "#f59407",
                  },
                  ml: 3,
                  color: "#343434",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  fontSize: "16px",
                  pl: 10,
                  pr: 10,
                  pt: 1,
                  pb: 1,
                }}
              >
                Add to cart
              </Button>
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "auto",
                  mt: 6,
                  mb: 1.5,
                  fontSize: "35px",
                }}
              >
                {measurements}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "auto",
                  mb: 6,
                }}
              >
                <Divider
                  sx={{
                    width: "10%",
                    borderBottomWidth: 4,
                    background: "#343434",
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {measurementImages.map((val, index) => (
                <Box
                  key={index}
                  sx={{
                    border: "0px solid",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Box sx={{ border: "0px solid", textAlign: "center" }}>
                    <PortableText value={val} components={thumpComponents} />
                    <Box sx={{ textAlign: "center", mt: 2 }}>
                      <Box sx={{ textAlign: "center", fontSize: "22px" }}>
                        {measurementsTitle[index]}
                      </Box>
                      <Box
                        sx={{
                          textAlign: "center",
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        {measurementsDes[index]}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
          <PdpDetail/>
        </Grid>
      </Grid>
    </Grid>
  );
};

const query = groq`*[_type == "productDetail" && slug.current == $slug][0]{
  "productCarouselImg":productCarousel[]->carouselImage,
  "productThumpnail":thumpnails[]->carouselImage,
  measurements,
  "measurementImages":measurementImages[]->carouselImage,
  "measurementsTitle":measurementImages[]->title,
  "measurementsDes":measurementImages[]->description,
  frameImage
  }`;
export async function getServerSidePaths() {
  const paths = await client.fetch(
    groq`*[_type == "pdp" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getServerSideProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params;
  const pdp = await client.fetch(query, { slug });
  return {
    props: {
      pdp,
    },
  };
}
export default Pdp;
