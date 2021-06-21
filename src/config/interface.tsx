export type User = {
  email: string;
  name: string;
  profilePictureUrl: string;
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
  startingTime: Date;
  endingTime: Date;
  userEmail: string;
  facilityId: number;
  rewardId?: number;
};

export type Reward = {
  id: number;
  issueDate: Date;
  expiryDate: Date;
  description: string;
  value: number;
  userEmail?: string;
};

export type Error = {
  code: number;
  message: string;
};
