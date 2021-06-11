import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import {
  INVALID_EMAIL,
  NAME_NOT_FOUND,
  PASSWORD_CHANGE_SUCCESS,
  USER_EXIST,
  USER_NOT_FOUND,
  WEAK_PASSWORD,
  WRONG_PASSWORD,
} from "./AlertConfig";

interface OwnProps {
  status: "error" | "info" | "warning" | "success";
  code: string;
}

const BonusAlert: React.FC<OwnProps> = ({ status, code }) => {
  const handleCode = (code: string) => {
    switch (code) {
      case USER_NOT_FOUND:
        return "User Not Found. Please sign up to register";
      case PASSWORD_CHANGE_SUCCESS:
        return "We have sent a password change link to the above email!";
      case WEAK_PASSWORD:
        return "Password should be at least 6 characters long";
      case INVALID_EMAIL:
        return "Please input an NUS email";
      case NAME_NOT_FOUND:
        return "Please input your display name";
      case USER_EXIST:
        return "This user already exist. Please login instead"
      case WRONG_PASSWORD:
        return "Incorrect password provided"
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
