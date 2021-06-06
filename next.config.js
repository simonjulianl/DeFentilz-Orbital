const withSass = require("@zeit/next-sass");
module.exports = withSass();

const path = require("path");

const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === "development",
    register: true,
    dest: "public",
  },
  images: {
    domains: ["lorempixel.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/explore",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // Rewrite everything to `pages/index`
      {
        source: "/:any*",
        destination: "/",
      },
    ];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
});
