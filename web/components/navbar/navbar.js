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
            layout="fixed"
            width={154}
            height={38}
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
            <small style={{ color: "var(--color-black)" }}>
              Panier ({cartCount > 0 ? cartCount : 0})
            </small>
          </Panier>
          {openCart && (
            <CartSummary setOpenCart={setOpenCart} openCart={openCart} />
          )}
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
`;

const RightSideWrapper = styled.div`
  position: fixed;
  z-index: 1000;
  top: 41px;
  right: 3.75%;
`;

const LogoWrapper = styled.div`
  position: fixed;
  z-index: 1000;
  top: 41px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`;

const Panier = styled(motion.div)`
  z-index: 999;
  cursor: pointer;
  user-select: none;
  :hover {
    text-decoration: underline;
  }
`;
