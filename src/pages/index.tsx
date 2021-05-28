import Link from "next/link";
import Layout from "~/components/Layout/Layout";

function Index() {
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
