import { Button } from "@chakra-ui/react";
import { NextRouter } from 'next/router';
import { GenButtonInterface } from "~/interfaces/GeneralButtonInterface";

// type onClickCallback = (event: React.MouseEvent<HTMLButtonElement>) => void;

const GeneralButton = (property: GenButtonInterface, callback : any, router: NextRouter) => {
  return (
  <Button
    size={property.size ? property.size : null}
    leftIcon={property.icon}
    border="0px"
    onClick={callback}
    color={property.color == null || undefined ? 'white' : property.color}
    bgColor={property.bgColor}
    as="button" 
    fontWeight={router.pathname === property.path ? 'extrabold' : 'normal'}
    key={Math.random()}
    variant={property.variant}>
    {property.label}
  </Button>
  )
}

export default GeneralButton;
