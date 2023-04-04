/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  concurrentFeatures: true,
  swcMinify: true,
  images: {
    domains: ["https://doctorm-poc-store.eu.saleor.cloud", "https://cdn.sanity.io"],
    formats: ["image/avif", "image/webp"],
  },
});
