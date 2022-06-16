import { useState, useEffect } from "react";
import { client } from "../../lib/sanity/client";
import styled from "styled-components";
import { footerLogoQuery } from "../../lib/sanity/footerLogoQuery";
import { Inner } from "../../pages/index";
import { numeroListQuery } from "../../lib/sanity/numeroQuery";
import { archiveListQuery } from "../../lib/sanity/archiveQuery";
import Image from "next/image";
import Link from "next/link";
import HoverImage from "./hoverImage";
import ArchiveItemMap from "./archiveItem";

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
  return (
    <>
      <Header>
        <Inner>
          <h1>La revue Mœbius lorem ipsum dolor sit amet</h1>
        </Inner>
      </Header>
      <Inner>
        <Content>
          <ContentHeader>
            <h1>Éditions</h1>
          </ContentHeader>
          <Grid>
            {numeroData.map((numero) => {
              return (
                <GridItem>
                  <ItemImage>
                    <Link href={`/numeros/${numero.slug}`}>
                      <Image
                        src={numero.imageUrl}
                        alt={`Image couveture pour ${numero.title}`}
                        layout="fill"
                        className="imageHover"
                      />
                    </Link>
                  </ItemImage>
                  <ItemText>
                    <small>n°{numero.number}</small>
                    <h5>
                      <Link href={`/numeros/${numero.slug}`}>
                        {numero.title}
                      </Link>
                    </h5>
                  </ItemText>
                </GridItem>
              );
            })}
          </Grid>
        </Content>
      </Inner>
      <Archive>
        <h1>Archive</h1>
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
    max-width: 80%;
    margin-bottom: 3rem;
  }
`;

const Content = styled.section`
  margin: 10rem 0;
  position: relative;
  z-index: 5;
`;

const ContentHeader = styled.div`
  text-align: center;
  border-bottom: 1px solid var(--color-black);
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
`;

const GridItem = styled.div`
  width: 490px;
  position: relative;
  margin: 2rem 0;
`;

const ItemText = styled.div`
  text-align: center;
  margin: 2rem 0;
  h5 {
    color: var(--color-black);
  }
  small {
    color: var(--color-grey);
  }

  a {
    text-decoration: none;
  }

  :hover {
    a {
      text-decoration: underline;
    }
  }
`;

const ItemImage = styled.div`
  aspect-ratio: 512/732;
  display: block;
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
  cursor: pointer;

  .imageHover {
    transition: var(--transition);
    transform-origin: center;
  }
  :hover {
    .imageHover {
      /* scale: 1.05; */
      transform: scale(1.05);
      filter: blur(5px) saturate(110%);
    }
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
`;

const ArchiveHoverWrapper = styled.div`
  position: relative;
  z-index: 1;

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
  transition: var(--transition);

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
`;
