import { NextRouter, useRouter } from "next/router";

import GeneralButton from "~/components/Button/Button";
import {GenButtonInterface} from "~/interfaces/GeneralButtonInterface";

import { HStack, Flex } from "@chakra-ui/layout";
import { useMediaQuery, Button } from "@chakra-ui/react";

interface Props {
  navButtons: { label: string; path: string; icon: any }[];
  isNotMobile: boolean
}

type onClickCallback = (event: React.MouseEvent<HTMLButtonElement>) => void;
const NavBarButton = (property: GenButtonInterface, callback : onClickCallback, router: NextRouter) => {
  return (
  <Button
    leftIcon={property.icon}
    border="0px"
    onClick={callback}
    size="lg"
    as="button"
    bgColor="white"
    fontWeight={router.pathname === property.path ? 'extrabold' : 'normal'}
    key={1}
    variant={property.variant}>
    {property.label}
  </Button>
  )
}

function NavBar({navButtons}: Props) {
  const router = useRouter();
  const [isNotMobile, isDisplayingInBrowser] = useMediaQuery([
    "(min-width: 768px)",
    "(display-mode: browser)",
  ]);
  
  return (
      isNotMobile
        ? (
          <HStack justify="space-around">
            {navButtons.map((button) => NavBarButton(button, () => router.push(button.path), router))}
          </HStack>
        )
        : (
          <HStack justify="space-around">
            {navButtons.map((button) => NavBarButton({label: "", path: button.path, icon:button.icon, size:"lg"}, () => router.push(button.path), router))}
          </HStack>
        )
      
  )
}

export default NavBar;
