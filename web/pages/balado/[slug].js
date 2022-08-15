import Image from "next/image";
import Link from "next/link";
import groq from "groq";
import BlockContent from "@sanity/block-content-to-react";
import { client } from "../../lib/sanity/client";
import { baladoQuery } from "../../lib/sanity/baladoQuery";
import { footerLogoQuery } from "../../lib/sanity/footerLogoQuery";
import styled from "styled-components";
import { Inner } from "../index";
import { breakpoints } from "../../utils/breakpoints";
import Spotify from "react-spotify-embed";
import ShareButton from "../../components/shareButton";
import ConvertDateToString from "../../utils/convertDateToString";

export default function Balado({ balado }) {
  console.log(balado);
  return (
    <>
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
              <h1 style={{ color: balado.textcolor }}>Mœbius-balado</h1>
              <WrapDetails>
                <BannerDetails>
                  {balado.discussion && (
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
                  )}
                </BannerDetails>
                <BannerDetails>
                  {balado.interviews && (
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
                  )}
                </BannerDetails>
                <BannerDetails>
                  {balado.animation && (
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
                  )}
                </BannerDetails>
              </WrapDetails>
            </BannerText>
          </BannerFlex>
        </Inner>
      </Banner>
      <Wrapper>
        <Inner>
          <Header>
            <small>
              <ConvertDateToString data={balado?.publishedAt} />
            </small>
            <h1>
              N°{balado?.number}- {balado?.title}
            </h1>
            <SpotifyButton
              href={balado?.embed}
              target="_blank"
              rel="noreferrer"
            >
              <small>Ouvrir en Spotify</small>
            </SpotifyButton>
          </Header>
          <Content>
            {balado?.embed && (
              <SpotifyWrapper>
                <Spotify wide height="100%" link={balado?.embed} />
              </SpotifyWrapper>
            )}
            <MarkdownWrapper>
              <BlockContent blocks={balado?.body} />
            </MarkdownWrapper>
            <ShareButton input={balado?.embed} />
            <Return>
              <Link href="/balado">
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

const BannerFlex = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
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

const Wrapper = styled.section``;

const BannerText = styled.div`
  margin-left: 5%;

  @media (max-width: ${breakpoints.l}px) {
    margin: 0;
    margin-top: 5rem;
    width: 80%;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 100%;
    margin-top: 3rem;
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

const Header = styled.header`
  width: 80%;
  padding-top: 10vh;
  padding-left: 5vw;
  padding-bottom: 3rem;
  color: var(--color-black);

  small {
    padding: 2rem 0;
    padding-top: 0;
    display: block;
  }
  @media (max-width: ${breakpoints.xl}px) {
    padding-top: 20vh;
    padding-bottom: 5rem;
    padding-left: 0;
    width: 100%;
  }
  @media (max-width: ${breakpoints.m}px) {
    padding-top: 10vh;
  }
`;

const SpotifyButton = styled.a`
  border: 1px solid var(--color-black);
  display: inline-block;
  margin-top: 2rem;
  padding: 1rem 3rem;
  border-radius: 10px;
  text-decoration: none;
  transition: var(--transition);

  small {
    padding: 0;
  }

  :hover {
    background: var(--color-turquoise);
    color: var(--static-black);
    border: 1px solid transparent;
  }
`;

const Content = styled.div`
  padding-bottom: 10rem;
  margin-left: 40vw;

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

  @media (max-width: ${breakpoints.xl}px) {
    margin-left: 0;
    padding-bottom: 5rem;
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
  @media (max-width: ${breakpoints.s}px) {
    margin: 2rem auto;
  }
`;

const MarkdownWrapper = styled.div`
  margin-bottom: 5rem;
  margin-top: 3rem;

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
