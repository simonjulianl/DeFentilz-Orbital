import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import AdminPage from "~/components/Page/AdminPage";

const AdminView: NextPage = () => {
  const router = useRouter();
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
