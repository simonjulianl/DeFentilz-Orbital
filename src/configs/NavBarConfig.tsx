import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faShoppingCart, faSignInAlt, faSignOutAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";

export const NavBarButtonConfig = [
  {
    label: "Explore",
    path: "/explore",
    icon: <FontAwesomeIcon icon={faHome}/>,
    bgColor: "black",
    color: "white"
  },
  {
    label: "My Booking",
    path: "/booking",
    icon: <FontAwesomeIcon icon={faShoppingCart} />,
    bgColor: "white",
    color: "black"
  },
  {
    label: "Profile",
    path: "/profile",
    icon: <FontAwesomeIcon icon={faUser} />,
    bgColor: "white",
    color: "black"
  }
];