// @ts-nocheck
import { Layout } from "@/components";
import React from "react";
import { ReactElement } from "react";
import { InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import { ApolloQueryResult } from "@apollo/client";
import { serverApolloClient } from "@/lib/auth/useAuthenticatedApolloClient";
import {
  RootCategoriesQuery,
  RootCategoriesQueryVariables,
  RootCategoriesDocument,
  ProductBySlugQuery,
  ProductBySlugQueryVariables,
  ProductBySlugDocument,
} from "@/saleor/api";
import { contextToRegionQuery } from "@/lib/regions";
import { Roboto } from "@next/font/google";
import imageUrlBuilder from "@sanity/image-url";
import client from "../../../../client";
import { PDP_PAGE_SANITY_QUERY } from "@/lib/const";
import { Box, Grid, Button } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import BreadcrumbsDetails from "../../../../components/breadcrumbs";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { PortableText } from "@portabletext/react";
import Carousel from "react-material-ui-carousel";
import DoneIcon from "@mui/icons-material/Done";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import PdpDetail from "../../../../components/pdpDetail";
import ZoomModal from "../../../../components/zoomModal";
import Image from "next/image";

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

const CarouselImageComponents = {
  types: {
    image: ({ value, index }) => {
      return <Image src={value} alt="dd"></Image>;
    },
  },
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
          src={urlFor(value).fit("max").auto("format").url()}
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
          src={urlFor(value).fit("max").auto("format").url()}
          width="80%"
        />
      );
    },
  },
};

const powerLists = [
  "select",
  "-1.25",
  "-1.50",
  "-2.00",
  "-2.75",
  "-3.25",
  "-3.50",
  "-3.75",
  "-4.00",
  "-4.50",
  "-4.75",
];

