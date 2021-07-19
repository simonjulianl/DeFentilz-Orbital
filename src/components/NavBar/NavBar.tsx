import { useRouter } from "next/router";
import { Box, Flex, VStack, Text, Icon, IconButton } from "@chakra-ui/react";
import React from "react";
import { NavBarButtonsConfig } from "./NavBarConfig";

const NavBar: React.FC<Record<string, unknown>> = () => {
  const router = useRouter();

  const iconButtons = NavBarButtonsConfig.map(({ label, path, icon }, idx) => {
    return (
      // <VStack
      //   key={idx}
      //   as="button"
      //   aria-label={label}
      //   lineHeight="3"
      //   onClick={(e: React.MouseEvent<HTMLDivElement>) => {
      //     e.preventDefault();
      //     router.push(path);
      //   }}
      // >
      //   <Icon
      //     size="xl"
      //     color={router.asPath.startsWith(path) ? "white" : "black"}
      //     transform={
      //       router.asPath.startsWith(path) ? "scale(0.98)" : "scale(1.0)"
      //     }
      //   >
      //     {icon}
      //   </Icon>
      //   <Text
      //     size="sm"
      //     color={"white"}
      //     transform={
      //       router.asPath.startsWith(path) ? "scale(0.98)" : "scale(1.0)"
      //     }
      //   >
      //     {router.asPath.startsWith(path) ? label : ""}
      //   </Text>
      // </VStack>
      <VStack key={idx} width="5" lineHeight="3">
        <IconButton
          margin={-3}
          size={"md"}
          bgColor={"brown"}
          color={router.asPath.startsWith(path) ? "white" : "black"}
          icon={icon}
          aria-label={label}
          onClick={() => router.push(path)}
        />
        <Text
          zIndex={"1"}
          align="center"
          width={["50px", "70px", "100px", "150px"]}
          fontSize={["xs", "xs", "lg"]}
          color={router.asPath.startsWith(path) ? "white" : "black"}
        >
          {router.asPath.startsWith(path) ? label : ""}
        </Text>
      </VStack>
    );
  });

  return (
    <>
      <Box bgColor="brown" minH={50}>
        <Flex py="3" direction="row" justify="space-around">
          {iconButtons}
        </Flex>
      </Box>
    </>
  );
};

export default NavBar;
