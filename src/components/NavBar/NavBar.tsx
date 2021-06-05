import { useRouter } from "next/router";
import { Box, Flex, Icon, IconButton } from "@chakra-ui/react";
import React from "react";
import { NavBarButtonsConfig } from "./NavBarConfig";
import { IndexKind } from "typescript";

const NavBar: React.FC<{}> = () => {
  const router = useRouter();

  const iconButtons = NavBarButtonsConfig.map(({ label, path, icon }, idx) => {
    return (
      <IconButton
        size="lg"
        isActive={false}
        icon={icon}
        bgColor={"brown"}
        color={router.asPath === path ? "white" : "grey.200"}
        aria-label={label}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          router.push(path);
        }}
        variant="unstyled"
      />
    );
  });

  return (
    <>
      <Box bgColor="brown" minH={50}>
        <Flex direction="row" justify="space-around">
          {iconButtons}
        </Flex>
      </Box>
    </>
  );
};

export default NavBar;
