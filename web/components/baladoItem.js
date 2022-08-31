import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { breakpoints } from "../utils/breakpoints";
import { motion } from "framer-motion";
import { gridChild } from "../styles/animations";
import ConvertDateToString from "../utils/convertDateToString";

const BaladoItem = ({ balado }) => {
  return (
    <Item key={balado._id} variants={gridChild}>
      <ImageWrapper style={{ background: balado.color }}>
        <ColorWrapper>
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
            />
          )}
        </ColorWrapper>
      </ImageWrapper>
      <small>
        <ConvertDateToString data={balado?.publishedAt} />
      </small>
      <h4>
        Mœbius n°{balado.number} <br />
        {balado.title}
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

const ColorWrapper = styled.div`
  width: 90%;
  height: 90%;
`;

const Item = styled(motion.div)`
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
  @media (max-width: ${breakpoints.s}px) {
    width: 90%;
    small {
      margin-bottom: 0;
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

  @media (max-width: ${breakpoints.m}px) {
    background: var(--color-turquoise);
    border: 1px solid transparent;
    small {
      color: var(--static-black);
    }
  }
`;
