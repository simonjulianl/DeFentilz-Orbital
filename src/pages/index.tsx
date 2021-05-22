import Link from "next/link";
import Layout from "../components/Layout/Layout";
import React from "react";

function Index(props) {
  return (
    <Layout>
      <br />
      <Link href="/explore">
        <a> Welcome to BoNUS! Start Exploring NUS Facilities Now</a>
      </Link>
    </Layout>
  );
}
export default Index;
