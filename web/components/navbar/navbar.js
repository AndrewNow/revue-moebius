import { useState, useLayoutEffect } from "react";
import styled from "styled-components";
import Hamburger from "hamburger-react";
import NavMenu from "./navMenu";
import ToggleDarkMode from "./toggleDarkMode";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Logo from "../../images/logo.png";
import Link from "next/link";
import CartSummary from "../cartSummary";
import { useShoppingCart } from "use-shopping-cart";
import { breakpoints } from "../../utils/breakpoints";
import { CartIcon } from "../../svg/icons";

const Navbar = ({ mediaKitData }) => {
  const [isOpen, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const fadeIn = {
    hidden: {
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
    },
    visible: {
      opacity: 1,
      transitionEnd: {
        display: "inline-block",
      },
    },
  };

  const { cartCount } = useShoppingCart();

  // logic for hiding the navbar when the user scrolls down
  const [show, setShow] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0);

  useLayoutEffect(() => {
    const onScroll = () => {
      if (typeof window !== `undefined`) {
        setCurrentOffset(window.scrollY);
        if (currentOffset < window.scrollY && window.scrollY >= 100) {
          setShow(false);
        } else if (currentOffset > window.scrollY || window.scrollY <= 100) {
          setShow(true);
        }
      }
    };
    typeof window !== `undefined` &&
      window.addEventListener("scroll", onScroll);
    return () => {
      typeof window !== `undefined` &&
        window.removeEventListener("scroll", onScroll);
    };
  }, [currentOffset, open]);

  return (
    <>
      <Wrapper>
        <HamburgerWrapper onClick={() => setOpenCart(false)}>
          <Hamburger
            aria-label="Ouvrir le menu."
            toggled={isOpen}
            toggle={setOpen}
            color="var(--color-black)"
          />
        </HamburgerWrapper>
        <LogoFixed>
          <LogoContainer>
            <Link scroll={false} href="/">
              <Image
                src={Logo}
                alt="Moebius logo"
                layout="responsive"
                height={50}
                objectFit="contain"
                width={"100%"}
                quality={100}
                style={{ filter: "var(--logo-color)" }}
              />
            </Link>
          </LogoContainer>
        </LogoFixed>
        <RightSideWrapper>
          <AnimatePresence>
            <motion.div
              key="toggle"
              variants={fadeIn}
              initial="hidden"
              animate={isOpen ? "visible" : "hidden"}
              exit="hidden"
            >
              <ToggleDarkMode />
            </motion.div>
            <Panier
              key="menu"
              variants={fadeIn}
              initial="visible"
              animate={isOpen ? "hidden" : "visible"}
              exit="hidden"
              onClick={() => setOpenCart(!openCart)}
            >
              <PanierWrapper>
                <CartIcon />
                <small suppressHydrationWarning>
                  ({cartCount > 0 ? cartCount : 0})
                </small>
              </PanierWrapper>
            </Panier>
            <AnimatePresence exitBeforeEnter>
              {openCart && (
                <CartSummary
                  setOpenCart={setOpenCart}
                  openCart={openCart}
                  key="cart"
                />
              )}
            </AnimatePresence>
          </AnimatePresence>
        </RightSideWrapper>
        <NavMenu
          mediaKitData={mediaKitData}
          isOpen={isOpen}
          setOpen={setOpen}
          style={{ zIndex: "1001", position: "relative" }}
        />
        <Background
          initial={{ opacity: 0 }}
          animate={{ opacity: show ? 1 : 0 }}
          transition={{
            duration: 1,
          }}
        />
      </Wrapper>
    </>
  );
};

export default Navbar;

const Wrapper = styled.div`
  position: relative;
  /* z-index: 999; */
`;

const Background = styled(motion.div)`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 700;
  background-color: var(--nav-color);
  width: 100%;
  height: 90px;
  top: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(10px) saturate(60%);
  border-bottom: 1px solid var(--color-black);

  @media (max-width: ${breakpoints.xxl}px) {
    height: 80px;
  }
`;

const HamburgerWrapper = styled.div`
  position: fixed;
  z-index: 1000;
  top: 25px;
  left: 3.75%;
  @media (max-width: ${breakpoints.xxl}px) {
    top: 20px;
  }
`;

const LogoFixed = styled.div`
  position: fixed;
  display: block;
  z-index: 1000;

  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  @media (max-width: ${breakpoints.s}px) {
    top: 20px;
  }
`;

const LogoContainer = styled.div`
  position: relative;
  display: block;
  aspect-ratio: 1125/394;
  width: auto;
  height: 50px;
  @media (max-width: ${breakpoints.xxl}px) {
    width: 110px;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 100px;
  }
`;

const RightSideWrapper = styled.div`
  position: fixed;
  z-index: 1000;
  top: 35px;
  right: 3.75%;
  @media (max-width: ${breakpoints.l}px) {
    top: 34px;
  }
  @media (max-width: ${breakpoints.s}px) {
    top: 20px;
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
  }
`;

const Panier = styled(motion.div)`
  z-index: 999;
  cursor: pointer;
  user-select: none;
  :hover {
    text-decoration: underline;
  }
`;

const PanierWrapper = styled.div`
  position: relative;
  display: block;
  transform: translate(-5px, 2px);
  /* width: 40px; */
  /* height: 40px; */
  small {
    color: var(--color-black);
    position: absolute;
    transform: translateY(-10px);
  }
  @media (max-width: ${breakpoints.s}px) {
    small {
      right: -15px;
      top: 0;
      font-size: 12px !important;
    }
  }
`;
