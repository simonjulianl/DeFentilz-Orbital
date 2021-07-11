import { User } from "~/config/interface";

export const user1: User = {
  email: "testing@u.nus.edu",
  name: "mr user 1",
  isAdmin: true,
  walletValue: 100000,
  lastTopUpRequest: new Date().toISOString(),
  profilePictureUrl:
    "https://bonusdefentilzbucket.s3.ap-southeast-1.amazonaws.com/default_profile_picture.jpeg",
};
