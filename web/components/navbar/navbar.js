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
            toggled={isOpen}
            toggle={setOpen}
            color="var(--color-black)"
          />
        </HamburgerWrapper>
        <LogoWrapper>
          <Link href="/">
            <Image
              src={Logo}
              alt="Moebius logo"
              layout="fill"
              quality={100}
              style={{ filter: "var(--logo-color)" }}
            />
          </Link>
        </LogoWrapper>
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
  z-index: 700;
  background-color: var(--nav-color);
  width: 100%;
  height: 90px;
  top: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(10px) saturate(80%);
  border-bottom: 1px solid var(--color-grey);
  /* mix-blend-mode: lighten; */

  @media (max-width: ${breakpoints.m}px) {
    height: 80px;
  }
`;

const HamburgerWrapper = styled.div`
  position: fixed;
  z-index: 1000;
  top: 25px;
  left: 3.75%;
  @media (max-width: ${breakpoints.m}px) {
    top: 20px;
  }
`;

const LogoWrapper = styled.div`
  position: fixed;
  width: 154px;
  height: auto;
  aspect-ratio: 154/38;
  z-index: 1000;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;

  @media (max-width: ${breakpoints.l}px) {
    width: 130px;
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
