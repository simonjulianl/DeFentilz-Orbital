const withSass = require("@zeit/next-sass");
module.exports = withSass();

const path = require("path");

const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === "development",
    register: true,
    sw: "sw.js",
    dest: "public",
  },
  images: {
    domains: [
      "lorempixel.com",
      "bonusdefentilzbucket.s3.ap-southeast-1.amazonaws.com",
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: false,
      },
    ];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
});
