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
import MarkdownContent from "../../utils/MarkdownContent";
import Head from "next/head";
import BaladoHeader from "../../components/baladoHeader";

export default function Balado({ balado }) {
  // If balado has one associated numero release, set a title with one number.
  // If balado has two associated numero releases, set a title with both numbers.
  // If balado has no associated numero and only a title, set a title w/ that title.
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
      <BaladoHeader balado={balado} baladoTitle={baladoTitle} />
      <Wrapper>
        <Inner>
          <MainContent>
            <Content>
              {balado?.embed && (
                <SpotifyWrapper>
                  <Spotify
                    wide
                    height="232px"
                    link={balado?.embed}
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
          </MainContent>
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
    fallback: "blocking",
  };
}



const Wrapper = styled.section`
  background: var(--color-cream);
`;

const MainContent = styled.div`
  position: relative;
  padding-top: 5rem;
  margin: 0 auto;

  @media (max-width: ${breakpoints.xl}px) {
    flex-direction: column;
  }
  @media (max-width: ${breakpoints.m}px) {
    padding-top: 3rem;
  }
`;

const Content = styled.div`
  padding-bottom: 10rem;
  width: 60%;
  margin: 0 auto;

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
  }

  @media (max-width: ${breakpoints.m}px) {
    padding-bottom: 2.5rem;
  }
`;

const SpotifyWrapper = styled.div`
  height: 232px;
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: 14px;
  margin-bottom: 3rem;
  iframe {
    background: unset!important;
  }
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
