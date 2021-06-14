import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faSearch
} from "@fortawesome/free-solid-svg-icons";

export const NavBarButtonsConfig = [
  {
    label: "Home",
    path: "/home",
    icon: <FontAwesomeIcon icon={faHome} />,
  },
  {
    label: "Explore",
    path: "/explore",
    icon: <FontAwesomeIcon icon={faSearch} />,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: <FontAwesomeIcon icon={faUser} />,
  },
];
