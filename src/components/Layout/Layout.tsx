import Header from "~/components/Header/Header";
import NavBar from "~/components/NavBar/NavBar";

import Head from "next/head";
import { Flex, Box, Center } from "@chakra-ui/layout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass, faMapMarkerAlt, faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "@chakra-ui/react";

function Layout(props) {
  // TODO : Add description and title onto each layout
  const [isMobile, isDisplayingInBrowser] = useMediaQuery([
    "(min-width: 768px)",
    "(display-mode: browser)",
  ]);

  return (
    <Flex direction="column" height="100vh" width="100wh">
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
      <Header navButtons= { buttonConfig } isMobile={isMobile}/>
      <Center
        bgColor="blue.100"
        h="100%"
        w="100%"
        justifyContent="center"
      >
        <Box>{props.children}</Box>
      </Center>
      <NavBar navButtons={buttonConfig} isMobile={isMobile}/>
      <script src="https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js"></script>
      <script src="https://www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js"></script>
    </Flex>
  );
}

export default Layout;

const buttonConfig = [
  {
    label: "Explore",
    path: "/explore",
    icon: <FontAwesomeIcon icon={faCompass} />
  },
  {
    label: "Near Me",
    path: "/nearme",
    icon: <FontAwesomeIcon icon={faMapMarkerAlt} />
  },
  {
    label: "My Booking",
    path: "/booking",
    icon: <FontAwesomeIcon icon={faShoppingCart} />
  },
  {
    label: "Profile",
    path: "/profile",
    icon: <FontAwesomeIcon icon={faUser} />
  }
];