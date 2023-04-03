// @ts-nocheck
import { Box, Divider } from "@mui/material";

export function TopProducts({ data }) {
  
  const ptComponents = {
    types: {
      image: ({ value, index }) => {
        return (
          <img
            alt={value || " "}
            loading="lazy"
            src={value}
            width="100%"
          />
        );
      },
    },
  };

  const { products: contents, title } = data || {};
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
                    <img
                      alt={item.productImage}
                      loading="lazy"
                      src={item.productImage}
                      width="100%"
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
                    {item.productName}
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

export default TopProducts;
