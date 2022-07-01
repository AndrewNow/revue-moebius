import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { breakpoints } from "../../utils/breakpoints";
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

  const animateVerticalLine = {
    hidden: {
      height: 0,
      transition: {
        ease: [0.7, 0, 0.84, 0],
        duration: 0.25,
        delay: 0,
      },
    },
    animate: {
      height: "100%",
      transition: {
        ease: [0.7, 0, 0.84, 0],
        duration: 0.75,
        delay: 0.25,
      },
    },
  };
  const animateVerticalLine2 = {
    hidden: {
      height: 0,
      transition: {
        ease: [0.7, 0, 0.84, 0],
        duration: 0.15,
        delay: 0,
      },
    },
    animate: {
      height: "100%",
      transition: {
        ease: [0.7, 0, 0.84, 0],
        duration: 0.75,
        delay: 0.35,
      },
    },
  };

  const fadeTextParent = {
    hidden: {
      transition: {
        ease: [0.7, 0, 0.84, 0],
        duration: 0.15,
        delay: 0,
      },
    },
    animate: {
      transition: {
        ease: [0.7, 0, 0.84, 0],
        duration: 0.15,
        delayChildren: 0.25,
        staggerChildren: 0.1,
      },
    },
  };

  const fadeTextChild = {
    hidden: {
      opacity: 0,
      y: -50,
    },

    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
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
              <Search>
                <SearchInner>
                  <p>Search</p>
                </SearchInner>
                <HorizontalLineMobile
                  variants={animateHorizontalLine}
                  initial="hidden"
                  animate={isOpen ? "animate" : "hidden"}
                  exit="hidden"
                />
              </Search>
              <VerticalLine
                variants={animateVerticalLine}
                initial="hidden"
                animate={isOpen ? "animate" : "hidden"}
                exit="hidden"
              />
              <Links
                variants={fadeTextParent}
                initial="hidden"
                animate={isOpen ? "animate" : "hidden"}
                exit="hidden"
              >
                <motion.h3
                  variants={fadeTextChild}
                  onClick={() => setOpen(!isOpen)}
                >
                  <Link href="/a-propos">À propos</Link>
                </motion.h3>
                <motion.h3
                  variants={fadeTextChild}
                  onClick={() => setOpen(!isOpen)}
                >
                  <Link href="/proposer-un-texte">Proposer un texte</Link>
                </motion.h3>
                <motion.h3
                  variants={fadeTextChild}
                  onClick={() => setOpen(!isOpen)}
                >
                  <Link href="/vente">Vente et abonnements</Link>
                </motion.h3>
                <motion.h3
                  variants={fadeTextChild}
                  onClick={() => setOpen(!isOpen)}
                >
                  <Link href="/numeros">Numéros</Link>
                </motion.h3>
              </Links>
              <VerticalLine
                variants={animateVerticalLine2}
                initial="hidden"
                animate={isOpen ? "animate" : "hidden"}
                exit="hidden"
              />
              <Links
                variants={fadeTextParent}
                initial="hidden"
                animate={isOpen ? "animate" : "hidden"}
                exit="hidden"
              >
                <motion.h3
                  variants={fadeTextChild}
                  onClick={() => setOpen(!isOpen)}
                >
                  Résidences
                </motion.h3>
                <motion.h3
                  variants={fadeTextChild}
                  onClick={() => setOpen(!isOpen)}
                >
                  <Link href="/balado">Mœbius-balado</Link>
                </motion.h3>
                <motion.h3
                  variants={fadeTextChild}
                  onClick={() => setOpen(!isOpen)}
                >
                  <Link href="/nouvelles">Nouvelles</Link>
                </motion.h3>
                <motion.h3
                  variants={fadeTextChild}
                  onClick={() => setOpen(!isOpen)}
                >
                  Nous contacter
                </motion.h3>
              </Links>
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
  justify-content: flex-start;
  top: 0;
  width: 100%;
  height: 85vh;
  /* min-height: 85vh; */
  z-index: 990;
  @media (max-width: ${breakpoints.l}px) {
    height: auto;
  }
  @media (max-width: ${breakpoints.s}px) {
    height: 100vh;
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
  margin-top: 130px;
  height: 70%;
  position: relative;
  /* height: 60vh; */
  @media (max-width: ${breakpoints.l}px) {
    margin-top: 100px;
  }
`;

const HorizontalLine = styled(motion.span)`
  height: 1px;
  display: inline;
  background: var(--color-cream);
  transform-origin: left;
  float: left;
  margin: 0;
`;

const HorizontalLineMobile = styled(motion.span)`
  display: none;

  @media (max-width: ${breakpoints.l}px) {
    height: 1px;
    display: inline;
    background: var(--color-cream);
    transform-origin: left;
    float: left;
    margin: 0;
  }
`;

const VerticalLine = styled(motion.span)`
  width: 1px;
  display: inline;
  background: var(--color-cream);
  transform-origin: top;
  float: top;
  margin: 0;
  @media (max-width: ${breakpoints.s}px) {
    display: none;
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

const Links = styled(motion.div)`
  width: 35%;
  height: 100%;
  transition: var(--transition);
  display: inline-flex;
  justify-content: flex-end;
  flex-direction: column;

  position: relative;

  h3 {
    font-size: 3.333vw !important;
    margin: 1rem 2rem;
  }
  h3 > a {
    color: var(--color-cream);
  }
  @media (max-width: ${breakpoints.xl}px) {
    h3 {
      font-size: 3.5vw !important;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 100%;
    height: auto;
    margin: 0 auto;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 95%;
    h3 {
      font-size: 28px !important;
      margin: 1.3vh 0;
      text-align: left;
      max-width: 90%;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    h3 {
      margin: .5rem 0;
      font-size: 24px!important;
    }
  }
`;

const Search = styled.div`
  height: 100%;
  width: 30%;
  @media (max-width: ${breakpoints.l}px) {
    width: 100%;
    height: auto;
  }
  @media (max-width: ${breakpoints.xs}px) {
    display: none;
  }
`;

const SearchInner = styled.div`
  width: 70%;
  margin: 2rem auto;
  @media (max-width: ${breakpoints.l}px) {
    width: 90%;
  }
`;

const Bottom = styled.div`
  width: 100%;
  align-self: center;
  position: relative;
  color: var(--color-cream);
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
      font-size: 12px!important;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    margin: 2rem auto;
    width: 90%;
    small {
      font-size: 12px!important;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    small {
      font-size: 10px!important;
    }
  }
`;
