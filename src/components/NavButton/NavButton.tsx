import React from "react";
import { useRouter } from "next/router";
import buttonStyles from "~/styles/NavButton.module.scss";

function NavButton(props) {
  const Router = useRouter();

  return (
    <div
      className={
        Router.pathname === props.path
          ? buttonStyles.NavButtonActive
          : buttonStyles.NavButton
      }
      onClick={() => Router.push(props.path)}
    >
      <div className="Icon">{props.icon}</div>
      <span className="Label">{props.label}</span>
    </div>
  );
}

export default NavButton;
