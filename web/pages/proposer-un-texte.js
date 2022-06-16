import styled from "styled-components";
import { client } from "../lib/sanity/client";
import { footerLogoQuery } from "../lib/sanity/footerLogoQuery";

const ProposerUnTexte = () => {
  return (
    <Wrapper>
      <Sidebar></Sidebar>
      <MainContent>
        <Landing>
          <LandingText>
            <h1>Current call for submissions</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </LandingText>
        </Landing>
        <Protocols>
          <ProtocolImage></ProtocolImage>
          <ProtocolText>
            <h3>Protocole de soumission</h3>
            <p>
              La longueur des textes en prose ne doit pas dépasser 3,000 mots.
              La longueur des textes en vers ne doit pas dépasser 7 pages. Les
              textes doivent être soumis en format .doc, par courriel, à
              l’adresse{" "}
              <a href="mailto:redactionmoebius@gmail.com">
                redactionmoebius@gmail.com.
              </a>
              <br />
              <br />
              Le courriel doit inclure les coordonnées complètes de l’auteurice
              (adresse postale et numéro de téléphone) ainsi que la mention du
              numéro pour lequel la soumission est proposée. Les textes doivent
              être inédits. Une seule soumission par auteurice est acceptée pour
              un même numéro et un maximum de deux textes d’un·e même auteurice
              sont publiés dans la revue par année.
            </p>
            <br />
            <br />
            <h3>Protocole d’édition</h3>
            <p>
              La longueur des textes en prose ne doit pas dépasser 3,000 mots.
              La longueur des textes en vers ne doit pas dépasser 7 pages. Les
              textes doivent être soumis en format .doc, par courriel, à
              l’adresse redactionmoebius@gmail.com. Le courriel doit inclure les
              coordonnées complètes de l’auteurice (adresse postale et numéro de
              téléphone) ainsi que la mention du numéro pour lequel la
              soumission est proposée.
            </p>
          </ProtocolText>
        </Protocols>
        <OtherInfo>
          <small>
            Pour les auteurices qui n’ont pas la résidence canadienne;
            <br />
            <br />
            La Revue Mœbius est subventionnée par le Conseil des arts du Canada, le
            Conseil des arts et des lettres du Québec, et le Conseil des arts de
            Montréal, et sa mission première est de diffuser le travail de
            création littéraire des auteurices du Canada. La Revue souhaite par
            ailleurs entretenir la richesse de ses liens avec la francophonie et
            accepte les soumissions d’auteurs et d’autrices de partout à travers
            le monde. C’est pour nous une fierté d’avoir reçu, et parfois
            publié, des textes de grande qualité en provenance entre autres de
            Belgique, de Haïti, de Suisse, d’Algérie, du Brésil, de France et
            des États-Unis. Toutefois, sur les douze textes retenus pour
            publication dans la section thématique de chaque numéro (en réponse
            à l’appel de texte), deux seulement peuvent provenir d’auteurices
            qui ne sont pas résident·e·s canadien·n·e·s.
          </small>
        </OtherInfo>
      </MainContent>
    </Wrapper>
  );
};

export default ProposerUnTexte;

export async function getStaticProps() {
  const footerLogos = await client.fetch(footerLogoQuery);
  return {
    props: {
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
`;

const MainContent = styled.div`
  width: 80%;
  border-left: 1px solid var(--color-black);
`;

const Landing = styled.header`
  height: 100vh;
  position: relative;
  margin-bottom: 2rem;
`;

const LandingText = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 4rem;
  h1,
  p {
    color: var(--color-black);
  }
  h1 {
    width: 55%;
  }
  p {
    width: 50%;
  }
`;

const Protocols = styled.div`
  padding: 4rem;
  background-color: var(--color-yellow);
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
`;

const ProtocolText = styled.div`
  width: 55%;
  margin: 5rem 0;
  h3,
  p {
    color: var(--static-black);
  }
  h3 {
    font-family: "Surt";
    width: 55%;
    line-height: 100%;
    margin-bottom: 2rem;
  }
  p {
    margin-bottom: 3rem;
  }
`;
const ProtocolImage = styled.div`
  width: 35%;
`;

const OtherInfo = styled.div`
  background-color: var(--color-yellow);
  padding: 4rem;
  border-top: 1px solid var(--static-black);
  small {
    width: 80%;
    margin: 0 auto;
    color: var(--static-black);
  }
`;