// @ts-nocheck
import { Box, Divider, Link } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

export function TopProducts({ data, locale }) {
  
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
          <Box sx={{display:'flex',alignItems:'center', justifyContent:'center'}}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                border: "0px solid",
                alignItems:'center',
                width:'auto',
              }}
            >
              {contents.map((item, index) => {
                return (<Box
                  key={item._key}
                  sx={{
                    border: "1px solid #d3d3d3",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    ml:index>0?2:0,
                    borderRadius:'5px',
                    p:2
                  }}
                >
                  <Box sx={{ border: "0px solid red" }}>
                  <Box sx={{display:'flex',justifyContent: "right",alignItems:'right'}}>
                      <FavoriteBorderOutlinedIcon/>
                    </Box>
                    <Link href={"/" + locale + "/products/" + item.slug} passHref sx={{textDecoration:'none'}}>
                      <Box
                        sx={{
                          borderRadius: "100%",
                          border: "0px solid #999",
                          overflow: "hidden",
                          width: "100%",
                          margin: "auto",
                          pb:2
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
                          fontSize:'22px'
                        }}
                      >
                        {item.productName}
                        <br/>
                        AED {item.price}
                      </Box>
                    </Link>
                  </Box>
                </Box>)
              })}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default TopProducts;
