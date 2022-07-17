import Navbar from "../components/navbar/navbar";
import "../styles/globals.css";
import { Layout } from "../utils/layout";
import Footer from "../components/footer";
import Cart from "../components/cart";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </Head>
      <Cart>
        <Layout>
          <Navbar />
          <Component {...pageProps} />
          <Footer logos={pageProps.footerLogos} />
        </Layout>
      </Cart>
    </>
  );
}

export default MyApp;
