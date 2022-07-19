import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const SplitText = ({ string, variants }) => {
  return string.split("").map((char, index) => {
    return (
      <span variants={variants} key={index} aria-hidden="true">
        {char}
      </span>
    );
  });
};

export default SplitText;
