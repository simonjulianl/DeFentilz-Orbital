import React from "react";
import { HStack, Text, Box } from "@chakra-ui/react";

import ProfileAvatar from "~/components/Profile/ProfileAvatar";

interface OwnProps { // To be fetched from the page
  displayName: string,
  photoUrl: string,  
  email: string, 
}

const ProfileHeader : React.FC<OwnProps> = ( { displayName, email, photoUrl} ) => {
  return (
    <HStack paddingTop={[5, 10]} paddingX={[5]} justifyContent="space-between">
      <Box>
        <Text fontSize="xl">{displayName}</Text>
        <Text fontSize="sm">{email}</Text>
        <Text fontSize="lg"> $0.0 </Text>
      </Box>
      <ProfileAvatar photoUrl={photoUrl} onClick={() => console.log("Clicked")}></ProfileAvatar>
    </HStack>
  )
}

export default ProfileHeader;