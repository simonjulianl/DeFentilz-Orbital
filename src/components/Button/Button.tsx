import { Button } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";

export type ButtonVariant = "Header";

const buttonStyles = {
  Header: { border: "0px", size: "lg", color: "white" },
  NavDrawer: { border: "0px", size: "lg", color: "white" },
};

interface OwnProps {
  id?: String;
  children: React.ReactNode;
  icon?: any;
  size?: "xs" | "sm" | "md" | "lg";
  chakraVariant?: "solid" | "outline" | "ghost" | "link";
  variant?: ButtonVariant;
  color?: string;
  bgColor?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const BonusButton: React.FC<OwnProps> = ({
  id,
  children,
  icon = null,
  chakraVariant = "solid",
  variant = "Header",
  bgColor,
  onClick,
}) => {
  const variantStyle = buttonStyles[variant];
  const { border, size, color } = variantStyle;

  const router = useRouter();

  return (
    <Button
      as="button"
      size={size}
      leftIcon={icon}
      border={border}
      onClick={onClick}
      color={color}
      bgColor={bgColor}
      variant={chakraVariant}
      fontWeight={router.pathname === id ? "extrabold" : "normal"}
    >
      {children}
    </Button>
  );
};

export default BonusButton;
