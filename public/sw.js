if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let i=Promise.resolve();return n[e]||(i=new Promise((async i=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=i}else importScripts(e),i()}))),i.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},i=(i,n)=>{Promise.all(i.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(i)};self.define=(i,c,s)=>{n[i]||(n[i]=Promise.resolve().then((()=>{let n={};const a={uri:location.origin+i.slice(1)};return Promise.all(c.map((i=>{switch(i){case"exports":return n;case"module":return a;default:return e(i)}}))).then((e=>{const i=s(...e);return n.default||(n.default=i),n}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/1-removebg-preview.png",revision:"649eacb164ce9dd442c7d4c7c23b281d"},{url:"/1.png",revision:"ca1a39a3afe3935bf27dd3843ff79a28"},{url:"/2-removebg-preview.png",revision:"598892c30ef30a0007bdef721c7e8509"},{url:"/2.png",revision:"44410aeb76dc2cb79bc9a8d35217b5d0"},{url:"/3-removebg-preview.png",revision:"bdcd51c9f2e35e0b5e0e326d313bd657"},{url:"/3.png",revision:"b07c37e9e110ac4094a7bfd41da7b464"},{url:"/_next/static/chunks/08e184a028b6a898cc6f60fac44a3834ff3a265f.74c9dffb6d33c92a47a9.js",revision:"mknT9rxaLciXefZLZOQXi"},{url:"/_next/static/chunks/1bfc9850.3adbf04f0343341596b4.js",revision:"mknT9rxaLciXefZLZOQXi"},{url:"/_next/static/chunks/42158b08f06bc5eaadb1c9ea588a0499a3a0ec9a.4973cd6192e77c3c1297.js",revision:"mknT9rxaLciXefZLZOQXi"},{url:"/_next/static/chunks/6008db0b.80ba060d0aeb268f4c91.js",revision:"mknT9rxaLciXefZLZOQXi"},{url:"/_next/static/chunks/cb1608f2.ca255de654f07c37e4e9.js",revision:"mknT9rxaLciXefZLZOQXi"},{url:"/_next/static/chunks/commons.39e8c8942649783e4f25.js",revision:"mknT9rxaLciXefZLZOQXi"},{url:"/_next/static/chunks/d29254fe901a2fc0d01b22847699e2688e2afbd0.c845c37e7fd95ea31920.js",revision:"mknT9rxaLciXefZLZOQXi"},{url:"/_next/static/chunks/ff239f9d.20a2e68058df81a0f758.js",revision:"mknT9rxaLciXefZLZOQXi"},{url:"/_next/static/chunks/framework.6fff953eb0f638171baa.js",revision:"mknT9rxaLciXefZLZOQXi"},{url:"/_next/static/chunks/main-e6dddac0f505de2076bf.js",revision:"mknT9rxaLciXefZLZOQXi"},{url:"/_next/static/chunks/pages/_app-16c24032b1bc2ada32b5.js",revision:"mknT9rxaLciXefZLZOQXi"},{url:"/_next/static/chunks/pages/_error-b62c15c180ee736629d2.js",revision:"mknT9rxaLciXefZLZOQXi"},{url:"/_next/static/chunks/pages/admin-fdd50e0ea0f7c279fbe8.js",revision:"mknT9rxaLciXefZLZOQXi"},{url:"/_next/static/chunks/pages/admin/facilities-ff60c72450c59e777fe5.js",revision:"mknT9rxaLciXefZLZOQXi"},{url:"/_next/static/chunks/pages/admin/facilities/%5Bid%5D-10700e904f1d8b3cdd79.js",revision:"mknT9rxaLciXefZLZOQXi"},{url:"/_next/static/chunks/pages/explore-6e65a0f0ca0d8d2da9d9.js",revision:"mknT9rxaLciXefZLZOQXi"},{url:"/_next/static/chunks/pages/home-78a2a31e02ab9221f6fa.js",revision:"mknT9rxaLciXefZLZOQXi"},{url:"/_next/static/chunks/pages/profile-433885e5f52143217885.js",revision:"mknT9rxaLciXefZLZOQXi"},{url:"/_next/static/chunks/polyfills-9bfeb8a5c4d412bdec07.js",revision:"mknT9rxaLciXefZLZOQXi"},{url:"/_next/static/chunks/webpack-245f049e565ebf942e09.js",revision:"mknT9rxaLciXefZLZOQXi"},{url:"/_next/static/css/094dccb96f7f97ee58f0.css",revision:"mknT9rxaLciXefZLZOQXi"},{url:"/_next/static/css/19358f9c3faabc1e5150.css",revision:"mknT9rxaLciXefZLZOQXi"},{url:"/_next/static/mknT9rxaLciXefZLZOQXi/_buildManifest.js",revision:"mknT9rxaLciXefZLZOQXi"},{url:"/_next/static/mknT9rxaLciXefZLZOQXi/_ssgManifest.js",revision:"mknT9rxaLciXefZLZOQXi"},{url:"/bonus_header.png",revision:"c7b0e805925ec13ececf2f61a5f46187"},{url:"/bonus_header_big.png",revision:"bc88938979af36c64748220ec308a1d3"},{url:"/favicon.ico",revision:"c71699265a0b34f5b767e12f01f427f3"},{url:"/icons/android-icon-144x144.png",revision:"d22ab4d2be84d8c36c58aff58debe523"},{url:"/icons/android-icon-192x192.png",revision:"6676deecc0409478fb4e07c583386721"},{url:"/icons/android-icon-36x36.png",revision:"1234984cee68e91b092adbd9ce7bda86"},{url:"/icons/android-icon-48x48.png",revision:"bd526f2f1100ef7735fd1fe22de55415"},{url:"/icons/android-icon-72x72.png",revision:"71305f0c46fa0eb904dc72797f09a495"},{url:"/icons/android-icon-96x96.png",revision:"0f91175b63ed8b5933879f6d1ff89f37"},{url:"/icons/apple-icon-114x114.png",revision:"d715eba86da06418c0e33aaa03280a64"},{url:"/icons/apple-icon-120x120.png",revision:"bd787f35d2fcbf3497d3cf13e2aaef93"},{url:"/icons/apple-icon-144x144.png",revision:"d22ab4d2be84d8c36c58aff58debe523"},{url:"/icons/apple-icon-152x152.png",revision:"69bee4fa2c18daf5efd90c876e575aa6"},{url:"/icons/apple-icon-180x180.png",revision:"b5e4ab52ab54f6694b6c889c7a270989"},{url:"/icons/apple-icon-57x57.png",revision:"a561025eb1a36b3f0afbfd01f6ca4a6d"},{url:"/icons/apple-icon-60x60.png",revision:"d8809d2e6628c76910b90ab401cfa707"},{url:"/icons/apple-icon-72x72.png",revision:"71305f0c46fa0eb904dc72797f09a495"},{url:"/icons/apple-icon-76x76.png",revision:"1b58c5c00dee9a0e025cc73e51ea7f0b"},{url:"/icons/apple-icon-precomposed.png",revision:"cd4e382e9325ddc3072e1f01865cfa34"},{url:"/icons/apple-icon.png",revision:"cd4e382e9325ddc3072e1f01865cfa34"},{url:"/icons/favicon-16x16.png",revision:"4cbf3931dbc1bd265339fb42352b65cf"},{url:"/icons/favicon-32x32.png",revision:"8c8fa18e33503c78a49607345224d201"},{url:"/icons/favicon-96x96.png",revision:"0f91175b63ed8b5933879f6d1ff89f37"},{url:"/icons/maskable-icon-x48.png",revision:"bb2e8aaf768650a24c2795599673fd12"},{url:"/icons/maskable-icon-x72.png",revision:"1b195e01b3bf1577764972267e38f5b4"},{url:"/icons/maskable-icon-x96.png",revision:"cde0a33d20a4ec77b524d075941cd95f"},{url:"/icons/ms-icon-144x144.png",revision:"d22ab4d2be84d8c36c58aff58debe523"},{url:"/icons/ms-icon-150x150.png",revision:"f04f4e1f4db6704d5fa1be2c9b0d6e6f"},{url:"/icons/ms-icon-310x310.png",revision:"f823dd9c0d111ceb2610fb721219ebac"},{url:"/icons/ms-icon-70x70.png",revision:"7bee84350ff606e7ef6ca12eec5194c2"},{url:"/manifest.json",revision:"e5b14ecba308c5f3d137195984e0cb7e"},{url:"/next.png",revision:"7af5a20b055f7e5d1109e6aa6b2305c7"},{url:"/notAvail.png",revision:"72b4e8a0091c78360b6c4b4e29558e0d"},{url:"/notAvail2.png",revision:"cb2bbcf5ef1c0ceddeb9bbeac2f4307c"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:i,event:n,state:c})=>i&&"opaqueredirect"===i.type?new Response(i.body,{status:200,statusText:"OK",headers:i.headers}):i}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const i=e.pathname;return!i.startsWith("/api/auth/")&&!!i.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
