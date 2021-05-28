import { useAuth } from "~/firebase/auth";
import { useRouter } from "next/router";

import { HStack } from "@chakra-ui/layout";
import GeneralButton from "~/components/Button/Button";

interface Props {
  navButtons: { label: string; path: string; icon: any }[];
  isMobile: boolean
}

function NavBar({navButtons, isMobile}: Props) {
  const { auth } = useAuth();
  const router = useRouter();
  
  if (auth) {
    return (
      <HStack justify="space-around">
        { isMobile
          ? 
          navButtons.map((button) => GeneralButton(button, () => router.push(button.path), router))
          :
          navButtons.map((button) => GeneralButton({label: "", path: button.path, icon:button.icon, size:"lg"}, () => router.push(button.path), router))
        }
      </HStack>
    )
  }

  return (<></>);
}

export default NavBar;
