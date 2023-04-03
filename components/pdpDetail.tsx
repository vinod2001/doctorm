// @ts-nocheck
import React from "react";
import { Box, Grid, Theme, Link, Divider } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import Carousel from "react-material-ui-carousel";
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const menu = {
  padding: "10px 5px",
  fontSize: "25px",
  cursor: "pointer",
  mb: 2,
};

const menuActive = {
  padding: "10px 5px",
  fontSize: "25px",
  cursor: "pointer",
  mb: 2,
  borderTop: "1px solid",
  borderBottom: "1px solid",
  color: "#FF9905",
};

const sectionTitle = {
  fontSize: "36px",
  fontWeight: "bold",
};

const pdpDetailsContent = {
  fontSize: "25px",
  color: "#3A3A3A",
  table: {
    mt: 3,
  },
  td: {
    padding: "20px 0",
    width: "auto",
    border: "0px solid",
    "&:nth-child(2)": {
      fontWeight: "bold",
    },
  },
};

const pdpDetailsFeatureContent = {
  fontSize: "20px",
};

function PdpDetail({ pdpDetails, productFeature }) {
  const [isPdetail, setIsPdetail] = React.useState(true);
  const [isFeature, setIsFeature] = React.useState(false);
  const handleClick = (val) => {
    if (val === "showPdetails") {
      setIsPdetail(true);
      setIsFeature(false);
    } else if (val === "showFeatures") {
      setIsPdetail(false);
      setIsFeature(true);
    }
  };
  return (
    <Grid container xs={12} className={roboto.className}>
      <Box sx={{ background: "#F1ECE1", width: "100%", m: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "row", p: 4 }}>
          <Box sx={{ width: "40%" }}>
            <Box
              sx={[menu, isPdetail ? menuActive : null]}
              onClick={() => handleClick("showPdetails")}
            >
              Product Details
            </Box>
            <Box
              sx={[menu, isFeature ? menuActive : null]}
              onClick={() => handleClick("showFeatures")}
            >
              Features
            </Box>
          </Box>
          {isPdetail && (
            <Box sx={{ ml: 20, border: "0px solid", width: "100%" }}>
              <Box sx={sectionTitle}>Product Details</Box>
              <Box sx={pdpDetailsContent}>
                <table width="100%">
                  <tbody>
                    <tr>
                      <td>Material</td>
                      <td>{pdpDetails.Material}</td>
                    </tr>
                    <tr>
                      <td>Shape</td>
                      <td>{pdpDetails.Shape}</td>
                    </tr>
                    <tr>
                      <td>Size</td>
                      <td>58/135/14 mm</td>
                    </tr>
                    <tr>
                      <td>Color</td>
                      <td>Gunmetal</td>
                    </tr>
                    <tr>
                      <td>Model</td>
                      <td>{pdpDetails.Model}</td>
                    </tr>
                    <tr>
                      <td>Color Code</td>
                      <td>{pdpDetails["Color Code"]}</td>
                    </tr>
                    <tr>
                      <td>Product</td>
                      <td>{pdpDetails.Product}</td>
                    </tr>
                    <tr>
                      <td>Brand</td>
                      <td>{pdpDetails.Brand}</td>
                    </tr>
                  </tbody>
                </table>
              </Box>
            </Box>
          )}

          {isFeature && (
            <Box sx={{ ml: 20, border: "0px solid", width: "100%" }}>
              <Box sx={sectionTitle}>Features</Box>
              <Box sx={[pdpDetailsContent, pdpDetailsFeatureContent]}>
                <ul>
                  <li>
                    Full rim in narrow width, crafted from lightweight acetate
                    in suave black
                  </li>
                  <li>Green lenses with full UV protection</li>
                  <li>Sturdy, tapering temples with embossed logo</li>
                  <li>
                    Shop this authentic piece in a classic RayBan branded case
                  </li>
                </ul>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Grid>
  );
}

export default PdpDetail;
