import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const SplitText = ({ string, variants }) => {
  return string.split("").map((char, index) => {
    return (
      <Span variants={variants} key={index} aria-hidden="true">
        {char}
      </Span>
    );
  });
};

export default SplitText;

const Span = styled(motion.span)`

  &:after {
    content: "";
    padding: 1px;
  }
`;
