import React from 'react';
import {
  Box, Button,
  Grid, styled,Typography
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { Roboto } from "@next/font/google";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import doctorMlogo from "../../images/DoctorM.svg";
import Image from 'next/image'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

function FooterItems({data}) {
    return (
        <Box>
            <Box>
                <Typography sx={{fontSize:'26px',fontWeight:'bold'}}>{data.heading}</Typography>
            </Box>
            <Box sx={{mt:2}}>
                {data.items.map((item,index)=>(
                    <List key={index}>
                        <ListItem disablePadding>
                            <ListItemButton sx={{p:0}}>
                                <ListItemText primary={item} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                ))}
            </Box>
        </Box>
);
}

export default FooterItems;