import Header from "~/components/Header/Header";
import NavBar from "~/components/NavBar/NavBar";
import navButtons from "~/components/Button/Button";
import { Flex, Box, Center } from "@chakra-ui/layout";
import Head from "next/head";

function Layout(props) {
  // TODO : Add description and title onto each layout
  return (
    <Flex direction="column" height="100%" width="100%">
      <Head>
        <title>BoNUS: Your One Stop Facility Booking Place</title>
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
          content="Perhimpunan Indonesia NUS"
          key="ogsitename"
        />
        <meta property="og:title" content={`BoNUS`} key="ogtitle" />
        <title>{`BoNUS`}</title>
      </Head>
      <Header />
      <Center
        bgColor="blue.100"
        height="100%"
        width="100%"
        justifyContent="center"
      >
        <Box>{props.children}</Box>
      </Center>
      <NavBar navButtons={navButtons} />
      <script src="https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js"></script>
      <script src="https://www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js"></script>
    </Flex>
  );
}

export default Layout;
