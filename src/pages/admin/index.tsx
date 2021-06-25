import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import AdminPage from "~/components/Page/AdminPage";

const AdminView: NextPage = () => {
  const router = useRouter();

  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    router.push("admin/facilities");
  }, []);

  return (
    <AdminPage title="facilitiesAdmin" description="facilitiesAdmin">
      None
    </AdminPage>
  );
};

export default AdminView;
