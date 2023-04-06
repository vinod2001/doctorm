// @ts-nocheck
import { Box, Link } from "@mui/material";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import client from "@/lib/sanity/client";

export function ImageWithTextGrid({ data }) {
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

  const { contents } = data || {};
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          border: "0px solid",
          mt: 8,
        }}
      >
        <Box
          sx={{
            width: "95%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {contents &&
            contents.map((item, index) => (
              <Box
                key={item._key}
                sx={{ width: "49%", borderLeft: "0px solid red" }}
              >
                <Box>
                  <PortableText
                    value={item.image}
                    components={ptComponents}
                  />
                </Box>
                <Box
                  sx={{
                    mt: 4,
                    mb: 2,
                    fontSize: "30px",
                    color: "#343434",
                  }}
                >
                  {item.text}
                </Box>
                <Box sx={{ height: "30px", color: "#8d8d8d" }}>
                  {item.description}
                </Box>
                <Box sx={{ border: "0px solid", mt: 5 }}>
                  <Link
                    href={item.url}
                    underline="always"
                    sx={{
                      color: "#ff9905",
                      textDecorationColor: "#ff9905",
                      fontWeight: "bold",
                      fontSize: "18px",
                      "&:hover": {
                        color: "#f59407",
                        fontWeight: "bold",
                        textDecorationColor: "#f59407",
                      },
                    }}
                  >
                    {item.linkText}
                  </Link>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
}

export default ImageWithTextGrid;
