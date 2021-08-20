import { AppProps } from "next/app";

import "tailwindcss/tailwind.css";

import Layout from "@components/Layout/Layout";
import UserInitializer from "@components/initializers/UserInitializer";

function xCuratorApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <UserInitializer />
    </Layout>
  );
}

export default xCuratorApp;
