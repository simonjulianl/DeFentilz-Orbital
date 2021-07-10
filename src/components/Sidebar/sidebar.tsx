import { Box, Button, StackDivider, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useAuth } from "~/firebase/auth";
import { sidebarData } from "./sidebarConfig";

/**
 * side bar for the desktop version of the website
 */
const Sidebar: React.FC<{}> = () => {
  const router = useRouter();

  const SidebarContent = () => (
    <VStack spacing={4} align="stretch">
      {sidebarData.map((navItem) => (
        <Button
          key={navItem.label}
          onClick={() => {
            router.push(navItem.path);
          }}
          backgroundColor={
            router.asPath.startsWith(navItem.path) ? "brown" : "grey.200"
          }
          textColor={router.asPath === navItem.path ? "white" : "black"}
          w="100%"
        >
          {navItem.label}
        </Button>
      ))}
    </VStack>
  );

  return (
    <>
      <Box
        position="fixed"
        left={0}
        p={5}
        w="200px"
        top={"6vh"}
        h="100%"
        bg="#dfdfdf"
      >
        {SidebarContent()}
      </Box>
    </>
  );
};

export default Sidebar;
