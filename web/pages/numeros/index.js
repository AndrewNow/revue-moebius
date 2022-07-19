import { useState, useEffect, useRef } from "react";
import { client } from "../../lib/sanity/client";
import styled from "styled-components";
import { footerLogoQuery } from "../../lib/sanity/footerLogoQuery";
import { Inner } from "../../pages/index";
import { numeroListQuery } from "../../lib/sanity/numeroQuery";
import { archiveListQuery } from "../../lib/sanity/archiveQuery";
import HoverImage from "../../components/imageOnHover/hoverImage";
import ArchiveItemMap from "../../components/imageOnHover/numeros/archiveItem";
import { breakpoints } from "../../utils/breakpoints";
import NumeroItem from "../../components/numeroItem";
import { motion, useInView } from "framer-motion";
import SplitText from "../../utils/splitText";
import {
  textChild,
  textAnimFast,
  textAnim,
  textAnimSlow,
  textAnimSlower,
} from "../../styles/animations";

//.:*~*:._.:*~*:._.:*~*:._.:*~*
//
//  Get mouse pos for archive section
//
//.:*~*:._.:*~*:._.:*~*:._.:*~*
const useMousePosition = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", updateMousePosition);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", updateMousePosition);
      }
    };
  }, []);
  return mousePos;
};

const Numeros = ({ numeroData, archiveData }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const { x, y } = useMousePosition();

  // for text animations
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const ref2 = useRef(null);
  const isInView2 = useInView(ref2, { once: true });
  const ref3 = useRef(null);
  const isInView3 = useInView(ref3, { once: true });

  return (
    <>
      <Header>
        <Inner>
          <h1 ref={ref} role="heading">
            <SplitText
              string="Survolez tous les numéros de la revue."
              variantParent={textAnim}
              variantParentMobile={textAnimSlow}
              variantChild={textChild}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            />
          </h1>
        </Inner>
      </Header>
      <Inner>
        <Content>
          <ContentHeader>
            <h1 ref={ref2} role="heading">
              <SplitText
                string="Numéros récents"
                variantParent={textAnim}
                variantParentMobile={textAnimSlower}
                variantChild={textChild}
                initial="hidden"
                animate={isInView2 ? "visible" : "hidden"}
              />
            </h1>
          </ContentHeader>
          <Grid>
            {numeroData.map((numero) => {
              return <NumeroItem numero={numero} key={numero._id} />;
            })}
          </Grid>
        </Content>
      </Inner>
      <Archive>
        <h1
          ref={ref3}
          role="heading"
        >
          <SplitText
            string="Archives"
            variantParent={textAnim}
            variantParentMobile={textAnimSlower}
            variantChild={textChild}
            initial="hidden"
            animate={isInView3 ? "visible" : "hidden"}
          />
        </h1>
        <Inner>
          <ArchiveHoverWrapper>
            {archiveData.map((archive, index) => {
              return (
                <ArchiveItemMap
                  setActiveIndex={setActiveIndex}
                  archive={archive}
                  index={index}
                  key={index + "idx"}
                />
              );
            })}
            <CursorMedia>
              {archiveData.map((image, index) => {
                const isActive = index === activeIndex;
                const xPos = isActive ? x : 0;
                const yPos = isActive ? y : 0;
                return (
                  <HoverImage
                    key={index + "imgIndex"}
                    data={image}
                    active={isActive}
                    x={xPos}
                    y={yPos}
                  />
                );
              })}
            </CursorMedia>
          </ArchiveHoverWrapper>
        </Inner>
      </Archive>
    </>
  );
};

export default Numeros;

export async function getStaticProps() {
  const footerLogos = await client.fetch(footerLogoQuery);
  const numeroData = await client.fetch(numeroListQuery);
  const archiveData = await client.fetch(archiveListQuery);

  return {
    props: {
      footerLogos,
      numeroData,
      archiveData,
    },
    revalidate: 10,
  };
}

const Header = styled.header`
  background: var(--color-purple);
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  z-index: 5;
  h1 {
    color: var(--static-cream);
    max-width: 70%;
    margin-bottom: 3rem;
  }
  @media (max-width: ${breakpoints.xl}px) {
    height: 80vh;
  }
  @media (max-width: ${breakpoints.m}px) {
    height: 70vh;
    /* padding-top: 25vh; */
    h1 {
      max-width: none;
      width: 100%;
    }
  }
`;

const Content = styled.section`
  margin: 10rem 0;
  position: relative;
  z-index: 5;

  @media (max-width: ${breakpoints.m}px) {
    margin: 5rem 0;
  }
`;

const ContentHeader = styled.div`
  text-align: center;
  border-bottom: 1px solid var(--color-black);
  margin-bottom: 1rem;
  h1 {
    color: var(--color-black);
  }
`;

const Grid = styled.div`
  display: grid;
  justify-content: center;
  justify-items: center;
  align-items: start;
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: ${breakpoints.l}px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: ${breakpoints.s}px) {
    display: block;
  }
`;

const Archive = styled.section`
  z-index: 1;
  position: relative;
  background: var(--color-clay);
  padding: 10rem 0;
  box-sizing: border-box;
  h1 {
    text-align: center;
    margin-bottom: 1rem;
    color: var(--static-cream);
  }

  @media (max-width: ${breakpoints.m}px) {
    padding: 5rem 0;
  }
`;

const ArchiveHoverWrapper = styled.div`
  position: relative;
  z-index: 1;
  padding-bottom: 5rem;
  #archive-item {
    position: relative;
    z-index: 2;
  }
`;

const CursorMedia = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: var(--transition-image);

  .hover-media {
    z-index: 2;
    opacity: 0;
    position: absolute;
    width: auto;
    height: auto;
    max-height: 50%;
    max-width: 60%;
    object-fit: contain;
    pointer-events: none;
  }
  .is-active {
    opacity: 1;
  }

  @media (max-width: ${breakpoints.s}px) {
    display: none;
  }
`;
