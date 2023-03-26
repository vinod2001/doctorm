// @ts-nocheck
import React from "react";
import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import client from "../../client";
import { Layout } from "@/components";
import Header from "../../components/header";
import {
  Box,
  Grid,
  Theme,
  Paper,
  Card,
  SubCategory,
  Button,
  Link,
  Item,
  styled,
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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import LockIcon from '@mui/icons-material/Lock';

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const currencies = [
    {
      label: 'Abha',
    },
    {
      label: 'Abqaiq',
    },
    {
      label: 'Abu Areish',
    },
    {
      label: 'Afif',
    },
  ];

const FormElements = styled(Box)({
    "& .ChildSelector": {
        // '&' points to the root selector which is the same as the above (.MuiBox-root)
        marginTop:'10px',
        border:'0px solid',
        "& .NestedChildSelector": {
            // nested child selector (.MuiBox-root .ChildSelector .NestedChildSelector)
            width:'30%'
          }
      },
})

function Address(props) {
    const [value, setValue] = React.useState('one');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
        <Grid container sx={{  border:'0px solid #f6f6f6', color:'#343434'}}>
            <Grid item xs={12} >
                <Box  sx={{m:5, backgroundColor: "#f6f6f6", p:3, }}>
                    <Box sx={{textAlign:'center', mb:4, display:'flex', justifyContent:'center',}}>
                        <LockIcon/> <Typography sx={{fontSize:'18px', fontWeight:'bold', ml:2}}>Our secure checkout is 100% encrypted and your personal details are safe.</Typography>
                        </Box>
                    <Box>
                        <span style={{fontSize:'25px', fontWeight:'bold'}}>Shipping</span>
                        <Divider sx={{mt:2}}/>
                    </Box>
                        <Box sx={{border:'0px solid', width:'100%'}}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                textColor="secondary"
                                indicatorColor="secondary"
                                aria-label="secondary tabs example"
                                
                                variant="fullWidth"
                            >
                                <Tab value="one" label="Add New Address" sx={{fontSize:'20px', fontWeight:'bold', textTransform:'capitalize'}} />
                                <Tab value="two" label="Use Saved Address" sx={{fontSize:'20px', fontWeight:'bold', textTransform:'capitalize'}}/>
                            </Tabs>
                        </Box>
                        <FormElements>
                            <Box className="ChildSelector">
                            <TextField className="NestedChildSelector" id="outlined-basic" label="First Name" variant="outlined" />
                            </Box>
                            <Box className="ChildSelector">
                            <TextField className="NestedChildSelector" id="outlined-basic" label="Last Name" variant="outlined" />
                            </Box>
                            <Box className="ChildSelector">
                            <TextField className="NestedChildSelector" id="outlined-basic" label="email" variant="outlined" />
                            </Box>
                            <Box className="ChildSelector">
                            <TextField
                                id="outlined-number"
                                label="Phone"
                                type="number"
                                variant="outlined"
                                className="NestedChildSelector"
                                />
                            </Box>
                            <Box className="ChildSelector">
                            <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="City"
                                    defaultValue=""
                                    helperText="Select an Emirate/City"
                                    className="NestedChildSelector"
                                    >
                                    {currencies.map((option) => (
                                        <MenuItem key={option.label} value={option.label}>
                                        {option.label}
                                        </MenuItem>
                                    ))}
                            </TextField>
                            </Box>
                            <Box className="ChildSelector">
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Address Type"
                                multiline
                                maxRows={4}
                                className="NestedChildSelector"
                                />
                            </Box>
                            <Box className="ChildSelector">
                                <FormControl className="NestedChildSelector">
                                    <FormLabel id="radio-buttons-group-label">Address Type</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        defaultValue="home"
                                    >
                                        <FormControlLabel value="home" control={<Radio />} label="Home"   />
                                        <FormControlLabel value="office" control={<Radio />} label="Office" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                            <Box className="ChildSelector">
                            <FormControl>
                                <FormLabel id="radio-buttons-group-label">Delivery Modes</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    defaultValue="standard"
                                >
                                    <FormControlLabel value="standard" control={<Radio />} label="Standard Delivery (2-4 Business days)" />
                                </RadioGroup>
                                
                            </FormControl>
                            
                            </Box>
                            <Box className="ChildSelector">
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Save in address book" />
                            </Box>
                            <Box className="ChildSelector" sx={{ border: "0px solid", mt: 3, }}>
                                <Button
                                sx={{
                                    backgroundColor: "#ff9905",
                                    color: "#fff",
                                    textTransform: "capitalize",
                                    pl: 2,
                                    pr: 2,
                                    "&:hover": { backgroundColor: "#f59407" },
                                    fontWeight: "bold",
                                }}
                                >
                                Continue to Review Order
                                </Button>
                            </Box>
                        </FormElements>
                        

                </Box>
                
            </Grid>
           
        </Grid>
        </Box>
    );
}

export default Address;

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
  
    return {
      props: {
        rootCategories: rootCategories,
      },
    };
  };
  
  Address.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  };