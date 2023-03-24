/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const apiURL = new URL("https://doctorm-poc-store.eu.saleor.cloud/graphql/");

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [apiURL.hostname],
    formats: ["image/avif", "image/webp"],
  },
});
