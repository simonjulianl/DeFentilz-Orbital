import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faShoppingCart,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

/*
these data is used for desktop version of the header, currently such support 
is not implemented yet until the admin feature is released
*/
export const HeaderConfig = [
  {
    label: "Explore",
    path: "/explore",
    icon: <FontAwesomeIcon icon={faHome} />,
    variant: "link",
    color: "white",
  },
  {
    label: "My Booking",
    path: "/booking",
    icon: <FontAwesomeIcon icon={faShoppingCart} />,
    variant: "link",
    color: "white",
  },
  {
    label: "Profile",
    path: "/profile",
    icon: <FontAwesomeIcon icon={faUser} />,
    variant: "link",
    color: "white",
  },
  {
    label: "Log Out",
    path: null,
    icon: <FontAwesomeIcon icon={faSignOutAlt} />,
    variant: "link",
    color: "white",
    signature: "logout",
  },
  {
    label: "Sign In",
    path: "/signin",
    icon: <FontAwesomeIcon icon={faSignInAlt} />,
    variant: "link",
    color: "white",
    signature: "signin",
  },
];
