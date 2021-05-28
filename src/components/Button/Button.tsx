import { Button } from "@chakra-ui/react";
import { NextRouter } from 'next/router';
import { GenButtonInterface } from "~/interfaces/GeneralButtonInterface";

type onClickCallback = (event: React.MouseEvent<HTMLButtonElement>) => void;

const GeneralButton = (property: GenButtonInterface, callback : onClickCallback, router: NextRouter) => {
  return (
  <Button
    size={property.size ? property.size : null}
    leftIcon={property.icon}
    border="0px"
    bgColor="white"
    onClick={callback}
    as="button" 
    fontWeight={router.pathname === property.path ? 'extrabold' : 'normal'}>
    {property.label}
  </Button>
  )
}

export default GeneralButton;
