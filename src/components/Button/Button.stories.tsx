import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faMapMarkerAlt,
  faUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

import React from "react";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Navigation/Header",
} as Meta;

const Template: Story = (args) => <FontAwesomeIcon icon={faCompass} />;

export const button = Template.bind({});
button.args = {
  user: {},
};
