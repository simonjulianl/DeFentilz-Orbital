import React from "react";
import { Flex } from "@chakra-ui/react";
import { Router, useRouter, withRouter } from "next/router";
import Page from "~/components/Page/Page";

import Sidebar from "~/components/Sidebar/sidebar";

interface OwnProps {
  title: string;
  description: string;
  children: React.ReactNode;
  router: Router;
}

const AdminPage: React.FC<OwnProps> = ({
  title,
  description,
  children,
  router,
}) => {
  return (
    <Page title={title} description={description}>
      <Sidebar />
      <Flex marginLeft={200}>{children}</Flex>
      test
    </Page>
  );
};

export default withRouter(AdminPage);
