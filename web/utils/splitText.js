import React from "react";
import { motion } from "framer-motion";

const SplitText = ({ string, variants, ariaHidden }) => {
  return string.split("").map((char, index) => {
    return (
      <motion.span
        variants={variants}
        key={index}
        aria-hidden={ariaHidden ? ariaHidden : false}
      >
        {char}
      </motion.span>
    );
  });
};

export default SplitText;
