import { footerLogoQuery } from "../../../../lib/sanity/footerLogoQuery";
import { residencesTextQuery } from "../../../../lib/sanity/residencesQuery";
import { client } from "../../../../lib/sanity/client";
import groq from "groq";
import styled from "styled-components";
import Link from "next/link";
import { breakpoints } from "../../../../utils/breakpoints";
import ShareButton from "../../../../components/shareButton";
import MarkdownContent from "../../../../utils/MarkdownContent";
import SplitText from "../../../../utils/splitText";
import {
  textAnim,
  textAnimSlow,
  textChild,
} from "../../../../styles/animations";
import { Inner } from "../../../index";
import Head from "next/head";

const TexteDePresentation = ({ pageData }) => {
  const data = pageData;

  return (
    <>
      <Head>
        <title>{data.title} - Texte de présentation</title>
        <meta
          property="og:title"
          content={`${data.title} - Texte de présentation`}
        />
        <meta
          property="og:description"
          content="Mœbius accueille chaque année un·e artiste et un·e écrivain·e en résidence. Dès 2023, un nouveau terrain d’exploration sera ouvert à un duo formé d’un·e artiste et d’un·auteur·rice : la résidence hypermédiatique."
        />
        <meta
          name="description"
          content="Mœbius accueille chaque année un·e artiste et un·e écrivain·e en résidence. Dès 2023, un nouveau terrain d’exploration sera ouvert à un duo formé d’un·e artiste et d’un·auteur·rice : la résidence hypermédiatique."
        />
      </Head>
      <Header>
        <BreadCrumbs>
          <small>
            <Link scroll={false} href={`/residences`}>
              Résidences
            </Link>
            {" > "}
            <Link
              scroll={false}
              href={`/residences/${data?.associatedArtist.slug}`}
            >
              {data?.associatedArtist.title}
            </Link>
            {" > "}
            <strong> Texte de présentation</strong>
          </small>
        </BreadCrumbs>
        {data?.associatedNumero && (
          <Tag>
            <Link
              scroll={false}
              href={`/numeros/${data?.associatedNumero.slug}`}
            >
              <small>Édition N°{data?.associatedNumero.number}</small>
            </Link>
          </Tag>
        )}
        <h1>
          <SplitText
            string={data?.title}
            variantParent={textAnim}
            variantParentMobile={textAnimSlow}
            variantChild={textChild}
            initial="hidden"
            animate="visible"
          />
        </h1>
        <small>Rédigé par: {data?.author}</small>
      </Header>
      <Inner>
        <Content>
          <MarkdownWrapper>
            <MarkdownContent blocks={data?.body} />
          </MarkdownWrapper>
          <ShareButton input={data?.slug} />
          <Return>
            <Link
              scroll={false}
              href={`/residences/${data?.associatedArtist.slug}`}
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
                Retourner vers la page de {data?.associatedArtist.title}
              </span>
            </Link>
          </Return>
        </Content>
      </Inner>
    </>
  );
};

export default TexteDePresentation;

export async function getStaticProps({ params }) {
  console.log("params", params);

  const footerLogos = await client.fetch(footerLogoQuery);

  const pageData = await client.fetch(residencesTextQuery, {
    texte: params.texte,
    slug: params.texte,
  });

  return {
    props: {
      pageData,
      footerLogos,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const data = await client.fetch(
    groq`*[_type == "artistesEnResidence" && defined(slug.current) && defined(texteDePresentationData)] {
      "slug": slug.current,
      texteDePresentationData[]->{
        "slug": slug.current,
      },
    }`
  );

  const pages = data.reduce((arr, item) => {
    item.texteDePresentationData.forEach((t) => {
      const params = {
        slug: item.slug,
        texte: t.slug,
      };
      arr.push({ params });
    });
    return arr;
  }, []);

  return {
    paths: pages.map((page) => page),
    fallback: "blocking",
  };
}

const Header = styled.header`
  position: relative;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding-top: 25vh;
  padding-bottom: 5rem;
  color: var(--static-black);
  background: var(--color-turquoise);

  small {
    padding: 1rem 0;
    display: block;
  }

  @media (max-width: ${breakpoints.l}px) {
    padding-bottom: 5rem;
  }
`;

const BreadCrumbs = styled.div`
  position: absolute;
  top: 10vh;
  left: 4vw;
  small {
    font-size: 14px;
    color: var(--color-grey);
    a {
      color: var(--color-grey);
      text-decoration: none;
      transition: var(--transition);
      :hover {
        color: var(--static-black);
      }
    }
  }
  strong {
    font-weight: 100;
    color: var(--static-black);
  }

  @media (max-width: ${breakpoints.l}px) {
    small {
      font-size: 13px;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    display: none;
  }
`;

const Tag = styled.div`
  display: inline-block;
  background: var(--color-blue);
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
  max-width: 915px;
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
