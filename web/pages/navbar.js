import React from "react";
import { useState, useEffect } from "react";
import { Link } from "gatsby";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { Squash as Hamburger } from "hamburger-react";
import NavLogo from "../svg/navLogo";
import breakpoints from "../components/breakpoints";

const Navbar = () => {
  const showNavbar = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
      pointerEvents: "none",
    },
  };

  const clickOut = {
    visible: {
      visibility: "visible",
      opacity: 1,
      transition: {
        delay: 0,
        duration: 0.4,
      },
    },
    hidden: {
      visibility: "hidden",
      opacity: 0,
      transition: {
        delay: 0,
        duration: 0.4,
      },
    },
  };

  const menuAnimation = {
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
        duration: 0.35,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        delay: 0,
        duration: 0.35,
      },
    },
  };

  const innerMenuAnimation = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1,
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
    },
  };

  const navItem = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };

  const [open, setOpen] = useState(false);

  //logic for hiding the navbar when the user scrolls down
  const [show, setShow] = useState(true);
  const [currentOffset, setCurrentOffset] = useState(0);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      window.onscroll = () => {
        setCurrentOffset(window.scrollY);
        if (
          currentOffset < window.scrollY &&
          window.scrollY >= 100 &&
          open === false
        ) {
          setShow(false);
        } else if (currentOffset > window.scrollY || window.scrollY <= 100) {
          setShow(true);
        }
      };
    }
  }, [currentOffset, open]);

  return (
    <>
      {/* {open && <Modal />} */}
      <HeaderWrapper
        variants={showNavbar}
        initial="visible"
        animate={show ? "visible" : "hidden"}
        exit="hidden"
        key="header"
      >
        <LogoWrapper>
          <Link aria-label="Home button" to="/">
            <NavLogo />
          </Link>
        </LogoWrapper>
        <IconWrapper>
          <a href="https://online.erealia.com/ebaem/cwv/">
            <p>Student Portal</p>
          </a>
          <Hamburger
            toggled={open}
            toggle={setOpen}
            onClick={() => setOpen(!open)}
            color="black"
            aria-label="Nav menu hamburger button"
          />
        </IconWrapper>
      </HeaderWrapper>
      <AnimatePresence exitBeforeEnter>
        {open ? (
          <NavMenu
            initial="hidden"
            animate={open ? "visible" : "hidden"}
            exit="hidden"
            variants={menuAnimation}
          >
            <NavMenuInner variants={innerMenuAnimation}>
              <motion.h3 variants={navItem}>
                <Link rel="canonical" to="/about-us/">
                  About Us
                </Link>
              </motion.h3>
              <motion.h3 variants={navItem}>
                <Link rel="canonical" to="/programs/">
                  Programs
                </Link>
              </motion.h3>
              <motion.h3 variants={navItem}>
                <Link rel="canonical" to="/admissions/">
                  Admissions
                </Link>
              </motion.h3>
              <motion.h3 variants={navItem}>
                <Link rel="canonical" to="/campus/">
                  Campus
                </Link>
              </motion.h3>
              <motion.h3 variants={navItem}>
                <Link rel="canonical" to="/our-faculty/">
                  Meet Our Faculty
                </Link>
              </motion.h3>
              <motion.h3 variants={navItem}>
                <Link rel="canonical" to="/teaching-clinic/">
                  Teaching Clinic
                </Link>
              </motion.h3>
              <motion.h3 variants={navItem}>
                <Link rel="canonical" to="/alumni/">
                  Alumni
                </Link>
              </motion.h3>
              <motion.h3 variants={navItem}>
                <Link rel="canonical" to="/bulletin-board/">
                  Events
                </Link>
              </motion.h3>
              {/* <motion.h3 variants={navItem}>
                <a href="https://online.erealia.com/ebaem/cwv/">
                  Student Portal
                </a>
              </motion.h3> */}
            </NavMenuInner>
          </NavMenu>
        ) : null}
      </AnimatePresence>
      <ClickOut
        variants={clickOut}
        animate={open ? "visible" : "hidden"}
        initial="hidden"
        exit="hidden"
        onClick={() => setOpen(!open)}
      />
    </>
  );
};

