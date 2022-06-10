import Navbar from "../components/navbar/navbar";
import "../styles/globals.css";
import { Layout } from "../utils/layout";
import Footer from "../components/footer";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Navbar />
      <Component {...pageProps} />
      <Footer logos={pageProps.footerLogos} />
    </Layout>
  );
}

export default MyApp;
