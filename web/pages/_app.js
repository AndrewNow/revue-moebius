import Navbar from "../components/navbar/navbar";
import "../styles/globals.css";
import { Layout } from "../utils/layout";
import Footer from "../components/footer";
import Cart from "../components/cart";

function MyApp({ Component, pageProps }) {
  return (
    <Cart>
      <Layout>
        <Navbar />
        <Component {...pageProps} />
        <Footer logos={pageProps.footerLogos} />
      </Layout>
    </Cart>
  );
}

export default MyApp;
