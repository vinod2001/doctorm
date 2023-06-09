import type { OptionalQuery as OptionalQuery1 } from "../pages/[locale]/products/[slug]";

export const pagesPath = {
  $404: {
    $url: (url?: { hash?: string }) => ({
      pathname: "/404" as const,
      hash: url?.hash,
    }),
  },
  _channel: (channel: string | number) => ({
    _locale: (locale: string | number) => ({
      _sitemap: (sitemap: string | number) => ({
        $url: (url?: { hash?: string }) => ({
          pathname: "/[locale]/[sitemap]" as const,
          query: { channel, locale, sitemap },
          hash: url?.hash,
        }),
      }),
      account: {
        addressBook: {
          $url: (url?: { hash?: string }) => ({
            pathname: "/[locale]/account/addressBook" as const,
            query: { channel, locale },
            hash: url?.hash,
          }),
        },
        // login: {
        //   $url: (url?: { query?: OptionalQuery0; hash?: string }) => ({
        //     pathname: "/[locale]/account/login" as const,
        //     query: { channel, locale, ...url?.query },
        //     hash: url?.hash,
        //   }),
        // },
        orders: {
          $url: (url?: { hash?: string }) => ({
            pathname: "/[locale]/account/orders" as const,
            query: { channel, locale },
            hash: url?.hash,
          }),
          _token: (token: string | number) => ({
            $url: (url?: { hash?: string }) => ({
              pathname: "/[locale]/account/orders/[token]" as const,
              query: { channel, locale, token },
              hash: url?.hash,
            }),
          }),
        },
        preferences: {
          $url: (url?: { hash?: string }) => ({
            pathname: "/[locale]/account/preferences" as const,
            query: { channel, locale },
            hash: url?.hash,
          }),
        },
        register: {
          $url: (url?: { hash?: string }) => ({
            pathname: "/[locale]/account/register" as const,
            query: { channel, locale },
            hash: url?.hash,
          }),
        },
      },
      category: {
        _slug: (slug: string | number) => ({
          $url: (url?: { hash?: string }) => ({
            pathname: "/[locale]/category/[slug]" as const,
            query: { channel, locale, slug },
            hash: url?.hash,
          }),
        }),
      },
      checkout: {
        $url: (url?: { hash?: string }) => ({
          pathname: "/[locale]/checkout" as const,
          query: { channel, locale },
          hash: url?.hash,
        }),
      },
      collection: {
        _slug: (slug: string | number) => ({
          $url: (url?: { hash?: string }) => ({
            pathname: "/[locale]/collection/[slug]" as const,
            query: { channel, locale, slug },
            hash: url?.hash,
          }),
        }),
      },
      order: {
        $url: (url?: { query?: OptionalQuery1; hash?: string }) => ({
          pathname: "/[locale]/order" as const,
          query: { channel, locale, ...url?.query },
          hash: url?.hash,
        }),
        _orderId: (orderId: string) => ({
          $url: (url?: { hash?: string }) => ({
            pathname: "/[locale]/order" as const,
            query: { channel, locale, orderId },
            hash: url?.hash,
          }),
        }),
      },
      page: {
        _slug: (slug: string | number) => ({
          $url: (url?: { hash?: string }) => ({
            pathname: "/[locale]/page/[slug]" as const,
            query: { channel, locale, slug },
            hash: url?.hash,
          }),
        }),
      },
      products: {
        _slug: (slug: string | number) => ({
          $url: (url?: { query?: OptionalQuery1; hash?: string }) => ({
            pathname: "/[locale]/products/[slug]" as const,
            query: { channel, locale, slug, ...url?.query },
            hash: url?.hash,
          }),
        }),
      },
      search: {
        $url: (url?: { hash?: string }) => ({
          pathname: "/[locale]/search" as const,
          query: { channel, locale },
          hash: url?.hash,
        }),
      },
      $url: (url?: { hash?: string }) => ({
        pathname: "/[locale]" as const,
        query: { channel, locale },
        hash: url?.hash,
      }),
    }),
  }),
  $url: (url?: { hash?: string }) => ({
    pathname: "/" as const,
    hash: url?.hash,
  }),
};

export type PagesPath = typeof pagesPath;
