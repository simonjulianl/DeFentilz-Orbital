import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import { NextPage } from "next";
import axios, { AxiosRequestConfig } from "axios";
import AdminPage from "~/components/Page/AdminPage";
import { Error, User, WalletRequest } from "~/config/interface";
import APIUrl from "~/config/backendUrl";
import SearchCard from "~/components/SearchCard/SearchCard";
import SearchBar from "~/components/SearchBar/SearchBar";
import { checkEmail } from "~/util/searchBar";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { userToSearchCardAdapter } from "~/util/userAdapter";
import DeleteConfirmationModal from "~/components/DeleteConfirmationModal";
import Image from "next/image";

const AdminUserPage: NextPage = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [walletRequests, setWalletRequests] = useState<WalletRequest[]>([]);
  const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const selectedWalletRequest = useRef<WalletRequest>(null);
  const selectedUser = useRef<User>(null);

  // action modal for top up request
  const {
    isOpen: isOpenActionModal,
    onOpen: onOpenActionModal,
    onClose: onCloseActionModal,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

  useEffect(() => {
    if (walletRequests.length === 0) {
      const config: AxiosRequestConfig = {
        method: "GET",
        url: APIUrl.getAllWalletRequests,
        timeout: 5000,
      };
      setLoading(true);
      axios(config)
        .then((response) => response.data)
        .then((walletRequests) => {
          setWalletRequests(walletRequests);
          setLoading(false);
          setError(null);
        })
        .catch((error) => {
          setLoading(false);
          setError({
            code: error.response.status,
            message: error.response.statusText,
          });
        });
    }
  }, []);

  const ActionModal = () => {
    return (
      <>
        <Modal
          isOpen={isOpenActionModal}
          onClose={onCloseActionModal}
          isCentered={true}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Top Up</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              please select the action for the selected top up request by{" "}
              {selectedWalletRequest.current &&
                selectedWalletRequest.current.userEmail}{" "}
              with value of S${" "}
              {selectedWalletRequest.current &&
                selectedWalletRequest.current.value}
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="teal"
                mr={3}
                onClick={() => {
                  const payload = {
                    value: selectedWalletRequest.current.value,
                  };
                  setLoading(true);
                  axios
                    .all([
                      axios({
                        method: "PUT",
                        url:
                          APIUrl.topUpWalletValue +
                          `/${selectedWalletRequest.current.userEmail}`,
                        headers: {
                          "Content-Type": "application/json",
                        },
                        data: JSON.stringify(payload),
                      }).then((response) => response.data),
                      axios({
                        method: "DELETE",
                        url:
                          APIUrl.deleteWalletRequestById +
                          `/${selectedWalletRequest.current.id}`,
                        timeout: 5000,
                      }).then((response) => response.data),
                    ])
                    .then(
                      axios.spread((_) => {
                        handleSearchingOnSubmit(
                          selectedWalletRequest.current.userEmail
                        );
                        setError(null);
                      })
                    )
                    .catch((error) => {
                      setError(error.response.statusText);
                    })
                    .finally(() => {
                      setLoading(false);
                      selectedWalletRequest.current = null;
                    });

                  onCloseActionModal();
                  setWalletRequests(
                    walletRequests.filter(
                      (request) =>
                        request.id != selectedWalletRequest.current.id
                    )
                  );
                }}
              >
                Accept
              </Button>
              <Button
                colorScheme="red"
                mr={3}
                onClick={() => {
                  setLoading(true);
                  axios({
                    method: "DELETE",
                    url:
                      APIUrl.deleteWalletRequestById +
                      `/${selectedWalletRequest.current.id}`,
                    timeout: 5000,
                  })
                    .then((response) => response.data)
                    .catch((error) => {
                      setError(error.response.statusText);
                    })
                    .finally(() => {
                      setLoading(false);
                      selectedWalletRequest.current = null;
                    });
                  onCloseActionModal();
                  setWalletRequests(
                    walletRequests.filter(
                      (request) =>
                        request.id != selectedWalletRequest.current.id
                    )
                  );
                }}
              >
                Decline
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

  const simpleCard = (walletRequests: WalletRequest[]) => (
    <>
      {walletRequests.map((value) => (
        <Box
          maxW={"xs"}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          mt={2}
          onClick={() => {
            console.log("test");
            selectedWalletRequest.current = value;
            onOpenActionModal();
          }}
        >
          <Box m="5" as="a">
            <Heading m="5" mb="2" size={"xs"}>
              {value.userEmail}
            </Heading>
            <Text m="5" mt="0">
              S$ {value.value}
            </Text>
          </Box>
        </Box>
      ))}
      <ActionModal />
    </>
  );

  const handleSearchingOnSubmit = (content: string) => {
    const config: AxiosRequestConfig = checkEmail(content)
      ? {
          method: "GET",
          url: APIUrl.getUsersByEmail + `/${content}`,
          timeout: 5000,
        }
      : {
          method: "GET",
          url: APIUrl.getUsersByName + `/${content}`,
          timeout: 5000,
        };

    setLoading(true);
    axios(config)
      .then((response) => response.data)
      .then((users) => {
        if (Array.isArray(users)) {
          setDisplayedUsers(users);
        } else {
          setDisplayedUsers([users]);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError({
          code: error.response.status,
          message: error.response.statusText,
        });
      });
  };

  const generatePage = () => {
    const items = [];

    // group the wallet requests in array of 5 items each
    for (let i = 0; i < walletRequests.length; i += 5) {
      const endIndex = Math.min(i + 5, walletRequests.length);
      const tempArray = [];
      for (let j = i; j < endIndex; j++) {
        tempArray.push(walletRequests[j]);
      }
      items.push(tempArray);
    }

    return (
      <>
        <Flex direciton="row" marginLeft={5} marginTop={"1vh"}>
          <Box paddingBottom={5} marginTop={10} height={"50vh"} width={"xs"}>
            <Text align="center" fontSize="2xl">
              Wallet Top Up Request
            </Text>
            <Carousel
              autoPlay={false}
              axis={"horizontal"}
              infiniteLoop={false}
              showThumbs={true}
              showArrows={true}
            >
              {items.map((groupedWalletRequests) =>
                simpleCard(groupedWalletRequests)
              )}
            </Carousel>
          </Box>
          <Divider
            orientation="vertical"
            height="100vh"
            mt={"3vh"}
            ml={"3vw"}
            mr={"3vw"}
          />
          <Flex direction="column">
            <Box m={5} marginTop={10}>
              <SearchBar
                name="user-admin"
                onSubmit={(content: string) => {
                  handleSearchingOnSubmit(content);
                }}
              />
              <Flex direction="row" wrap="wrap" w="50vw">
                {displayedUsers.length == 0 ? (
                  <Text m="5">type the name of the search bar to continue</Text>
                ) : null}
                {displayedUsers &&
                  displayedUsers.map((user) => {
                    const searchCardProps = userToSearchCardAdapter(user);
                    return (
                      <Box
                        mt={5}
                        mr={5}
                        onClick={() => {
                          selectedUser.current = user;
                          onOpenDeleteModal();
                        }}
                      >
                        <SearchCard
                          id={searchCardProps.id}
                          name={searchCardProps.name}
                          type={searchCardProps.type}
                          description={searchCardProps.description}
                          image={searchCardProps.image}
                          location={searchCardProps.location}
                          rating={searchCardProps.rating}
                          showModal={false}
                        />
                      </Box>
                    );
                  })}
                <DeleteConfirmationModal
                  message={`Are you sure to delete ${
                    selectedUser.current && selectedUser.current.name
                  } ?`}
                  messageStatus={"warning"}
                  onDelete={() => {
                    onCloseDeleteModal();
                    setLoading(true);
                    axios({
                      method: "DELETE",
                      url:
                        APIUrl.deleteSingleUser +
                        `/${selectedUser.current.email}`,
                    })
                      .then((_) => {
                        setDisplayedUsers(
                          displayedUsers.filter(
                            (user) => user.email != selectedUser.current.email
                          )
                        );
                      })
                      .catch((err) => {
                        setError(err.response.data.message);
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                  }}
                  isOpen={isOpenDeleteModal}
                  onClose={onCloseDeleteModal}
                />
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </>
    );
  };

  return (
    <AdminPage title="adminUser" description="adminUser">
      {isLoading ? (
        <Box marginLeft="45vw" marginTop="45vh">
          <Spinner size="xl" color="black" />
        </Box>
      ) : (
        generatePage()
      )}
    </AdminPage>
  );
};

export default AdminUserPage;
