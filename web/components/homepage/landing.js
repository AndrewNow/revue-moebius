import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { breakpoints } from "../../utils/breakpoints";

const Landing = ({ data }) => {
  return (
    <LandingSection>
      <ImageWrapper>
        <MainImage>
          <Image
            src={data.imageUrl}
            alt={data.title}
            width={519}
            height={733}
            quality={100}
          />
        </MainImage>
        <SupportingImage>
          <Image
            src={data.imageUrl}
            alt={data.title}
            width={519}
            height={733}
            quality={70}
          />
        </SupportingImage>
      </ImageWrapper>
      <TextWrapper>
        <small>Mœbius {data.number}</small>
        <h1>Consultez notre dernier numéro</h1>
        <Link href={`/numeros/${data.slug}`}>
          <InternalLink>
            <small>En savoir plus</small>
          </InternalLink>
        </Link>
      </TextWrapper>
    </LandingSection>
  );
};

export default Landing;

const LandingSection = styled.section`
  height: 100vh;
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;

  @media (max-width: ${breakpoints.l}px) {
    min-height: 80vh;
    height: auto;
  }
  @media (max-width: ${breakpoints.m}px) {
    flex-direction: column-reverse;
    align-items: center;
    min-height: auto;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  /* aspect-ratio: 559/790; */
  /* width: 519px; */
  width: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${breakpoints.m}px) {
    width: 80%;
    margin: 3rem 0;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 100%;
    margin: 2rem 0;
  }
`;

const MainImage = styled.div`
  // 70% of parent image wrapper width
  width: 70%;
  position: relative;
  z-index: 3;
`;

const SupportingImage = styled.div`
  position: absolute;
  width: 45%;
  top: 50%;
  left: 0%;
  transform: translate(0%, -50%);
  opacity: 0.5;
`;

const TextWrapper = styled.div`
  width: 55%;
  text-align: center;
  align-self: center;
  margin-top: 4rem;
  h1,
  small {
    color: var(--color-black);
  }
  h1 {
    margin-top: 2rem;
    margin-bottom: 2rem;
    line-height: 110%;
  }

  @media (max-width: ${breakpoints.m}px) {
    margin-top: 10rem;
    margin-bottom: 4rem;
    width: 80%;
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-bottom: 2rem;
  }
`;

const InternalLink = styled.div`
  display: inline-block;
  border-radius: 10px;
  padding: 0.75rem 4rem;
  border: 1px solid var(--color-black);
  color: var(--color-black);
  background: var(--color-white);
  transition: var(--transition);

  cursor: pointer;
  small {
    transition: var(--transition);
  }

  :hover {
    small {
      color: var(--static-black) !important;
    }
    border: 1px solid transparent;
    background: var(--color-turquoise);
  }
  @media (max-width: ${breakpoints.s}px) {
    background: var(--color-turquoise);
    color: var(--static-black);
    border: 1px solid transparent;
  }
`;
