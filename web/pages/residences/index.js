import styled from "styled-components";
import { client } from "../../lib/sanity/client";
import { footerLogoQuery } from "../../lib/sanity/footerLogoQuery";
import {
  activeResidenciesQuery,
  residencesArchiveQuery,
} from "../../lib/sanity/residencesQuery";
import { useInView as useIntersectionInView } from "react-intersection-observer";
import React, { useRef, useCallback, useEffect, useState } from "react";
import { breakpoints } from "../../utils/breakpoints";
import SplitText from "../../utils/splitText";
import Link from "next/link";
import { textAnim, textAnimSlow, textChild } from "../../styles/animations";
import MarkdownContent from "../../utils/MarkdownContent";
import Image from "next/image";
import { Instagram, LinkIcon } from "../../svg/icons";
import ResidenceArchive from "../../components/residenceArchive/residenceArchive";
import { motion } from "framer-motion";
import Head from "next/head";

const Residency = ({ pageData, archiveData }) => {
  //.:*~*:._.:*~*:._.:*~*:._.:*~*:._.:*~*
  //
  //  ref logic for sidebar nav
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*:._.:*~*
  const options = {
    root: null,
    threshold: 0.2,
    triggerOnce: false,
  };

  // setup scrollTo for archive section
  const [archiveRef, archiveIsVisible] = useIntersectionInView(options);
  const archiveScrollRef = useRef(null);
  const archiveRefs = useCallback(
    (node) => {
      archiveScrollRef.current = node;
      archiveRef(node);
    },
    [archiveRef]
  );
  const handleScollToArchive = () => {
    archiveScrollRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };


  // setup scrollTo for person entries
  const personRefs = useRef([]);
  const setPersonRef = (index, element) => {
    personRefs.current[index] = element
  }

  const handleScollTo = (index) => {
    personRefs.current[index].scrollIntoView({
      behavior: "smooth",
    });
  };


  // track visibility of person entries for the scrollTo functionality
  const [isVisible, setIsVisible] = useState([]);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const index = personRefs.current.indexOf(entry.target);
        setIsVisible((prev) => {
          const updated = [...prev];
          updated[index] = entry.isIntersecting;
          return updated;
        });
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    personRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);


  return (
    <>
      <Head>
        <title>Découvrez nos résidences</title>
        <meta property="og:title" content="Découvrez nos résidences" />
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
        <Sidebar>
          <SidebarList>
            {
              pageData.residenceData.map((person, index) => {
                return (
                  <React.Fragment key={person.title}>
                    <small
                      onClick={() => handleScollTo(index)}
                      style={{
                        color: isVisible[index] ?
                          "var(--color-black)" :
                          "var(--color-grey)"
                      }}
                    >
                    {person.title}
                  </small>
                  <br />
                  <br />
                </React.Fragment>
                )
              })
            }
            <small
              onClick={handleScollToArchive}
              style={{
                color: archiveIsVisible
                  ? "var(--color-black)"
                  : "var(--color-grey)",
              }}
            >
              archives
            </small>
          </SidebarList>
        </Sidebar>
        <MainContent>
          <Landing>
            <LandingText>
              <h1 role="heading">
                <SplitText
                  string="Résidences"
                  variantParent={textAnim}
                  variantParentMobile={textAnimSlow}
                  variantChild={textChild}
                  initial="hidden"
                  animate="visible"
                />
              </h1>
              <motion.p
                role="heading"
                variants={textAnimSlow}
                initial="hidden"
                animate="visible"
              >
                <motion.span variants={textChild}>
                  <em>Mœbius </em>accueille chaque année un·e artiste et un·e
                  écrivain·e en résidence. Aux artistes, la revue offre de faire
                  de sa page couverture un canevas. Aux écrivain·e·s, elle donne
                  l’espace d’une parole qui peut se déployer en plusieurs
                  épisodes. Dès 2023, un nouveau terrain d’exploration sera
                  ouvert à un duo formé d’un·e artiste et d’un·auteurice : la
                  résidence hypermédiatique. Découvrez leurs œuvres ici!
                </motion.span>
              </motion.p>
            </LandingText>
          </Landing>
          {pageData.residenceData.map((individual, index) => {
            // Change the category title according to the incoming SEO title data
            // to make it easier to read
            let residencyCategory;

            if (individual.type === "artiste") {
              residencyCategory = "Résidence d'artiste";
            } else if (individual.type === "écrivain") {
              residencyCategory = "Résidence d'écrivain·e";
            } else if (individual.type === "hypermédia") {
              residencyCategory = "Résidence hypermédiatique";
            }
            return (
              <ResidencyEntry key={individual.slug}>
                <ResidencyText>
                  <SEOTitleFlex
                    ref={(element) => setPersonRef(index, element)}
                  >
                    <h3>{individual.title}</h3>
                    <h5>{residencyCategory}</h5>
                  </SEOTitleFlex>
                  <MarkdownContent blocks={individual.shortBio} />

                  <LinkWrapper>
                    <Link
                      scroll={false}
                      href={`/residences/${individual.slug}`}
                    >
                      <small>En savoir plus</small>
                    </Link>
                  </LinkWrapper>
                  <Socials>
                    {individual.instagram && (
                      <SocialLink>
                        <Instagram />
                        <a
                          href={individual.instagram}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <small>Instagram</small>
                        </a>
                      </SocialLink>
                    )}
                    {individual.portfolio && (
                      <SocialLink>
                        <LinkIcon />
                        <a
                          href={individual.portfolio}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <small>Portfolio</small>
                        </a>
                      </SocialLink>
                    )}
                  </Socials>
                </ResidencyText>
                <ResidencyImage>
                  <Image
                    src={individual.imageUrl}
                    placeholder="blur"
                    blurDataURL={individual.lqip}
                    alt={`Image portrait pour ${individual.title}`}
                    width={675}
                    height={675}
                    // layout="fill"
                    objectFit="contain"
                    quality={90}
                  />
                </ResidencyImage>
              </ResidencyEntry>
            );
          })}
          <div ref={archiveRefs}>
            <ResidenceArchive data={archiveData} />
          </div>
        </MainContent>
      </Wrapper>
    </>
  );
};

