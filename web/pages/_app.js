import Navbar from "../components/navbar/navbar";
import "../styles/globals.css";
import { Layout } from "../utils/layout";
import Footer from "../components/footer";
import Cart from "../components/cart";
import { LazyMotion, m, domAnimation, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "next-themes";

const MyApp = ({ Component, pageProps, router }) => {

  return (
    <ThemeProvider defaultTheme="system" enableSystem disableTransitionOnChange>
      <LazyMotion features={domAnimation}>
        <AnimatePresence
          exitBeforeEnter
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <m.div
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
    </ThemeProvider>
  );
};

export default MyApp;
