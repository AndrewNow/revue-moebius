import Navbar from "../components/navbar/navbar";
import "../styles/globals.css";
import { Layout } from "../utils/layout";
import Footer from "../components/footer";
import Cart from "../components/cart";
import { LazyMotion, m, domAnimation, AnimatePresence } from "framer-motion";
import {ThemeModeProvider} from 'next-theme-mode'
import { Theme } from "../styles/Theme";

const MyApp = ({ Component, pageProps, router }) => {
  return (
    <ThemeModeProvider customThemes={Theme}>
    <LazyMotion features={domAnimation}>
      <AnimatePresence exitBeforeEnter>
        <m.div
          // key="routerKey"
          key={router.asPath}
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
    </ThemeModeProvider>
  );
};

export default MyApp;
