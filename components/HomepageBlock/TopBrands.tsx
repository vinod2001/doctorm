// @ts-nocheck
import { Box, Divider } from "@mui/material";
import imageUrlBuilder from "@sanity/image-url";
import client from "@/lib/sanity/client";
import Carousel from "react-material-ui-carousel";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { PortableText } from "@portabletext/react";


export function TopBrands({ data }) {
  function urlFor(source: string) {
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

  const { contents, title, _key } = data || {};
  return (
    <Box>
      {contents && (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "auto",
              mt: 10,
              mb: 1.5,
              fontSize: "35px",
            }}
          >
            {title}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "auto",
              mb: 6,
            }}
          >
            <Divider
              sx={{
                width: "10%",
                borderBottomWidth: 4,
                background: "#343434",
              }}
            />
          </Box>
          <Box
            sx={{
              textAlign: "center",
              border: "0px solid",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "0px solid",
                width: "80%",
              }}
            >
              <Carousel
                sx={{ width: "100%" }}
                PrevIcon={<ArrowBackIosNewIcon />}
                NextIcon={<ArrowForwardIosIcon />}
                navButtonsProps={{
                  // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                  style: {
                    background: "transparent",
                    color: "#F7961C",
                  },
                }}
                navButtonsAlwaysVisible={true}
                activeIndicatorIconButtonProps={{
                  style: {
                    backgroundColor: "#F7961C",
                    color: "#F7961C",
                  },
                }}
                indicatorIconButtonProps={{
                  style: {
                    color: "#b2be9a",
                    marginRight: "10px",
                  },
                }}
              >
                <Box
                  sx={{
                    border: "0px solid",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {contents.map((item, index) => (
                    <Box key={item._key}>
                      <PortableText
                        value={item.image}
                        components={ptComponents}
                      />
                    </Box>
                  ))}
                </Box>
              </Carousel>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default TopBrands;
