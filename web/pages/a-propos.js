import { useState, useEffect } from "react";
import styled from "styled-components";
import { client } from "../lib/sanity/client";
import { footerLogoQuery } from "../lib/sanity/footerLogoQuery";
import { useInView as useIntersectionInView } from "react-intersection-observer";
import { useRef, useCallback } from "react";
import { equipeQuery } from "../lib/sanity/equipeQuery";
import HoverImage from "../components/imageOnHover/hoverImage";
import TeamMember from "../components/imageOnHover/aPropos/teamMember";
import { breakpoints } from "../utils/breakpoints";
import SplitText from "../utils/splitText";
import { motion, useInView } from "framer-motion";
import {
  textAnim,
  textChild,
  textAnimSlow,
  textAnimSlowDelayed,
} from "../styles/animations";

//.:*~*:._.:*~*:._.:*~*:._.:*~*:._.:*~*
//
//  Get mouse pos for team member section
//
//.:*~*:._.:*~*:._.:*~*:._.:*~*:._.:*~*
export const useMousePosition = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", updateMousePosition);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", updateMousePosition);
      }
    };
  }, []);
  return mousePos;
};

const APropos = ({ equipeData, footerLogos }) => {
  const { x, y } = useMousePosition();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeCategory, setActiveCategory] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);

  console.log(activeIndex);
  // ^ this third state is for the global "modal open" state.
  // We need this second state to toggle the z-index of the other clickable items of the page, putting them behind the modal when clicked.
  // I'm sure there's a smarter way to optimize this but this was honestly just the easiest solution I found.

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
  const [equipeRef, equipeIsVisible] = useIntersectionInView(options);
  const [diffusionRef, diffusionIsVisible] = useIntersectionInView(options);
  const [contactUsRef, contactUsIsVisible] = useIntersectionInView(options);

  const headerScrollRef = useRef(null);
  const equipeScrollRef = useRef(null);
  const contactUsScrollRef = useRef(null);
  const diffusionScrollRef = useRef(null);

  // Use `useCallback` so we don't recreate the function on each render. Could result in infinite loop
  const headerRefs = useCallback(
    (node) => {
      headerScrollRef.current = node;
      headerRef(node);
    },
    [headerRef]
  );

  const equipeRefs = useCallback(
    (node) => {
      equipeScrollRef.current = node;
      equipeRef(node);
    },
    [equipeRef]
  );

  const contactUsRefs = useCallback(
    (node) => {
      contactUsScrollRef.current = node;
      contactUsRef(node);
    },
    [contactUsRef]
  );

  const diffusionRefs = useCallback(
    (node) => {
      diffusionScrollRef.current = node;
      diffusionRef(node);
    },
    [diffusionRef]
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
  const isInView = useInView(ref, { once: true });

  const ref2 = useRef(null);
  const isInView2 = useInView(ref2, { once: true });

  const ref3 = useRef(null);
  const isInView3 = useInView(ref3, { once: true });

  const ref4 = useRef(null);
  const isInView4 = useInView(ref4, { once: true });
  return (
    <Wrapper>
      <Sidebar style={{ zIndex: modalOpen ? 0 : 6 }}>
        <SidebarList>
          <small
            onClick={() => handleScollTo(headerScrollRef)}
            style={{
              color: headerIsVisible
                ? "var(--color-black)"
                : "var(--color-grey)",
            }}
          >
            La Revue Mœbius
          </small>
          <br />
          <br />
          <small
            onClick={() => handleScollTo(equipeScrollRef)}
            style={{
              color: equipeIsVisible
                ? "var(--color-black)"
                : "var(--color-grey)",
            }}
          >
            Équipe
          </small>
          <br />
          <br />
          <small
            onClick={() => handleScollTo(contactUsScrollRef)}
            style={{
              color: contactUsIsVisible
                ? "var(--color-black)"
                : "var(--color-grey)",
            }}
          >
            Nous contacter
          </small>
          <br />
          <br />
          <small
            onClick={() => handleScollTo(diffusionScrollRef)}
            style={{
              color: diffusionIsVisible
                ? "var(--color-black)"
                : "var(--color-grey)",
            }}
          >
            Diffusion et distribution
          </small>
        </SidebarList>
      </Sidebar>
      <MainContent>
        <Landing style={{ zIndex: modalOpen ? 0 : 6 }}>
          <LandingText ref={ref}>
            <h1 ref={headerRefs} role="heading">
              <SplitText
                string="La revue Mœbius;"
                variantParent={textAnim}
                variantParentMobile={textAnimSlow}
                variantChild={textChild}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              />
            </h1>
            <h1 ref={headerRefs} role="heading">
              <SplitText
                string="présentation et historique"
                variantParent={textAnim}
                variantParentMobile={textAnimSlowDelayed}
                variantChild={textChild}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              />
            </h1>
            <LandingParagraph>
              <motion.p
                ref={ref2}
                variants={textAnim}
                initial="hidden"
                animate={isInView2 ? "visible" : "hidden"}
                role="heading"
              >
                <motion.span aria-hidden="true" variants={textChild}>
                  Mœbius est une revue littéraire québécoise fondée en 1977 par
                  Pierre DesRuisseaux, Raymond Martin et Guy Melançon. Elle a
                  été dirigée par Robert Giroux pendant trente-cinq ans. La
                  revue paraît quatre fois par année.
                  <br />
                  <br />
                  Valorisant la perméabilité des tons et des genres littéraires,
                  Mœbius publie des textes en prose et en vers, ainsi que des
                  textes navigant entre l’essai et la critique littéraire, dans
                  un esprit d’hybridation et de mise en scène de la
                  subjectivité. Mœbius réunit des textes d’écrivain·e·s
                  accompli·e·s à ceux d’auteur·e·s moins connu·e·s.
                  <br />
                  <br />
                </motion.span>
              </motion.p>
              <motion.p
                ref={ref2}
                variants={textAnim}
                initial="hidden"
                animate={isInView2 ? "visible" : "hidden"}
                role="heading"
              >
                <motion.span aria-hidden="true" variants={textChild}>
                  Avec le cent cinquante-deuxième numéro qui paraît en février
                  2017, et à l’occasion de la formation d’une toute nouvelle
                  équipe et d’un changement de direction, l’identité visuelle et
                  les thèmes de Mœbius sont réinventés.
                  <br />
                  <br />
                  Les couvertures sont désormais signées par un·e artiste en
                  résidence pour l’année. Quant aux thèmes, ils sont maintenant
                  présentés sous la forme d’une citation tirée d’une œuvre
                  littéraire.
                </motion.span>
              </motion.p>
            </LandingParagraph>
          </LandingText>
        </Landing>
        <TeamWrapper ref={equipeRefs}>
          {equipeData.map((teamCategory, categoryIdx) => {
            return (
              <div
                key={teamCategory._id}
                onMouseEnter={() => setActiveCategory(categoryIdx)}
              >
                <small
                  key={teamCategory._id}
                  className="small-title"
                  onClick={() => setOpen(!open)}
                >
                  {teamCategory.category}
                </small>
                {teamCategory.membres.map((member, index) => {
                  return (
                    <TeamMember
                      setActiveIndex={setActiveIndex}
                      setModalOpen={setModalOpen}
                      modalOpen={modalOpen}
                      member={member}
                      index={index}
                      key={member._key}
                    />
                  );
                })}
              </div>
            );
          })}
          <CursorMedia>
            {equipeData[activeCategory]?.membres.map((image, index) => {
              const isActive = index === activeIndex;
              const xPos = isActive ? x : 0;
              const yPos = isActive ? y : 0;

              return (
                <HoverImage
                  key={image._key + "key"}
                  data={image}
                  active={isActive}
                  x={xPos}
                  y={yPos}
                />
              );
            })}
          </CursorMedia>
        </TeamWrapper>
        <ContactUsWrapper>
          <ContactUsInner ref={ref3}>
            <h2 ref={contactUsRefs}>
              <SplitText
                string="Contactez-nous"
                variantParent={textAnim}
                variantParentMobile={textAnimSlow}
                variantChild={textChild}
                initial="hidden"
                animate={isInView3 ? "visible" : "hidden"}
              />
            </h2>

            <ContactFlex style={{ zIndex: modalOpen ? 0 : 6 }}>
              <small>
                1463 Boulevard Saint-Joseph Est <br /> Montréal (Québec)
                <br /> H2J 1M6 <br /> Canada
                <br />
                <br />
                <a href={`${footerLogos[0].mediaKitPDF}?dl=`}>
                  Téléchargez le kit média
                </a>
              </small>
              <div>
                <small>Direction générale</small>
                <h4>
                  <a href="mailto:revuemoebius@gmail.com">
                    revuemoebius@gmail.com
                  </a>
                </h4>
                <small>Rédaction et soumission de textes</small>
                <h4>
                  <a href="mailto:redactionmoebius@gmail.com">
                    redactionmoebius@gmail.com
                  </a>
                </h4>
                <small>Abonnements</small>
                <h4>
                  <a href="mailto:abonnementmoebius@gmail.com">
                    abonnementmoebius@gmail.com
                  </a>
                </h4>
              </div>
            </ContactFlex>
          </ContactUsInner>
        </ContactUsWrapper>
        <Distribution ref={diffusionRefs} style={{ zIndex: modalOpen ? 0 : 6 }}>
          <h2 ref={ref4}>
            <SplitText
              string=" Diffusion et distribution"
              variantParent={textAnim}
              variantParentMobile={textAnimSlow}
              variantChild={textChild}
              initial="hidden"
              animate={isInView4 ? "visible" : "hidden"}
            />
            {/* Diffusion <br />
            et distribution */}
          </h2>
          <p>
            Mœbius est subventionnée par le Conseil des arts du Canada, le
            Conseil des arts et des lettres du Québec et le Conseil des arts de
            Montréal. La revue est membre de la Société de développement des
            périodiques culturels québécois (SODEP) et de la Fédération
            québécoise du loisir littéraire (FQLL).
            <br />
            <br />
            Mœbius est diffusée au Canada par la SODEP et diffusée au format
            papier par Dimédia. La revue est diffusée en France et en Belgique
            par DNM (Distribution du Nouveau Monde). Elle est distribuée au
            format numérique par la SODEP (sodep.qc.ca) et ANEL-De Marque
            (vitrine.entrepotnumerique.com).
            <br />
            <br />
            Les archives de la revue sont disponibles sur Érudit (erudit.org).
          </p>
        </Distribution>
      </MainContent>
    </Wrapper>
  );
};

