import styles from "~/styles/NavBar.module.scss";
import NavButton from "~/components//NavButton/NavButton";
import React from "react";

interface Props {
  navButtons: { label: string; path: string; icon: any }[];
}

function NavBar(props: Props) {
  return (
    <div className={styles.NavBar}>
      {props.navButtons.map((button) => (
        <NavButton
          key={button.path}
          path={button.path}
          label={button.label}
          icon={button.icon}
        />
      ))}
    </div>
  );
}

export default NavBar;
