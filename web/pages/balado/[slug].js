import Image from "next/image";
import Link from "next/link";
import groq from "groq";
import { client } from "../../lib/sanity/client";
import { baladoQuery } from "../../lib/sanity/baladoQuery";
import { footerLogoQuery } from "../../lib/sanity/footerLogoQuery";
import styled from "styled-components";
import { Inner } from "../index";
import { breakpoints } from "../../utils/breakpoints";
import Spotify from "react-spotify-embed";
import ShareButton from "../../components/shareButton";
import ConvertDateToString from "../../utils/convertDateToString";
import MarkdownContent from "../../utils/MarkdownContent";
import Head from "next/head";

export default function Balado({ balado }) {
  // If balado has one number, set a title with one number.
  // If balado has two numbers, set a title with both numbers.
  // If balado has no numbers and only a title, set a title w/ that title.
  let baladoTitle;
  if (balado?.secondNumber && balado?.number) {
    baladoTitle = `Mœbius-balado n°${balado?.number} & ${balado?.secondNumber}`;
  } else if (balado?.number && !balado?.secondNumber) {
    baladoTitle = `Mœbius-balado n°${balado?.number}`;
  } else if (!balado?.number && !balado?.secondNumber && balado?.title) {
    baladoTitle = balado?.title;
  }

  return (
    <>
      <Head>
        <title>{baladoTitle ? baladoTitle : "Balado"}</title>
        <meta
          property="og:title"
          content={baladoTitle ? baladoTitle : "Balado"}
        />
      </Head>
      <Banner style={{ background: balado.color }}>
        <Inner>
          <BannerFlex>
            <ImageWrapper>
              {balado.imageUrl && (
                <Image
                  src={balado.imageUrl}
                  placeholder="blur"
                  blurDataURL={balado.lqip}
                  width={620}
                  height={620}
                />
              )}
            </ImageWrapper>
            <BannerText>
              <small style={{ color: balado.textcolor }}>
                <ConvertDateToString data={balado?.publishedAt} />
              </small>
              <h2 style={{ color: balado.textcolor }}>{baladoTitle}</h2>
              <WrapDetails>
                {balado.discussion && (
                  <BannerDetails>
                    <BannerItem>
                      <small style={{ color: balado.textcolor }}>
                        Discussion
                      </small>
                      {balado.discussion.map((person) => {
                        return (
                          <h4 style={{ color: balado.textcolor }}>{person}</h4>
                        );
                      })}
                    </BannerItem>
                  </BannerDetails>
                )}
                {balado.interviews && (
                  <BannerDetails>
                    <BannerItem>
                      <small style={{ color: balado.textcolor }}>
                        Entrevues et lectures
                      </small>
                      {balado.interviews.map((person) => {
                        return (
                          <h4 style={{ color: balado.textcolor }}>{person}</h4>
                        );
                      })}
                    </BannerItem>
                  </BannerDetails>
                )}
                {balado.animation && (
                  <BannerDetails>
                    <BannerItem>
                      <small style={{ color: balado.textcolor }}>
                        Animation
                      </small>
                      {balado.animation.map((person) => {
                        return (
                          <h4 style={{ color: balado.textcolor }}>{person}</h4>
                        );
                      })}
                    </BannerItem>
                  </BannerDetails>
                )}
              </WrapDetails>
            </BannerText>
          </BannerFlex>
        </Inner>
      </Banner>
      <Wrapper>
        <Inner>
          <MainContentFlex>
            <StickyLink>
              <SpotifyButton
                href={balado?.embed}
                target="_blank"
                rel="noreferrer"
              >
                <small>Ouvrir en Spotify</small>
              </SpotifyButton>
            </StickyLink>
            <Content>
              {balado?.embed && (
                <SpotifyWrapper>
                  <Spotify
                    wide
                    height="100%"
                    link={balado?.embed}
                    style={{
                      backgroundColor: "var(--color-cream)!important",
                    }}
                  />
                </SpotifyWrapper>
              )}
              <MarkdownWrapper>
                <MarkdownContent blocks={balado?.body} />
              </MarkdownWrapper>
              <ShareButton input={balado?.embed} />
              <Return>
                <Link scroll={false} href="/balado">
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
                    Retourner vers balados
                  </span>
                </Link>
              </Return>
            </Content>
          </MainContentFlex>
        </Inner>
      </Wrapper>
    </>
  );
}

