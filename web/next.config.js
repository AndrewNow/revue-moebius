module.exports = {
  reactStrictMode: true,
  plugins: [
    [
      "babel-plugin-styled-components",
      {
        ssr: true,
      },
    ],
  ],
  images: {
    domains: ["cdn.sanity.io"],
  },
  experimental: { images: { layoutRaw: true } },
};
