import React from "react";
import { HStack, Text, Box, VStack, IconButton, Button, Spacer, Grid, GridItem} from "@chakra-ui/react";

import ProfileAvatar from "~/components/Profile/ProfileAvatar";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface OwnProps { // To be fetched from the page
  displayName: string,
  photoUrl: string,  
  email: string, 
}

const ProfileHeader : React.FC<OwnProps> = ( { displayName, email, photoUrl} ) => {
  return (
    <Box>
      <Grid>
        <GridItem colStart={8}>
          <IconButton
            aria-label="edit button"
            icon={<FontAwesomeIcon icon={faPencilAlt} />}
            variant="ghost"
            onClick={() => console.log("Trigger Modal to change details, or a new page")}
          />
        </GridItem>
      </Grid>
      <VStack paddingX={[5]} justifyContent="space-between">
        <ProfileAvatar photoUrl={photoUrl} />
          <HStack>
            <Text fontSize="xl">Welcome back,</Text>
            <Text fontSize="xl" fontWeight="extrabold"> {displayName}! </Text>
          </HStack>
          <Text fontSize="md">{email}</Text>
          <Text fontSize="4xl"> SG$100.0 </Text>
      </VStack>
    </Box>
  )
}

export default ProfileHeader;