export async function getStaticProps({ params }) {
  const footerLogos = await client.fetch(footerLogoQuery);

  let slug;
  const balado = await client.fetch(baladoQuery, {
    slug: params.slug,
  });

  return {
    props: {
      balado,
      footerLogos,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "balado" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

const Banner = styled.section`
  width: 100%;
  padding: 10vh 0;
  padding-top: 10rem;
`;

const BannerFlex = styled.header`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${breakpoints.l}px) {
    flex-direction: column;
  }
`;

const ImageWrapper = styled.div`
  aspect-ratio: 1/1;
  width: 35%;
  height: auto;
  display: block;
  position: relative;

  @media (max-width: ${breakpoints.l}px) {
    width: 50%;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 75%;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 100%;
  }
`;

const Wrapper = styled.section`
  background: var(--color-cream);
`;

const BannerText = styled.div`
  margin-left: 5%;
  width: 60%;
  small {
    display: block;
    margin-bottom: 1.5rem;
  }
  h2 {
    font-family: "Editorial-Italic";
    margin-bottom: 6rem;
  }

  @media (max-width: ${breakpoints.l}px) {
    margin: 0;
    margin-top: 5rem;
    width: 80%;
    h2 {
      margin-bottom: 3rem;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 100%;
    margin-top: 3rem;
    h2 {
      margin-bottom: 1.5rem;
    }
  }
`;

const WrapDetails = styled.div`
  display: flex;

  @media (max-width: ${breakpoints.l}px) {
    justify-content: space-between;
  }
  @media (max-width: ${breakpoints.s}px) {
    flex-direction: column;
  }
`;

const BannerDetails = styled.div`
  margin-right: 3rem;

  @media (max-width: ${breakpoints.l}px) {
    margin-right: 0;
  }
`;

const BannerItem = styled.div`
  margin-top: 2rem;
  display: block;
  small {
    margin-bottom: 1.5rem;
    display: block;
  }
  h4 {
    font-size: 2.18vw;
    white-space: nowrap;
  }
  @media (max-width: ${breakpoints.xl}px) {
    small {
      font-size: 12px;
    }
    h4 {
      font-size: 2.5vw;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    margin-top: 1rem;
    h4 {
      font-size: 28px;
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    h4 {
      font-size: 30px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-bottom: 1rem;
    h4 {
      font-size: 35px;
    }
    small {
      margin-bottom: 0.5rem;
    }
  }
`;

const MainContentFlex = styled.div`
  position: relative;
  display: flex;
  padding-top: 5rem;

  @media (max-width: ${breakpoints.xl}px) {
    flex-direction: column;
  }
  @media (max-width: ${breakpoints.m}px) {
    padding-top: 3rem;
  }
`;
const StickyLink = styled.div`
  position: sticky;
  align-self: flex-start;
  display: flex;
  align-items: center;
  top: 20vh;
  padding-bottom: 10rem;
  width: 35%;

  @media (max-width: ${breakpoints.xxl}px) {
    padding-bottom: 6rem;
  }

  @media (max-width: ${breakpoints.xl}px) {
    width: 100%;
    position: relative;
    top: 0;
  }
  @media (max-width: ${breakpoints.m}px) {
    display: none;
  }
`;

const SpotifyButton = styled.a`
  position: relative;
  display: inline-block;
  margin: 0 auto;
  padding: 1rem 4rem;
  border-radius: 10px;
  text-decoration: none;
  transition: var(--transition);
  background: var(--color-turquoise);
  color : var(--static-black);
  small {
    padding: 0;
  }

  :hover {
    background: var(--color-turquoise);
    filter: brightness(0.9);
    small {
      color: var(--static-black);
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    background: var(--color-turquoise);
    border: 1px solid transparent;
    small {
      color: var(--static-black);
    }
  }
`;

const Content = styled.div`
  padding-bottom: 10rem;
  margin-left: 5%;
  padding-right: 5%;
  width: 60%;

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul,
  li,
  ol,
  blockquote {
    color: var(--color-black);
  }

  @media (max-width: ${breakpoints.xxl}px) {
    padding-right: 0;
    padding-bottom: 5rem;
  }

  @media (max-width: ${breakpoints.xl}px) {
    width: 100%;
    margin-left: 0;
  }

  @media (max-width: ${breakpoints.m}px) {
    padding-bottom: 2.5rem;
  }
`;

const SpotifyWrapper = styled.div`
  height: 300px;
  position: relative;
  display: block;

`;

const Return = styled.small`
  display: inline-block;
  margin-top: 5rem;
  margin-bottom: 2rem;

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
  @media (max-width: ${breakpoints.xxl}px) {
    span {
      justify-content: flex-start;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    margin: 2rem auto;
  }
`;

const MarkdownWrapper = styled.div`
  margin-bottom: 5rem;
  margin-top: 1rem;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  code {
    margin: 1.5rem 0;
  }
  video,
  iframe {
    display: block;
    margin: 3rem auto;
    aspect-ratio: 16/9;
    width: 90%;
    height: 100%;
  }
  a {
    color: var(--color-purple);
    transition: var(--transition);
    :hover {
      opacity: 0.7;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    margin-top: 0;
  }
`;
