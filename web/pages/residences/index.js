import styled from "styled-components";
import { client } from "../../lib/sanity/client";
import { footerLogoQuery } from "../../lib/sanity/footerLogoQuery";
import { residenciesPageQuery } from "../../lib/sanity/residencesQuery";
import { useInView as useIntersectionInView } from "react-intersection-observer";
import { useRef, useCallback } from "react";
import { breakpoints } from "../../utils/breakpoints";
import SplitText from "../../utils/splitText";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  textAnim,
  textAnimFast,
  textAnimFastest,
  textAnimSlow,
  textChild,
} from "../../styles/animations";
import MarkdownContent from "../../utils/MarkdownContent";
import Image from "next/image";
import { Instagram, LinkIcon } from "../../svg/icons";

const Residency = ({ pageData }) => {
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

  const [headerRef, headerIsVisible] = useIntersectionInView(options);
  const [submissionRef, submissionIsVisible] = useIntersectionInView(options);
  const [editionRef, editionIsVisible] = useIntersectionInView(options);

  const headerScrollRef = useRef(null);
  const submissionScrollRef = useRef(null);
  const editionScrollRef = useRef(null);

  // Use `useCallback` so we don't recreate the function on each render. Could result in infinite loop
  const headerRefs = useCallback(
    (node) => {
      headerScrollRef.current = node;
      headerRef(node);
    },
    [headerRef]
  );

  const submissionRefs = useCallback(
    (node) => {
      submissionScrollRef.current = node;
      submissionRef(node);
    },
    [submissionRef]
  );

  const editionRefs = useCallback(
    (node) => {
      editionScrollRef.current = node;
      editionRef(node);
    },
    [editionRef]
  );

  const handleScollTo = (ref) =>
    ref.current.scrollIntoView({
      behavior: "smooth",
    });

  //.:*~*:._.:*~*:._.:*~*:._.:*~*:._.:*~*
  //
  //  Text animation refs
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*:._.:*~*
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.55,
  });
  const ref2 = useRef(null);
  const isInView2 = useInView(ref2, {
    once: true,
    amount: 0.55,
  });

  return (
    <Wrapper>
      <Sidebar>
        <SidebarList>
          <small
            onClick={() => handleScollTo(headerScrollRef)}
            style={{
              color: headerIsVisible
                ? "var(--color-black)"
                : "var(--color-grey)",
            }}
          >
            résidence d’artiste
          </small>
          <br />
          <br />
          <small
            onClick={() => handleScollTo(submissionScrollRef)}
            style={{
              color: submissionIsVisible
                ? "var(--color-black)"
                : "var(--color-grey)",
            }}
          >
            Résidence d’écrivain.e
          </small>
          <br />
          <br />
          <small
            onClick={() => handleScollTo(editionScrollRef)}
            style={{
              color: editionIsVisible
                ? "var(--color-black)"
                : "var(--color-grey)",
            }}
          >
            résidence hypermédiatique
          </small>
        </SidebarList>
      </Sidebar>
      <MainContent>
        <Landing>
          <LandingText>
            <h1 ref={headerRefs} role="heading">
              <SplitText
                string="Artistes en résidence"
                variantParent={textAnim}
                variantParentMobile={textAnimSlow}
                variantChild={textChild}
                initial="hidden"
                animate="visible"
              />
            </h1>
            <p role="heading">
              <SplitText
                string="Mœbius est une revue littéraire québécoise fondée en 1977 par Pierre DesRuisseaux, Raymond Martin et Guy Melançon. Elle a été dirigée par Robert Giroux pendant trente-cinq ans. La revue paraît quatre fois par année."
                variantParent={textAnimFast}
                variantParentMobile={textAnimFastest}
                variantChild={textChild}
                initial="hidden"
                animate="visible"
                isParagraphText={true}
              />
            </p>
          </LandingText>
        </Landing>
        {pageData.residencesData.map((individual) => {
          // Change the title according to the incoming SEO title data
          // to make it easier to read
          let residencyTitle;
          if (individual.type === "écrivain") {
            residencyTitle = "Résidence d'écrivain.e";
          } else if (individual.type === "artiste") {
            residencyTitle = "Résidence d'artiste";
          } else if (individual.type === "hypermédia") {
            residencyTitle = "Résidence hypermédiatique";
          }

          return (
            <ResidencyEntry key={individual._id}>
              <ResidencyText>
                <SEOTitleFlex>
                  <h3>{individual.title}</h3>
                  <h5>{residencyTitle}</h5>
                </SEOTitleFlex>
                <MarkdownContent blocks={individual.shortBio} />

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
                  placeholder={individual.lqip}
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
      </MainContent>
    </Wrapper>
  );
};

export default Residency;

export async function getStaticProps() {
  const footerLogos = await client.fetch(footerLogoQuery);
  const pageData = await client.fetch(residenciesPageQuery);
  return {
    props: {
      pageData,
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
    color: var(--color-black);
  }
  h1 {
    scroll-margin: 120px;
    margin-bottom: 2rem;
  }
  p {
    width: 60%;
  }
  @media (max-width: ${breakpoints.m}px) {
    margin: 2rem;
    h1 {
      margin-bottom: 1rem;
    }
    p {
      width: 90%;
    }
  }
`;

const ResidencyEntry = styled.div`
  width: 90%;
  margin: 5rem auto;
  display: flex;
  justify-content: space-between;

  h5 {
    color: var(--color-grey);
  }
`;

const ResidencyText = styled.div`
  width: 45%;
  padding-bottom: 10rem;
  border-bottom: 1px solid var(--color-grey);
`;
const ResidencyImage = styled.div`
  width: 50%;
  padding: 2rem;
  position: relative;
  display: block;
`;

const SEOTitleFlex = styled.div`
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
