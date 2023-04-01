// @ts-nocheck
import React from "react";
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  Highlight, SearchBox
} from 'react-instantsearch-dom';
import Link from 'next/link';
import HitDetails from './HitDetails';
import { Badge, Box, Grid, Theme } from "@mui/material";
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const client = algoliasearch('YXKWT0FKQM', '11d7ffaf5f69d91c4b7945038aeaef79');

const searchList={
  background:'#f3f3f3',
  '& input': {
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    outline: 'none',
    fontFamily: 'sans-serif',
    fontSize: '14px',
    border:'none',
    background:'none',
  },
  '& button': {
    width: '32px',
    height: '27px',
    marginLeft: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    display:'none'
  },
  '& ul':{
    padding:0,
    margin:0,
    display:'flex',
    flexWrap: 'wrap',
    margin:'10px 30px 10px 30px',
    '& searchBox':{
      background:'#F7961C !important',
    },
    '& li':{
      listStyleType:'none',
      margin:'5px',
      wordWrap:'break-word',
      padding:'5px',
      border:'1px solid #ddd',
      borderRadius:'5px',
      background:'#fff',
      textAlign:'center',
      '&:hover':{
        border:'1px solid #F7961C'
      },
      '& a':{
        display:'block',
        textDecoration:'none',
        
        color:'343434',
        '& img':{
          display:'block',
        },
        '& span': {
          display:'flex',
          justifyContent:'center',
          wordWrap:'break-word',
          width: '200px',
          border: '0px solid',
          alignItems: 'center',
          overflowWrap: 'break-word',
          overflow: 'hidden',
          padding: '5px',
          color: '#343434',
          fontSize:'16px',
        }
      },
      
    }
  }
}

const searchClient = {
  ...client,
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return [];
    }
    return client.search(requests);
  },
};

function Hit({ hit }: HitProps) {
  return (
    <>
    <Box sx={{background: '#fff'}}>
      <Link  href={"/en-US/products/" + hit.slug} passHref  className={roboto.className}>
        <span>
        <img src={hit.thumbnail} width="100" height="50"></img>
        </span>
        <Highlight hit={hit} attribute="name" />
      </Link>
      <span className="Hit-price">${hit.price}</span>
    </Box>
    </>
  );
}

export default function Search() {

  return (
    <Box className="ais-InstantSearch">
      <InstantSearch indexName="saleor_test.default-channel.USD.products" searchClient={searchClient}>
        <Box className="right-panel" sx={searchList}>
          <Box sx={{background:'#F7961C',p:5}}>
          <SearchBox showLoadingIndicator={false} placeholder="text" defaultRefinement="" />
          </Box>
            <Hits hitComponent={Hit}/>
        </Box>
        
      </InstantSearch>
    </Box>
  );
}