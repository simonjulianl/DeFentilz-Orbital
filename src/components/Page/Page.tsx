import Head from "next/head";
import { withRouter } from "next/router";
import type { Router } from "next/router";
import { Flex, Box, Center, Spacer } from "@chakra-ui/layout";
import React from "react";
import Header from "../Header/Header";

interface OwnProps {
  title: string;
  description: string;
  children: React.ReactNode;
  router: Router;
}

const Page: React.FC<OwnProps> = ({ title, description, children, router }) => {
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
      <Flex direction="column" height="100vh">
        <Header />
        <Box bgColor="white" height="100vh">
          {children}
        </Box>
        {/* <Navbar></Navbar> */}
      </Flex>
      <script src="https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js"></script>
      <script src="https://www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js"></script>
    </div>
  );
};

export default withRouter(Page);
