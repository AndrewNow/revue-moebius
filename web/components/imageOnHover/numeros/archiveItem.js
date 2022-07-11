import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { breakpoints } from "../../../utils/breakpoints";

const ArchiveItem = ({ archive, setActiveIndex, index }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = (index) => {
    // set the hovered index so that you can show the right image on hover
    setActiveIndex(index);
    setHovered(true);
  };
  const handleMouseLeave = () => {
    // once the hover is over, set the active index to nothing (match no items in array)
    setActiveIndex(-1);
    setHovered(false);
  };

  const hoverAnimBackground = {
    visible: {
      opacity: 1,
      height: "100%",
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    hidden: {
      opacity: 1,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <Link href={`/numeros/archive/${archive.slug}`}>
      <Item
        id="archive-item"
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
      >
        <motion.h4
          initial={{ color: "var(--static-cream)" }}
          animate={{
            color: hovered ? "var(--static-black)" : "var(--static-cream)",
            transition: {
              duration: 0.2,
              ease: "easeInOut",
            },
          }}
        >
          N° {archive.number}
        </motion.h4>
        <motion.h4
          initial={{ color: "var(--static-cream)" }}
          animate={{
            color: hovered ? "var(--static-black)" : "var(--static-cream)",
            transition: {
              duration: 0.2,
              ease: "easeInOut",
            },
          }}
        >
          {archive.title}
        </motion.h4>
        <svg
          width="12"
          height="22"
          viewBox="0 0 12 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.64955 21.2878L11.8322 10.9167L1.64955 0.545507L0.376952 1.84167L9.28695 10.9167L0.376953 19.9917L1.64955 21.2878Z"
            fill="#FEFEFE"
          />
        </svg>
        <HoverWhite
          variants={hoverAnimBackground}
          initial="hidden"
          animate={hovered ? "visible" : "hidden"}
        />
      </Item>
    </Link>
  );
};

export default ArchiveItem;

const Item = styled.div`
  display: grid;
  border-top: 1px solid var(--static-cream);
  width: 100%;
  justify-content: space-around;
  align-items: center;
  grid-template-columns: 1fr 4fr 1fr;
  padding: 1.5rem 2rem;
  box-sizing: border-box;
  transition: var(--transition);
  cursor: pointer;

  h4 {
    color: var(--static-cream);
  }

  svg {
    transition: var(--transition);
    justify-self: end;
  }

  :hover {
    h4 {
      color: var(--color-black);
    }
    svg {
      transform: translateX(10px);
    }
    svg > path {
      fill: var(--color-black) !important;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding: 1.5rem 0.5rem;
    svg {
      display: none;
    }
    h4 {
      :first-child {
        margin-bottom: 1rem;
      }
    }
  }
`;

const HoverWhite = styled(motion.div)`
  z-index: -1;
  /* background: white; */
  background: #ffffff99;
  backdrop-filter: blur(20px) saturate(180%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-origin: bottom;
`;
