import React from 'react';
import {
    Box,
    Grid,
    Theme,
    Paper,
    Card,
    Button,
    Link,
  } from "@mui/material";
  import {
    RootCategoriesQuery,
    RootCategoriesQueryVariables,
    RootCategoriesDocument,
  } from "@/saleor/api";
  import { serverApolloClient } from "@/lib/auth/useAuthenticatedApolloClient";
  import { contextToRegionQuery } from "@/lib/regions";
  import Carousel from "react-material-ui-carousel";
  import Divider from "@mui/material/Divider";
  import { Roboto } from "@next/font/google";
  import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
  import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
  import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
  import AddIcon from "@mui/icons-material/Add";
  import RemoveIcon from "@mui/icons-material/Remove";
  import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
  import Accordion from "@mui/material/Accordion";
  import AccordionSummary from "@mui/material/AccordionSummary";
  import AccordionDetails from "@mui/material/AccordionDetails";
  import Typography from "@mui/material/Typography";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import Table from "@mui/material/Table";
  import TableBody from "@mui/material/TableBody";
  import TableCell from "@mui/material/TableCell";
  import TableContainer from "@mui/material/TableContainer";
  import TableHead from "@mui/material/TableHead";
  import TableRow from "@mui/material/TableRow";
  import CircleIcon from "@mui/icons-material/Circle";
  import { useCheckout } from "@/lib/providers/CheckoutProvider";
  import { useRegions } from "@/components/RegionsProvider";

function OrderSummary(props) {
    const { checkout } = useCheckout();
    const { currentChannel, formatPrice, query } = useRegions();
    React.useEffect(()=>{
        console.log("checkout:"+checkout)
    },[])
    return (
        <Grid xs={4} sx={{ color: "#343434" }}>
            <Box sx={{ backgroundColor: "#fff", p: 5 }}>
              <Box sx={{ fontSize: "24px", mb: 3 }}>Order Summary</Box>
              <Box>
                <TableContainer>
                  <Table sx={{ minWidth: 250 }} aria-label="simple table">
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell sx={{ pl: 0, fontSize: "18px" }}>
                          Subtotal
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "18px",
                            color: "inherit",
                            textAlign: "right",
                          }}
                        >
                          <b>{formatPrice(checkout?.totalPrice?.gross)}</b>
                        </TableCell>
                      </TableRow>

                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell sx={{ pl: 0, fontSize: "18px" }}>
                          Delivery Cost
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "18px",
                            color: "#0B8600",
                            textAlign: "right",
                          }}
                        >
                          <b>FREE</b>
                        </TableCell>
                      </TableRow>

                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell sx={{ pl: 0, fontSize: "18px" }}>
                          Order Total
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "18px",
                            color: "inherit",
                            textAlign: "right",
                          }}
                        >
                          <b>{formatPrice(checkout?.totalPrice?.gross)}</b>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Grid>
    );
}

export default OrderSummary;