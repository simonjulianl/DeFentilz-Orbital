import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Spinner } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import axios, { AxiosRequestConfig } from "axios";
import AdminPage from "~/components/Page/AdminPage";
import { Facility, Error } from "~/config/interface";
import { useAuth } from "~/firebase/auth";
import APIUrl from "~/config/backendUrl";
import SearchCard from "~/components/SearchCard/SearchCard";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
} from "@chakra-ui/react";
import SearchBar from "~/components/SearchBar/SearchBar";
import { facilities } from "backend/models";
import { generateRegex } from "~/util/searchBar";

const FacilityAdminView: NextPage = () => {
  const router = useRouter();
  const authContext = useAuth();

  const [isLoading, setLoading] = useState<boolean>(true);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [displayedFacilities, setDisplayedFacilities] = useState<Facility[]>(
    []
  );
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (facilities.length === 0) {
      const config: AxiosRequestConfig = {
        method: "get",
        url: APIUrl.getAllFacilities,
        timeout: 5000,
      };
      setLoading(true);
      axios(config)
        .then((response) => response.data)
        .then((facilities) => {
          console.log(facilities);
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

  const generateView = () => (
    <Flex direction="column" justify="start">
      <Flex direction="row" marginLeft={5} my={5}>
        <Menu>
          <MenuButton as={Button}> Type </MenuButton>
          <MenuList>
            {menuList.map((menu) => (
              <MenuItem
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
      </Flex>
      <Flex>
        {displayedFacilities.map((facility) => (
          <Box
            key={facility.id}
            marginLeft={5}
            my={5}
            onClick={() => router.push(`/admin/facilities/${facility.id}`)}
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

export default FacilityAdminView;
