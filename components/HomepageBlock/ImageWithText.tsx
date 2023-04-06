// @ts-nocheck
import { Box, Link } from "@mui/material";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import client from "@/lib/sanity/client";

export function ImageWithText({ data }) {
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

  const { description, image, text, linkText, url, _key } = data || {};
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        border: "0px solid",
      }}
    >
      <Box
        key={_key}
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
            <Box
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#343434",
              }}
            >
              {text}
            </Box>
            <Box sx={{ mt: 2, color: "#8d8d8d" }}>
              {description}
            </Box>
            <Box sx={{ border: "0px solid", mt: 5 }}>
              <Link
                href={url}
                underline="always"
                sx={{
                  color: "#ff9905",
                  textDecorationColor: "#ff9905",
                  fontWeight: "bold",
                  fontSize: "20px",
                  "&:hover": {
                    color: "#f59407",
                    fontWeight: "bold",
                    textDecorationColor: "#f59407",
                  },
                }}
              >
                {linkText}
              </Link>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "56%" }}>
          <PortableText
            value={image}
            components={ptComponents}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ImageWithText;
