// [slug].tsx

import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import client from "../../client";
import Header from "../../components/header";
import ResponsiveAppBar from "../../components/menu";
import { Box, Grid, Theme, Paper, Card, SubCategory } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Divider from '@mui/material/Divider';
import { Roboto } from '@next/font/google';

const roboto = Roboto({
  subsets:['latin'],
  weight: '400'
})
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

const Post = ({ post }) => {
  const {
    title = "Missing title",
    name = "Missing name",
    categories,
    authorImage,
    categoriesImg,
    findFramesTitle,
    findFramesDes,
    findFramesImg,
    topCategoriesHeading,
    topCategories,
    topCategoriesImg,
    topBrandsHeading,
    topBrandsImg,
    largeBanners,
    biggerBanners,
    biggerBannersImg,
    biggerBannersDes,
    body = [],
  } = post;


  console.log("largeBanners:"+JSON.stringify(largeBanners))

  const sliderItems: number = topBrandsImg.length > 3 ? 3 : topBrandsImg.length;
  const items: Array<any> = [];

{/* <Box
sx={{
  border: "0px solid",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}}
>
<Box sx={{ border: "0px solid red" }}>
<PortableText
      value={topBrandsImg[index]}
      components={ptComponents}
    />
 
</Box>
</Box> */}

  for (let i = 0; i < topBrandsImg.length; i += sliderItems) {
    if (i % sliderItems === 0) {
      items.push(
        <Box  key={i.toString()}
sx={{
  border: "0px solid",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}}
>
            {topBrandsImg.slice(i, i + sliderItems).map((da, index) => {
              // return <SubCategory key={index.toString()} item={da} />;
              return <Box key={index.toString()} sx={{ border: "0px solid red" }}>
                <PortableText
                      value={da}
                      components={ptComponents}
                    />
                
                </Box>
            })}
        </Box>

      );
    }
  }

  return (
    <Grid>
      {/* <h1>{title}</h1> */}
      {/* <span>By {name}</span> */}
      <Grid item XS={12}>
        <Header />
        <Box>
          {categories && (
            <Carousel
              width="100%"
              animation="slide"
              swipe="true"
              duration="100"
            >
              {categories.map((category, index) => (
                <Box key={category}>
                  <PortableText
                    value={categoriesImg[index]}
                    components={ptComponents}
                  />{" "}
                  <br />
                  {category}
                </Box>
              ))}
            </Carousel>
          )}
        </Box>
        <Box>
          {findFramesTitle && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                border: "0px solid",
              }}
            >
              {findFramesTitle.map((frames, index) => (
                <Box
                  key={frames}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    border: "0px solid",
                    width: "100%",
                    m: 6,
                    boxShadow: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#343434",
                      m: 4,
                      width: "400px",
                    }}
                  >
                    <Box>
                      <Box sx={{ fontSize: "24px", fontWeight: "bold" }}>
                        {frames}
                      </Box>
                      <Box sx={{ mt: 2 }}>{findFramesDes[index]}</Box>
                    </Box>
                  </Box>
                  <Box sx={{ width: "56%" }}>
                    <PortableText
                      value={findFramesImg[index]}
                      components={ptComponents}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
        <Box>
          {topCategories && (
            <Box >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "auto",
                  mt:6,
                  mb:1.5,
                  fontSize:'35px'
                }}
              >
                {topCategoriesHeading}
                
              </Box>
              <Box sx={{display: "flex",
                  justifyContent: "center",
                  margin: "auto",mb:6}}>
              <Divider sx={{width:'10%', borderBottomWidth: 4, background:'#343434'}}/>
              </Box>
              
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  border: "0px solid",
                }}
              >
                {topCategories.map((items, index) => (
                  <Box
                    key={items}
                    sx={{
                      border: "0px solid",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ border: "0px solid red" }}>
                      <Box
                        sx={{
                          borderRadius: "100%",
                          border: "0px solid #999",
                          overflow: "hidden",
                          width: "60%",
                          margin: "auto",
                        }}
                      >
                        <PortableText
                          value={topCategoriesImg[index]}
                          components={ptComponents}
                        />
                      </Box>
                      <Box
                        sx={{
                          border: "0px solid",
                          width: "80%",
                          display: "flex",
                          justifyContent: "center",
                          margin: "auto",
                          fontWeight: "bold",
                          color: "#343434",
                        }}
                      >
                        {items}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>

        <Box>
          {topBrandsImg && (
            <Box >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "auto",
                  mt:10,
                  mb:1.5,
                  fontSize:'35px'
                }}
              >
                {topBrandsHeading}
                
              </Box>
              <Box sx={{display: "flex",
                  justifyContent: "center",
                  margin: "auto",mb:6,}}>
              <Divider sx={{width:'10%', borderBottomWidth: 4, background:'#343434'}}/>
              </Box>
              
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  border: "0px solid",
                }}
              >
                <Carousel  sx={{width:'100%'}}>
                  {items}
                </Carousel>
              </Box>
            </Box>
          )}
        </Box>
        
        <Box>
          {topBrandsImg && (
            <Box >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  border: "0px solid",
                  mt:8
                }}
              >
               {largeBanners && (
                largeBanners.map((item,index)=>(
                  <Box key={index} sx={{
                    display: "flex",
                    justifyContent: "center",width:'95%'}}>
                   <PortableText
                      value={item}
                      components={ptComponents}
                    />  
                  </Box>
                ))
                )}
              </Box>
            </Box>
          )}
        </Box>

        <Box>
          {biggerBanners && (
            <Box >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  border: "0px solid",
                  mt:8,
                }}
              >
                <Box sx={{width:'95%', display: "flex",
                    justifyContent: "space-between",}}>
               {biggerBanners && (
                biggerBanners.map((item,index)=>(
                  <Box key={index} sx={{ width:'49%', borderLeft:'0px solid red'}}>
                    <Box>
                   <PortableText
                      value={biggerBannersImg[index]}
                      components={ptComponents}
                    />  
                    </Box>
                    <Box sx={{mt:4,mb:2,fontSize:'30px'}}>
                      {item}
                    </Box>
                    <Box>
                      {biggerBannersDes[index]}
                    </Box>
                  </Box>
                ))
                )}
                
                </Box>
              </Box>
            </Box>
          )}
        </Box>
        {/* <PortableText value={body} components={ptComponents} /> */}
      </Grid>
    </Grid>
  );
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  "categoriesImg": categories[]->carouselImage,
  "authorImage": author->image,
  "findFramesTitle": findFrames[]->title,
  "findFramesDes": findFrames[]->description,
  "findFramesImg": findFrames[]->carouselImage,
  topCategoriesHeading,
  "topCategories": topCategories[]->title,
  "topCategoriesImg": topCategories[]->carouselImage,
  topBrandsHeading,
  "topBrandsImg": topBrands[]->carouselImage,
  "largeBanners":largeBanners[]->carouselImage,
  "biggerBanners":biggerBanners[]->title,
  "biggerBannersImg":biggerBanners[]->carouselImage,
  "biggerBannersDes":biggerBanners[]->description,
  body
}`;
export async function getServerSidePaths() {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getServerSideProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params;
  const post = await client.fetch(query, { slug });
  return {
    props: {
      post,
    },
  };
}
export default Post;
