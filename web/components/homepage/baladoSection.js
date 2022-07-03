import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { breakpoints } from "../../utils/breakpoints";

const BaladoSection = ({ baladoData }) => {
  return (
    <>
      <Wrapper>
        <Image
          src={baladoData.imageUrl}
          width={600}
          height={600}
          quality={90}
        />
        <Text>
          <h1>Mœbius balado</h1>
          <p>
            Découvrez le balado qui accompagne la publication de chacun de nos
            numéros.
          </p>
          <EpisodeLink>
            <Link href={`/balado`}>
              <small>En savoir plus</small>
            </Link>
          </EpisodeLink>
        </Text>
      </Wrapper>
      <Banner>
        <p>Écoutez le dernier épisode sur:</p> <br />
        <a href={baladoData.embed} target="_blank" rel="noreferrer">
          <h5> Spotify</h5>
        </a>
      </Banner>
    </>
  );
};

export default BaladoSection;

const Wrapper = styled.div`
  margin: 10rem auto;
  width: 90%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: ${breakpoints.l}px) {
    width: 60%;
    margin: 5rem auto;
    flex-direction: column;
    margin-bottom: 3rem;
  }

  @media (max-width: ${breakpoints.m}px) {
    width: 75%;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 90%;
  }
`;

const Text = styled.div`
  text-align: center;
  margin: 0 1rem;
  h1,
  p {
    color: var(--color-black);
  }
  p {
    width: 70%;
    margin: 0 auto;
    padding-bottom: 2rem;
  }

  @media (max-width: ${breakpoints.l}px) {
    margin-top: 3rem;
    p {
      width: 100%;
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    p {
      width: 90%;
      padding-bottom: 1rem;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-top: 2rem;
  }
`;

const EpisodeLink = styled.div`
  margin: 1rem auto;
  border: 1px solid var(--color-black);
  display: inline-block;
  border-radius: 10px;
  cursor: pointer;
  transition: var(--transition);
  small {
    transition: var(--transition);
    display: inline-block;
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

  @media (max-width: ${breakpoints.s}px) {
    small {
      padding: 0.75rem 3.5rem;
      color: var(--static-black);
    }
    background: var(--color-turquoise);
    border: 1px solid transparent;
  }
`;

const Banner = styled.div`
  background: var(--color-turquoise);
  width: 100%;
  height: 55px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  color: var(--static-black);

  a {
    cursor: pointer;
    margin: 0 1rem;
    text-decoration: none;
    color: var(--static-black);

    :hover {
      text-decoration: underline;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    a {
      text-decoration: underline;
    }
  }
`;
