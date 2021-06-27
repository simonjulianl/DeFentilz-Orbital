const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === "development",
    register: false,
    sw: "sw.js",
    scope: "/",
    dest: "public",
  },
  images: {
    domains: [
      "lorempixel.com",
      "bonusdefentilzbucket.s3.ap-southeast-1.amazonaws.com",
    ],
  },
  env: {
    ENVIRONMENT: "PRODUCTION",
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
});
