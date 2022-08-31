import styled from "styled-components";
import Image from "next/image";
import { breakpoints } from "../utils/breakpoints";
import MailchimpFormContainer from "./mailchimp/mailchimpFormContainer";
import { Instagram, Facebook, Twitter } from "../svg/icons";
import Link from "next/link";

const Footer = ({ logos }) => {
  return (
    <Wrapper>
      <Newsletter>
        <MailchimpFormContainer />
      </Newsletter>
      <MainContent>
        <Socials>
          <SocialsInner>
            <a
              href="https://www.instagram.com/revuemoebius/"
              target="_blank"
              rel="noreferrer"
            >
              <small>
                <Instagram />
                @revuemoebius
              </small>
            </a>
            <a
              href="https://www.facebook.com/revuemoebius/"
              target="_blank"
              rel="noreferrer"
            >
              <small>
                <Facebook />
                @revuemoebius
              </small>
            </a>
            <a
              href="https://twitter.com/Revue_Moebius"
              target="_blank"
              rel="noreferrer"
            >
              <small>
                <Twitter />
                @revuemoebius
              </small>
            </a>
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
            <h5>
              <Link scroll={false} href="/a-propos">
                À propos
              </Link>
            </h5>
            <h5>
              <Link href="/proposer-un-texte">Proposer un texte</Link>
            </h5>
            <h5>
              <Link href="/vente">Vente et abonnements</Link>
            </h5>
            <h5>
              <Link href="/numeros">Numéros</Link>
            </h5>
            {/* <Link href="/residences">
              <h5>Résidences</h5>
            </Link> */}
            <h5>
              <Link href="/balado">Mœbius-balado</Link>
            </h5>
            <h5>
              <Link href="/nouvelles">Nouvelles</Link>
            </h5>
          </InformationInner>
        </Information>
      </MainContent>
      <Bottom>
        <BottomInner>
          <small>
            <a href={`${logos[0].mediaKitPDF}?dl=`} className="mediaKit">
              Téléchargez le kit média
            </a>
          </small>
          <small>REVUE MOEBIEUS ©{new Date().getFullYear()}</small>
        </BottomInner>
      </Bottom>
      <Bottom style={{ borderTop: "1px solid var(--static-cream)" }}>
        <ImageBanner>
          {logos?.[0]?.Partenaires.map((partner, i) => {
            return (
              <ImageInnerWrapper key={i}>
                <Image
                  src={partner?.imageUrl}
                  alt={partner?.partnershipName}
                  quality={100}
                  layout="fill"
                  // objectFit="scale-down"
                  objectFit="contain"
                  placeholder="blur"
                  blurDataURL={partner?.lqip}
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
  z-index: 5;
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
  position: relative;
  display: flex;
  /* border-top: 1px solid var(--static-cream); */
  border-bottom: 1px solid var(--static-cream);

  @media (max-width: ${breakpoints.m}px) {
    flex-direction: column;
  }
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
  @media (max-width: ${breakpoints.m}px) {
    width: 100%;
    border-bottom: 1px solid var(--static-cream);
    :first-child {
      border-top: 1px solid var(--static-cream);
    }
    :last-child {
      border-bottom: none;
    }
    :before {
      display: none;
    }
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
  h5 > .link {
    color: red !important;
    :hover {
      border: 1px solid red;
    }
  }
  a {
    color: var(--static-cream);
    text-decoration: none !important;

    :hover {
      text-decoration: underline !important;
    }
  }
`;

const Socials = styled.div`
  width: 30%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  @media (max-width: ${breakpoints.m}px) {
    width: 100%;
    border-bottom: 1px solid var(--static-cream);
  }
`;

const SocialsInner = styled.div`
  margin: 2rem 3.75vw;
  min-height: 100%;
  color: var(--static-cream);
  @media (max-width: ${breakpoints.m}px) {
    margin: 2rem;
  }

  a {
    color: var(--static-cream);
    align-self: center;
    text-decoration: none;
    line-height: 100%;
    :hover {
      text-decoration: underline;
    }
  }
  a:nth-child(even) {
    small {
      margin: 0.75rem 0;
    }
  }
  a:nth-child(odd) {
    small {
      margin-top: 0;
    }
  }
  a > small {
    margin: 0.75rem 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    svg {
      margin-right: 1rem;
    }
  }

  a > small > svg > path {
    fill: var(--static-cream) !important;
  }

  @media (max-width: ${breakpoints.s}px) {
    a > small {
      margin: 0rem;
    }
    a > small > svg {
      max-width: 20px;
      max-height: 20px;
    }
  }
  a:nth-child(even) {
    small {
      margin: 0.75rem 0;
    }
  }
  a:nth-child(odd) {
    small {
      margin-top: 0;
    }
  }
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

  .mediaKit {
    text-decoration: none;
    color: var(--static-cream);
  }

  .mediaKit :hover {
    text-decoration: underline;
  }

  @media (max-width: ${breakpoints.m}px) {
    width: 90%;
    margin: 2rem;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    small {
      :first-child {
        margin-bottom: 1rem;
      }
    }
  }
  @media (max-width: ${breakpoints.s}px) {
  }
`;

const ImageBanner = styled.div`
  width: 92.5%;
  margin: 0rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 125px;
  position: relative;

  @media (max-width: ${breakpoints.m}px) {
    height: 225px;
    width: 90%;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  @media (max-width: 620px) {
    height: 250px;
  }
  @media (max-width: ${breakpoints.s}px) {
    height: 400px;
  }
`;

const ImageInnerWrapper = styled.div`
  width: 140px;
  height: 40px;
  position: relative;
  @media (max-width: ${breakpoints.m}px) {
    max-height: 70px;
    min-height: 40px;
    max-width: 50%;
    min-width: 140px;
  }
`;
