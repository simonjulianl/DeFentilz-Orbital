import { useRouter } from "next/router";

import GeneralButton from "~/components/Button/Button";

import { HStack } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/react";

interface Props {
  navButtons: { label: string; path: string; icon: any }[];
  isNotMobile: boolean
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
            {navButtons.map((button) => GeneralButton(button, () => router.push(button.path), router))}
          </HStack>
        )
        : (
          <HStack justify="space-around">
            {navButtons.map((button) => GeneralButton({label: "", path: button.path, icon:button.icon, size:"lg"}, () => router.push(button.path), router))}
          </HStack>
        )
      
  )
}

export default NavBar;
