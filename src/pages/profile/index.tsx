import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "~/firebase/auth";

import {
  VStack,
  Text,
  Box,
  Spinner,
  Center,
  Button,
  Stack,
  useDisclosure,
  Icon,
  HStack,
} from "@chakra-ui/react";

import Page from "~/components/Page/Page";
import ProfileHeader from "~/components/Profile/ProfileHeader";

import { NextPage } from "next";
import ProfileAvatar from "~/components/Profile/ProfileAvatar";
import axios, { AxiosRequestConfig } from "axios";
import APIUrl from "~/config/backendUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCog,
  faKey,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import TopUpModal from "~/components/TopUpModal/TopUpModal";
import { useRouter } from "next/router";
import { User } from "~/config/interface";
import moment from "moment";

const ProfileView: NextPage = () => {
  const authContext = useAuth();
  const [isLoading, setLoading] = useState<boolean>(false);

  const [displayName, setDisplayName] = useState<string>(undefined);
  const [photoUrl, setPhotoUrl] = useState<string>(undefined);
  const [walletValue, setWalletValue] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const canTopUp = useRef<boolean>();

  // For Push Notif
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [subscription, setSubscription] = useState<PushSubscription>(null);
  const [registration, setRegistration] = useState(null);

  const randomNotification = () => {
    const notifTitle = "Hello World";
    const notifBody = `Created by your mama`;
    const options = {
      body: notifBody,
    };

    new Notification(notifTitle, options);
  };

  const base64ToUint8Array = (base64) => {
    const padding = "=".repeat((4 - (base64.length % 4)) % 4);
    const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");

    const rawData = window.atob(b64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const subscribeButtonOnClick = async (event: {
    preventDefault: () => void;
  }) => {

    event.preventDefault();
    const sub: PushSubscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(
        process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY
      ),
    });

    setSubscription(sub);
    console.log(sub.toJSON());

    const subscribeConfig: AxiosRequestConfig = {
      method: "POST",
      url: APIUrl.createSubscription,
      headers: {
        "Content-type": "application/json",
      },
      data: {
        endpoint: sub.endpoint, 
        keys: {
          auth: sub.toJSON().keys.auth,
          p256dh: sub.toJSON().keys.p256dh
        },
        userAgent: navigator.userAgent,
        userEmail: authContext.auth.email
      },
      timeout: 5000,
    };

    axios(subscribeConfig)
    .then(() => console.log("Subscribed!"))
    .then(() => setIsSubscribed(true))
    .catch(err => console.error(err));
  };

  const unsubscribeButtonOnClick = async (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault();
    subscription.unsubscribe()
    .then(() => {
      const deleteSub : AxiosRequestConfig = {
        method: "DELETE", 
        url: APIUrl.deleteSubscription,
        data: {
          endpoint: subscription.endpoint
        }
      }
      return axios(deleteSub);
    })
    .then(() => setSubscription(null))
    .then(() => setIsSubscribed(false))
    .then(() => console.log("Unsubscribed locally!"))
    .catch((err) => console.error(err));
  };

  const sendNotificationButtonOnClick = async (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault();
    if (subscription == null) {
      console.error("web push not subscribed");
      return;
    }

    const subscribeConfig: AxiosRequestConfig = {
      method: "POST",
      url: APIUrl.getNotifByEmail,
      data: {
        userEmail: authContext.auth.email,
      },
      timeout: 5000,
    };

    axios(subscribeConfig)
      .then((response) => response.data)
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (authContext.auth) {
      const getUserconfig: AxiosRequestConfig = {
        method: "GET",
        url: APIUrl.getSingleUserByEmail + "/" + authContext.auth.email,
        timeout: 5000,
      };

      setLoading(true);
      axios(getUserconfig)
        .then((response) => response.data)
        .then((user: User) => {
          console.log(user);
          canTopUp.current =
            moment().diff(moment(user.lastTopUpRequest), "days") > 0;

          setDisplayName(user.name);
          setPhotoUrl(user.profilePictureUrl);
          setWalletValue(user.walletValue);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));

      // Attempt to get a subscription, if any
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        navigator.serviceWorker.ready.then((reg) => {
          reg.pushManager.getSubscription().then((sub) => {
            if ( sub ) {
              setSubscription(sub);
              setIsSubscribed(true);
            }
          });
          setRegistration(reg);
        });
      }
    }
  }, [isOpen, authContext.auth]);

  const getTopUpConfig = (topUpValue: number) => {
    const postConfig: AxiosRequestConfig = {
      method: "POST",
      url: APIUrl.createWalletRequest,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        userEmail: authContext.auth.email,
        value: topUpValue,
      }),
    };
    return postConfig;
  };

  const router = useRouter();

  return (
    <Page title="Profile" description="Profile">
      <Box paddingTop={[2, 3, 5, 10]}>
        {isLoading ? (
          <Center>
            <Spinner size="xl" />
          </Center>
        ) : authContext.auth ? (
          <Box>
            <ProfileHeader
              displayName={displayName ? displayName : authContext.auth.name}
              photoUrl={photoUrl ? photoUrl : authContext.auth.photoUrl}
              email={authContext.auth.email}
              walletValue={walletValue}
              showWallet={true}
              showTopUp={true}
              disableTopUp={!canTopUp.current}
              onTopUp={onOpen} // Do a post request
            />
            <Center>
              <FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
              <Text ml="1" fontWeight="bold" fontSize="xl">
                {"Settings"}
              </Text>
            </Center>
            <VStack justify="left">
              {/* To Change Display Name, Password, etc. */}
              <HStack p="3">
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                <Text ml="1" fontWeight="bold" fontSize="lg">
                  Account
                </Text>
              </HStack>
              <Button
                aria-label="Account"
                onClick={() => router.push("/profile/edit")}
              >
                Change Profile
              </Button>
              <Button aria-label="Account" isDisabled>
                Change Password
              </Button>
              {/* Notification settings */}
              <HStack p="3">
                <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
                <Text ml="1" fontWeight="bold" fontSize="lg">
                  Notification
                </Text>
              </HStack>
              <Button
                colorScheme={isSubscribed ? "red" : "teal"}
                aria-label="Subscribe"
                onClick={
                  isSubscribed
                    ? unsubscribeButtonOnClick
                    : subscribeButtonOnClick
                }
              >
                {isSubscribed ? "Unsubscribe" : "Subscribe"}
              </Button>
              {/* <Button onClick={sendNotificationButtonOnClick}>
                Send Notification
              </Button> */}
            </VStack>
          </Box>
        ) : (
          <VStack paddingTop={[10, 50]}>
            <ProfileAvatar photoUrl={null} />
            <Text align="center">
              {"You are not logged in. Please login to see your profile."}
            </Text>
          </VStack>
        )}
      </Box>
      <TopUpModal
        isOpen={isOpen}
        onClose={onClose}
        getTopUpConfig={getTopUpConfig}
      />
    </Page>
  );
};

export default ProfileView;
