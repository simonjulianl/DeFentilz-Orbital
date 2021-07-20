import { Avatar, Image, Spinner } from "@chakra-ui/react";

interface OwnProps {
  photoUrl: string | null;
}

const ProfileAvatar: React.FC<OwnProps> = ({ photoUrl }) => {
  return photoUrl === null ? (
    <Avatar size="xl" aria-label="Profile Picture" />
  ) : (
    <Avatar
      loading="lazy"
      aria-label="Profile Picture"
      src={photoUrl}
      alt="Profile Picture"
      size="xl"
    />
  );
};

export default ProfileAvatar;
