import { useEffect, useState } from "react";
import {} from "@chakra-ui/react";

import { NextPage } from "next";
import { useRouter } from "next/router";

import AdminPage from "~/components/Page/AdminPage";

const AdminHome: NextPage = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {}, [isLoading]);

  return (
    <AdminPage title="AdminHome" description="AdminHome">
      test
    </AdminPage>
  );
};

export default AdminHome;
