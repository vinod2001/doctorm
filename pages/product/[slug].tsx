// @ts-nocheck
// [slug].tsx

import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import client from "../../client";
import Header from "../../components/header";
import ResponsiveAppBar from "../../components/menu";
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

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
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
          src={urlFor(value).fit("max").auto("format")}
          width="100%"
        />
      );
    },
  },
};

const Pdp = ({ pdp }) => {
    const {title} = pdp;
    return (
        <Grid>
            <Grid item xs={12}>
                <Header/>
                {title}
            </Grid>
            </Grid>
    )
}

const query = groq`*[_type == "pdp" && slug.current == 'pdp']{
    title,
    body
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