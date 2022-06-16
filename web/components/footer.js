import styled from "styled-components";
import Image from "next/image";

const Footer = ({ logos }) => {
  return (
    <Wrapper>
      <Newsletter>
        <h3>Sign up for our newsletter</h3>
      </Newsletter>
      <MainContent>
        <Socials>
          <SocialsInner>
            <small>@revuemoebius</small>
            <small>@revuemoebius</small>
          </SocialsInner>
        </Socials>
        <Information>
          <InformationInner>
            <Title>Nous Contacter</Title>
            <h5>
              <a href="mailto:revuemoebius@gmail.com">revuemoebius@gmail.com</a>
              <br />
              <br />
              1463 Boulevard Saint-Joseph Est <br />
              Montréal, Québec <br />
              H2J 1M6
              <br /> Canada
            </h5>
          </InformationInner>
        </Information>
        <Information>
          <InformationInner>
            <Title>Index</Title>
            <h5>À propos</h5>
            <h5>Proposer un texte</h5>
            <h5>Vente et abonnements</h5>
            <h5>Numéros</h5>
            <h5>Résidences</h5>
            <h5>Mœbius-balado</h5>
            <h5>Nouvelles</h5>
            <h5>Nous contacter</h5>
          </InformationInner>
        </Information>
      </MainContent>
      <Bottom>
        <BottomInner>
          <small>Privacy policy</small>
          <small>REVUE MOEBIEUS ©{new Date().getFullYear()}</small>
        </BottomInner>
      </Bottom>
      <Bottom style={{ borderTop: "1px solid var(--static-cream)" }}>
        <ImageBanner>
          {logos[0].Partenaires.map((partner, i) => {
            return (
              <ImageInnerWrapper key={i}>
                <Image
                  src={partner.imageUrl}
                  alt={partner.partnershipName}
                  quality={100}
                  layout="fill"
                  objectFit="scale-down"
                />
              </ImageInnerWrapper>
            );
          })}
        </ImageBanner>
      </Bottom>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.footer`
  background: var(--static-black);
  width: 100%;
  position: relative;
  z-index: 0;
`;

const Newsletter = styled.div`
  height: 200px;
  h3 {
    width: 92.5%;
    margin: 0 auto;
    padding: 2rem 0;
    font-family: "Surt";
    color: var(--static-cream);
  }
`;

const MainContent = styled.div`
  width: 100%;
  display: flex;
  border-top: 1px solid var(--static-cream);
  border-bottom: 1px solid var(--static-cream);
`;

const Socials = styled.div`
  width: 30%;
`;

const Information = styled.div`
  width: 35%;
  position: relative;

  :before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 1px;
    background: var(--static-cream);
  }
`;

const Title = styled.small`
  margin-bottom: 2rem;
`;

const InformationInner = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: column;
  color: var(--static-cream);

  h5 > a {
    color: var(--static-cream);
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }
`;

const SocialsInner = styled.div`
  margin: 2rem 3.75vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: var(--static-cream);
`;

const Bottom = styled.div`
  width: 100%;
  align-self: center;
  position: relative;
  color: var(--static-cream);
`;

const BottomInner = styled.div`
  width: 92.5%;
  margin: 2rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImageBanner = styled.div`
  width: 92.5%;
  margin: 0rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 125px;
  position: relative;
`;

const ImageInnerWrapper = styled.div`
  width: 140px;
  height: 40px;
  position: relative;
`;