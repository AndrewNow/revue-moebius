import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { breakpoints } from "../utils/breakpoints";

const NumeroItem = ({ numero }) => {
  return (
    <GridItem>
      <ItemImage>
        {numero.image && (
          <Link scroll={false} href={`/numeros/${numero.slug}`}>
            <Image
              src={numero.image}
              alt={`Image couveture pour ${numero.title}`}
              layout="fill"
              className="imageHover"
              placeholder="blur"
              blurDataURL={numero.lqip}
            />
          </Link>
        )}
      </ItemImage>
      <ItemText>
        {numero.number && (
          <small>
            n°{numero.number}
            {numero?.secondaryNumber && `-${numero?.secondaryNumber}`}
          </small>
        )}
        <h5>
          <Link scroll={false} href={`/numeros/${numero.slug}`}>
            {numero.title}
          </Link>
        </h5>
      </ItemText>
    </GridItem>
  );
};

export default NumeroItem;

const GridItem = styled.div`
  width: 27.5vw;
  position: relative;
  margin: 2rem 0;

  @media (max-width: ${breakpoints.l}px) {
    width: 40vw;
    margin: 2rem 0;
    margin-bottom: 0;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 95%;
    margin: 2rem auto;
  }
`;

const ItemText = styled.div`
  text-align: center;
  margin: 2rem 0;
  h5 {
    color: var(--color-black);
    display: block;
    position: relative;
  }

  small {
    color: var(--color-grey);
  }

  a {
    text-decoration: none;
  }

  :hover {
    a {
      text-decoration: underline;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    margin: 1rem 0;
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-bottom: 4rem;
    h5 {
      font-size: 20px;
    }
  }
`;

const ItemImage = styled.div`
  aspect-ratio: 512/732;
  display: block;
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
  cursor: pointer;

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
`;
