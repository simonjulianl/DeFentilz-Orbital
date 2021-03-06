import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faSignInAlt,
  faSignOutAlt,
  faUserShield,
  faSearch,
  faHotel,
} from "@fortawesome/free-solid-svg-icons";

export interface HeaderData {
  label: string;
  path: string;
  icon: JSX.Element;
  variant: string;
  color: string;
  showBeforeLogged: boolean;
  showAfterLogged: boolean;
}

export const HeaderConfig: HeaderData[] = [
  {
    label: "Home",
    path: "/home",
    icon: <FontAwesomeIcon icon={faHome} />,
    variant: "link",
    color: "white",
    showBeforeLogged: true,
    showAfterLogged: true,
  },
  {
    label: "Explore",
    path: "/explore",
    icon: <FontAwesomeIcon icon={faSearch} />,
    variant: "link",
    color: "white",
    showBeforeLogged: true,
    showAfterLogged: true,
  },
  {
    label: "My Booking",
    path: "/booking",
    icon: <FontAwesomeIcon icon={faHotel} />,
    variant: "link",
    color: "white",
    showBeforeLogged: false,
    showAfterLogged: true,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: <FontAwesomeIcon icon={faUser} />,
    variant: "link",
    color: "white",
    showBeforeLogged: true,
    showAfterLogged: true,
  },
  {
    label: "Log Out",
    path: null,
    icon: <FontAwesomeIcon icon={faSignOutAlt} />,
    variant: "link",
    color: "white",
    showBeforeLogged: false,
    showAfterLogged: true,
  },
  {
    label: "Sign In",
    path: "/signin",
    icon: <FontAwesomeIcon icon={faSignInAlt} />,
    variant: "link",
    color: "white",
    showBeforeLogged: true,
    showAfterLogged: false,
  },
];

export const adminHeader: HeaderData = {
  label: "Admin",
  path: "/admin",
  icon: <FontAwesomeIcon icon={faUserShield} />,
  variant: "link",
  color: "white",
  showBeforeLogged: false,
  showAfterLogged: true,
};
