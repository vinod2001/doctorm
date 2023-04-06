// @ts-nocheck
import { Box, Divider } from "@mui/material";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import client from "@/lib/sanity/client";


export function TopCategories({ data }) {
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

  const { contents, title } = data || {};
  return (
    <Box>
      {contents && (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "auto",
              mt: 6,
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
              display: "flex",
              justifyContent: "center",
              border: "0px solid",
            }}
          >
            {contents.map((item, index) => (
              <Box
                key={item._key}
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
                      value={item.image}
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
                    {item.title}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default TopCategories;
