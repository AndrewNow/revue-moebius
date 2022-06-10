import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Hamburger from "hamburger-react";
import NavMenu from "./navMenu";
import ToggleDarkMode from "./toggleDarkMode";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

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

  return (
    <>
      <NavbarWrapper>
        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          color="var(--static-black)"
        />
        <p>Logo</p>
        <div>
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
            <motion.div
              key="menu"
              variants={fadeIn}
              initial="visible"
              animate={isOpen ? "hidden" : "visible"}
              exit="hidden"
            >
              <p>Search</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </NavbarWrapper>
      <NavMenu isOpen={isOpen} />
    </>
  );
};

export default Navbar;

const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 130px;
  width: 92.5%;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;
