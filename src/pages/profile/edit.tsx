import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  VStack,
  RadioGroup,
  HStack,
  Radio,
  Textarea,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  useDisclosure,
  Spinner,
  Image
} from "@chakra-ui/react";

import { NextPage } from "next";
import { useRouter } from "next/router";
import APIUrl from "~/config/backendUrl";
import axios, { AxiosRequestConfig } from "axios";
import { Facility, User } from "~/config/interface";
import DeleteConfirmationModal from "~/components/DeleteConfirmationModal";
import BonusAlert from "~/components/BonusAlert/BonusAlert";
import Page from "~/components/Page/Page";
import { useAuth } from "~/firebase/auth";

const defaultPictureUrl =
  "https://bonusdefentilzbucket.s3.ap-southeast-1.amazonaws.com/default_image_facility.jpeg";

const ChangeProfile: NextPage = () => {
  const router = useRouter();
  const authContext = useAuth();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [pictureUrl, setPictureUrl] = useState<string>(defaultPictureUrl);
  const [name, setName] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoading(true);

    const picture = e.target.files[0];
    const formData = new FormData();
    formData.append("image", picture);

    axios({
      method: "POST",
      url: APIUrl.postUserPhoto,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((response) => response.data)
      .then((response) => {
        setLoading(false);
        setPictureUrl(response.imageUrl);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
      });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setLoading(true);

    if (name === "") {
      setError("Name cannot be empty");
      setLoading(false);
      return;
    }

    const payload = {};
    payload["name"] = name;
    if (pictureUrl != defaultPictureUrl) {
      payload["profilePictureUrl"] = pictureUrl;
    }

    axios({
      method: "PUT",
      url: APIUrl.updateUser + `/${authContext.auth.email}`, // TODO: By email
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(payload),
    })
      .then((_) => {
        setLoading(false);
        // router.push("/admin/facilities");
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    axios({
      method: "DELETE",
      url: APIUrl.deleteSingleUser + `/${authContext.auth.email}`,
    })
      .then((_) => {
        setLoading(false);
        router.push("/admin/facilities");
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (authContext.auth) {
      const config: AxiosRequestConfig = {
        method: "GET",
        url: APIUrl.getSingleUserByEmail + `/${authContext.auth.email}`,
        timeout: 5000,
      };

      setLoading(true);
      axios(config)
        .then((response) => response.data)
        .then((user: User) => {
          setName(user.name);
          setPictureUrl(user.profilePictureUrl);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.response.data.message);
        });
    } else {
      setError("Something Wrong");
    }
  }, []);

  return (
    <Page title="UpdateUser" description="UpdateUser">
      <Flex>
        <VStack p="3">
          <Box
            width={"35vw"}
            borderWidth={"1px"}
            borderRadius="xl"
            overflow="hidden"
            shadow="lg"
            marginLeft={"5vw"}
            marginTop={"10vh"}
          >
            <Image
              src={pictureUrl}
              alt="Profile Picture"
              onError={() => <Image src={defaultPictureUrl}></Image>}
              fallback={<Spinner size="xl" />}
              size="lg"
              aria-label="Profile Picture"
            />
          </Box>
          <Box>
            <FormControl id="pictureUrl">
              <FormLabel> Upload Picture</FormLabel>
              <form>
                <input
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleUploadImage(e)
                  }
                />
              </form>
            </FormControl>
          </Box>
          {error ? <BonusAlert status="error" code={error} /> : null}
          <FormControl id="name">
            <FormLabel>Display Name</FormLabel>
            <Input
              value={name}
              disabled={isLoading}
              placeholder="Your new display name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <FormHelperText>
              This field would be used for searching by name and name must be
              unique
            </FormHelperText>
          </FormControl>
          <HStack spacing={4}>
            <Button
              m={4}
              colorScheme="teal"
              isLoading={isLoading}
              type="submit"
              onClick={handleSubmit}
            >
              {"Confirm Change"}
            </Button>
            {
              <>
                <Button
                  m={4}
                  colorScheme="red"
                  isLoading={isLoading}
                  type="submit"
                  onClick={onOpen}
                  isDisabled={true}
                >
                  Delete
                </Button>
                <DeleteConfirmationModal
                  message={"Are you sure to delete this account?"}
                  onDelete={handleDelete}
                  isOpen={isOpen}
                  onClose={onClose}
                />
              </>
            }
          </HStack>
        </VStack>
      </Flex>
    </Page>
  );
};
export default ChangeProfile;
