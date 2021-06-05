import Head from "next/head";
import { withRouter } from "next/router";
import type { Router } from "next/router";
import { Flex, Box, Center, Spacer, VStack } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";

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
        <meta
          property="og:site_name"
          content="BoNUS: Your One Stop Facility Booking Place"
          key="ogsitename"
        />
        <meta property="og:title" content={`BoNUS`} key="ogtitle" />
      </Head>
      <div>
        <Box position="fixed" width="full" zIndex={9998}>
          <Header />
        </Box>
        <Box
          position="fixed"
          width="full"
          marginTop={height - 50}
          zIndex={9997}
        >
          <NavBar />
        </Box>
        <Box
          minHeight="100vh"
          bgColor="transparent"
          paddingTop={100}
          paddingBottom={50}
          zIndex={9997}
        >
          {children}
        </Box>
      </div>

      <script src="https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js"></script>
      <script src="https://www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js"></script>
    </div>
  );
};

export default withRouter(Page);
