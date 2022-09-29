import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { breakpoints } from "../../utils/breakpoints";
import SplitText from "../../utils/splitText";
import { textAnim, textAnimSlow, textChild } from "../../styles/animations";
import { motion } from 'framer-motion'

const Landing = ({ data }) => {
  return (
    <LandingSection>
      <ImageWrapper
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // transition={{ duration: 2, delay: 0.25, ease: [0.85, 0, 0.15, 1] }}
      >
        <MainImage className="mainImg">
          {data[0].image && (
            <Link scroll={false} href={`/numeros/${data[0].slug}`}>
              <Image
                priority
                src={data[0].image}
                alt={data[0].title}
                placeholder="blur"
                blurDataURL={data[0].lqip}
                layout="intrinsic"
                width={519}
                height={733}
                quality={90}
              />
            </Link>
          )}
        </MainImage>
        <SupportingImage className="supportingImg">
          {data[1].image && (
            <Image
              priority
              src={data[1].image}
              alt={data[1].title}
              placeholder="blur"
              blurDataURL={data[1].lqip}
              layout="intrinsic"
              width={320}
              height={453}
              quality={70}
            />
          )}
        </SupportingImage>
      </ImageWrapper>
      <TextWrapper>
        <motion.small variants={textChild}>
          Mœbius n°{data[0].number}
        </motion.small>
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
        <InternalLink>
          <Link scroll={false} href={`/numeros/${data[0].slug}`}>
            <small>En savoir plus</small>
          </Link>
        </InternalLink>
      </TextWrapper>
    </LandingSection>
  );
};

export default Landing;

const LandingSection = styled.section`
  /* min-height: 100vh; */
  width: 90%;
  margin: 0rem auto;
  padding-top: 140px;
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-evenly;

  @media (max-width: ${breakpoints.xl}px) {
    min-height: 80vh;
    height: auto;
  }
  @media (max-width: ${breakpoints.m}px) {
    padding-top: 0;
    margin-bottom: 0;
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
  perspective: 2500px;
  .mainImg {
    z-index: 2;
  }
  .supportingImg {
    z-index: 1;
  }
  :hover {
    .mainImg {
      transform: rotateY(0deg) translateY(-1%);
      cursor: pointer;
      filter: var(--drop-shadow);
    }
    .supportingImg {
      transform: translate(10%, -50%) rotateY(15deg) rotateX(10deg);
      filter: brightness(0.77) blur(2px);
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    width: 80%;
    margin: 3rem 0;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 100%;
    margin: 2rem 0;
    perspective: none;
    :hover {
      .supportingImg {
        transform: translate(15%, -50%) rotateY(5deg);
        filter: brightness(0.8) blur(1px);
      }
    }
  }
`;

const MainImage = styled.div`
  // 70% of parent image wrapper width
  width: 70%;
  position: relative;
  z-index: 3;
  transform: rotateY(10deg) rotateX(4deg);
  filter: var(--drop-shadow-light);
  transition: var(--transition-image);

  @media (max-width: ${breakpoints.s}px) {
    transform: rotateY(0deg) rotateX(0deg);
  }
`;

const SupportingImage = styled.div`
  position: absolute;
  width: 45%;
  top: 50%;
  left: 0%;
  transform: translate(5%, -50%) rotateY(5deg);
  opacity: 0.5;
  filter: brightness(0.8) blur(1px);
  transition: var(--transition-image);

  @media (max-width: ${breakpoints.s}px) {
    filter: brightness(0.8) blur(1px);
    transform: translate(15%, -50%) rotateY(5deg);
  }
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
  color: var(--color-black);
  background: var(--color-turquoise);
  transition: var(--transition);

  cursor: pointer;

  small {
    transition: var(--transition);
    display: inline-block;
    padding: 1.25rem 4.5rem;

    margin: 0;
    color: var(--static-black);
  }

  :hover {
    small {
      color: var(--static-black);
    }
    filter: brightness(0.9);
  }
  @media (max-width: ${breakpoints.xl}px) {
    small {
      padding: 1rem 3rem;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    small {
      padding: 0.75rem 3rem;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    background: var(--color-turquoise);
    small {
      color: var(--static-black);
    }
    border: 1px solid transparent;
  }
`;
