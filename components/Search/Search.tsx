// @ts-nocheck
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Hits, SearchBox
} from "react-instantsearch-dom";
import Link from "next/link";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Roboto } from "@next/font/google";
import config from "../../config";

const { algoliaIndexName, algoliaProjectId, algoliaReadKey } = config;

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const client = algoliasearch(algoliaProjectId, algoliaReadKey);

const searchListWrapper = {
  position: "absolute",
  zIndex: "999",
  width: "100%",
};
const searchList = {
  background: "#f3f3f3",
  "& input": {
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    outline: "none",
    fontFamily: "sans-serif",
    fontSize: "14px",
    background: "none",
    width: "100%",
    border: "none",
  },
  "& button": {
    width: "32px",
    height: "27px",
    marginLeft: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    display: "none",
  },
  "& ul": {
    padding: 0,
    margin: 0,
    display: "flex",
    flexWrap: "wrap",
    margin: "10px 30px 10px 30px",
    "& searchBox": {
      background: "#F7961C !important",
    },
    "& li": {
      listStyleType: "none",
      margin: "5px",
      wordWrap: "break-word",
      padding: "5px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      background: "#fff",
      textAlign: "center",
      cursor: "pointer",
      fontSize: "20px",
      fontFamily: "sans-serif",
      "&:hover": {
        border: "1px solid #F7961C",
      },
      "& a": {
        display: "block",
        textDecoration: "none",

        color: "343434",
        "& img": {
          display: "block",
        },
        "& span": {
          display: "flex",
          justifyContent: "center",
          wordWrap: "break-word",
          width: "200px",
          border: "0px solid",
          alignItems: "center",
          overflowWrap: "break-word",
          overflow: "hidden",
          padding: "5px",
          color: "#343434",
          fontSize: "20px",
        },
      },
    },
  },
};

const searchClient = {
  ...client,
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return [];
    }
    return client.search(requests);
  },
};

function HitComponent({ Hit, handleSearchClose, locale }: HitProps) {
  const { hit } = Hit;
  return (
    <>
      <Box sx={{ background: "#fff" }}>
        <Link
          href={"/" + locale + "/products/" + hit.slug}
          passHref
          className={roboto.className}
          onClick={handleSearchClose}
        >
          <span>
            <img src={hit.thumbnail} width="100" height="50"></img>
          </span>
          <span>{hit.productName}</span>
          {/* <span>
          {hit.grossPrice}
        </span> */}
          {/* <Highlight hit={hit} attribute="name" /> */}
        </Link>
        <span className="Hit-price">${hit.grossPrice}</span>
      </Box>
    </>
  );
}

export default function Search({ handleSearchClose, locale }) {
  return (
    <Box sx={searchListWrapper} className="google">
      <InstantSearch
        indexName={algoliaIndexName}
        searchClient={searchClient}
      >
        <Box className="right-panel" sx={searchList}>
          <Box
            sx={{
              background: "#F7961C",
              pl: 6,
              pr: 5,
              pt: 5,
              pb: 5,
              display: "flex",
            }}
          >
            <Box>
              <SearchIcon sx={{ color: "#343434" }} />
            </Box>
            <Box sx={{ ml: 3, width: "100%" }}>
              <SearchBox
                showLoadingIndicator={false}
                placeholder="text"
                defaultRefinement=""
                autoFocus={true}
              />
            </Box>
          </Box>
          <Box>
            <Hits
              hitComponent={(Hit) => (
                <HitComponent Hit={Hit} handleSearchClose={handleSearchClose} locale={locale} />
              )}
            />
          </Box>
        </Box>
      </InstantSearch>
    </Box>
  );
}