function ProductDetails({ pdpLayout, productDetails }) {
  const productCarouselImg = [];
  const { media, name, description, attributes, category } = productDetails;
  let productDescription = JSON.parse(description);
  const productAttributesMap = new Map();
  attributes.forEach((attribute) => {
    productAttributesMap.set(
      attribute.attribute.name,
      attribute.values[0].name
    );
  });

  console.log(productAttributesMap.keys());
  console.log(productAttributesMap.values());
  console.log(category);

  productDescription = productDescription.blocks[0].data.text;
  const {
    productThumpnail,
    measurements,
    measurementImages,
    measurementsTitle,
    measurementsDes,
    frameImage,
  } = pdpLayout;

  const [power, setPower] = React.useState();
  const [zoomModalDetails, setZoomModalDetails] = React.useState({
    display: false,
    selectedImage: null,
    allImages: productCarouselImg,
  });

  const handleChange = (event: SelectChangeEvent) => {
    setPower(event.target.value);
  };

  const zoom = (images) => {
    setZoomModalDetails((oldData) => ({
      ...oldData,
      display: true,
      selectedImage: images.url,
    }));
  };

  React.useEffect(() => {
    console.log(productThumpnail);
    console.log(productCarouselImg);
  }, [pdpLayout]);
  return (
    <Grid>
      <Grid item xs={12} className={roboto.className}>
        <BreadcrumbsDetails />
        <Grid container xs={12} sx={{ mt: 10 }}>
          <Grid xs={7} sx={{ border: "0px solid" }}>
            <Box>
              <Carousel
                width="100%"
                swipe="true"
                duration="100"
                PrevIcon={<ArrowBackIosNewIcon />}
                NextIcon={<ArrowForwardIosIcon />}
                navButtonsProps={{
                  // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                  style: {
                    background: "none",
                    color: "#F7961C",
                  },
                }}
                navButtonsAlwaysVisible={true}
                activeIndicatorIconButtonProps={{
                  style: {
                    backgroundColor: "#F7961C",
                    color: "#F7961C",
                  },
                }}
                indicatorIconButtonProps={{
                  style: {
                    color: "#b2be9a",
                    marginRight: "10px",
                  },
                }}
              >
                {media.map((image, index) => (
                  <Box
                    key={index}
                    sx={{ textAlign: "center", cursor: "zoom-in" }}
                    onClick={() => zoom(image)}
                  >
                    <Image
                      src={image.url}
                      alt="fff"
                      width={700}
                      height={400}
                    ></Image>
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
              {media.map((image, index) => (
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
                  <Image
                    src={image.url}
                    alt="fff"
                    width={250}
                    height={200}
                  ></Image>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid xs={5} sx={{ border: "0px solid" }}>
            <Box sx={productDis}>
              <Box sx={title}>
                <b>{productAttributesMap.get("Brand")}</b> {name}
              </Box>
              <Box sx={dis}>{productDescription}</Box>
              <Box sx={types}>
                <Box component="span" sx={space}>
                  <DoneIcon sx={tickColor} />
                  <Box component="span">
                    {productAttributesMap.get("Shape")}
                  </Box>
                </Box>
                <Box component="span">|</Box>
                <Box component="span" sx={space}>
                  <DoneIcon sx={tickColor} />
                  <Box component="span">{productAttributesMap.get("Fit")}</Box>
                </Box>
                <Box component="span">|</Box>
                <Box component="span" sx={space}>
                  <DoneIcon sx={tickColor} />
                  <Box component="span">
                    {productAttributesMap.get("Frame Material")}
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box sx={{ fontSize: "20px", mt: 3 }}>
                  <b>Frame Color</b> : Gunmetal <span>ffff</span>
                </Box>
                <Box sx={{ mt: 2, display: "flex" }}>
                  {/* <PortableText value={frameImage} components={ptComponents} /> */}
                  {frameImage.map((images, index) => (
                    <Box key={index} sx={{ mr: 2 }}>
                      <PortableText value={images} components={ptComponents} />
                    </Box>
                  ))}
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
              {/*clear lence*/}
              <Box>
                <Box sx={{ fontSize: "20px", mt: 3, fontWeight: "bold" }}>
                  Enter your prescription
                </Box>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      border: "0px solid",
                      mt: 3,
                    }}
                  >
                    <Box sx={{ border: "0px solid" }}>Sphere (Power) :</Box>
                    <Box sx={{ border: "0px solid", width: "60%" }}>
                      <FormControl style={{ minWidth: 220 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">
                          Select
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          value={power}
                          onChange={handleChange}
                          label="Power"
                          sx={{ width: "100%" }}
                        >
                          {powerLists.map((item, index) => (
                            <MenuItem key={index} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            color: "#F7961C",
                            "&.Mui-checked": {
                              color: "#F7961C",
                            },
                          }}
                        />
                      }
                      label="I need 2 different powers"
                    />
                  </Box>
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
          <PdpDetail />
        </Grid>
      </Grid>
      {zoomModalDetails.display && (
        <ZoomModal
          zoomModalDetails={zoomModalDetails}
          setZoomModalDetails={setZoomModalDetails}
        />
      )}
    </Grid>
  );
}

export default ProductDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params) {
    return {
      props: {},
      notFound: true,
    };
  }

  const response: ApolloQueryResult<RootCategoriesQuery> =
    await serverApolloClient.query<
      RootCategoriesQuery,
      RootCategoriesQueryVariables
    >({
      query: RootCategoriesDocument,
      variables: {
        locale: contextToRegionQuery(context).locale,
      },
    });
  const rootCategories = response.data.categories.edges.map((edge) => ({
    ...edge.node,
  }));

  //const productSlug = context.params.slug.toString();
  const productSlug = "aviator-sunglasses";
  const productDetails: ApolloQueryResult<ProductBySlugQuery> =
    await serverApolloClient.query<
      ProductBySlugQuery,
      ProductBySlugQueryVariables
    >({
      query: ProductBySlugDocument,
      variables: {
        slug: productSlug,
        ...contextToRegionQuery(context),
      },
    });

  console.log("*******************");
  console.log(JSON.stringify(productDetails));

  console.log("*******************");

  const slug = "pdp";
  const pdpLayout = await client.fetch(PDP_PAGE_SANITY_QUERY, { slug });

  console.log("******pdpLayout*************");
  console.log(JSON.stringify(pdpLayout));

  console.log("******pdpLayout*************");

  return {
    props: {
      rootCategories: rootCategories,
      pdpLayout: pdpLayout,
      productDetails: productDetails.data.product,
    },
  };
};

ProductDetails.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
