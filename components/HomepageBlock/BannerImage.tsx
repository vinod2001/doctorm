// @ts-nocheck
import { Box } from "@mui/material";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import client from "@/lib/sanity/client";

export function BannerImage({ data }) {
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

  const { text, url, image, _key } = data || {};
  return (
    <Box>
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
            key={_key}
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "95%",
            }}
          >
            <PortableText value={image} components={ptComponents} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default BannerImage;
