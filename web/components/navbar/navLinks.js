import { useState } from "react";
import styled from "styled-components";
import { breakpoints } from "../../utils/breakpoints";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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

const NavLinks = ({ isOpen, setOpen }) => {
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

  const [parentHovered, setParentHovered] = useState(false);

  const handleParentLeave = () => {
    setParentHovered(false);
    setSelectedTab(-1);
  };

  return (
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
  );
};

export default NavLinks;

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
  padding-bottom: 50px;
  a {
    text-decoration: none;
  }

  @media (max-width: ${breakpoints.l}px) {
    padding-bottom: 0;
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
    text-align: center;
  }
  @media (max-width: ${breakpoints.m}px) {
    font-size: 35px !important;
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
