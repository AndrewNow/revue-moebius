import { useState, useEffect } from "react";
import styled from "styled-components";
import { client } from "../lib/sanity/client";
import { footerLogoQuery } from "../lib/sanity/footerLogoQuery";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useRef, useCallback } from "react";
import { equipeQuery } from "../lib/sanity/equipeQuery";
import HoverImage from "../components/imageOnHover/hoverImage";
import TeamMember from "../components/imageOnHover/aPropos/teamMember";

const useMousePosition = () => {
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

const APropos = ({ equipeData }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const { x, y } = useMousePosition();

  const options = {
    root: null,
    threshold: 0.2,
    triggerOnce: false,
  };

  const [headerRef, headerIsVisible] = useInView(options);
  const [equipeRef, equipeIsVisible] = useInView(options);
  const [diffusionRef, diffusionIsVisible] = useInView(options);
  const [contactUsRef, contactUsIsVisible] = useInView(options);

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
        <Landing>
          <LandingText>
            <h1 ref={headerRefs}>La revue Mœbius;</h1>
            <h1>Présentation et historique</h1>
            <LandingParagraph>
              <p>
                Mœbius est une revue littéraire québécoise fondée en 1977 par
                Pierre DesRuisseaux, Raymond Martin et Guy Melançon. Elle a été
                dirigée par Robert Giroux pendant trente-cinq ans. La revue
                paraît quatre fois par année.
                <br />
                <br />
                Valorisant la perméabilité des tons et des genres littéraires,
                Mœbius publie des textes en prose et en vers, ainsi que des
                textes navigant entre l’essai et la critique littéraire, dans un
                esprit d’hybridation et de mise en scène de la subjectivité.
                Mœbius réunit des textes d’écrivain·e·s accompli·e·s à ceux
                d’auteur·e·s moins connu·e·s.
              </p>
              <p>
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
              </p>
            </LandingParagraph>
          </LandingText>
        </Landing>
        <TeamWrapper ref={equipeRefs}>
          {equipeData.map((teamCategory, i) => {
            return (
              <div key={teamCategory._id}>
                <small key={teamCategory._id} className="small-title">
                  {teamCategory.category}
                </small>
                {teamCategory.membres.map((member, index) => {
                  return (
                    <TeamMember
                      setActiveIndex={setActiveIndex}
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
            {equipeData.map((category) => {
              return category.membres.map((image, index) => {
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
              });
            })}
          </CursorMedia>
        </TeamWrapper>
        <ContactUsWrapper>
          <ContactUsInner>
            <h2 ref={contactUsRefs}>Contactez-nous</h2>

            <ContactFlex>
              <small>
                1463 Boulevard Saint-Joseph Est <br /> Montréal (Québec)
                <br /> H2J 1M6 <br /> Canada
                <br />
                <br />
                Télécharger le kit média
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
        <Distribution ref={diffusionRefs}>
          <h2>Diffusion et distribution</h2>
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
  z-index: 6;
  top: 10vh;
  height: 300px;
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
`;

const MainContent = styled.div`
  width: 80%;
  border-left: 1px solid var(--color-black);
`;

const Landing = styled.header`
  height: 140vh;
  position: relative;
  z-index: 5;
  margin-bottom: 2rem;
  background: var(--color-clay);
`;

const LandingText = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 4rem;
  h1,
  p {
    color: var(--static-cream);
  }
  h1 {
    scroll-margin: 120px;
    line-height: 100%;
    width: 75%;
    margin-bottom: 2rem;
  }
  h1:nth-of-type(2) {
    margin-left: 5rem;
    white-space: nowrap;
  }
`;

const LandingParagraph = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 80%;
  margin: 5rem auto;
  column-gap: 5rem;
`;

const TeamWrapper = styled.div`
  width: 85%;
  margin: 0 auto;
  padding: 2rem 0;
  position: relative;
  z-index: 1;
  .small-title {
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
`;

const ContactUsWrapper = styled.div`
  background: var(--color-blue);
  margin-top: 10rem;
  padding: 10rem 0;
  padding-bottom: 5rem;
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
  z-index: 5;
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
`;

const Distribution = styled.div`
  position: relative;
  z-index: 5;
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
    font-family: "Editorial-Italic";
    color: var(--color-black);
    width: 50%;
  }

  p {
    margin: 2rem 0;
    margin-left: 40%;
  }
`;
