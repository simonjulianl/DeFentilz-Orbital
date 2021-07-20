export type User = {
  email: string;
  name: string;
  profilePictureUrl: string;
  lastTopUpRequest: string;
  walletValue: number;
  isAdmin: boolean;
};

export type Facility = {
  id: number;
  name: string;
  imageUrl: string;
  location: string;
  type: "SPORT" | "MEETING" | "STUDY" | "OTHER";
  description: string;
  rating: number;
  rate: number;
};

export type Booking = {
  id: number;
  startingTime: string;
  endingTime: string;
  userEmail: string;
  facilityId: number;
  rewardId?: number;
};

export type Reward = {
  id: number;
  issueDate: string;
  expiryDate: string;
  description: string;
  value: number;
  userEmail?: string;
};

export type WalletRequest = {
  id: number;
  userEmail: string;
  value: number;
};

export type Error = {
  code: number;
  message: string;
};
