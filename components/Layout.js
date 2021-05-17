import Header from "./Header";
import NavBar from "./NavBar";
import styles from './Layout.module.scss';

import Head from "next/head";

function Layout (props){
  const appTitle = `BoNUS: Your One Stop Facility Booking Place`;

  return (
    <div className={styles.Layout}>
      <Head>
          <title>BoNUS</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8"/>
      </Head>

      <Header appTitle={appTitle}/>
      <div className={styles.Content}>
          {props.children}
      </div>
    </div>)
};

export default Layout;