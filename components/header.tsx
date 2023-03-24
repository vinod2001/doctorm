// @ts-nocheck
import React from "react";
import { Box, Grid, Theme } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Roboto } from "@next/font/google";
import groq from "groq";
import client from "@/lib/sanity/client";
import useScrollDirection from "@/lib/useScrollDirection";
import Carousel from "react-material-ui-carousel";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

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
          width="100%"
        />
      );
    },
  },
};

const sxStyle = {
  backgroundColor: "#3A3A3A",
  width: "100%",
  spacing: "0",
  direction: "column",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  color: "#F7961C",
  height: "48px",
  fontFamily: "Acumin Pro",
};
const spanStyle = {
  color: "#FFFFFF",
};

const deviderSpace = {
  mr: 2,
  ml: 2,
};
const mainHeader = {
  backgroundColor: "#F7961C",
  width: "100%",
  direction: "column",
  color: "#F7961C",
  height: "70px",
  fontFamily: "Acumin Pro",
};

const iconColor = {
  color: "#3A3A3A",
  fontSize: "26px",
};
const iconSize = {
  fontSize: "40px",
  color: "#FFF",
};

const HeaderItemWrapper = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "0px solid",
  width: "14%",
};

const HeaderLogo = {
  width: "30%",
};

const HeaderItemInnerWrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const HeaderitemWrapperWidth = {
  width: "20%",
};

const clsHeader = {
  position: "sticky",
  top: "0px",
  transitionProperty: "all",
  transitionTimingGunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionFuration: "500ms",
};

function Header() {
  const scrollDirection = useScrollDirection();
  const [scrollContent, setScrollContent] = React.useState([]);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const pages = ["Eyeglasses", "Sunglasses", "Contact Lenses", "Accessories"];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    client
      .fetch(
        `*[_type == "header"]{
      content,
      logo,
    }`
      )
      .then((data) => setScrollContent(...data));
  }, []);

  React.useEffect(() => {
    console.log(JSON.stringify(scrollContent));
    console.log(scrollContent.content);
  }, [scrollContent]);

  return (
    //sx={{clsHeader:`${ scrollDirection === "down" ? "hide" : "show"}`}}
    <AppBar position="static" sx={{ background: "#f6f6f6" }}>
      <Grid>
        <Grid item xs={12} sx={sxStyle}>
          <Box className={roboto.className}>
            {scrollContent.content &&
              scrollContent.content.map((item, index) =>
                item.children[0].marks.length > 0 &&
                item.children[0].marks[0] !== "strong" ? (
                  <Box component="span" key={index}>
                    {item.children[0].text}{" "}
                  </Box>
                ) : item.children[0].marks[0] === "strong" ? (
                  <Box
                    component="span"
                    key={index}
                    sx={[spanStyle, deviderSpace]}
                  >
                    {"  "}
                    {item.children[0].text}
                    {"  "}
                  </Box>
                ) : (
                  <Box component="span" key={index} sx={spanStyle}>
                    {item.children[0].text}{" "}
                  </Box>
                )
              )}
          </Box>
        </Grid>
        <Grid item xs={12} sx={mainHeader}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
              color: "#3A3A3A",
              pl: 6,
              pr: 6,
            }}
            className={roboto.className}
          >
            <Box sx={HeaderItemWrapper}>
              <Box>
                <Box sx={HeaderItemInnerWrapper}>
                  <LocationOnOutlinedIcon sx={iconColor} />
                </Box>
                <Box>Find a Store</Box>
              </Box>
              <Box>
                <Box sx={HeaderItemInnerWrapper}>
                  <SearchOutlinedIcon sx={iconColor} />
                </Box>
                <Box>Search</Box>
              </Box>
            </Box>

            <Box sx={HeaderItemWrapper}>
              <Link href="/">
                <PortableText
                  value={scrollContent.logo}
                  components={ptComponents}
                />
              </Link>
            </Box>
            <Box sx={[HeaderItemWrapper, HeaderitemWrapperWidth]}>
              <Box sx={HeaderItemInnerWrapper}>
                <Box>
                  <AccountCircleRoundedIcon sx={iconSize} />
                </Box>
                <Box sx={{ fontWeight: "bold" }}>drm</Box>
              </Box>
              <Box>
                <Box sx={HeaderItemInnerWrapper}>
                  <FavoriteBorderOutlinedIcon sx={iconColor} />
                </Box>
                <Box>Favorites</Box>
              </Box>
              <Box>
                <Box sx={HeaderItemInnerWrapper}>
                  <ShoppingBagOutlinedIcon sx={iconColor} />
                </Box>
                <Box>Basket</Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "none",
                  md: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 1.5,
                    color: "black",
                    fontWeight: "bold",
                    display: "block",
                    ml: 8,
                    fontSize: "14px",
                  }}
                  className={roboto.className}
                >
                  <Link
                    href="/product/pdp"
                    sx={{ textDecoration: "none", color: "inherit" }}
                  >
                    {page}
                  </Link>
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default Header;
