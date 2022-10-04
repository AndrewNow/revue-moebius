import { footerLogoQuery } from "../../../lib/sanity/footerLogoQuery";
import { residenciesPageQuery } from "../../../lib/sanity/residencesQuery";
import { client } from "../../../lib/sanity/client";
import groq from "groq";
import styled from "styled-components";
import { breakpoints } from "../../../utils/breakpoints";
import MarkdownContent from "../../../utils/MarkdownContent";
import ShareButton from "../../../components/shareButton";
import Link from "next/link";
import Image from "next/image";
import { Instagram, LinkIcon } from "../../../svg/icons";
import Head from "next/head";

const Residences = ({ data }) => {
  // Change the category title according to the incoming SEO title data
  // to make it easier to read
  let residencyCategory;
  if (data.type === "artiste") {
    residencyCategory = "Résidence d'artiste";
  } else if (data.type === "écrivain") {
    residencyCategory = "Résidence d'écrivain·e";
  } else if (data.type === "hypermédia") {
    residencyCategory = "Résidence hypermédiatique";
  }
  return (
    <>
      <Head>
        <title>{data.title} - Résidence</title>
        <meta property="og:title" content={`${data.title} - Résidence`} />
        <meta
          property="og:description"
          content="Mœbius accueille chaque année un·e artiste et un·e écrivain·e en résidence. Dès 2023, un nouveau terrain d’exploration sera ouvert à un duo formé d’un·e artiste et d’un·auteur·rice : la résidence hypermédiatique."
        />
        <meta
          name="description"
          content="Mœbius accueille chaque année un·e artiste et un·e écrivain·e en résidence. Dès 2023, un nouveau terrain d’exploration sera ouvert à un duo formé d’un·e artiste et d’un·auteur·rice : la résidence hypermédiatique."
        />
      </Head>
      <Wrapper>
        <Header>
          <Inner>
            <DesktopLayout>
              <FlexTitle>
                <h2>{data.title}</h2>
                <h5>{residencyCategory}</h5>
              </FlexTitle>
              {data.texteDePresentationData !== null && (
                <LinkWrapper>
                  <Link
                    scroll={false}
                    href={`/residences/${data.slug}/texte-de-presentation/${data.texteDePresentationData.slug}`}
                  >
                    <small>Texte de présentation</small>
                  </Link>
                </LinkWrapper>
              )}
            </DesktopLayout>
            <MobileLayout>
              <ImageWrapper>
                <Image
                  src={data.imageUrl}
                  placeholder="blur"
                  blurDataURL={data.lqip}
                  alt={`image de ${data.title}`}
                  layout="fill"
                  quality={90}
                  objectFit="contain"
                  objectPosition="center 90%"
                />
              </ImageWrapper>
            </MobileLayout>
          </Inner>
        </Header>
        <Content>
          <Flex>
            <Main>
              <MobileLayout>
                <FlexTitle>
                  <h2>{data.title}</h2>
                  <h5>{residencyCategory}</h5>
                </FlexTitle>
                {data.texteDePresentationData !== null && (
                  <LinkWrapper>
                    <Link
                      scroll={false}
                      href={`/residences/${data.slug}/${data.texteDePresentationData.slug}`}
                    >
                      <small>Texte de présentation</small>
                    </Link>
                  </LinkWrapper>
                )}
              </MobileLayout>
              <MarkdownContent blocks={data.bio} />
              <DesktopLayout>
                <div style={{ marginTop: "2rem" }}>
                  <ShareButton
                    input={`https://revuemoebius.com/residences/${data.slug}`}
                  />
                </div>
                <Return>
                  <Link scroll={false} href="/residences">
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
                      Retourner vers résidences
                    </span>
                  </Link>
                </Return>
              </DesktopLayout>
            </Main>
            <Sidebar>
              <DesktopLayout>
                <ImageWrapper>
                  <Image
                    src={data.imageUrl}
                    placeholder="blur"
                    blurDataURL={data.lqip}
                    alt={`image de ${data.title}`}
                    layout="fill"
                    quality={90}
                    objectFit="contain"
                    objectPosition="center 80%"
                  />
                  {data.photoCredit && (
                    <PhotoCredit>
                      <small>© Crédit photo: {data.photoCredit}</small>
                    </PhotoCredit>
                  )}
                </ImageWrapper>
              </DesktopLayout>
              <MobileLayout>
                <Socials>
                  {data.instagram && (
                    <SocialLink>
                      <Instagram />
                      <a href={data.instagram} target="_blank" rel="noreferrer">
                        <small>Instagram</small>
                      </a>
                    </SocialLink>
                  )}
                  {data.portfolio && (
                    <SocialLink>
                      <LinkIcon />
                      <a href={data.portfolio} target="_blank" rel="noreferrer">
                        <small>Portfolio</small>
                      </a>
                    </SocialLink>
                  )}
                </Socials>
              </MobileLayout>
              {(data.contributions || data.contributionsEcrivain) && (
                <Contributions>
                  <small>Contributions:</small>
                  {data.contributions && (
                    <ContributionGrid>
                      {data.contributions?.map((numero) => {
                        return (
                          <GridItem key={numero.slug.current}>
                            <Link
                              scroll={false}
                              href={`/numeros/${numero.slug.current}`}
                            >
                              <Image
                                src={numero.imageUrl}
                                placeholder="blur"
                                blurDataURL={numero.lqip}
                                layout="fill"
                                objectFit="cover"
                                quality={40}
                                className="imageHover"
                              />
                            </Link>
                          </GridItem>
                        );
                      })}
                    </ContributionGrid>
                  )}
                  {data.contributionsEcrivain && (
                    <ContributionsEcrivain>
                      {data.contributionsEcrivain?.map((publication) => {
                        return (
                          <li>
                            <Link
                              scroll={false}
                              href={`/residences/${data.slug}/contributions/${publication.slug}`}
                            >
                              <small> « {publication.title} »</small>
                            </Link>
                          </li>
                        );
                      })}
                    </ContributionsEcrivain>
                  )}
                </Contributions>
              )}

              <DesktopLayout>
                <Socials>
                  {data.instagram && (
                    <SocialLink>
                      <Instagram />
                      <a href={data.instagram} target="_blank" rel="noreferrer">
                        <small>Instagram</small>
                      </a>
                    </SocialLink>
                  )}
                  {data.portfolio && (
                    <SocialLink>
                      <LinkIcon />
                      <a href={data.portfolio} target="_blank" rel="noreferrer">
                        <small>Portfolio</small>
                      </a>
                    </SocialLink>
                  )}
                </Socials>
              </DesktopLayout>
              <MobileLayout>
                <div style={{ marginTop: "2rem" }}>
                  <ShareButton
                    input={`https://revuemoebius.com/residences/${data.slug}`}
                  />
                </div>
                <Return>
                  <Link scroll={false} href="/residences">
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
                      Retourner vers résidences
                    </span>
                  </Link>
                </Return>
              </MobileLayout>
            </Sidebar>
          </Flex>
        </Content>
      </Wrapper>
    </>
  );
};

