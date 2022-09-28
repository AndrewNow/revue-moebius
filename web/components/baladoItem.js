import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { breakpoints } from "../utils/breakpoints";
import { motion } from "framer-motion";
import { gridChild } from "../styles/animations";
import ConvertDateToString from "../utils/convertDateToString";

const BaladoItem = ({ balado }) => {
  // If balado has one number, set a title with one number.
  // If balado has two numbers, set a title with both numbers.
  // If balado has no numbers and only a title, set a title w/ that title.
  let baladoTitle;
  if (balado?.secondNumber && balado?.number) {
    baladoTitle = `Mœbius-balado n°${balado?.number} & ${balado?.secondNumber}`;
  } else if (balado?.number && !balado?.secondNumber) {
    baladoTitle = `Mœbius-balado n°${balado?.number}`;
  } else if (!balado?.number && !balado?.secondNumber && balado?.title) {
    baladoTitle = balado?.title;
  }

  return (
    <Item key={balado._id} variants={gridChild}>
      <ImageWrapper style={{ background: balado.color }}>
        {balado.imageUrl && (
          <Image
            src={balado.imageUrl}
            alt={`Image couverture pour Moebius-Balado ${balado.number}`}
            height={500}
            width={500}
            quality={90}
            placeholder="blur"
            blurDataURL={balado.lqip}
            // layout="fill"
            objectFit="cover"
          />
        )}
      </ImageWrapper>
      <small>
        <ConvertDateToString data={balado?.publishedAt} />
      </small>
      <h4>
        {baladoTitle}
        <br />
      </h4>
      <EpisodeLink>
        <Link scroll={false} href={`balado/${balado.slug}`}>
          <small>Écouter l'épisode</small>
        </Link>
      </EpisodeLink>
    </Item>
  );
};

export default BaladoItem;


const Item = styled(motion.div)`
  margin-top: 2rem;
  text-align: center;
  max-width: 500px;
  small,
  h4 {
    display: block;
  }
  small {
    margin: 2rem auto;
    color: var(--color-grey);
    margin-bottom: 0.5rem;
  }
  h4 {
    color: var(--color-black);
    margin: 0 auto;
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-top: 0;
    width: 90%;
    small {
      margin-bottom: .5rem;
    }
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  position: relative;
  display: grid;
  place-items: center;
`;

const EpisodeLink = styled.div`
  margin: 1rem auto;
  margin-bottom: 1.5rem;
  display: inline-block;
  border-radius: 10px;
  cursor: pointer;
  transition: var(--transition);
  background: var(--color-turquoise);
  small {
    transition: var(--transition);
    display: inline-block;
    padding: 1rem 4rem;
    margin: 0;
    color: var(--color-black);
  }
  :hover {
    background: var(--color-turquoise);
    filter: brightness(0.9);
    small {
      color: var(--static-black);
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    background: var(--color-turquoise);
    border: 1px solid transparent;
    small {
      color: var(--static-black);
    }
  }
`;
