import styled from "styled-components";
import { client } from "../lib/sanity/client";
import { footerLogoQuery } from "../lib/sanity/footerLogoQuery";
import { proposerUnTexteQuery } from "../lib/sanity/proposerUnTexteQuery";
import BlockContent from "@sanity/block-content-to-react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useRef, useCallback } from "react";
import { breakpoints } from "../utils/breakpoints";

const ProposerUnTexte = ({ pageData }) => {
  const options = {
    root: null,
    threshold: 0.2,
    triggerOnce: false,
  };

  const [headerRef, headerIsVisible] = useInView(options);
  const [submissionRef, submissionIsVisible] = useInView(options);
  const [editionRef, editionIsVisible] = useInView(options);

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
            <h1 ref={headerRefs}>{pageData.title}</h1>
            <p>{pageData.description}</p>
          </LandingText>
        </Landing>
        <Protocols>
          <ProtocolImage>
            {/* <ImageWrapper>
              <Image
                src={pageData.imageUrl}
                alt="Image décoratif"
                layout="fill"
                objectFit="contain"
              />
            </ImageWrapper> */}
          </ProtocolImage>
          <ProtocolText>
            <Protocol>
              <h3 ref={submissionRefs}>Protocole de soumission</h3>
              <BlockContent blocks={pageData.soumission} />
            </Protocol>
            <Protocol>
              <h3 ref={editionRefs}>Protocole d’édition</h3>
              <BlockContent blocks={pageData.edition} />
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

export default ProposerUnTexte;

export async function getStaticProps() {
  const footerLogos = await client.fetch(footerLogoQuery);
  const pageData = await client.fetch(proposerUnTexteQuery);
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
    width: 75%;
    margin-bottom: 2rem;
  }
  p {
    width: 60%;
  }
  @media (max-width: ${breakpoints.m}px) {
    margin: 2rem;
    h1 {
      width: 100%;
      margin-bottom: 1rem;
    }
    p {
      width: 90%;
    }
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
const ProtocolImage = styled.div`
  display: none;
  // No image for now.
  position: sticky;
  top: 10rem;
  height: 650px;
  width: 35%;
  @media (max-width: ${breakpoints.l}px) {
    position: relative;
    width: 100%;
    top: 0;
    height: auto;
  }
`;

const ImageWrapper = styled.div`
  aspect-ratio: 4/5;
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
`;

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
