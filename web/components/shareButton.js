import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { breakpoints } from "../utils/breakpoints";

const ShareButton = ({ input }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const animCopied = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <CopyWrapper>
      <Button
        onClick={handleCopy}
        aria-label="Cliquez ici pour copier le lien."
      >
        <small>Partager</small>
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5443 8.45596C10.7252 7.6372 9.61445 7.17725 8.4563 7.17725C7.29815 7.17725 6.18741 7.6372 5.3683 8.45596L2.2793 11.544C1.46018 12.3631 1 13.474 1 14.6325C1 15.7909 1.46018 16.9018 2.2793 17.721C3.09842 18.5401 4.20939 19.0003 5.3678 19.0003C6.52621 19.0003 7.63718 18.5401 8.4563 17.721L10.0003 16.177"
            stroke="var(--color-black)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.45703 11.5438C9.27614 12.3626 10.3869 12.8225 11.545 12.8225C12.7032 12.8225 13.8139 12.3626 14.633 11.5438L17.722 8.45581C18.5412 7.63669 19.0013 6.52572 19.0013 5.36731C19.0013 4.2089 18.5412 3.09793 17.722 2.27881C16.9029 1.45969 15.7919 0.999512 14.6335 0.999512C13.4751 0.999512 12.3642 1.45969 11.545 2.27881L10.001 3.82281"
            stroke="var(--color-black)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
      <AnimatePresence exitBeforeEnter>
        <Copied
          variants={animCopied}
          initial="hidden"
          animate={copied ? "visible" : "hidden"}
          exit="hidden"
        >
          <small>Lien copié !</small>
        </Copied>
      </AnimatePresence>
    </CopyWrapper>
  );
};

export default ShareButton;

const CopyWrapper = styled.div`
  position: relative;
`;

const Button = styled.button`
  border: none;
  padding: 0.5rem;
  padding-left: 0;
  background: none;
  color: var(--color-black);
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  :hover {
    text-decoration: underline;
  }

  small {
    margin-bottom: 1rem;
  }

  @media (max-width: ${breakpoints.s}px) {
    padding-top: 0;
    padding-right: 0;
    small {
      margin-bottom: .45rem;
    }
  }
`;

const Copied = styled(motion.div)`
  position: absolute;
  bottom: -2rem;
  small {
    font-size: 14px;
    color: green;
    white-space: nowrap;
  }
  @media (max-width: ${breakpoints.m}px) {
    bottom: -1.5rem;
    small {
      font-size: 12px;
    }
  }
`;
