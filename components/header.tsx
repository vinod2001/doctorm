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
import { Roboto } from '@next/font/google';

const roboto = Roboto({
  subsets:['latin'],
  weight: ['400','700']
})

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
  width:'30%'
}

const HeaderItemInnerWrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const HeaderitemWrapperWidth = {
  width: "20%",
};

function Header() {
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

  return (
    <AppBar position="static" sx={{ background: "#f6f6f6" }} >
      <Grid >
        <Grid item XS={12} sx={sxStyle}>
          <Box  className = {roboto.className}>
            <Box component="span" sx={spanStyle}>
              FREE SHIPPING FOR ALL ORDERS,
            </Box>{" "}
            <span sx={{mr:2}}>LIMITED TIME ONLY</span> | FAST SHIPPING WITHIN{" "}
            <Box component="span" sx={spanStyle}>
              2-4 BUSINESS DAYS*
            </Box>{" "}
            | FREE{" "}
            <Box component="span" sx={spanStyle}>
              IN-STORE
            </Box>{" "}
            RETURN
          </Box>
        </Grid>
        <Grid item XS={12} sx={mainHeader}>
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
            className = {roboto.className}
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
              <img style={{width:'100%'}} src="https://img-cdn.magrabi.com/medias/sys_master/root/hb0/h3f/9069140738078/logo/logo.png" />
            </Box>
            <Box sx={[HeaderItemWrapper, HeaderitemWrapperWidth]}>
              <Box sx={HeaderItemInnerWrapper}>
                <Box>
                  <AccountCircleRoundedIcon sx={iconSize} />
                </Box>
                <Box sx={{fontWeight:'bold'}}>drm</Box>
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
        <Grid item XS={12}>
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
                    fontSize:'14px'
                  }}
                  className = {roboto.className}
                >
                  {page}
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
