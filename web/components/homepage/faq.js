import { useState, useRef } from "react";
import styled from "styled-components";
import BlockContent from "@sanity/block-content-to-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { breakpoints } from "../../utils/breakpoints";
import { Chevron } from "../../svg/icons";
import { textAnim, textChild, textAnimSlow } from "../../styles/animations";
import SplitText from "../../utils/splitText";

const MapFAQ = ({ data }) => {
  return data.map((question, idx) => {
    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState(false);

    const expandAnimation = {
      visible: {
        height: "auto",
        transition: {
          ease: "easeIn",
        },
      },
      hidden: {
        height: 0,
        transition: {
          ease: "easeInOut",
        },
      },
    };

    return (
      <QuestionItem
        key={idx + "faq"}
        onClick={() => setOpen(!open)}
        whileHover={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <QuestionTitle
          style={{
            background: hover ? "var(--color-yellow)" : "var(--color-cream)",
            color: hover ? "var(--static-black)" : "var(--color-black)",
          }}
        >
          <h4>{question.question}</h4>
          <Chevron open={open} />
        </QuestionTitle>
        <AnimatePresence exitBeforeEnter>
          {open && (
            <AnswerWrapper
              variants={expandAnimation}
              initial="hidden"
              animate={open ? "visible" : "hidden"}
              exit="hidden"
            >
              <Content>
                <BlockContent blocks={question.answer} />
              </Content>
            </AnswerWrapper>
          )}
        </AnimatePresence>
      </QuestionItem>
    );
  });
};

const Faq = ({ faqData }) => {
  const data = faqData[0].faqData;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <Wrapper>
      <h2 ref={ref} role="heading">
        <SplitText
          string="Questions fr??quemment pos??es"
          variantParent={textAnim}
          variantParentMobile={textAnimSlow}
          variantChild={textChild}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        />
      </h2>
      <QuestionWrapper>
        <MapFAQ data={data} />
      </QuestionWrapper>
    </Wrapper>
  );
};

export default Faq;

const Wrapper = styled.section`
  margin: 10rem auto;
  h2 {
    margin: 2rem auto;
    text-align: center;
    color: var(--color-black);
  }
  @media (max-width: ${breakpoints.l}px) {
    margin: 7rem auto;
  }
  @media (max-width: ${breakpoints.m}px) {
    margin: 5rem auto;
    h2 {
      width: 90%;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    h2 {
      margin-bottom: 4rem;
    }
  }
`;

const QuestionWrapper = styled.div`
  width: 80%;
  margin: 5rem auto;
  @media (max-width: ${breakpoints.m}px) {
    width: 95%;
    margin: 2.5rem auto;
  }
`;

const QuestionItem = styled(motion.div)`
  :first-child {
    border-top: 1px solid var(--color-black);
  }
  border-bottom: 1px solid var(--color-black);
  transition: var(--transition);
  cursor: pointer;

  h4,
  p {
    width: 80%;
  }

  p {
    margin: 1rem 0;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 100%;
    p {
      margin: 0 auto;
      width: 90%;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    h4 {
      line-height: 145%;
      font-size: 27px;
      width: 86%;
    }
    p {
      width: 100%;
      padding: 0 0.5rem;
    }
  }
`;

const QuestionTitle = styled(motion.div)`
  padding: 2.5rem;
  padding-top: 1.5rem;
  padding-bottom: 2rem;
  transition: var(--transition);
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  @media (max-width: ${breakpoints.l}px) {
    padding: 2rem 1rem;
    padding-top: 1rem;
  }
  @media (max-width: ${breakpoints.m}px) {
    padding: 2rem 0.5rem;
    align-items: flex-start;
  }
  @media (max-width: ${breakpoints.s}px) {
    padding: 1.5rem 0.5rem;
  }
`;

const AnswerWrapper = styled(motion.div)`
  overflow-y: hidden;
`;

const Content = styled.div`
  margin: 4rem 2rem;
  padding: 0 2rem;
  * {
    color: var(--color-black);
  }
  a {
    color: var(--color-purple);
  }
  @media (max-width: ${breakpoints.l}px) {
    margin: 2rem 1rem;
  }
  @media (max-width: ${breakpoints.m}px) {
    margin: 1rem auto;
    padding: 0;
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-bottom: 2.5rem;
  }
`;
