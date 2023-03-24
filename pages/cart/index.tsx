// @ts-nocheck
// [slug].tsx
import React from 'react';
import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import client from "../../client";
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
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Divider from "@mui/material/Divider";
import { Roboto } from "@next/font/google";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircleIcon from '@mui/icons-material/Circle';

const roboto = Roboto({
    subsets: ["latin"],
    weight: "400",
  });

  const types = {
    p: 2,
    borderRadius: "50px",
    background: "#F1ECE1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "50px",
    padding:'8px 12px'
  };

  const tableStyle = {
    '&:td':{
        border:'1px solid'
    }
  }
  
function CartDetails(props) {
    const selectionRowContent = [
    {
        name:'Model',
        data:'PLD2059/S'
    },
    {
        name:'Product',
        data:'Aviator',
        bullet:true
    },
    {
        name:'Details',
        data:'Metal',
        bullet:true
    },
    {
        name:'',
        data:'Black',
        bullet:true
    },
]

const orderSummary = [
    {
        name:'Subtotal  ',
        data:'SAR 730.00'
    },
    {
        name:'Delivery Cost',
        data:'FREE',
        freeDelivery:true
    },
    {
        name:'Order Total',
        data:'SAR 730.00',
    },
    
]
    return (
        <Grid sx={{backgroundColor:'#F7F7F7' }}>
            <Grid item xs={12}  className={roboto.className}>
                <Header />
                <Grid container xs={12} sx={{ mt: 5, color:'#343434'}}>
                    <Grid xs={7} sx={{ border: "0px solid", ml:5, mr:5 }}>
                        <Box>
                            <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', backgroundColor:'#fff', p:2}}>
                                <Box sx={{fontSize:'20px', fontWeight:'bold'}}>
                                    My Cart
                                </Box>
                                <Box>
                                    <Link href="#" sx={{color:'#F7961C', textDecorationColor:'#F7961C', fontSize:'20px'}}>
                                        Save Cart
                                    </Link>
                                </Box>
                            </Box>
                            <Box sx={{mt:5, backgroundColor:'#fff',mb:5, p:3}}>
                                <Box sx={{display:'flex', justifyContent:'flex-end'}}>
                                    <FavoriteBorderIcon/>
                                </Box>
                                <Box sx={{display:'flex',alignItems:'center',}}>
                                    <Box>
                                        <img src="https://img-cdn.doctor-m.com/mnresize/96/96/medias/sys_master/cdnmedia/cdnmedia/drmproductimage/121801001/121801001_0_MC/8802847621170_null/121801001.jpg"/>
                                    </Box>
                                    <Box sx={{ml:5, fontSize:'20px'}}>
                                        <Box sx={{}}>
                                            <b>Polaroid</b> 
                                            <span> Aviator Sunglasses</span>
                                        </Box>
                                        <Box sx={{mt:2}}>
                                        SAR  365.00
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center', mt:5,mb:4}}>
                                    <Box sx={types}>
                                        <Box sx={{cursor:'pointer'}}><RemoveIcon/></Box>
                                        <Box sx={{fontSize:'20px', ml:2,mr:2}}>2</Box>
                                        <Box  sx={{cursor:'pointer'}}><AddIcon/></Box>
                                    </Box>
                                    <Box>
                                        <Button startIcon={<DeleteOutlineIcon />} sx={{backgroundColor:'#F1ECE1', color:'#343434',textTransform:'capitalize',pl:2,pr:2, '&:hover':{backgroundColor:'#d3cec4'}}}>Delete</Button>
                                    </Box>
                                </Box>
                                <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',}}>
                                    <Box sx={{fontSize:'20px'}}>
                                        Item Total :
                                    </Box>
                                    <Box sx={{color:'#DF3131', fontSize:'20px', fontWeight:'bold'}}>
                                        SAR 730.00
                                    </Box>
                                </Box>
                                <Box sx={{mt:3,mb:3}}>
                                    <Box>
                                        <Divider/>
                                    </Box>
                                    <Box>
                                    <Accordion>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        >
                                        <Typography>Selections</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 450 }} aria-label="simple table">
                                            
                                            <TableBody>
                                                {selectionRowContent.map((item,index)=>(
                                                    <TableRow key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell>
                                                        <b>{item.name}</b>
                                                    </TableCell>
                                                    <TableCell>
                                                      {item.freeDelivery?<CircleIcon sx={{fontSize:'10px', color:'#F7961C'}}/>:null}  {item.data}
                                                    </TableCell>
                                                </TableRow>
                                                ))}
                                                
                                            </TableBody>
                                        </Table>
                                        </TableContainer>
                                        </AccordionDetails>
                                    </Accordion>
                                    </Box>
                                    <Box>
                                        <Divider/>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid xs={4} sx={{color:'#343434'}}>
                        <Box sx={{backgroundColor:'#fff', p:5}}>
                            <Box sx={{fontSize:'24px',mb:3}}>
                                Order Summary
                            </Box>
                            <Box>
                                    <TableContainer >
                                        <Table sx={{ minWidth: 250 }} aria-label="simple table">
                                            
                                            <TableBody>
                                                {orderSummary.map((item,index)=>(
                                                    <TableRow key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                                                >
                                                    <TableCell sx={{pl:0, fontSize:'18px'}}>
                                                        {item.name}
                                                    </TableCell>
                                                    <TableCell sx={{fontSize:'18px', color:item.freeDelivery?'#0B8600':'inherit',textAlign:'right'}}>
                                                      <b>{item.data}</b>
                                                    </TableCell>
                                                </TableRow>
                                                ))}
                                                
                                            </TableBody>
                                        </Table>
                                        </TableContainer>
                            </Box>
                            <Box sx={{border:'0px solid', mt:3}}>
                                        <Button sx={{backgroundColor:'#ff9905', color:'#fff',textTransform:'capitalize',pl:2,pr:2, '&:hover':{backgroundColor:'#f59407'}, width:'100%', fontWeight:'bold'}}>Proceed to Checkout</Button>
                                    </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default CartDetails;