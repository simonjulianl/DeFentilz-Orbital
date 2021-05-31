import Header from "~/components/Header/Header";
import NavBar from "~/components/NavBar/NavBar";

import Head from "next/head";
import { Flex, Box, Center, Spacer } from "@chakra-ui/layout";

import { HeaderConfig } from "~/configs/HeaderConfig";
import {NavBarButtonConfig} from "~/configs/NavBarConfig";
import { useMediaQuery } from "@chakra-ui/react";

function Layout(props) {
  // TODO : Add description and title onto each layout
  const [isNotMobile, isDisplayingInBrowser] = useMediaQuery([
    "(min-width: 768px)",
    "(display-mode: browser)",
  ]);

  return (
    <>
      <Head>
        <title>{`BoNUS: Your One Stop Facility Booking Place`}</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1"
        />
        <meta charSet="utf-8" />
        <meta
          property="og:image"
          content={"/assets/icons/pinus.png"}
          key="ogimage"
        />
        <meta
          property="og:site_name"
          content="BoNUS: Your One Stop Facility Booking Place"
          key="ogsitename"
        />
        <meta property="og:title" content={`BoNUS`} key="ogtitle" />
      </Head>
      <Flex direction='column' height="100vh">
        <Header navButtons= { HeaderConfig } isNotMobile={isNotMobile}/>
        {
          isNotMobile
          ? (
            <>
              <Box bgColor="white" height="100vh">
              {props.children}
              </Box>
            </>
          )
          : (
            <>
              <Box bgColor="white" height="100vh">
              {props.children}
              </Box>
              <NavBar navButtons={ NavBarButtonConfig } isNotMobile={isNotMobile}/>
            </>
          )
        }
      </Flex>
      <script src="https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js"></script>
      <script src="https://www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js"></script>
    </>
  );
}

export default Layout;