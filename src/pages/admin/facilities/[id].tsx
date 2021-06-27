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
} from "@chakra-ui/react";

import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import AdminPage from "~/components/Page/AdminPage";
import APIUrl from "~/config/backendUrl";
import axios, { AxiosRequestConfig } from "axios";
import { Facility } from "~/config/interface";
import DeleteConfirmationModal from "~/components/DeleteConfirmationModal";
import BonusAlert from "~/components/BonusAlert/BonusAlert";

const defaultPictureUrl =
  "https://bonusdefentilzbucket.s3.ap-southeast-1.amazonaws.com/default_image_facility.jpeg";

/**
 * use id = 0 for create mode
 */
const FacilityEdit: NextPage = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pictureUrl, setPictureUrl] = useState<string>(defaultPictureUrl);

  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [type, setType] = useState<string>("OTHER");
  const [rate, setRate] = useState<number>(0.0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const editMode = useRef<boolean>(false);
  const { id } = router.query;

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);

    const picture = e.target.files[0];
    const formData = new FormData();
    formData.append("image", picture);

    axios({
      method: "POST",
      url: APIUrl.postFacilityImage,
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

    if (location === "") {
      setError("location cannot be empty");
      setLoading(false);
      return;
    }

    const payload = {};
    payload["name"] = name;
    payload["location"] = location;
    payload["rate"] = rate;
    payload["type"] = type;

    if (desc !== "") {
      payload["description"] = desc;
    }

    if (pictureUrl != defaultPictureUrl) {
      payload["imageUrl"] = pictureUrl;
    }

    // type cannot be empty since it has default value
    if (editMode) {
      // create mode
      payload["description"] = desc;

      axios({
        method: "PUT",
        url: APIUrl.updateFacility + `/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(payload),
      })
        .then((_) => {
          setLoading(false);
          router.push("/admin/facilities");
        })
        .catch((err) => {
          setError(err.response.data.message);
          setLoading(false);
        });
    } else {
      // create mode
      if (desc !== "") {
        payload["description"] = desc;
      }

      axios({
        method: "POST",
        url: APIUrl.createFacility,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(payload),
      })
        .then((_) => {
          setLoading(false);
          router.push("/admin/facilities");
        })
        .catch((err) => {
          setError(err.response.data.message);
          setLoading(false);
        });
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    axios({
      method: "DELETE",
      url: APIUrl.deleteSingleFacility + `/${id}`,
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
    if (id !== "0") {
      // edit mode
      editMode.current = true;
      const config: AxiosRequestConfig = {
        method: "GET",
        url: APIUrl.getSingleFacility + `/${id}`,
        timeout: 5000,
      };

      setLoading(true);
      axios(config)
        .then((response) => response.data)
        .then((facility: Facility) => {
          setRate(facility.rate);
          setName(facility.name);
          setDesc(facility.description);
          setLocation(facility.location);
          setPictureUrl(facility.imageUrl);
          setType(facility.type);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.response.data.message);
        });
    } else {
      editMode.current = false;
      setRate(0);
      setName("");
      setDesc("");
      setLocation("");
      setPictureUrl(defaultPictureUrl);
      setType("OTHER");
    }
  }, []);

  return (
    <AdminPage title="FacilityCreate" description="FacilityCreate">
      <Flex>
        <VStack>
          <Box
            width={"35vw"}
            borderWidth={"1px"}
            borderRadius="xl"
            overflow="hidden"
            shadow="lg"
            marginLeft={"5vw"}
            marginTop={"10vh"}
          >
            {/* 4 : 3 image */}
            <Image
              width={800}
              height={600}
              alt="Picture of the facility"
              src={pictureUrl}
              priority={true}
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
        </VStack>
        <VStack spacing={8} marginLeft={"5vh"} marginTop={"10vh"}>
          {error ? <BonusAlert status="error" code={error} /> : null}
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              value={name}
              disabled={isLoading}
              placeholder="e.g. Squash Court USC 1"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <FormHelperText>
              This field would be used for searching by name and name must be
              unique
            </FormHelperText>
          </FormControl>
          <FormControl id="type" isRequired>
            <FormLabel>Type</FormLabel>
            <RadioGroup
              value={type}
              disabled={isLoading}
              onChange={(e) => {
                setType(e);
              }}
            >
              <HStack spacing="24px">
                <Radio value="SPORT">Sport</Radio>
                <Radio value="STUDY">Study</Radio>
                <Radio value="MEETING">Meeting</Radio>
                <Radio value="OTHER">Other</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <FormControl id="location" isRequired>
            <FormLabel>Location</FormLabel>
            <Input
              value={location}
              disabled={isLoading}
              placeholder="NUS"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </FormControl>
          <FormControl id="rate" isRequired>
            <FormLabel>Rate per hour</FormLabel>
            <NumberInput
              value={rate}
              disabled={isLoading}
              onChange={(e) => {
                setRate(parseInt(e));
              }}
              defaultValue={0}
              precision={2}
              step={0.1}
              min={0}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Textarea
              value={desc}
              disabled={isLoading}
              placeholder="A cool NUS facility"
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </FormControl>
          <HStack spacing={4}>
            <Button
              m={4}
              colorScheme="teal"
              isLoading={isLoading}
              type="submit"
              onClick={handleSubmit}
            >
              {editMode.current ? "Confirm Change" : "Submit"}
            </Button>
            {editMode.current ? (
              <>
                <Button
                  m={4}
                  colorScheme="red"
                  isLoading={isLoading}
                  type="submit"
                  onClick={onOpen}
                >
                  Delete
                </Button>
                <DeleteConfirmationModal
                  message={"Are you sure to delete this facility ?"}
                  onDelete={handleDelete}
                  isOpen={isOpen}
                  onClose={onClose}
                />
              </>
            ) : (
              <></>
            )}
          </HStack>
        </VStack>
      </Flex>
    </AdminPage>
  );
};
export default FacilityEdit;
