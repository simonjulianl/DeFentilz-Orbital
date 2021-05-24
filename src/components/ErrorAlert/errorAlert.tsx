import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

// test
function ErrorAlert({ status, error }) {
  return (
    <Alert status={status}>
      <AlertIcon />
      <AlertTitle>
        {error.errorCode === "auth/user-not-found"
          ? "User Not Found"
          : error.errorMessage}
      </AlertTitle>
    </Alert>
  );
}
export default ErrorAlert;
