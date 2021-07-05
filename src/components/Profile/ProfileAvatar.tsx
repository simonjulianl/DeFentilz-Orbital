import { Button, Avatar, Image, Spinner, IconButton } from "@chakra-ui/react";

interface OwnProps {
  photoUrl: string | null
  onClick?: () => void
}

const ProfileAvatar : React.FC<OwnProps> = ({ photoUrl, onClick }) => {
  return (
    photoUrl === null
    ? (
      <IconButton
        aria-label="Profile Picture Change Button"
        icon={<Avatar size="xl" aria-label="Profile Picture"/> }
      />
    )   
    : (
        <Image
          src={photoUrl}
          alt="Profile Picture"
          onError={() => ProfileAvatar({ photoUrl: null, onClick: onClick})}
          fallback={<Spinner size="xl"/>}
          size="lg"
          aria-label="Profile Picture"
        />
    )
  );
}

export default ProfileAvatar;