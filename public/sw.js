if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let n=Promise.resolve();return s[e]||(n=new Promise((async n=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=n}else importScripts(e),n()}))),n.then((()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]}))},n=(n,s)=>{Promise.all(n.map(e)).then((e=>s(1===e.length?e[0]:e)))},s={require:Promise.resolve(n)};self.define=(n,i,c)=>{s[n]||(s[n]=Promise.resolve().then((()=>{let s={};const a={uri:location.origin+n.slice(1)};return Promise.all(i.map((n=>{switch(n){case"exports":return s;case"module":return a;default:return e(n)}}))).then((e=>{const n=c(...e);return s.default||(s.default=n),s}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/1-removebg-preview.png",revision:"649eacb164ce9dd442c7d4c7c23b281d"},{url:"/1.png",revision:"ca1a39a3afe3935bf27dd3843ff79a28"},{url:"/2-removebg-preview.png",revision:"598892c30ef30a0007bdef721c7e8509"},{url:"/2.png",revision:"44410aeb76dc2cb79bc9a8d35217b5d0"},{url:"/3-removebg-preview.png",revision:"bdcd51c9f2e35e0b5e0e326d313bd657"},{url:"/3.png",revision:"b07c37e9e110ac4094a7bfd41da7b464"},{url:"/_next/static/chunks/1bfc9850.1a54b5b8996f61f6bef1.js",revision:"lApgl4y5qRWNL882kN4yo"},{url:"/_next/static/chunks/1d07e3a733bde3c396570a88edad4e0df6086497.e5cdc6a0d37383bca867.js",revision:"lApgl4y5qRWNL882kN4yo"},{url:"/_next/static/chunks/6008db0b.9f033eaa0a59c4060a5c.js",revision:"lApgl4y5qRWNL882kN4yo"},{url:"/_next/static/chunks/cb1608f2.48c70e48ddbaf0e68194.js",revision:"lApgl4y5qRWNL882kN4yo"},{url:"/_next/static/chunks/cf04d3d842058157c17e936fb43038cb15be95de.23c17b90fb00574c31b1.js",revision:"lApgl4y5qRWNL882kN4yo"},{url:"/_next/static/chunks/commons.b4a0bccac54c6310d087.js",revision:"lApgl4y5qRWNL882kN4yo"},{url:"/_next/static/chunks/ff239f9d.20a2e68058df81a0f758.js",revision:"lApgl4y5qRWNL882kN4yo"},{url:"/_next/static/chunks/framework.6fff953eb0f638171baa.js",revision:"lApgl4y5qRWNL882kN4yo"},{url:"/_next/static/chunks/main-748be0673ccb3c9210b1.js",revision:"lApgl4y5qRWNL882kN4yo"},{url:"/_next/static/chunks/pages/_app-9108fa7ce0407da74439.js",revision:"lApgl4y5qRWNL882kN4yo"},{url:"/_next/static/chunks/pages/_error-0a87a7cce792a439deef.js",revision:"lApgl4y5qRWNL882kN4yo"},{url:"/_next/static/chunks/pages/booking-36a62473f65833862248.js",revision:"lApgl4y5qRWNL882kN4yo"},{url:"/_next/static/chunks/pages/explore-75d4e1acfcb5cede7187.js",revision:"lApgl4y5qRWNL882kN4yo"},{url:"/_next/static/chunks/pages/profile-6e179d9c96496973fc07.js",revision:"lApgl4y5qRWNL882kN4yo"},{url:"/_next/static/chunks/polyfills-283031c735651d1762e0.js",revision:"lApgl4y5qRWNL882kN4yo"},{url:"/_next/static/chunks/webpack-245f049e565ebf942e09.js",revision:"lApgl4y5qRWNL882kN4yo"},{url:"/_next/static/css/094dccb96f7f97ee58f0.css",revision:"lApgl4y5qRWNL882kN4yo"},{url:"/_next/static/css/19358f9c3faabc1e5150.css",revision:"lApgl4y5qRWNL882kN4yo"},{url:"/_next/static/lApgl4y5qRWNL882kN4yo/_buildManifest.js",revision:"lApgl4y5qRWNL882kN4yo"},{url:"/_next/static/lApgl4y5qRWNL882kN4yo/_ssgManifest.js",revision:"lApgl4y5qRWNL882kN4yo"},{url:"/bonus_header.png",revision:"c7b0e805925ec13ececf2f61a5f46187"},{url:"/bonus_header_big.png",revision:"bc88938979af36c64748220ec308a1d3"},{url:"/favicon.ico",revision:"7bef5aca284f6bf91c0e57ebb9496895"},{url:"/icons/android-icon-144x144.png",revision:"5c220a5be4ecef687b34a794aa24f1a2"},{url:"/icons/android-icon-192x192.png",revision:"f324894f4a2a62ad7643c11345c44952"},{url:"/icons/android-icon-36x36.png",revision:"41d55ce66bf3127b366a22afcdb89cb8"},{url:"/icons/android-icon-48x48.png",revision:"6b9deb17bc7f81d25ff4d155af4b2b90"},{url:"/icons/android-icon-72x72.png",revision:"ded187eb8a6378eeedd57bcb007d42b3"},{url:"/icons/android-icon-96x96.png",revision:"c71699265a0b34f5b767e12f01f427f3"},{url:"/icons/apple-icon-114x114.png",revision:"3bb6f199431ddb17ccd61e8c8f608bd8"},{url:"/icons/apple-icon-120x120.png",revision:"a9fcb2a5cec490c18e86dec526f89847"},{url:"/icons/apple-icon-144x144.png",revision:"5c220a5be4ecef687b34a794aa24f1a2"},{url:"/icons/apple-icon-152x152.png",revision:"057a147cab76c3625c098afb1f55ddf7"},{url:"/icons/apple-icon-180x180.png",revision:"788111582c6d64f00b757809072b6fe8"},{url:"/icons/apple-icon-57x57.png",revision:"cc7c50584e98169810d05c42e5ef1774"},{url:"/icons/apple-icon-60x60.png",revision:"86f7cd125a363eca623e8a907a0745f8"},{url:"/icons/apple-icon-72x72.png",revision:"ded187eb8a6378eeedd57bcb007d42b3"},{url:"/icons/apple-icon-76x76.png",revision:"1633b63299dd5df52881b4479ecb0427"},{url:"/icons/apple-icon-precomposed.png",revision:"a64f9cf0ade9b21604e39d62bebc9bca"},{url:"/icons/apple-icon.png",revision:"a64f9cf0ade9b21604e39d62bebc9bca"},{url:"/icons/bonus_header.png",revision:"c7b0e805925ec13ececf2f61a5f46187"},{url:"/icons/bonus_header_big.png",revision:"bc88938979af36c64748220ec308a1d3"},{url:"/icons/favicon-16x16.png",revision:"10d09c43a69eaefcb6087120a36e7b63"},{url:"/icons/favicon-32x32.png",revision:"98c7c97566c13e0d63e35dedbd573783"},{url:"/icons/favicon-96x96.png",revision:"c71699265a0b34f5b767e12f01f427f3"},{url:"/icons/maskable-icon-x48.png",revision:"bb2e8aaf768650a24c2795599673fd12"},{url:"/icons/maskable-icon-x72.png",revision:"1b195e01b3bf1577764972267e38f5b4"},{url:"/icons/maskable-icon-x96.png",revision:"cde0a33d20a4ec77b524d075941cd95f"},{url:"/icons/maskable-icon.png",revision:"b91ed9bd59f0e82087d0163085de63c7"},{url:"/manifest.json",revision:"da29a148fa00afaf9513d4fb00e8c2e5"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:n,event:s,state:i})=>n&&"opaqueredirect"===n.type?new Response(n.body,{status:200,statusText:"OK",headers:n.headers}):n}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const n=e.pathname;return!n.startsWith("/api/auth/")&&!!n.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
