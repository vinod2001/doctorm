import { Layout } from "@/components";
import React, { ReactElement } from "react";

import Link from "next/link";
import { usePaths } from "@/lib/paths";
import { ApolloQueryResult } from "@apollo/client";
import { serverApolloClient } from "@/lib/auth/useAuthenticatedApolloClient";
import { contextToRegionQuery } from "@/lib/regions";
import { GetServerSideProps } from "next";
import {
  RootCategoriesQuery,
  RootCategoriesQueryVariables,
  RootCategoriesDocument,
} from "@/saleor/api";
import { useRouter } from "next/router";

function OrderConfirmation() {

  const router = useRouter();
  const { query } = router;

  const { orderId } = query || {};

  const paths = usePaths();
  return <div>
    <div className="font-semibold text-3xl">Your order is completed!</div>
    <p className="mt-2">
      <Link href={paths.$url()}>Go back to homepage</Link>
    </p>
  </div>;
}

export default OrderConfirmation;

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

  return {
    props: {
      rootCategories: rootCategories,
    },
  };
};

OrderConfirmation.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
