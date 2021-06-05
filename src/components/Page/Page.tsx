import Head from "next/head";
import { withRouter } from "next/router";
import type { Router } from "next/router";
import { Flex, Box, Center, Spacer, VStack } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */

interface OwnProps {
  title: string;
  description: string;
  children: React.ReactNode;
  router: Router;
}

const Page: React.FC<OwnProps> = ({ title, description, children, router }) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(screen.height);
  }, [height]);

  return (
    <div>
      <Head>
        <title>{`BoNUS: Your One Stop Facility Booking Place`}</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta
          name="description"
          content="BoNUS: Your One Stop Facility Booking Place"
        />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1"
        />
        <meta charSet="utf-8" />
        <meta
          property="og:image"
          content={"/assets/icons/bonus.png"}
          key="ogimage"
        />
        <meta property="og:title" content={`BoNUS`} key="ogtitle" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href="/maskable_icon_x48.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="72x72"
          href="/maskable_icon_x72.png"
        />

        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#8B572A" />
      </Head>
      <Flex direction="column" justifyContent="flex-start" height="100vh">
        <Box zIndex={9999}>
          <Header />
        </Box>
        <Box height="90vh" bgColor="transparent" overflowY="scroll">
          {children}
        </Box>
        <NavBar />
      </Flex>

      <script src="https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js"></script>
      <script src="https://www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js"></script>
    </div>
  );
};

export default withRouter(Page);
