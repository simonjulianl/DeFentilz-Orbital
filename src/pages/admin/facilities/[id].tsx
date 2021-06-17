import { useEffect, useState } from "react";
import {} from "@chakra-ui/react";

import { NextPage } from "next";
import { useRouter } from "next/router";

import AdminPage from "~/components/Page/AdminPage";

const FacilityEdit: NextPage = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {}, [isLoading]);

  const { id } = router.query;

  return (
    <AdminPage title="FacilityEdit" description="FacilityEdit">
      test
    </AdminPage>
  );
};

export default FacilityEdit;
