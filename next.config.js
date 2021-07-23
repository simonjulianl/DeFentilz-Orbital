const withPWA = require("next-pwa");

module.exports = withPWA({
  future: {
    webpack5: true,
  },
  pwa: {
    disable: process.env.NODE_ENV === "development",
    register: true,
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
    ENVIRONMENT: "TEST", // PRODUCTION OR TEST
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
