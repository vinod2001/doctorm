import { HomepageBlock, Layout } from "@/components";
import React, { ReactElement } from "react";
import groq from "groq";
import client from "../../../client";
import { ApolloQueryResult } from "@apollo/client";
import { serverApolloClient } from "@/lib/auth/useAuthenticatedApolloClient";
import { contextToRegionQuery } from "@/lib/regions";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import {
  RootCategoriesQuery,
  RootCategoriesQueryVariables,
  RootCategoriesDocument,
} from "@/saleor/api";

function HomeRedirection({
  homePageContent,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <HomepageBlock homePageContent={homePageContent} />;
}

export default HomeRedirection;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params) {
    return {
      props: {},
      notFound: true,
    };
  }

  const response: ApolloQueryResult<RootCategoriesQuery> =
    await serverApolloClient.query<
      RootCategoriesQuery,
      RootCategoriesQueryVariables
    >({
      query: RootCategoriesDocument,
      variables: {
        locale: contextToRegionQuery(context).locale,
      },
    });
  const rootCategories = response.data.categories.edges.map((edge) => ({
    ...edge.node,
  }));

  const slug = "home";
  const homePageContent = await client.fetch(query, { slug });

  return {
    props: {
      rootCategories: rootCategories,
      homePageContent: homePageContent,
    },
  };
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
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

HomeRedirection.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
