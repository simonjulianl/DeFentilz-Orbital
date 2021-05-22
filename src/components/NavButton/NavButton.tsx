import Link from "next/link";
import { withRouter } from "next/router";
import buttonStyles from "~/src/styles/NavButton.module.scss";
import React from "react";

function NavButton(props) {
  return (
    <Link href={props.path}>
      <div
        className={
          props.router.pathname === props.path
            ? buttonStyles.NavButtonActive
            : buttonStyles.NavButton
        }
      >
        <div className="Icon">{props.icon}</div>
        <span className="Label">{props.label}</span>
      </div>
    </Link>
  );
}

export default withRouter(NavButton);
