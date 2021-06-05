import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

export const NavBarButtonsConfig = [
  {
    label: "Explore",
    path: "/explore",
    icon: <FontAwesomeIcon icon={faHome} />,
  },
  {
    label: "My Booking",
    path: "/booking",
    icon: <FontAwesomeIcon icon={faShoppingCart} />,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: <FontAwesomeIcon icon={faUser} />,
  },
];
