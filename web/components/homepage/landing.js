import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

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
`;

const ImageWrapper = styled.div`
  position: relative;
  /* aspect-ratio: 559/790; */
  /* width: 519px; */
  width: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainImage = styled.div`
  position: relative;
  width: 70%;
  z-index: 3;
  // 60% of parent image wrapper width
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
    background: var(--color-turquoise);
  }
`;
