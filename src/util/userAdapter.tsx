import { OwnProps as SearchCardProps } from "~/components/SearchCard/SearchCard";
import { User } from "~/config/interface";

export function userToSearchCardAdapter(user: User): SearchCardProps {
  return {
    id: 0, // dummy id
    name: user.name,
    description: user.email,
    image: user.profilePictureUrl,
    rating: user.isAdmin ? 5 : 3, // give full rating to admin to distinguish from members
    location: user.walletValue.toString(), // use location to display wallet value instead
    type: user.lastTopUpRequest, // use this field for last top up request
  };
}