export default APropos;

export async function getStaticProps() {
  const footerLogos = await client.fetch(footerLogoQuery);
  const equipeData = await client.fetch(equipeQuery);
  return {
    props: {
      equipeData,
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
  /* z-index: 6; */
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
    border: none;
    width: 100%;
  }
`;

const Landing = styled.header`
  position: relative;
  margin-bottom: 2rem;
  background: var(--color-clay);
  @media (max-width: ${breakpoints.m}px) {
    margin-bottom: 0rem;
  }
`;

const LandingText = styled.div`
  position: relative;
  padding-bottom: 5rem;
  h1,
  p {
    color: var(--static-cream);
  }
  h1 {
    padding-top: 10rem;
    padding-left: 9%;
    scroll-margin: 120px;
    line-height: 100%;
    width: 75%;
    margin-bottom: 2rem;
  }
  h1:nth-of-type(2) {
    padding-top: 0;
    margin-left: 5%;
    white-space: nowrap;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    h1 {
      font-size: 6.5vw;
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    h1 {
      font-size: 6vw;
      padding-left: 5%;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    h1 {
      font-size: 7.5vw;
      padding-left: 0;
      width: 80%;
      margin: 0 auto;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    h1 {
      width: 90%;
      font-size: 50px;
      line-height: 115%;

      :nth-of-type(2) {
        margin: 0 auto;
        white-space: normal;
      }
    }
  }
`;

const LandingParagraph = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 80%;
  margin: 5rem auto;
  column-gap: 5rem;
  @media (max-width: ${breakpoints.l}px) {
    margin: 2rem auto;
    display: block;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 90%;
  }
`;

const TeamWrapper = styled.div`
  width: 85%;
  margin: 0 auto;
  padding: 2rem 0;
  position: relative;
  z-index: 5;
  .small-title {
    position: relative;
    z-index: 2;
    padding: 2rem 0;
    margin-top: 5rem;
    display: block;
    color: var(--color-black);
    border-bottom: 1px solid var(--color-black);
  }
  #team-item {
    position: relative;
    z-index: 2;
  }
  @media (max-width: ${breakpoints.m}px) {
    .small-title {
      margin-top: 3rem;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    .small-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

const CursorMedia = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: var(--transition);
  .hover-media {
    z-index: 2;
    opacity: 0;
    position: absolute;
    width: auto;
    height: auto;
    max-height: 50%;
    max-width: 60%;
    object-fit: contain;
    pointer-events: none;
  }
  .is-active {
    opacity: 1;
  }
  @media (max-width: ${breakpoints.m}px) {
    display: none;
  }
`;

const ContactUsWrapper = styled.div`
  background: var(--color-blue);
  margin-top: 10rem;
  padding: 10rem 0;
  padding-bottom: 5rem;
  @media (max-width: ${breakpoints.m}px) {
    padding: 5rem 0;
  }
`;

const ContactUsInner = styled.div`
  width: 85%;
  margin: 0 auto;
  h2 {
    scroll-margin: 120px;
    font-family: "Editorial-Italic";
    color: var(--static-black);
  }
`;

const ContactFlex = styled.div`
  position: relative;
  width: 85%;
  margin: 4rem 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  small,
  h4,
  a {
    color: var(--static-black);
  }
  h4 > a {
    display: block;
    margin-bottom: 3rem;
    text-decoration: none;
  }
  h4 {
    :hover {
      a {
        text-decoration: underline;
      }
    }
  }
  @media (max-width: ${breakpoints.xxl}px) {
    width: 95%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    width: 100%;
    flex-direction: column-reverse;
  }

  @media (max-width: ${breakpoints.s}px) {
    h4 {
      font-size: 25px;
    }
  }
`;

const Distribution = styled.div`
  position: relative;
  width: 85%;
  margin: 2rem auto;
  padding: 3rem 0;
  border-top: 1px solid var(--color-black);
  border-bottom: 1px solid var(--color-black);

  h2,
  p {
    color: var(--color-black);
  }

  h2 {
    max-width: 60%;
    font-family: "Editorial-Italic";
    color: var(--color-black);
  }

  p {
    margin: 2rem 0;
    margin-left: 40%;
  }
  @media (max-width: ${breakpoints.xxl}px) {
    p {
      margin-left: 20%;
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    h2 {
      max-width: 60%;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    h2 {
      max-width: 55%;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    h2 {
      max-width: 50%;
    }
    p {
      margin-left: 0;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    h2 {
      max-width: 60%;
    }
  }
`;