export default Residences;

export async function getStaticProps({ params }) {
  const footerLogos = await client.fetch(footerLogoQuery);

  const data = await client.fetch(residenciesPageQuery, {
    slug: params.slug,
  });

  return {
    props: {
      data,
      footerLogos,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const data = await client.fetch(
    groq`*[_type == "artistesEnResidence" && defined(slug.current)][].slug.current`
  );

  return {
    paths: data.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

const Wrapper = styled.div``;

const Header = styled.div`
  padding-top: 15rem;
  padding-bottom: 5rem;
  background: var(--color-turquoise);
  color: var(--static-black);

  @media (max-width: ${breakpoints.l}px) {
    padding-bottom: 1rem;
  }
  @media (max-width: ${breakpoints.m}px) {
    padding: 0;
  }
  @media (max-width: ${breakpoints.s}px) {
    padding: 2rem 0;
  }
`;

const Inner = styled.div`
  width: 85%;
  margin: 0 auto;

  @media (max-width: ${breakpoints.l}px) {
    width: 90%;
  }
`;

const DesktopLayout = styled.div`
  @media (max-width: ${breakpoints.m}px) {
    display: none;
  }
`;

const MobileLayout = styled.div`
  display: none;
  @media (max-width: ${breakpoints.m}px) {
    position: relative;
    display: block;
  }
`;

const FlexTitle = styled.div`
  display: flex;
  flex-direction: column-reverse;
  h2 {
    margin: 2rem 0;
  }
  h5 {
    color: var(--color-grey);
  }
  @media (max-width: ${breakpoints.xl}px) {
    h2 {
      margin-top: 0.5rem;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    h2,
    h5 {
      margin: 0.5rem 0 !important;
    }
  }
`;

const LinkWrapper = styled.div`
  margin: 1rem auto;
  border: 1px solid var(--static-black);
  display: inline-block;
  border-radius: 10px;
  cursor: pointer;
  transition: var(--transition);
  small {
    transition: var(--transition);
    display: inline-block;
    padding: 1rem 4rem;
    margin: 0;
    color: var(--static-black);
  }
  :hover {
    background: var(--color-cream);
    /* border: 1px solid transparent; */
    small {
      color: var(--color-black);
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    small {
      padding: 0.75rem 3.5rem;
      color: var(--static-black);
    }
    background: var(--color-turquoise);
    border: 1px solid transparent;
  }
`;

const Content = styled.section``;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 87.5%;
  margin: 5rem auto;

  @media (max-width: ${breakpoints.xl}px) {
    margin: 2.5rem auto;
  }

  @media (max-width: ${breakpoints.m}px) {
    flex-direction: column;
    margin: 2rem auto;
  }
`;

const Main = styled.div`
  width: 55%;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
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
  * {
    color: var(--color-black);
    transition: var(--transition);
  }

  strong {
    font-weight: 700;
  }

  a {
    color: var(--color-purple);

    :hover {
      opacity: 0.6;
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    /* p {
      font-size: 18px; */
    /* } */
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 100%;
    /* font-size: 20px; */
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

const Sidebar = styled.div`
  width: 40%;
  max-width: 625px;
  position: relative;

  @media (max-width: ${breakpoints.m}px) {
    max-width: none;
    width: 100%;
  }
`;

const ImageWrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 625px;
  max-width: 625px;
  max-height: 525px;
  transform: translateY(calc(925px / -2));

  @media (max-width: ${breakpoints.m}px) {
    transform: none;
    max-height: none;
    max-width: none;
    width: 100%;
  }
  @media (max-width: ${breakpoints.s}px) {
    max-height: 500px;
  }
`;

const PhotoCredit = styled.div`
  color: var(--color-grey);
  position: absolute;
  bottom: -2rem;
  width: 100%;
  small {
    font-size: 14px;
    display: block;
    text-align: center;
    width: 100%;
  }
  @media (max-width: ${breakpoints.xxl}px) {
    bottom: 1rem;
    small {
      font-size: 12px;
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
  }
`;

const Contributions = styled.div`
  transform: translateY(calc(712.5px / -2));
  width: 80%;
  margin: 0 auto;
  position: relative;
  small {
    display: block;
    margin-bottom: 1rem;
  }

  @media (max-width: ${breakpoints.l}px) {
    /* transform: none; */
  }

  @media (max-width: ${breakpoints.m}px) {
    margin: 4rem 0;
    transform: none;
  }
`;

const ContributionGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 1.5rem;
  place-items: center;
  justify-items: start;
  justify-content: start;
`;

const ContributionsEcrivain = styled.ul`
  padding-left: 1rem;
  li {
    padding-left: 1rem;
    small {
      margin-bottom: 1.25rem;
      line-height: 120%;
    }
  }

  li:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const GridItem = styled.div`
  cursor: pointer;
  aspect-ratio: 135/200;
  width: 135px;
  display: block;
  position: relative;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.1));
  .imageHover {
    transition: var(--transition-image);
    transform-origin: center;
  }
  :hover {
    .imageHover {
      /* scale: 1.05; */
      transform: scale(1.025);
      filter: blur(2px) saturate(110%);
    }
  }

  @media (max-width: ${breakpoints.xl}px) {
    width: calc(35vw / 4);
  }

  @media (max-width: ${breakpoints.m}px) {
    width: calc(100vw / 4);
  }
`;

const Socials = styled.div`
  transform: translateY(calc(612.5px / -2));
  width: 80%;
  margin: 0 auto;

  @media (max-width: ${breakpoints.l}px) {
    margin: 2rem auto;
  }
  @media (max-width: ${breakpoints.m}px) {
    transform: none;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 3rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    display: flex;
    align-items: center;
  }
`;

const SocialLink = styled.div`
  margin: 1.5rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  a {
    margin-left: 1rem;
    text-decoration: none;
  }
  :hover {
    a {
      text-decoration: underline;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    padding-right: 3rem;
    :first-child {
      margin-top: 0;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    padding-right: 3rem;
    margin: 1rem 0;
    margin-bottom: 0;
    :first-child {
      margin-top: 1rem;
    }
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;
