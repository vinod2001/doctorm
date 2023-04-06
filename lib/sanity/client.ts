import sanityClient from "@sanity/client";
import config from "../../config";

const { sanity } = config;

export default sanityClient({
  ...sanity,
  useCdn: false, // `false` if you want to ensure fresh data
});