const HeaderWrapper = styled(motion.header)`
  position: fixed;
  top: 0;
  z-index: 990;
  height: 100px;
  width: 90vw;
  margin: 0 5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & svg {
    margin-top: 0.25rem;
  }

  @media (max-width: ${breakpoints.m}px) {
    top: 1rem;
    height: 60px;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    height: 90px;
    width: auto;
    margin-top: 1rem;
    /* height: 75px; */
    /* margin-top: 1rem; */
  }
  @media (max-width: ${breakpoints.l}px) {
    svg {
      margin-top: 0.5rem;
      height: 60px;
      max-width: 200px;
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    svg {
      margin-top: 0;
      height: 50px;
      max-width: 200px;
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  display: relative;
  z-index: 1000;
  a {
    border-radius: 10px;
    border: 1px solid var(--color-black);
    margin-right: 2rem;
    transition: var(--hover-transition);
    font-family: "Matter-light";
    text-decoration: none;
    background: #ffffff50;
    backdrop-filter: blur(20px) saturate(180%);
    p {
      font-size: 20px;
      line-height: 100%;
      font-family: "Matter-light";
      transition: var(--hover-transition);
      padding: 0.5rem 1rem;
      color: var(--color-black);
    }
    :hover {
      border: 1px solid transparent;
      background: var(--color-darkgreen);
      p {
        color: var(--color-white);
      }
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    a > p {
      font-size: 16px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    a {
      border-radius: 6px;
      margin-right: 1rem;
      p {
        padding: 0.45rem 0.5rem;
        font-size: 15px;
      }
    }
    transform: scale(0.9);
  }
`;

const NavMenu = styled(motion.nav)`
  border-left: 1px solid black;
  position: fixed;
  z-index: 900;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 40vw;
  height: 100vh;
  background-color: var(--color-beige);
  padding: 3rem;

  @media (max-width: ${breakpoints.xl}px) {
    width: 52vw;
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 55vw;
  }

  @media (max-width: ${breakpoints.m}px) {
    border: none;
    width: 100vw;
    left: 0;
  }
`;

const NavMenuInner = styled(motion.div)`
  margin-top: 13vh;
  height: 70vh;
  max-height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin-bottom: clamp(0.75rem, 3.3vh, 3rem);
    font-size: clamp(20px, 3.925vh, 38px);
    line-height: 100%;
    position: relative;
    width: 100%;
    text-align: center;

    :nth-child(1) {
      /* padding-top: 15vh; */
    }
    a :hover {
      color: var(--color-orange) !important;
    }
    :active {
      color: var(--color-orange) !important;
    }
  }

  h3 > a {
    margin: 0 auto;
    width: 100%;
    display: block;
    text-decoration: none;
    color: var(--color-black);
    transition: color ease-in-out 0.15s;
    /* 
    :hover {
      color: var(--color-orange) !important;
    }
    :active {
      color: var(--color-orange) !important;
    } */
  }
  @media (max-width: ${breakpoints.xxl}px) {
    h3 {
      font-size: clamp(18px, 3.925vh, 30px);
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    margin-top: 7.5vh;
  }

  @media (max-width: ${breakpoints.m}px) {
    margin-top: 10vh;
  }

  @media (max-width: ${breakpoints.s}px) {
    margin: auto 0;
    height: clamp(60vh, 70vh, 75vh);
    max-height: 500px;
    h3 {
      font-size: 24px;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    h3 {
      font-size: 20px;
      /* margin-bottom: 1rem; */
    }
  }
`;

const ClickOut = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  z-index: 99;
  position: fixed;
  backdrop-filter: blur(3px);
  /* background-color: #00000032; */
  top: 0;
`;

export default Navbar;
