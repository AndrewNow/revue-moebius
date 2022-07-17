import React from "react";
import { motion } from "framer-motion";

const SplitText = ({ string, variants }) => {
  return string.split("").map((char, index) => {
    return (
      <motion.span variants={variants} key={index} aria-hidden="true">
        {char}
      </motion.span>
    );
  });
};

export default SplitText;
