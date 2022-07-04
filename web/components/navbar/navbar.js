import React from "react";
import { useState } from "react";
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

const Navbar = () => {
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

  return (
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
            <DesktopPanier>
              <small
                style={{ color: "var(--color-black)" }}
                suppressHydrationWarning
              >
                Panier ({cartCount > 0 ? cartCount : 0})
              </small>
            </DesktopPanier>
            <MobilePanier>
              <CartIcon />
              <small suppressHydrationWarning>
                ({cartCount > 0 ? cartCount : 0})
              </small>
            </MobilePanier>
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
        isOpen={isOpen}
        setOpen={setOpen}
        style={{ zIndex: "1001", position: "relative" }}
      />
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.div`
  position: relative;
  /* z-index: 999; */
`;

const HamburgerWrapper = styled.div`
  position: fixed;
  z-index: 1000;
  top: 41px;
  left: 3.75%;
  @media (max-width: ${breakpoints.l}px) {
    top: 30px;
  }
  @media (max-width: ${breakpoints.m}px) {
    top: 30px;
  }
`;

const LogoWrapper = styled.div`
  position: fixed;
  width: 154px;
  height: auto;
  aspect-ratio: 154/38;
  z-index: 1000;
  top: 41px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;

  @media (max-width: ${breakpoints.l}px) {
    top: 30px;
    width: 130px;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 100px;
    top: 41px;
  }
`;

const RightSideWrapper = styled.div`
  position: fixed;
  z-index: 1000;
  top: 41px;
  right: 3.75%;
  @media (max-width: ${breakpoints.l}px) {
    top: 34px;
  }
  @media (max-width: ${breakpoints.m}px) {
    top: 37px;
  }
  @media (max-width: ${breakpoints.s}px) {
    top: 30px;
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

const DesktopPanier = styled.div`
  @media (max-width: ${breakpoints.s}px) {
    display: none;
  }
`;

const MobilePanier = styled.div`
  display: none;

  @media (max-width: ${breakpoints.s}px) {
    position: relative;
    display: block;
    transform: translate(-5px, 2px);
    /* width: 40px; */
    /* height: 40px; */
    small {
      color: var(--color-black);
      font-size: 12px !important;
      position: absolute;
      right: -15px;
      top: 0;
      transform: translateY(-10px);
    }
  }
`;
