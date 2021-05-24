import React from "react";
import { Button } from "@chakra-ui/react";
import { NextRouter } from 'next/router';

interface Property {
  label: string, 
  path: string | null;
  icon: any;
}

type onClickCallback = (event: React.MouseEvent<HTMLButtonElement>) => void;

const GeneralButton = (property: Property, callback : onClickCallback, router: NextRouter) => {
  return (
  <Button
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
