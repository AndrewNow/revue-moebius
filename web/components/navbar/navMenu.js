import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { breakpoints } from "../../utils/breakpoints";
import { AlgoliaSearch } from "../../lib/algolia/algoliaSearch";
import NavLinks from "./navLinks";

const NavMenu = ({ isOpen, setOpen }) => {
  const openModal = {
    hidden: {
      y: "-100%",
      transition: {
        ease: [0.25, 0, 0.35, 1],
        duration: 0.45,
        delay: 0.15,
      },
    },
    open: {
      y: 0,
      transition: {
        ease: [0.25, 0, 0.35, 1],
        duration: 0.75,
      },
    },
  };

  const animateHorizontalLine = {
    hidden: {
      width: 0,
      transition: {
        ease: [0.895, 0.03, 0.685, 0.22],
        duration: 0.25,
        delay: 0,
      },
    },
    animate: {
      width: "100%",
      transition: {
        ease: [0.895, 0.03, 0.685, 0.22],
        duration: 0.75,
        delay: 0.25,
      },
    },
  };

  const backgroundAnim = {
    hidden: {
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
    },

    visible: {
      opacity: 1,
      display: "inline-block",
    },
  };

  const searchAnimIn = {
    hidden: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.25,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <AnimatePresence>
        <Menu
          variants={openModal}
          initial="hidden"
          animate={isOpen ? "open" : "hidden"}
          exit="hidden"
          key="Menuopen"
        >
          <Wrapper>
            <HorizontalLine
              variants={animateHorizontalLine}
              initial="hidden"
              animate={isOpen ? "animate" : "hidden"}
              exit="hidden"
            />
            <Content>
              <Search
                variants={searchAnimIn}
                initial="hidden"
                animate={isOpen ? "visible" : "hidden"}
                exit="hidden"
              >
                <SearchInner layout>
                  <AlgoliaSearch isOpen={isOpen} setOpen={setOpen} />
                </SearchInner>
                <HorizontalLineMobile
                  variants={animateHorizontalLine}
                  initial="hidden"
                  animate={isOpen ? "animate" : "hidden"}
                  exit="hidden"
                />
              </Search>
              <NavLinks isOpen={isOpen} setOpen={setOpen} />
            </Content>
          </Wrapper>
          <Bottom>
            <HorizontalLine
              variants={animateHorizontalLine}
              initial="hidden"
              animate={isOpen ? "animate" : "hidden"}
              exit="hidden"
            />
            <BottomInner>
              <small>Privacy policy</small>
              <small>REVUE MOEBIEUS ©{new Date().getFullYear()}</small>
            </BottomInner>
          </Bottom>
        </Menu>
        <BlurBackground
          variants={backgroundAnim}
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          exit="hidden"
          key="blurBG"
          onClick={() => setOpen(false)}
        />
      </AnimatePresence>
    </>
  );
};

export default NavMenu;

const Menu = styled(motion.div)`
  background: var(--color-clay);
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  top: 0;
  width: 100%;
  height: 85vh;
  max-height: 800px;
  z-index: 990;
  @media (max-width: ${breakpoints.l}px) {
    max-height: none;
    height: auto;
  }
  @media (max-width: ${breakpoints.s}px) {
    height: 100vh;
  }
`;

const Content = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  @media (max-width: ${breakpoints.l}px) {
    flex-direction: column;
  }
  @media (max-width: ${breakpoints.xs}px) {
    padding-top: 1rem;
  }
`;

const BlurBackground = styled(motion.div)`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  background: #00000090;
  z-index: 10;
  @media (max-width: ${breakpoints.s}px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  margin-top: 90px;
  height: 100%;
  position: relative;
  /* height: 60vh; */
  @media (max-width: ${breakpoints.l}px) {
    margin-top: 80px;
  }
  @media (max-width: ${breakpoints.m}px) {
    height: auto;
  }
`;

const HorizontalLine = styled(motion.span)`
  height: 1px;
  display: inline;
  background: var(--static-cream);
  transform-origin: left;
  float: left;
  margin: 0;
`;

const HorizontalLineMobile = styled(motion.span)`
  display: none;

  @media (max-width: ${breakpoints.l}px) {
    height: 1px;
    display: inline;
    background: var(--static-cream);
    transform-origin: left;
    float: left;
    margin: 0;
  }
`;

const Search = styled(motion.div)`
  height: 100%;
  width: 30%;

  @media (max-width: ${breakpoints.xl}px) {
    width: 40%;
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 100%;
    height: auto;
  }
  @media (max-width: ${breakpoints.xs}px) {
    display: none;
  }
`;

const SearchInner = styled(motion.div)`
  position: relative;
  width: 85%;
  margin: 0 auto;
  padding: 2rem 0;
  max-height: 100%;
  overflow-y: auto;

  @media (max-width: ${breakpoints.l}px) {
    width: 60%;
    padding: 1rem 0;
    max-height: 400px;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 90%;
  }
  @media (max-width: ${breakpoints.s}px) {
    margin: 1rem auto;
    padding: 0;
    max-height: 250px;
  }
`;

const Bottom = styled.div`
  width: 100%;
  position: relative;
  color: var(--static-cream);
  transition: var(--transition);
`;

const BottomInner = styled.div`
  width: 92.5%;
  margin: 2rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${breakpoints.m}px) {
    small {
      font-size: 12px !important;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    margin: 2rem auto;
    width: 90%;
    small {
      font-size: 12px !important;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    small {
      font-size: 10px !important;
    }
  }
`;
