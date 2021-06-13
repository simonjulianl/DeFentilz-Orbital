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
<<<<<<< HEAD
          rel="icon"
          type="image/png"
          sizes="48x48"
          href="/icons/maskable-icon-x48.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="72x72"
          href="/icons/maskable-icon-x72.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/icons/maskable-icon-x96.png"
        />
        <link rel="apple-touch-icon" href="/icons/apple-icon.png"></link>
=======
          href="/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
>>>>>>> parent of 6fccd28 (Fix icon bug)
        <meta name="theme-color" content="#8B572A" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/icons/ms-icon-144x144.png"
        />
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
