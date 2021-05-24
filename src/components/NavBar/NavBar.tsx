import { useAuth } from "~/firebase/auth";
import { useRouter } from "next/router";

import { HStack } from "@chakra-ui/layout";
import GeneralButton from "~/components/Button/Button";

interface Props {
  navButtons: { label: string; path: string; icon: any }[];
}

function NavBar(props: Props) {
  const { auth } = useAuth();
  const router = useRouter();
  
  if (auth) {
    console.log(props.navButtons);
    return (
      <HStack justify="space-around">
        {props.navButtons.map(button => GeneralButton(button, () => router.push(button.path), router))}
      </HStack>
    )
  }

  return (<></>);
}

export default NavBar;
