import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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
                  Vente et abonnements
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
                  Mœbius-balado
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
  z-index: 11;
`;

const BlurBackground = styled(motion.div)`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  background: #00000090;
  z-index: 10;
`;

const Wrapper = styled.div`
  margin-top: 130px;
  height: 70%;
  position: relative;
  /* height: 60vh; */
`;

const HorizontalLine = styled(motion.span)`
  height: 1px;
  display: inline;
  background: var(--color-cream);
  transform-origin: left;
  float: left;
  margin: 0;
`;

const VerticalLine = styled(motion.span)`
  width: 1px;
  display: inline;
  background: var(--color-cream);
  transform-origin: top;
  float: top;
  margin: 0;
`;

const Content = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
`;

const Links = styled(motion.div)`
  width: 35%;
  height: 100%;
  transition: var(--transition);
  display: flex;
  justify-content: flex-end;
  flex-direction: column;

  position: relative;

  h3 {
    margin: 1rem 2rem;
  }
  h3 > a {
    color: var(--color-cream);
  }
`;

const Search = styled.div`
  height: 100%;
  width: 30%;
`;

const SearchInner = styled.div`
  width: 70%;
  margin: 2rem auto;
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
`;
