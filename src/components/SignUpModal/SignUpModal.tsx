// import {
//   Button,
//   Stack,
//   Flex,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   ModalOverlay,
// } from "@chakra-ui/react";
// import { FormControl, FormLabel, Link, Input, FormHelperText } from "@chakra-ui/react";
// import { EmailIcon } from "@chakra-ui/icons";
// import ErrorAlert from "~/components/ErrorAlert/errorAlert";

// type closeModalCallback = {
//   (): void;
//   (): void;
//   (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
// };

// function signupModal(
//   isOpen: boolean,
//   onClose: closeModalCallback,
//   handlers: any,  // Lazy make type for this. Refer to authHandlers.tsx for type
//   hookVars
// ) {
//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Sign Up</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <FormControl pb="3" id="displayName" isRequired>
//             <FormLabel>Display Name</FormLabel>
//             <Input
//               type="string"
//               placeholder="E.g: Maruq"
//               onChange={(event) => handlers.onChangeHandler(event)}
//             />
//           </FormControl>
//           <FormControl pb="3" id="userEmail" isRequired>
//             <FormLabel>Email address</FormLabel>
//             <Input
//               type="email"
//               placeholder="E.g: Maruq123@u.nus.edu"
//               onChange={(event) => handlers.onChangeHandler(event)}
//             />
//             <FormHelperText>{'Please use your email address ending with "u.nus.edu"'}</FormHelperText>

//           </FormControl>
//           <FormControl pb="3" id="userPassword" isRequired>
//             <FormLabel>Password</FormLabel>
//             <Input
//               type="password"
//               onChange={(event) => handlers.onChangeHandler(event)}
//             />
//           </FormControl>
//           <Flex justifyContent="space-between">
//             <Link color="blue.600" onClick={() => handlers.toLoginHandler()}>
//               Have an account? Login instead
//             </Link>
//           </Flex>
//           <Stack w="100%" justifyContent="center">
//             <Button
//               leftIcon={<EmailIcon />}
//               colorScheme="blue"
//               onClick={(event) => handlers.emailSignUpHandler(event)}
//             >
//               Sign Up
//             </Button>
//           </Stack>
//         </ModalBody>
//         <ModalFooter>
//           {hookVars.error.errorCode != null && ErrorAlert({status: 'error', error: hookVars.error})}
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// }
// export default signupModal;
