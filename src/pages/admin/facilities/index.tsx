import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import axios, { AxiosRequestConfig } from "axios";
import AdminPage from "~/components/Page/AdminPage";
import { Facility, Error } from "~/config/interface";
import APIUrl from "~/config/backendUrl";
import SearchCard from "~/components/SearchCard/SearchCard";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import SearchBar from "~/components/SearchBar/SearchBar";
import { generateRegex } from "~/util/searchBar";

const AdminFacilityPage: NextPage = () => {
  const router = useRouter();

  const [isLoading, setLoading] = useState<boolean>(true);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [displayedFacilities, setDisplayedFacilities] = useState<Facility[]>(
    []
  );
  const [error, setError] = useState<Error | null>(null);
  const selectedFacility = useRef<Facility>(null);

  // action modal state
  const {
    isOpen,
    onOpen: onOpenActionModal,
    onClose: onCloseActionModal,
  } = useDisclosure();

  useEffect(() => {
    if (facilities.length === 0) {
      const config: AxiosRequestConfig = {
        method: "GET",
        url: APIUrl.getAllFacilities,
        timeout: 5000,
      };
      setLoading(true);
      axios(config)
        .then((response) => response.data)
        .then((facilities) => {
          setFacilities(facilities);
          setDisplayedFacilities(facilities);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
          setError({
            code: error.response.status,
            message: error.response.statusText,
          });
        });
    }
  }, []);

  const menuList = [
    {
      name: "Sport",
      type: "SPORT",
    },
    {
      name: "Study",
      type: "STUDY",
    },
    {
      name: "Meeting",
      type: "MEETING",
    },
    {
      name: "Other",
      type: "OTHER",
    },
  ];

  const ActionModal = () => {
    return (
      <>
        <Modal isOpen={isOpen} onClose={onCloseActionModal} isCentered={true}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Please Select The Action</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Click check booking to manage the booking for the selected
              facility, Click Edit Facility to change the field of the facility
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="teal"
                mr={3}
                onClick={() =>
                  router.push(
                    `/admin/facilities/bookings/${selectedFacility.current.id}`
                  )
                }
              >
                Check Booking
              </Button>
              <Button
                colorScheme="teal"
                mr={3}
                onClick={() =>
                  router.push(
                    `/admin/facilities/${selectedFacility.current.id}`
                  )
                }
              >
                Edit Facility
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

  const generateView = () => (
    <Flex direction="column" justify="start" maxW={"80vw"}>
      <Flex direction="row" marginLeft={5} my={5} width={"80vw"}>
        <Menu>
          <MenuButton as={Button} colorScheme="teal">
            Type
          </MenuButton>
          <MenuList>
            {menuList.map((menu) => (
              <MenuItem
                key={menu.name}
                id={menu.name}
                onClick={() =>
                  setDisplayedFacilities(
                    facilities.filter((x) => x.type === menu.type)
                  )
                }
              >
                {menu.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Box marginLeft={5} width={"30vw"}>
          <SearchBar
            name="admin-search"
            onSubmit={(content: string) => {
              const regex: string = generateRegex(content.toLowerCase());
              setDisplayedFacilities(
                facilities.filter((facility) =>
                  facility.name.toLowerCase().match(regex)
                )
              );
            }}
          />
        </Box>
        <Spacer />
        <Button
          size="md"
          colorScheme="teal"
          variant="solid"
          leftMargin={10}
          onClick={() => router.push("/admin/facilities/0")}
        >
          Add New
        </Button>
      </Flex>
      <Flex direction="row" maxW={"80vw"} wrap="wrap">
        {displayedFacilities.map((facility) => (
          <Box
            key={facility.id}
            marginLeft={5}
            my={5}
            onClick={() => {
              onOpenActionModal();
              selectedFacility.current = facility;
            }}
          >
            <SearchCard
              id={facility.id}
              name={facility.name}
              type={facility.type}
              description={facility.description}
              image={facility.imageUrl}
              location={facility.location}
              rating={facility.rating}
              showModal={false}
            />
          </Box>
        ))}
      </Flex>
      {ActionModal()}
    </Flex>
  );

  return (
    <AdminPage title="facilitiesAdmin" description="facilitiesAdmin">
      {isLoading ? (
        <Box marginLeft="45vw" marginTop="45vh">
          <Spinner size="xl" color="black" />
        </Box>
      ) : (
        generateView()
      )}
    </AdminPage>
  );
};

export default AdminFacilityPage;
