import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import {
  INVALID_EMAIL,
  PASSWORD_CHANGE_SUCCESS,
  USER_NOT_FOUND,
  WEAK_PASSWORD,
} from "./AlertConfig";

interface OwnProps {
  status: "error" | "info" | "warning" | "success";
  code: string;
}

const BonusAlert: React.FC<OwnProps> = ({ status, code }) => {
  const handleCode = (code: string) => {
    switch (code) {
      case USER_NOT_FOUND:
        return "User Not Found";
      case PASSWORD_CHANGE_SUCCESS:
        return "We have sent a password change link to the above email!";
      case WEAK_PASSWORD:
        return "Password should be at least 6 characters long";
      case INVALID_EMAIL:
        return "Please input use a nus email";
      default:
        return "Unhandled Error";
    }
  };

  return (
    <Alert status={status}>
      <AlertIcon />
      <AlertTitle>{handleCode(code)}</AlertTitle>
    </Alert>
  );
};

export default BonusAlert;
