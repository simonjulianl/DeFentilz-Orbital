import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Flex,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spacer,
} from "@chakra-ui/react";

import { NextPage } from "next";
import { useRouter } from "next/router";
import Page from "~/components/Page/Page";
import SearchBar from "~/components/SearchBar/SearchBar";
import SearchCard from "~/components/SearchCard/SearchCard";

import axios, { AxiosRequestConfig } from "axios";

const AdminView: NextPage = () => {
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(screen.width);
  }, [isLoading, screenWidth]);

  return (
    <Page title="Admin" description="Admin">
      test
    </Page>
  );
};

export default AdminView;