export default Residency;

export async function getStaticProps() {
  const footerLogos = await client.fetch(footerLogoQuery);
  const pageData = await client.fetch(activeResidenciesQuery);
  const archiveData = await client.fetch(residencesArchiveQuery);
  return {
    props: {
      pageData,
      archiveData,
      footerLogos,
    },
    revalidate: 10,
  };
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
`;

const Sidebar = styled.div`
  width: 20%;
  position: sticky;
  top: 10vh;
  height: 300px;
  @media (max-width: ${breakpoints.l}px) {
    width: 25%;
  }

  @media (max-width: ${breakpoints.m}px) {
    display: none;
  }
`;

const SidebarList = styled.div`
  width: 80%;
  margin: 2rem auto;
  cursor: pointer;
  user-select: none;
  small {
    transition: var(--transition);
  }
  small:hover {
    text-decoration: underline;
  }
  @media (max-width: ${breakpoints.l}px) {
    small {
      font-size: 13px;
    }
  }
`;

const MainContent = styled.div`
  width: 80%;
  border-left: 1px solid var(--color-black);
  @media (max-width: ${breakpoints.l}px) {
    width: 75%;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 100%;
    border: none;
  }
`;

const Landing = styled.header`
  position: relative;
  padding-bottom: 2rem;
  background-color: var(--color-turquoise);
`;

const LandingText = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 15rem 0;
  padding-bottom: 5rem;
  h1,
  p {
    color: var(--static-black);
  }
  h1 {
    scroll-margin: 120px;
    margin-bottom: 2rem;
  }
  p {
    width: 80%;
  }
  @media (max-width: ${breakpoints.m}px) {
    h1 {
      margin-bottom: 1rem;
    }
    p {
      width: 100%;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    padding-left: 0.25rem;
  }
`;

const ResidencyEntry = styled.div`
  width: 90%;
  margin: 5rem auto;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-grey);

  :nth-child(odd) {
    flex-direction: row-reverse;
  }

  h5 {
    color: var(--color-grey);
  }
  @media (max-width: ${breakpoints.l}px) {
    flex-direction: column-reverse;

    :nth-child(odd) {
      flex-direction: column-reverse;
    }
  }
`;

const ResidencyText = styled.div`
  width: 45%;
  padding-bottom: 10rem;

  @media (max-width: ${breakpoints.l}px) {
    width: 100%;
    margin: 0 auto;
    margin-top: 2rem;
  }

  @media (max-width: ${breakpoints.s}px) {
    padding-bottom: 1rem;
  }
`;
const ResidencyImage = styled.div`
  width: 50%;
  position: relative;
  display: block;
  @media (max-width: ${breakpoints.l}px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const SEOTitleFlex = styled.div`
  scroll-margin: 120px;
  // This is needed to flip the order of the H tags to comply with descending SEO order preference
  margin-bottom: 2rem;

  display: flex;
  flex-direction: column-reverse;

  h3 {
    margin-top: 1rem;
    color: var(--color-black);
    font-family: "Surt";
  }
`;

const Socials = styled.div`
  padding: 1rem 0;
  @media (max-width: ${breakpoints.m}px) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  @media (max-width: ${breakpoints.xs}px) {
    display: block;
  }
`;

const SocialLink = styled.div`
  margin: 1rem 0;
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
  }
  @media (max-width: ${breakpoints.s}px) {
    padding-right: 2rem;
  }
`;

const LinkWrapper = styled.div`
  border: 1px solid var(--color-black);
  border-radius: 10px;
  display: inline-block;
  margin: 4rem 0;
  small {
    display: inline-block;
    padding: 1rem 6rem;
  }
  cursor: pointer;
  a {
    text-decoration: none;
  }
  :hover {
    border: 1px solid transparent;
    small {
      color: var(--static-black);
    }
    background: var(--color-turquoise);
    transition: var(--transition);
  }

  @media (max-width: ${breakpoints.s}px) {
    margin: 2rem 0;
  }
`;
