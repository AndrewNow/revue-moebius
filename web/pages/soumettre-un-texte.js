import styled from "styled-components";
import { client } from "../lib/sanity/client";
import { footerLogoQuery } from "../lib/sanity/footerLogoQuery";
import { soumettreUnTexteQuery } from "../lib/sanity/soumettreUnTexteQuery";
import { useInView as useIntersectionInView } from "react-intersection-observer";
import { useRef, useCallback } from "react";
import { breakpoints } from "../utils/breakpoints";
import SplitText from "../utils/splitText";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  textAnim,
  textAnimFast,
  textAnimFastest,
  textAnimSlow,
  textChild,
} from "../styles/animations";
import MarkdownContent from "../utils/MarkdownContent";

const SoumettreUnTexte = ({ pageData }) => {
  //.:*~*:._.:*~*:._.:*~*:._.:*~*:._.:*~*
  //
  //  ref logic for sidebar nav
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*:._.:*~*
  const options = {
    root: null,
    threshold: 0.2,
    triggerOnce: false,
  };

  const [headerRef, headerIsVisible] = useIntersectionInView(options);
  const [submissionRef, submissionIsVisible] = useIntersectionInView(options);
  const [editionRef, editionIsVisible] = useIntersectionInView(options);

  const headerScrollRef = useRef(null);
  const submissionScrollRef = useRef(null);
  const editionScrollRef = useRef(null);

  // Use `useCallback` so we don't recreate the function on each render. Could result in infinite loop
  const headerRefs = useCallback(
    (node) => {
      headerScrollRef.current = node;
      headerRef(node);
    },
    [headerRef]
  );

  const submissionRefs = useCallback(
    (node) => {
      submissionScrollRef.current = node;
      submissionRef(node);
    },
    [submissionRef]
  );

  const editionRefs = useCallback(
    (node) => {
      editionScrollRef.current = node;
      editionRef(node);
    },
    [editionRef]
  );

  const handleScollTo = (ref) =>
    ref.current.scrollIntoView({
      behavior: "smooth",
    });

  //.:*~*:._.:*~*:._.:*~*:._.:*~*:._.:*~*
  //
  //  Text animation refs
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*:._.:*~*
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.55,
  });
  const ref2 = useRef(null);
  const isInView2 = useInView(ref2, {
    once: true,
    amount: 0.55,
  });

  return (
    <Wrapper>
      <Sidebar>
        <SidebarList>
          <small
            onClick={() => handleScollTo(headerScrollRef)}
            style={{
              color: headerIsVisible
                ? "var(--color-black)"
                : "var(--color-grey)",
            }}
          >
            {pageData.title}
          </small>
          <br />
          <br />
          <small
            onClick={() => handleScollTo(submissionScrollRef)}
            style={{
              color: submissionIsVisible
                ? "var(--color-black)"
                : "var(--color-grey)",
            }}
          >
            Protocole de soumission
          </small>
          <br />
          <br />
          <small
            onClick={() => handleScollTo(editionScrollRef)}
            style={{
              color: editionIsVisible
                ? "var(--color-black)"
                : "var(--color-grey)",
            }}
          >
            Protocole d'édition
          </small>
        </SidebarList>
      </Sidebar>
      <MainContent>
        <Landing>
          <LandingText>
            <h1 ref={headerRefs} role="heading">
              <SplitText
                string={pageData.title}
                variantParent={textAnim}
                variantParentMobile={textAnimSlow}
                variantChild={textChild}
                initial="hidden"
                animate="visible"
              />
            </h1>
            <p role="heading">
              <SplitText
                string={pageData.description}
                variantParent={textAnimFast}
                variantParentMobile={textAnimFastest}
                variantChild={textChild}
                initial="hidden"
                animate="visible"
                isParagraphText={true}
              />
            </p>
            <motion.span
              variants={textChild}
              initial="hidden"
              animate="visible"
            >
              {pageData.slug ? (
                <Link scroll={false} href={`/nouvelles/${pageData.slug}`}>
                  <InternalLink>
                    <small>Consultez l'appel</small>
                  </InternalLink>
                </Link>
              ) : (
                <DisabledLink>
                  <small>Appel fermé</small>
                </DisabledLink>
              )}
            </motion.span>
          </LandingText>
        </Landing>
        <Protocols>
          <ProtocolText>
            <Protocol ref={ref}>
              <h3 ref={submissionRefs} role="heading">
                <SplitText
                  string="Protocole de soumission"
                  variantParent={textAnimFast}
                  variantParentMobile={textAnimFastest}
                  variantChild={textChild}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  isParagraphText={true}
                />
              </h3>
              <motion.span
                variants={textChild}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <MarkdownContent blocks={pageData.soumission} />
              </motion.span>
            </Protocol>
            <Protocol ref={ref2}>
              <h3 ref={editionRefs} role="heading">
                <SplitText
                  string="Protocole d’édition"
                  variantParent={textAnimFast}
                  variantParentMobile={textAnimFastest}
                  variantChild={textChild}
                  initial="hidden"
                  animate={isInView2 ? "visible" : "hidden"}
                  isParagraphText={true}
                />
              </h3>
              <motion.span
                variants={textChild}
                initial="hidden"
                animate={isInView2 ? "visible" : "hidden"}
              >
                <MarkdownContent blocks={pageData.edition} />
              </motion.span>
            </Protocol>
          </ProtocolText>
        </Protocols>
        {(pageData.extraInfoTitle || pageData.extraInfoDescription) && (
          <OtherInfo>
            <small>
              {pageData.extraInfoTitle}
              <br />
              <br />
              {pageData.extraInfoDescription}
            </small>
          </OtherInfo>
        )}
      </MainContent>
    </Wrapper>
  );
};

