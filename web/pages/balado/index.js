import styled from "styled-components";
import { client } from "../../lib/sanity/client";
import { footerLogoQuery } from "../../lib/sanity/footerLogoQuery";
import { baladoListQuery } from "../../lib/sanity/baladoQuery";
import { Inner } from "../index";
import Image from "next/image";
import Link from "next/link";

export default function Balado({ baladoData }) {
  return (
    <Main>
      <Inner>
        <Header>
          <h4>Mœbius-balado</h4>
          <p>
            Afin de poursuivre la mission de Mœbius de favoriser la réflexion
            sur la création littéraire, Mœbius-balado accompagnera chacune des
            parutions de la revue. Mœbius-balado est maintenant disponible sur
            plusieurs plateformes ! Écoutez-le aussi sur Spotify, Anchor et plus
            encore. Merci à Littérature québécoise mobile qui rend possible ce
            projet. Bonne écoute!
          </p>
        </Header>
        <Grid>
          {baladoData.map((balado) => {
            return (
              <Item>
                <ImageWrapper>
                  <Image
                    src={balado.imageUrl}
                    alt={`Image couverture pour Moebius-Balado ${balado.number}`}
                    height={500}
                    width={500}
                    layout="fill"
                    quality={90}
                  />
                </ImageWrapper>
                <small>{balado.publishedAt}</small>
                <h4>
                  Mœbius n°{balado.number} <br />
                  {balado.title}
                </h4>
                <EpisodeLink>
                  <Link href={`balado/${balado.slug}`}>
                    <small>Écouter l'épisode</small>
                  </Link>
                </EpisodeLink>
              </Item>
            );
          })}
        </Grid>
      </Inner>
    </Main>
  );
}

export async function getStaticProps() {
  const footerLogos = await client.fetch(footerLogoQuery);
  const baladoData = await client.fetch(baladoListQuery);

  return {
    props: {
      footerLogos,
      baladoData,
    },
    revalidate: 10,
  };
}

const Header = styled.header`
  padding: 5rem 0;
  border-bottom: 1px solid var(--color-black);

  h4,
  p {
    text-align: center;
    margin: 0 auto;
    width: 60%;
    color: var(--color-black);
  }
  h4 {
    margin: 2rem auto;
  }
`;

const Main = styled.div`
  background-color: var(--color-cream);
  transition: var(--transition);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2rem;
  padding: 5rem 0;
`;

const Item = styled.article`
  text-align: center;
  max-width: 500px;
  small,
  h4 {
    display: block;
  }
  small {
    margin: 2rem auto;
    color: var(--color-grey);
  }
  h4 {
    color: var(--color-black);
    margin: 1rem auto;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  display: block;
  position: relative;
`;

const EpisodeLink = styled.div`
  margin: 1rem auto;
  border: 1px solid var(--color-black);
  display: inline-block;
  border-radius: 10px;
  cursor: pointer;
  transition: var(--transition);
  
  small {
    padding: 1rem 4rem;
    margin: 0;
    color: var(--color-black);
  }
  :hover {
    background: var(--color-turquoise);
    border: 1px solid transparent;
    small {
      color: var(--static-black);
    }
  }
`;
