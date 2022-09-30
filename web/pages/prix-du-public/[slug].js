import Link from "next/link";
import groq from "groq";
import { client } from "../../lib/sanity/client";
import { prixDuPublicQuery } from "../../lib/sanity/prixDuPublicQuery";
import { footerLogoQuery } from "../../lib/sanity/footerLogoQuery";
import styled from "styled-components";
import { Inner } from "../index";
import { breakpoints } from "../../utils/breakpoints";
import ShareButton from "../../components/shareButton";
import MarkdownContent from "../../utils/MarkdownContent";
import SplitText from "../../utils/splitText";
import { textAnim, textChild, textAnimSlow } from "../../styles/animations";

export default function PrixDuPublic({ prixDuPublic }) {
  return (
    <>
      <Header>
        {prixDuPublic?.associatedNumero && (
          <Tag>
            <Link
              scroll={false}
              href={`/numeros/${prixDuPublic?.associatedNumero[0].slug}`}
            >
              <small>
                Édition N°{prixDuPublic?.associatedNumero[0].number}
              </small>
            </Link>
          </Tag>
        )}
        <h1>
          <SplitText
            string={prixDuPublic?.title}
            variantParent={textAnim}
            variantParentMobile={textAnimSlow}
            variantChild={textChild}
            initial="hidden"
            animate="visible"
          />
        </h1>
        <small>Rédigé par: {prixDuPublic?.author}</small>
      </Header>
      <Inner>
        <Content>
          <MarkdownWrapper>
            <MarkdownContent blocks={prixDuPublic?.body} />
          </MarkdownWrapper>
          <ShareButton input={prixDuPublic?.slug} />
          <Return>
            <Link
              scroll={false}
              href={`/nouvelles/${prixDuPublic?.associatedNouvelles[0].slug.current}`}
            >
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
                Retourner au prix du public
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
  const prixDuPublic = await client.fetch(prixDuPublicQuery, {
    slug: params.slug,
  });

  return {
    props: {
      prixDuPublic,
      footerLogos,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "prixDuPublic" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

const Header = styled.header`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding-top: 25vh;
  padding-bottom: 10rem;
  color: var(--static-black);
  background: var(--color-blue);

  small {
    padding: 1rem 0;
    display: block;
  }

  @media (max-width: ${breakpoints.l}px) {
    padding-bottom: 5rem;
  }
`;

const Tag = styled.div`
  display: inline-block;
  background: var(--color-turquoise);
  z-index: 2;
  padding: 10px 18px;
  border-radius: 20px;
  margin-bottom: 3rem;
  transition: var(--transition);
  cursor: pointer;
  :hover {
    filter: brightness(0.95);
  }
  small {
    padding: 0;
    white-space: nowrap;
    color: var(--static-black);
  }
  @media (max-width: ${breakpoints.l}px) {
    margin-bottom: 1.5rem;
  }

  @media (max-width: ${breakpoints.s}px) {
    margin-bottom: 1.5rem;
    padding: 5px 10px;
    small {
      font-size: 12px;
    }
  }
`;

const Content = styled.div`
  padding-top: 5rem;
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

  @media (max-width: ${breakpoints.xl}px) {
    padding-bottom: 5rem;
    width: 75%;
  }

  @media (max-width: ${breakpoints.m}px) {
    padding-top: 2.5rem;
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
