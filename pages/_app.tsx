import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { AppProps } from "next/app";

import "tailwindcss/tailwind.css";

import Layout from "@components/Layout/Layout";
import UserInitializer from "@components/initializers/UserInitializer";

function xCuratorApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return getLayout(
    <>
      <Component {...pageProps} />
      <UserInitializer />
    </>
  );
  /*
  return (
    <Layout>
      <Component {...pageProps} />
      <UserInitializer />
    </Layout>
  );
  */
}

export default xCuratorApp;
