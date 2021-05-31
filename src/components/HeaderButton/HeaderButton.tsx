import { NextRouter } from "next/router";
import { Button } from "@chakra-ui/react";
import { GenButtonInterface } from "~/interfaces/GeneralButtonInterface";

type onClickCallback = (event: React.MouseEvent<HTMLButtonElement>) => void;
const HeaderButton = (property: GenButtonInterface, callback : onClickCallback, router: NextRouter) => {
  return (
  <Button
    leftIcon={property.icon}
    border="0px"
    onClick={callback}
    color="white"
    size="lg"
    as="button" 
    fontWeight={router.pathname === property.path ? 'extrabold' : 'normal'}
    key={1}
    variant={property.variant}>
    {property.label}
  </Button>
  )
}

export default HeaderButton;