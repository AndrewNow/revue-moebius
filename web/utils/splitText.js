import React from "react";
import { motion } from "framer-motion";
import { breakpoints } from "./breakpoints";
import styled from "styled-components";

const SplitText = ({
  string,
  variantParent,
  variantParentMobile,
  variantChild,
  initial,
  animate,
  isParagraphText,
}) => {
  //.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:._.:*~*:._.:*~*:._.:*~*
  //
  // This component is broken into two pieces.
  // For desktop, it will split the string character by character.
  // For mobile, it will split word by word.
  //
  // There are some strange artifacts with the italic font glyphs
  // when animated on mobile (they overlap their bounding box),
  // so splitting this into two will make sure users don't encounter
  // the strange clipping.
  //
  // In general, the mobile animations here should animate slower
  // to look nice.
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:._.:*~*:._.:*~*:._.:*~*
  return (
    <>
      <Desktop initial={initial} variants={variantParent} animate={animate}>
        {string.split("").map((char, index) => {
          return (
            <motion.span variants={variantChild} key={index} aria-hidden="true">
              {char}
            </motion.span>
          );
        })}
      </Desktop>
      <Mobile
        initial={initial}
        variants={variantParentMobile}
        animate={animate}
      >
        {string.split(" ").map((char, index) => {
          return (
            <motion.span
              variants={variantChild}
              key={index}
              aria-hidden="true"
              style={{
                paddingRight: isParagraphText ? "0px" : "4px",
                position: "relative",
              }}
            >
              {char}{" "}
            </motion.span>
          );
        })}
      </Mobile>
    </>
  );
};

export default SplitText;

const Desktop = styled(motion.span)`
  @media (max-width: ${breakpoints.s}px) {
    display: none;
    visibility: hidden;
  }
`;
const Mobile = styled(motion.span)`
  visibility: hidden;
  display: none;
  @media (max-width: ${breakpoints.s}px) {
    visibility: visible;
    display: block;
  }
`;
