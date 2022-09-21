import styled from "styled-components";
import { ArrowDown, ArrowUp } from "../../svg/icons";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

const ResidencesSection = ({ data }) => {
  // only run the marquee when in view
  const { ref, inView } = useInView({
    root: null,
    threshold: 0.1,
  });

  console.log(inView);

  return (
    <Wrapper ref={ref}>
      <Banner>
        <Marquee gradientWidth={0} play={false} pauseOnHover={true}>
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
              key={individual._id}
            >
              <ResidencyItem>
                <ResidencyImage>
                  <Image
                    src={individual.imageUrl}
                    placeholder={individual.lqip}
                    layout="intrinsic"
                    height={200}
                    width={210}
                    objectFit="contain"
                    quality={90}
                    className="borderRadius"
                  />
                </ResidencyImage>
                <h2>{individual.title}</h2>
                <h4>({individual.type})</h4>
              </ResidencyItem>
              <ResidencyItem>
                <ResidencyImage>
                  <Image
                    src={individual.imageUrl}
                    placeholder={individual.lqip}
                    layout="intrinsic"
                    height={200}
                    width={210}
                    objectFit="contain"
                    quality={90}
                    className="borderRadius"
                    alt={`Image portrait pour ${individual.title}`}
                  />
                </ResidencyImage>
                <h2>{individual.title}</h2>
                <h4>({individual.type})</h4>
              </ResidencyItem>
              <ResidencyItem>
                <ResidencyImage>
                  <Image
                    src={individual.imageUrl}
                    placeholder={individual.lqip}
                    layout="intrinsic"
                    height={200}
                    width={210}
                    objectFit="contain"
                    quality={90}
                  />
                </ResidencyImage>
                <h2>{individual.title}</h2>
                <h4>({individual.type})</h4>
              </ResidencyItem>
            </Marquee>
          );
        })}
      </InnerSection>
      <Banner>
        <Marquee gradientWidth={0} play={false} pauseOnHover={true}>
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
  margin: 5rem 0;
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
`;

const ArrowText = styled.div`
  user-select: none;
  display: flex;
  align-items: center;
  margin-left: 2rem;
  svg {
    margin-left: 2rem;
  }
`;

const InnerSection = styled.section``;

const ResidencyItem = styled.div`
  user-select: none;
  cursor: pointer;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  position: relative;

  h2 {
    font-family: "Editorial-Italic";
    margin: 0 1.5rem;
    margin-left: 0;
  }
`;

const ResidencyImage = styled.div`
  position: relative;
  display: block;
  margin: 0 2rem;
`;