export default SoumettreUnTexte;

export async function getStaticProps() {
  const footerLogos = await client.fetch(footerLogoQuery);
  const pageData = await client.fetch(soumettreUnTexteQuery);
  return {
    props: {
      pageData,
      footerLogos,
    },
    revalidate: 10,
  };
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
`;

const Sidebar = styled.div`
  width: 20%;
  position: sticky;
  top: 10vh;
  height: 300px;
  @media (max-width: ${breakpoints.l}px) {
    width: 25%;
  }

  @media (max-width: ${breakpoints.m}px) {
    display: none;
  }
`;

const SidebarList = styled.div`
  width: 80%;
  margin: 2rem auto;
  cursor: pointer;
  user-select: none;
  small {
    transition: var(--transition);
  }
  small:hover {
    text-decoration: underline;
  }
  @media (max-width: ${breakpoints.l}px) {
    small {
      font-size: 13px;
    }
  }
`;

const MainContent = styled.div`
  width: 80%;
  border-left: 1px solid var(--color-black);
  @media (max-width: ${breakpoints.l}px) {
    width: 75%;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 100%;
    border: none;
  }
`;

const Landing = styled.header`
  height: 100vh;
  position: relative;
  margin-bottom: 2rem;
  @media (max-width: ${breakpoints.m}px) {
    height: 60vh;
  }
`;

const LandingText = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 12rem 4rem;
  h1,
  p {
    color: var(--color-black);
  }
  h1 {
    scroll-margin: 120px;
    margin-bottom: 2rem;
  }
  p {
    width: 60%;
  }
  @media (max-width: ${breakpoints.m}px) {
    margin: 2rem;
    h1 {
      margin-bottom: 1rem;
    }
    p {
      width: 90%;
    }
  }
`;

const InternalLink = styled.div`
  display: inline-block;
  border-radius: 10px;
  margin: 2rem 0;
  padding: 0.75rem 4rem;
  border: 1px solid var(--color-black);
  color: var(--color-black);
  background: var(--color-white);
  transition: var(--transition);
  user-select: none;

  cursor: pointer;
  small {
    transition: var(--transition);
  }

  :hover {
    small {
      color: var(--static-black);
    }
    border: 1px solid transparent;
    background: var(--color-turquoise);
  }
  @media (max-width: ${breakpoints.s}px) {
    background: var(--color-turquoise);
    small {
      color: var(--static-black);
    }
    border: 1px solid transparent;
  }
`;
const DisabledLink = styled.div`
  display: inline-block;
  border-radius: 10px;
  margin: 2rem 0;
  padding: 0.75rem 4rem;
  border: 1px solid var(--color-black);
  color: var(--color-black);
  background: #ffffad70;
  transition: var(--transition);
  user-select: none;
  cursor: not-allowed;
  border: 1px solid var(--color-grey) !important;
  background: var(--color-cream);
  small {
    color: var(--color-grey);
  }

  @media (max-width: ${breakpoints.s}px) {
    small {
      color: var(--static-black);
    }
    border: 1px solid transparent;
  }
`;

const Protocols = styled.div`
  padding: 4rem;
  background-color: var(--color-yellow);
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;

  @media (max-width: ${breakpoints.l}px) {
    flex-direction: column;
    padding: 2rem;
  }
`;

const ProtocolText = styled.div`
  /* width: 55%; */
  // is 55% when image is in place
  width: 65%;
  margin: 5rem 0;

  @media (max-width: ${breakpoints.l}px) {
    width: 100%;
    margin: 0;
  }
`;

const Protocol = styled.div`
  margin-bottom: 7.5rem;

  h3,
  p {
    color: var(--static-black);
  }

  a {
    color: var(--color-purple);
    transition: var(--transition);
    :hover {
      opacity: 0.7;
    }
  }
  h3 {
    scroll-margin: 120px;
    font-family: "Surt";
    width: 55%;
    line-height: 100%;
    margin-bottom: 2rem;
  }

  @media (max-width: ${breakpoints.l}px) {
    margin-bottom: 3.5rem;
    h3 {
      width: 100%;
      margin-top: 2rem;
    }
  }
`;
// const ProtocolImage = styled.div`
//   display: none;
//   // No image for now.
//   position: sticky;
//   top: 10rem;
//   height: 650px;
//   width: 35%;
//   @media (max-width: ${breakpoints.l}px) {
//     position: relative;
//     width: 100%;
//     top: 0;
//     height: auto;
//   }
// `;

// const ImageWrapper = styled.div`
//   aspect-ratio: 4/5;
//   width: 100%;
//   overflow: hidden;
//   border-radius: 5px;
// `;

const OtherInfo = styled.div`
  background-color: var(--color-yellow);
  padding: 4rem;
  border-top: 1px solid var(--static-black);
  small {
    text-transform: none;
    line-height: 150%;
    width: 80%;
    margin: 0 auto;
    color: var(--static-black);
  }

  @media (max-width: ${breakpoints.m}px) {
    padding: 2rem;
    small {
      font-size: 12px;
    }
  }
`;
