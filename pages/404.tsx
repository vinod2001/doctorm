import { Layout } from "@/components";
import { ReactElement } from "react";

import { ApolloQueryResult } from "@apollo/client";
import { serverApolloClient } from "@/lib/auth/useAuthenticatedApolloClient";
import { contextToRegionQuery } from "@/lib/regions";
import { GetServerSideProps } from "next";
import {
  RootCategoriesQuery,
  RootCategoriesQueryVariables,
  RootCategoriesDocument,
} from "@/saleor/api";

function NotFound() {
  return (<div>
    <h1>404</h1>
    <div>
      <h2>
        This page could not be found.
      </h2>
    </div>
  </div>);
}

export default NotFound;

export const getStaticProps: GetServerSideProps = async (context) => {
  const response: ApolloQueryResult<RootCategoriesQuery> =
    await serverApolloClient.query<
      RootCategoriesQuery,
      RootCategoriesQueryVariables
    >({
      query: RootCategoriesDocument,
      fetchPolicy: "no-cache",
      variables: {
        locale: contextToRegionQuery(context).locale,
      },
    });
  const rootCategories = response.data.categories.edges.map((edge) => ({
    ...edge.node,
  }));

  return {
    props: {
      rootCategories: rootCategories,
    },
  };
};

NotFound.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
