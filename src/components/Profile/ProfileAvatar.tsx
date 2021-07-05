import { Button, Avatar, Image, Spinner, IconButton } from "@chakra-ui/react";

interface OwnProps {
  photoUrl: string | null
}

const ProfileAvatar : React.FC<OwnProps> = ({ photoUrl }) => {
  return (
    photoUrl === null
    ? (
        <Avatar size="xl" aria-label="Profile Picture"/> 
    )   
    : (
        <Image
          src={photoUrl}
          alt="Profile Picture"
          onError={() => ProfileAvatar({ photoUrl: null })}
          fallback={<Spinner size="xl"/>}
          size="lg"
          aria-label="Profile Picture"
        />
    )
  );
}

export default ProfileAvatar;