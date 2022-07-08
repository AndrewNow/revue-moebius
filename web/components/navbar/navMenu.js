import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { breakpoints } from "../../utils/breakpoints";

export const LinkData1 = [
  {
    url: `/vente`,
    title: "Vente et abonnements",
  },
  {
    url: `/a-propos`,
    title: "À propos",
  },
  {
    url: `/proposer-un-texte`,
    title: "Proposer un texte",
  },
];
export const LinkData2 = [
  {
    url: `/balado`,
    title: "Mœbius-balado",
  },
  {
    url: `/numeros`,
    title: "Numéros",
  },
  {
    url: `/nouvelles`,
    title: "Nouvelles",
  },
  // {
  //   url: `/residences`,
  //   title: "Résidences",
  // },
  // {
  //   url: `/contact`,
  //   title: "Nous Contacter",
  // },
];

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

  const hoverBlock = {
    hidden: {
      // opacity: 0,
      height: "0%",
      transition: {
        ease: "easeInOut", 
        duration: 0.25,
      },
    },
    visible: {
      height: "100%",
      // opacity: 1,
      transition: {
        ease: "easeIn", 
        duration: 0.25,
      },
    },
  };

  const [selectedTab, setSelectedTab] = useState(LinkData1[-1]);

  console.log(selectedTab);

  const [parentHovered, setParentHovered] = useState(false);

  const handleParentLeave = () => {
    setParentHovered(false);
    setSelectedTab(-1);
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
              <GroupLinks>
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
                  onMouseEnter={() => setParentHovered(true)}
                  onMouseLeave={handleParentLeave}
                >
                  {LinkData1.map((link) => {
                    return (
                      <WrapLink
                        key={link.title}
                        variants={fadeTextChild}
                        onClick={() => setOpen(!isOpen)}
                        onMouseEnter={() => setSelectedTab(link)}
                      >
                        <Link passHref href={link.url}>
                          <LinkTitle
                            initial={{ color: "var(--static-cream)" }}
                            animate={{
                              color:
                                link === selectedTab
                                  ? "var(--color-clay)"
                                  : "var(--static-cream)",
                            }}
                          >
                            {link.title}
                          </LinkTitle>
                        </Link>
                        <AnimatePresence exitBeforeEnter>
                          {link === selectedTab ? (
                            <HoverEffect
                              variants={hoverBlock}
                              initial="hidden"
                              animate={parentHovered ? "visible" : "hidden"}
                              exit="hidden"
                              layoutId="hoverEffect"
                            />
                          ) : null}
                        </AnimatePresence>
                      </WrapLink>
                    );
                  })}
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
                  onMouseEnter={() => setParentHovered(true)}
                  onMouseLeave={handleParentLeave}
                >
                  {LinkData2.map((link) => {
                    return (
                      <WrapLink
                        key={link.title}
                        variants={fadeTextChild}
                        onClick={() => setOpen(!isOpen)}
                        onMouseEnter={() => setSelectedTab(link)}
                      >
                        <Link passHref href={link.url}>
                          <LinkTitle
                            initial={{ color: "var(--static-cream)" }}
                            animate={{
                              color:
                                link === selectedTab
                                  ? "var(--color-clay)"
                                  : "var(--static-cream)",
                            }}
                            transition={{
                              delay: 0,
                              duration: 0.01,
                            }}
                          >
                            {link.title}
                          </LinkTitle>
                        </Link>
                        <AnimatePresence exitBeforeEnter>
                          {link === selectedTab ? (
                            <HoverEffect
                              variants={hoverBlock}
                              initial="hidden"
                              animate={parentHovered ? "visible" : "hidden"}
                              exit="hidden"
                              layoutId="hoverEffect1"
                            />
                          ) : null}
                        </AnimatePresence>
                      </WrapLink>
                    );
                  })}
                </Links>
              </GroupLinks>
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

const VerticalLine = styled(motion.span)`
  width: 1px;
  display: inline;
  background: var(--static-cream);
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

const GroupLinks = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  @media (max-width: ${breakpoints.l}px) {
    display: block;
  }
  @media (max-width: ${breakpoints.m}px) {
    margin: 2rem 0;
  }
`;

const Links = styled(motion.div)`
  box-sizing: border-box;
  overflow: hidden;
  width: 50%;
  height: 100%;
  transition: var(--transition);
  display: inline-flex;
  justify-content: flex-end;
  flex-direction: column;
  position: relative;
  a {
    text-decoration: none;
  }

  @media (max-width: ${breakpoints.l}px) {
    width: 100%;
    height: auto;
    margin: 0 auto;
  }
`;

const WrapLink = styled(motion.div)`
  position: relative;
  padding: 1rem 2rem;
  cursor: pointer;

  @media (max-width: ${breakpoints.s}px) {
    padding: 0.75rem 0;
  }
`;

const LinkTitle = styled(motion.h3)`
  font-size: 3.333vw !important;
  position: relative;
  z-index: 2;
  color: var(--static-cream);

  @media (max-width: ${breakpoints.xl}px) {
    font-size: 3.5vw !important;
  }
  @media (max-width: ${breakpoints.m}px) {
    font-size: 35px !important;
    text-align: center;
  }
  @media (max-width: ${breakpoints.s}px) {
    font-size: 30px !important;
  }
  @media (max-width: ${breakpoints.xs}px) {
    margin: 0.5rem 0;
    font-size: 24px !important;
  }
`;

const HoverEffect = styled(motion.div)`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: var(--static-cream);

  @media (max-width: ${breakpoints.s}px) {
    display: none;
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
  @media (max-width: ${breakpoints.s}px) {
    margin: 1rem auto;
  }
`;

const Bottom = styled.div`
  width: 100%;
  align-self: center;
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
