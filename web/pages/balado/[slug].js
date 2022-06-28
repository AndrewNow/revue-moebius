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

export default function Balado({ balado }) {
  return (
    <Inner>
      <Header>
        <small>{balado?.publishedAt}</small>
        <h1>
          N°{balado.number}- {balado?.title}
        </h1>
      </Header>
      <Content>
        {balado?.embed && (
          <SpotifyWrapper>
            <Spotify wide height="100%" link={balado?.embed} />
          </SpotifyWrapper>
        )}
        <BlockContent blocks={balado?.body} />
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

const Header = styled.header`
  width: 90%;
  padding-top: 15vh;
  padding-left: 5vw;
  padding-bottom: 5rem;
  color: var(--color-black);

  small {
    padding: 2rem 0;
    display: block;
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
    margin: 3rem 5%;
  }
`;
