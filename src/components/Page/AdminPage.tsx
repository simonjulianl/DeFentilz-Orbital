import React from "react";
import { Flex } from "@chakra-ui/react";
import { Router, withRouter } from "next/router";
import Page from "~/components/Page/Page";

import Sidebar from "~/components/Sidebar/sidebar";
import { useAuth } from "~/firebase/auth";

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
  const authContext = useAuth();

  return (
    <>
      {authContext.auth ? (
        <Page title={title} description={description}>
          <Sidebar />
          <Flex marginLeft={200}>{children}</Flex>
          test
        </Page>
      ) : (
        "Error Page under Construction, please login through normal route for now"
      )}
    </>
  );
};

export default withRouter(AdminPage);
