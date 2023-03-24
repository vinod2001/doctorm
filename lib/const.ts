import groq from "groq";
export const STOREFRONT_NAME = process.env.NEXT_PUBLIC_STOREFRONT_NAME || "";
export const CHECKOUT_TOKEN = "checkoutToken";
export const API_URI = "https://doctorm-poc-store.eu.saleor.cloud/graphql/";
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
export const HOMEPAGE_MENU = process.env.NEXT_PUBLIC_HOMEPAGE_MENU || "";
export const GEOLOCATION = process.env.NEXT_PUBLIC_GEOLOCATION === "true";

export const HOME_PAGE_SANITY_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
    title,
    "name": author->name,
    "categories": categories[]->title,
    "categoriesDes": categories[]->description,
    "categoriesImg": categories[]->carouselImage,
    "categoriesButton": categories[]->buttonOrLinkText,
    "authorImage": author->image,
    "findFramesTitle": findFrames[]->title,
    "findFramesDes": findFrames[]->description,
    "findFramesImg": findFrames[]->carouselImage,
    "findFramesButton": findFrames[]->buttonOrLinkText,
    topCategoriesHeading,
    "topCategories": topCategories[]->title,
    "topCategoriesImg": topCategories[]->carouselImage,
    topBrandsHeading,
    "topBrandsImg": topBrands[]->carouselImage,
    "largeBanners":largeBanners[]->carouselImage,
    "biggerBanners":biggerBanners[]->title,
    "biggerBannersImg":biggerBanners[]->carouselImage,
    "biggerBannersDes":biggerBanners[]->description,
    "biggerBannersButton": biggerBanners[]->buttonOrLinkText,
    body
  }`;

export const PDP_PAGE_SANITY_QUERY = groq`*[_type == "productDetail" && slug.current == $slug][0]{
    "productCarouselImg":productCarousel[]->carouselImage,
    "productThumpnail":thumpnails[]->carouselImage,
    measurements,
    "measurementImages":measurementImages[]->carouselImage,
    "measurementsTitle":measurementImages[]->title,
    "measurementsDes":measurementImages[]->description,
    "frameImage":frameImage[]->carouselImage,
    "frameCode":frameImage[]->title,
    }`;
