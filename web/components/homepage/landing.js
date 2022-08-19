import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { breakpoints } from "../../utils/breakpoints";
import { motion } from "framer-motion";
import SplitText from "../../utils/splitText";
import { textAnim, textAnimSlow, textChild } from "../../styles/animations";

const Landing = ({ data }) => {
  return (
    <LandingSection>
      <ImageWrapper>
        <MainImage>
          {data.image && (
            <Image
              priority
              src={data.image}
              alt={data.title}
              placeholder="blur"
              blurDataURL={data.lqip}
              layout="intrinsic"
              width={519}
              height={733}
              quality={90}
            />
          )}
        </MainImage>
        <SupportingImage>
          {data.image && (
            <Image
              priority
              src={data.image}
              alt={data.title}
              placeholder="blur"
              blurDataURL={data.lqip}
              layout="intrinsic"
              width={519}
              height={733}
              quality={70}
            />
          )}
        </SupportingImage>
      </ImageWrapper>
      <TextWrapper>
        <motion.small variants={textChild}>Mœbius n°{data.number}</motion.small>
        <h1 role="heading">
          <SplitText
            string="Consultez notre dernier numéro"
            variantParent={textAnim}
            variantParentMobile={textAnimSlow}
            variantChild={textChild}
            initial="hidden"
            animate="visible"
          />
        </h1>
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

  @media (max-width: ${breakpoints.xl}px) {
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

const SupportingImage = styled(motion.div)`
  position: absolute;
  width: 45%;
  top: 50%;
  left: 0%;
  transform: translate(0%, -50%);
  opacity: 0.5;
`;

const TextWrapper = styled(motion.div)`
  width: 55%;
  text-align: center;
  align-self: center;
  margin-top: 4rem;
  small {
    color: var(--color-grey);
  }
  h1 {
    color: var(--color-black);
    padding-top: 2rem;
    padding-bottom: 2rem;
    line-height: 110%;
  }

  @media (max-width: ${breakpoints.m}px) {
    margin-top: 10rem;
    margin-bottom: 4rem;
    width: 80%;
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-bottom: 2rem;
    margin-top: 8rem;
    width: 100%;
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
      color: var(--static-black);
    }
    border: 1px solid transparent;
    background: var(--color-turquoise);
  }
  @media (max-width: ${breakpoints.s}px) {
    background: var(--color-turquoise);
    small {
      color: var(--static-black);
    }
    border: 1px solid transparent;
  }
`;
