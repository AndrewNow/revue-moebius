import styled from "styled-components";
import { ArrowDown, ArrowUp } from "../../svg/icons";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { breakpoints } from "../../utils/breakpoints";
import Link from "next/link";

const ResidencesSection = ({ data }) => {
  // only run the marquee when in view
  const { ref, inView } = useInView({
    root: null,
    threshold: 0.1,
  });

  return (
    <Wrapper ref={ref}>
      <Banner>
        <Marquee gradientWidth={0} speed={15}>
          <ArrowText>
            <h5>Artistes en résidence</h5> <ArrowDown />
          </ArrowText>
          <ArrowText>
            <h5>Artistes en résidence</h5> <ArrowDown />
          </ArrowText>
          <ArrowText>
            <h5>Artistes en résidence</h5> <ArrowDown />
          </ArrowText>
          <ArrowText>
            <h5>Artistes en résidence</h5> <ArrowDown />
          </ArrowText>
          <ArrowText>
            <h5>Artistes en résidence</h5> <ArrowDown />
          </ArrowText>
        </Marquee>
      </Banner>
      <InnerSection>
        {data.residencesData.map((individual, idx) => {
          // Change speed depending on if an item's ID is odd or even
          const MARQUEE_SPEED = idx % 2 == 0 ? 55 : 75;

          return (
            <Marquee
              gradientWidth={0}
              play={inView ? true : false}
              speed={MARQUEE_SPEED}
              direction="reverse"
              key={individual._key}
            >
              <ResidencyItem>
                <ResidencyImage>
                  <Image
                    src={individual.imageUrl}
                    placeholder="blur"
                    blurDataURL={individual.lqip}
                    layout="intrinsic"
                    height={"100%"}
                    width={"100%"}
                    objectFit="contain"
                    quality={50}
                    alt={`Image portrait pour ${individual.title}`}
                  />
                </ResidencyImage>
                <Link href="/residences" scroll={false}>
                  <h2>{individual.title}</h2>
                </Link>
                <Link href="/residences" scroll={false}>
                  <h4>({individual.type})</h4>
                </Link>
              </ResidencyItem>
              <ResidencyItem>
                <ResidencyImage>
                  <Image
                    src={individual.imageUrl}
                    placeholder="blur"
                    blurDataURL={individual.lqip}
                    layout="intrinsic"
                    height={"100%"}
                    width={"100%"}
                    objectFit="contain"
                    quality={50}
                    alt={`Image portrait pour ${individual.title}`}
                  />
                </ResidencyImage>
                <Link href="/residences" scroll={false}>
                  <h2>{individual.title}</h2>
                </Link>
                <Link href="/residences" scroll={false}>
                  <h4>({individual.type})</h4>
                </Link>
              </ResidencyItem>
              <ResidencyItem>
                <ResidencyImage>
                  <Image
                    src={individual.imageUrl}
                    placeholder="blur"
                    blurDataURL={individual.lqip}
                    layout="intrinsic"
                    height={"100%"}
                    width={"100%"}
                    objectFit="contain"
                    quality={50}
                    alt={`Image portrait pour ${individual.title}`}
                  />
                </ResidencyImage>
                <Link href="/residences" scroll={false}>
                  <h2>{individual.title}</h2>
                </Link>
                <Link href="/residences" scroll={false}>
                  <h4>({individual.type})</h4>
                </Link>
              </ResidencyItem>
            </Marquee>
          );
        })}
      </InnerSection>
      <Banner>
        <Marquee
          gradientWidth={0}
          speed={15}
          direction="right"
          pauseOnHover={true}
        >
          <ArrowText>
            <h5>Artistes en résidence</h5> <ArrowUp />
          </ArrowText>
          <ArrowText>
            <h5>Artistes en résidence</h5> <ArrowUp />
          </ArrowText>
          <ArrowText>
            <h5>Artistes en résidence</h5> <ArrowUp />
          </ArrowText>
          <ArrowText>
            <h5>Artistes en résidence</h5> <ArrowUp />
          </ArrowText>
          <ArrowText>
            <h5>Artistes en résidence</h5> <ArrowUp />
          </ArrowText>
        </Marquee>
      </Banner>
    </Wrapper>
  );
};

export default ResidencesSection;

const Wrapper = styled.section`
  width: 100%;
  position: relative;
  margin: 15rem 0;

  @media (max-width: ${breakpoints.xl}px) {
    margin: 12.5rem 0;
  }

  @media (max-width: ${breakpoints.m}px) {
    margin: 7rem 0;
  }
`;

const Banner = styled.div`
  padding: 3rem 0;
  border-top: 1px solid var(--static-black);
  border-bottom: 1px solid var(--static-black);
  background: #fbfbef;

  h5 {
    color: var(--static-black);
    text-transform: uppercase;
  }
  @media (max-width: ${breakpoints.l}px) {
    padding: 2.5rem 0;
  }
  
  @media (max-width: ${breakpoints.s}px) {
    padding: 2rem 0;
  }
`;

const ArrowText = styled.div`
  user-select: none;
  display: flex;
  align-items: center;
  margin-left: 2rem;
  svg {
    margin-left: 2rem;
  }
  @media (max-width: ${breakpoints.l}px) {
    margin-left: 1.5rem;
    svg {
      margin-left: 1.5rem;
      scale: 0.75;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-left: 1rem;
    svg {
      margin-left: 1rem;
      scale: 0.5;
    }
  }
`;

const InnerSection = styled.section`
  div {
    transition: 0.25s all ease-in-out;
  }

  :hover {
    div {
      color: var(--color-purple);
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    margin: 1rem 0;
  }
`;

const ResidencyItem = styled.div`
  user-select: none;
  cursor: pointer;
  margin: 2rem 0;
  display: flex;
  align-items: center;
  position: relative;
  h2 {
    font-family: "Editorial-Italic";
    margin-right: 1.5rem;
  }
  @media (max-width: ${breakpoints.xl}px) {
    margin: 1rem 0;
    h2 {
      font-size: 60px;
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    margin: 0;
  }

  @media (max-width: ${breakpoints.s}px) {
    margin: 1rem 0;
    max-height: 100px;
    margin-left: 2rem;
    align-items: baseline;
    h4 {
      font-size: 20px;
    }
    h2 {
      margin-right: 0.5rem;
      font-size: 45px;
    }
  }
`;

const ResidencyImage = styled.div`
  position: relative;
  display: block;
  height: 100px;
  max-width: 200px;
  margin: 0 2rem;

  @media (max-width: ${breakpoints.m}px) {
    margin: 1rem 2rem;
  }

  @media (max-width: ${breakpoints.s}px) {
    display: none;
  }
`;
