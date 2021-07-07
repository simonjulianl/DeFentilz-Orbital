import React, { useEffect, useState } from "react";
import { useAuth } from "~/firebase/auth";

import { VStack, Text, Box, Spinner, Center, Button } from "@chakra-ui/react";

import BookingCard from "~/components/Profile/BookingCard";
import Page from "~/components/Page/Page";
import ProfileHeader from "~/components/Profile/ProfileHeader";

import { NextPage } from "next";
import ProfileAvatar from "~/components/Profile/ProfileAvatar";
import axios, { AxiosRequestConfig } from "axios";
import APIUrl from "~/config/backendUrl";
import { Booking } from "~/config/interface";

const ProfileView: NextPage = () => {
  const authContext = useAuth();
  const [isLoading, setLoading ] = useState<boolean>(false);
  const [walletValue, setWalletValue ] = useState<number>(0);
  const [myBookings, setMyBookings ] = useState<Booking[]>([]);

  // For Push Notif
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscription, setSubscription] = useState(null)
  const [registration, setRegistration] = useState(null)

  const randomNotification = () => {
    const notifTitle = "Hello World";
    const notifBody = `Created by your mama`;
    const options = {
      body: notifBody
    };

    new Notification(notifTitle, options);
  }

  const testNotif = () => {
    Notification
    .requestPermission()
    .then(result => {
      if (result === 'granted') {
        console.log("Permission granted");
        randomNotification();
      } else {
        console.log("Nope");
      }
    });
  }

  const base64ToUint8Array = base64 => {
    const padding = '='.repeat((4 - (base64.length % 4)) % 4)
    const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/')
  
    const rawData = window.atob(b64)
    const outputArray = new Uint8Array(rawData.length)
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }
  
  const subscribeButtonOnClick = async (event: { preventDefault: () => void; }) => {
    event.preventDefault()
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY)
    })
    // TODO: you should call your API to save subscription data on server in order to send web push notification from server
    setSubscription(sub)
    setIsSubscribed(true)
    console.log('web push subscribed!')
    console.log(sub)
  }

  const unsubscribeButtonOnClick = async (event: { preventDefault: () => void; }) => {
    event.preventDefault()
    await subscription.unsubscribe()
    // TODO: you should call your API to delete or invalidate subscription data on server
    setSubscription(null)
    setIsSubscribed(false)
    console.log('web push unsubscribed!')
  }

  const sendNotificationButtonOnClick = async (event: { preventDefault: () => void; }) => {
    event.preventDefault()
    if (subscription == null) {
      console.error('web push not subscribed')
      return
    }

    // Hard-coded for now
    await fetch('http://localhost:5000/api/notif', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        subscription
      })
    })
  }

  useEffect(() => {
    if (authContext.auth) {
      const getUserconfig: AxiosRequestConfig = {
        method: "GET",
        url: APIUrl.getSingleUserByEmail + "/" + authContext.auth.email, 
        timeout: 5000,
      };

      const getBookingConfig: AxiosRequestConfig = {
        method: "GET",
        url: APIUrl.getBookingByEmail + "/" + authContext.auth.email,
        timeout: 5000,
      }

      setLoading(true);
      axios(getUserconfig)
      .then(response => response.data)
      .then(user => setWalletValue(user.walletValue))
      .then(() => axios(getBookingConfig))
      .then(response => response.data)
      .then(bookings => setMyBookings(bookings))
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
    }
  
    // Push Notif
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator ) {
      navigator.serviceWorker.ready.then(reg => {
        reg.pushManager
        .getSubscription()
        .then(sub => {
          if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) { // set sub expiration time
            setSubscription(sub);
            setIsSubscribed(true);
        }
      })
        setRegistration(reg);
      })
    }
  }, [])
    
  return (
    <Page title="Profile" description="Profile">
      <Box>
        {isLoading
        ? (
          <Center paddingTop={[2, 3, 5, 10]}>
            <Spinner size="xl"/>
          </Center>
        )
        : authContext.auth
        ? ( 
            <>
              <ProfileHeader
                displayName={authContext.auth.name}
                photoUrl={authContext.auth.photoUrl}
                email={authContext.auth.email}
                walletValue={walletValue}
              />
              <VStack>
              <Box>
                <Text fontWeight="semibold" fontSize="lg"> My Bookings </Text>
              </Box>
                {
                  myBookings.map((booking, id) => {
                    return <BookingCard key={id} booking={booking}/>; 
                  }
                  )
                }
              </VStack>
            </>
          ) : (
            <VStack paddingTop={[10, 50]}>
              <ProfileAvatar photoUrl={null} />
              <Text align="center">
                {"You are not logged in. Please login to see your profile."}
              </Text>
            </VStack>
          )
        }
      </Box>
      <VStack>
        <Button onClick={testNotif}>Test</Button>
        <Button onClick={subscribeButtonOnClick}>Subscribe</Button>
        <Button onClick={unsubscribeButtonOnClick}>Unsubscribe</Button>
        <Button onClick={sendNotificationButtonOnClick}>Send Notification</Button>
      </VStack>
    </Page>
  );
};

export default ProfileView;

