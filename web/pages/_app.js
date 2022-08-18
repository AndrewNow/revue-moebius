import Navbar from "../components/navbar/navbar";
import "../styles/globals.css";
import { Layout } from "../utils/layout";
import Footer from "../components/footer";
import Cart from "../components/cart";
import { LazyMotion, m, domAnimation, AnimatePresence } from "framer-motion";

const MyApp = ({ Component, pageProps, router }) => {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence exitBeforeEnter>
        <m.div
          key={router.route}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Layout>
            <Cart>
              <Navbar mediaKitData={pageProps.footerLogos} />
              <Component {...pageProps} />
              <Footer logos={pageProps.footerLogos} />
            </Cart>
          </Layout>
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
};

export default MyApp;
