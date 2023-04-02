import { Layout } from "@/components";
import { ReactElement } from "react";

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
  OrderDetailsQuery, OrderDetailsQueryByIdDocument, OrderDetailsQueryByIdVariables
} from "@/saleor/api";

function OrderConfirmation({orderDetails}) {
  console.log(orderDetails, "orderDetails")
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
      fetchPolicy: "no-cache",
      variables: {
        locale: contextToRegionQuery(context).locale,
      },
    });
  const rootCategories = response.data.categories.edges.map((edge) => ({
    ...edge.node,
  }));
  const { orderId } = context.query || {};
  const orderDetailsResponse: ApolloQueryResult<OrderDetailsQuery> =
    await serverApolloClient.query<
      OrderDetailsQuery,
      OrderDetailsQueryByIdVariables
    >({
      query: OrderDetailsQueryByIdDocument,
      fetchPolicy: "no-cache",
      variables: {
        id: orderId.toString()
      },
    });
  return {
    props: {
      rootCategories: rootCategories,
      orderDetails: orderDetailsResponse.data.order,
    },
  };
};

OrderConfirmation.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
