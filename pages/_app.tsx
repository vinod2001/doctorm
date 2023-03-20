import "normalize.css/normalize.css";

import { ApolloProvider } from "@apollo/client";
import { NextPage } from "next";
import React, { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";

import { Roboto } from "@next/font/google";
import RegionsProvider from "@/components/RegionsProvider";
import { useAuthenticatedApolloClient } from "@/lib/auth/useAuthenticatedApolloClient";
import { API_URI } from "@/lib/const";
import { SaleorAuthProvider } from "@/lib/auth/SaleorAuthProvider";
import { useSaleorAuthClient } from "@/lib/auth/useSaleorAuthClient";
import { CheckoutProvider } from "@/lib/providers/CheckoutProvider";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

export function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const useSaleorAuthClientProps = useSaleorAuthClient({
    saleorApiUrl: API_URI,
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  });

  const { saleorAuthClient } = useSaleorAuthClientProps;

  const { apolloClient, resetClient } = useAuthenticatedApolloClient(
    saleorAuthClient.fetchWithAuth
  );

  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  return (
    <SaleorAuthProvider {...useSaleorAuthClientProps}>
      <ApolloProvider client={apolloClient}>
        <CheckoutProvider>
          <RegionsProvider>
            <main className={roboto.className}>
              {getLayout(<Component {...pageProps} />)}
            </main>
          </RegionsProvider>
        </CheckoutProvider>
      </ApolloProvider>
    </SaleorAuthProvider>
  );
}

export default MyApp;
