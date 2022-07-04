module.exports = {
  reactStrictMode: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  // presets: ["next/babel"],
  plugins: [
    // [
    //   "babel-plugin-styled-components",
    //   {
    //     ssr: true,
    //   },
    // ],
  ],
  images: {
    domains: ["cdn.sanity.io"],
    // loader: 'custom'
  },
  experimental: { images: { layoutRaw: true } },
};
