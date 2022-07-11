import Link from "next/link";
import groq from "groq";
import BlockContent from "@sanity/block-content-to-react";
import { client } from "../../../lib/sanity/client";
import {
  archiveQuery,
  archiveReadMoreQuery,
} from "../../../lib/sanity/archiveQuery";
import { footerLogoQuery } from "../../../lib/sanity/footerLogoQuery";
import Image from "next/image";
import styled from "styled-components";
import { Inner } from "../../index";
import { useState, useEffect } from "react";
import { breakpoints } from "../../../utils/breakpoints";
import ShareButton from "../../../components/shareButton";
import ConvertDateToString from "../../../utils/convertDateToString";

export default function Archive({ numero, readMoreData }) {
  // logic for showing 3 randomized articles at the bottom of the page
  // the {readMoreData} already filters out the current article

  const [randomizedThreeArticles, setRandomizedThreeArticles] = useState();

  const DISPLAY_MORE = 3;

  useEffect(() => {
    const getMultipleRandom = (arr, num) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());

      return shuffled.slice(0, num);
    };
    setRandomizedThreeArticles(getMultipleRandom(readMoreData, DISPLAY_MORE));
  }, []);

  return (
    <>
      <Header>
        <Inner>
          <HeaderFlex>
            <HeaderImage>
              <Image
                src={numero?.imageUrl}
                alt="Thumbnail image"
                quality={100}
                layout="fill"
                placeholder="blur"
                blurDataURL={numero?.lqip}
              />
            </HeaderImage>
            <HeaderText>
              <h5>Mœbius, N°{numero?.number}</h5>
              <h1>{numero?.title}</h1>
              <small>
                {numero?.publishedAt && (
                  <ConvertDateToString data={numero?.publishedAt} />
                )}
                <br />
                {numero?.directedBy && `Dirigé par ${numero?.directedBy}`}
              </small>
            </HeaderText>
          </HeaderFlex>
        </Inner>
      </Header>
      <MainFlex>
        <SideContent>
          {numero?.codirectors && (
            <small>
              Codirecteurs
              <br />
              <em>{numero?.codirectors}</em>
              <br />
              <br />
            </small>
          )}
          {numero?.authors && (
            <small>
              Auteurs
              <br /> <em>{numero?.authors}</em>
              <br />
              <br />
            </small>
          )}
          <br />
          <br />
          {numero?.isbn && (
            <small>
              ISBN
              <br />
              <em>{numero?.isbn}</em>
              <br />
              <br />
            </small>
          )}
          {numero?.pages && (
            <small>
              Pages <br /> <em>{numero?.pages}</em>
              <br />
              <br />
            </small>
          )}
          <br />
          <br />
          <ShareButton
            input={`https://revuemoebius.com/numeros/${numero?.slug}`}
          />
        </SideContent>
        <MainContent>
          <BlockContent blocks={numero?.body} />
        </MainContent>
      </MainFlex>
      <Return>
        <Link href="/numeros">
          <span>
            <svg
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 1L1 8L8 15M1 8L17 8L1 8Z"
                stroke="var(--color-black)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>{" "}
            Retourner vers numéros
          </span>
        </Link>
      </Return>
      <ReadMore>
        <Inner>
          <ReadMoreHeader>
            <h1>Lire plus d'articles archivés</h1>
          </ReadMoreHeader>
          <Grid>
            {randomizedThreeArticles?.map((item) => {
              return (
                <GridItem key={item._id}>
                  <ItemImage>
                    <Link href={`/numeros/archive/${item.slug}`}>
                      <Image
                        src={item.imageUrl}
                        alt={`Image couveture pour ${item.title}`}
                        layout="fill"
                        className="imageHover"
                        placeholder="blur"
                        blurDataURL={item.lqip}
                      />
                    </Link>
                  </ItemImage>
                  <ItemText>
                    <small>n°{item.number}</small>
                    <h5>
                      <Link href={`/numeros/archive/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h5>
                  </ItemText>
                </GridItem>
              );
            })}
          </Grid>
        </Inner>
      </ReadMore>
    </>
  );
}

export async function getStaticProps({ params }) {
  const footerLogos = await client.fetch(footerLogoQuery);

  let slug;
  const numero = await client.fetch(archiveQuery, {
    slug: params.slug,
  });

  const readMoreData = await client.fetch(archiveReadMoreQuery, {
    slug: params.slug,
  });

  return {
    props: {
      numero,
      readMoreData,
      footerLogos,
    },
  };
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "archive" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

const Header = styled.header`
  background-color: var(--color-blue);
  height: 100%;
  padding-bottom: 5rem;
  @media (max-width: ${breakpoints.xl}px) {
    padding-bottom: 3rem;
  }
`;

const HeaderFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  padding-top: 5rem;

  @media (max-width: ${breakpoints.l}px) {
    flex-direction: column-reverse;
  }
`;

const HeaderText = styled.div`
  position: relative;
  align-self: center;
  width: 55%;
  margin: 3rem;
  margin-left: 5rem;

  h5,
  h1,
  small {
    color: var(--static-black);
  }

  small {
    display: block;
    width: 45%;
    opacity: 0.8;
  }

  h1 {
    width: 90%;
    margin: 4rem 0;
    font-size: 5.5vw;
    line-height: 110%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    margin-top: 5rem;
    h1 {
      font-size: 6.77vw;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 90%;
    margin: 0 3rem;
    margin-top: 5rem;
    margin-bottom: 1rem;
    h5,
    h1,
    small {
      text-align: center;
    }
    small,
    h1 {
      width: 100%;
    }
    h1 {
      margin: 2rem 0;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    margin-bottom: 1rem;
    h1 {
      font-size: 50px;
    }
    small {
      width: 80%;
      margin: 0 auto;
    }
  }
`;

const HeaderImage = styled.div`
  position: relative;
  display: block;
  aspect-ratio: 559/790;
  width: 30%;
  height: auto;
  margin: 2rem;
  margin-left: 0;
  overflow: hidden;
  border-radius: 5px;
  @media (max-width: ${breakpoints.l}px) {
    width: 50%;
    margin: 2rem;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 80%;
  }
`;

const MainFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  width: 100%;
  margin: 10rem 0;
  @media (max-width: ${breakpoints.l}px) {
    flex-direction: column;
    width: 90%;
    margin: 5rem auto;
  }
  @media (max-width: ${breakpoints.s}px) {
    margin: 2rem auto;
  }
`;

const SideContent = styled.div`
  position: sticky;
  top: 10rem;
  display: block;
  width: 30%;
  margin-left: 5rem;
  small {
    display: block;
    width: 60%;
    em {
      font-style: normal;
      font-family: "IBM-Plex-Regular";
      color: var(--color-grey);
    }
  }
  * {
    color: var(--color-black);
  }
  @media (max-width: ${breakpoints.l}px) {
    position: relative;
    top: auto;
    width: 100%;
    margin: 0rem;
    margin-bottom: 3rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-bottom: 4rem;
  }
`;

const MainContent = styled.div`
  width: 55%;
  margin: 0 3rem;

  * {
    color: var(--color-black);
    transition: var(--transition);
  }
  a {
    color: var(--color-purple);

    :hover {
      opacity: 0.6;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 100%;
    margin: 0;
  }
`;

const ReadMore = styled.div`
  background: var(--color-clay);

  @media (max-width: ${breakpoints.l}px) {
    & ${Inner} {
      width: auto;
    }
  }
`;

const ReadMoreHeader = styled.div`
  text-align: center;
  border-bottom: 1px solid var(--static-cream);

  padding-top: 5rem;
  padding-bottom: 2rem;

  h1 {
    color: var(--static-cream);
  }
`;

const Grid = styled.div`
  display: grid;
  justify-content: center;
  justify-items: center;
  align-items: start;
  grid-template-columns: 1fr 1fr 1fr;
  padding-bottom: 5rem;

  /* @media (max-width: ${breakpoints.m}px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  } */
  @media (max-width: ${breakpoints.l}px) {
    /* column-gap: 2rem; */
    right: 0;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    width: 100%;
    padding-bottom: 0;
  }
`;

const GridItem = styled.div`
  width: 80%;
  /* max-width: 490px; */
  position: relative;
  margin-top: 2rem;
  @media (max-width: ${breakpoints.l}px) {
    width: 300px;
    min-width: 300px;
    margin: 2rem;
    scroll-snap-align: center;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 250px;
    min-width: 250px;
    margin: 1rem;
  }
`;

const ItemText = styled.div`
  text-align: center;
  margin: 2rem 0;
  h5,
  a,
  small {
    color: var(--static-cream);
  }

  a {
    text-decoration: none;
  }

  :hover {
    a {
      text-decoration: underline;
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    border-top: 1px solid var(--static-cream);
    padding-top: 0.5rem;
    text-align: left;
    small {
      margin-bottom: 0.5rem;
      display: block;
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
      scale: 1.02;
      filter: blur(5px);
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    pointer-events: none;
  }
`;

const Return = styled.small`
  display: inline-block;
  margin-bottom: 2rem;
  margin-left: 5rem;

  span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--color-black);
  }

  svg {
    margin-right: 1rem;
    transition: var(--transition);
    stroke: var(--color-black);
  }

  cursor: pointer;

  :hover {
    text-decoration: underline;
    color: var(--color-black);
    svg {
      transform: translateX(-5px);
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    margin: 3rem 5%;
  }
`;

const Button = styled.button`
  background: none;
  display: inline-block;
  margin: 3rem auto;
  border: 1px solid var(--color-black) !important;
  border-radius: 10px;
  padding: 1rem 1rem;

  transition: var(--transition);

  background: var(--color-cream);

  small {
    margin: 0 auto;
    width: 100%;
    color: var(--color-black);
    transition: var(--transition);
  }

  :disabled {
    cursor: not-allowed;
    border: 1px solid var(--color-grey) !important;
    background: var(--color-cream);
    small {
      color: var(--color-grey);
    }
    :hover {
      background: var(--color-cream);
    }
  }
  :hover {
    small {
      color: var(--static-black);
    }
    background: var(--color-turquoise);
  }
  @media (max-width: ${breakpoints.l}px) {
    display: block;
    margin: 3rem auto;
  }
`;
