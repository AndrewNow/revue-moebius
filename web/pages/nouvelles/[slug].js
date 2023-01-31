import Link from "next/link";
import groq from "groq";
import { client } from "../../lib/sanity/client";
import { nouvellesQuery } from "../../lib/sanity/nouvellesQuery";
import { footerLogoQuery } from "../../lib/sanity/footerLogoQuery";
import styled from "styled-components";
import { breakpoints } from "../../utils/breakpoints";
import ShareButton from "../../components/shareButton";
import ConvertDateToString from "../../utils/convertDateToString";
import MarkdownContent from "../../utils/MarkdownContent";
import Head from "next/head";
import SplitText from "../../utils/splitText";
import { textAnimFast, textAnimSlow, textChild } from "../../styles/animations";

export default function Nouvelles({ nouvelles }) {
  return (
    <>
      <Head>
        <title>{nouvelles?.title ? nouvelles?.title : "Nouvelles"}</title>
        <meta
          property="og:title"
          content={nouvelles?.title ? nouvelles?.title : "Nouvelles"}
        />
      </Head>
      <Inner>
        <Header>
          <small>
            <ConvertDateToString data={nouvelles?.publishedAt} />
          </small>
          <h1>
            <SplitText
              string={nouvelles?.title}
              variantParent={textAnimFast}
              variantParentMobile={textAnimSlow}
              variantChild={textChild}
              initial="hidden"
              animate="visible"
            />
          </h1>
        </Header>
        <Content>
          <MarkdownWrapper>
            <MarkdownContent blocks={nouvelles?.body} />
          </MarkdownWrapper>
          <ShareButton
            input={`https://revuemoebius.com/nouvelles/${nouvelles?.slug}`}
          />
          <Return>
            <Link scroll={false} href="/nouvelles">
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
                Retourner vers nouvelles
              </span>
            </Link>
          </Return>
        </Content>
      </Inner>
    </>
  );
}

export async function getStaticProps({ params }) {
  const footerLogos = await client.fetch(footerLogoQuery);

  let slug;
  const nouvelles = await client.fetch(nouvellesQuery, {
    slug: params.slug,
  });

  return {
    props: {
      nouvelles,
      footerLogos,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "nouvelles" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
}

const Header = styled.header`
  width: 80%;
  margin: 0 auto;
  text-align: center;
  padding-top: 20vh;
  padding-bottom: 3rem;
  color: var(--color-black);

  small {
    color: var(--color-grey);
    padding: 2rem 0;
    display: block;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 100%;
    text-align: left;
    padding-bottom: 1rem;
  }
`;

const Inner = styled.div`
  width: 92.5%;
  margin: 0 auto;

  @media (max-width: ${breakpoints.m}px) {
    width: 90%;
  }
`;

const Content = styled.div`
  padding-bottom: 10rem;
  width: 70%;
  max-width: 915px;
  margin: 0 auto;

  @media (max-width: ${breakpoints.xl}px) {
    padding-bottom: 5rem;
  }

  @media (max-width: ${breakpoints.m}px) {
    padding-bottom: 2.5rem;
    width: 100%;
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
  @media (max-width: ${breakpoints.s}px) {
    margin: 2rem auto;
  }
`;

const MarkdownWrapper = styled.div`
  margin-bottom: 5rem;
  margin-top: 3rem;
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
    /* display: inline-block; */
  }

  a {
    color: var(--color-purple);
    transition: var(--transition);
    :hover {
      opacity: 0.7;
    }
  }
  video,
  iframe {
    display: block;
    margin: 3rem auto;
    aspect-ratio: 16/9;
    width: 90%;
    height: 100%;
  }
`;
