import { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import { breakpoints } from "../utils/breakpoints";
import ConvertDateToString from "../utils/convertDateToString";
import { Inner } from "../pages";
import { SpotifyIcon, OpusculesIcon } from "../svg/icons";

function calculateAverageBrightness(imageData, width, height) {
  let totalBrightness = 0;
  for (let i = 0; i < imageData.length; i += 4) {
    const red = imageData[i];
    const green = imageData[i + 1];
    const blue = imageData[i + 2];
    const brightness = (red * 0.299 + green * 0.587 + blue * 0.114) / 255;
    totalBrightness += brightness;
  }
 const averageBrightness = Math.max(0, Math.min(1, totalBrightness / (width * height)));
  return averageBrightness;
}

const BaladoHeader = ({ balado, baladoTitle }) => {

  const [averageBrightness, setAverageBrightness] = useState(null);

  useEffect(() => {
    if (typeof document !== 'undefined') {
        const imageElement = document.getElementById("background-image");
        if (imageElement && imageElement.complete && averageBrightness === null) {
        const width = 5
        const height = 5

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = width;
        canvas.height = height;
        
        context.drawImage(imageElement, 0, 0,);
        const imageData = context.getImageData(0, 0, width, height).data;
        const brightness = calculateAverageBrightness(imageData, width, height);
        setAverageBrightness(brightness);
      }
    }
  }, [averageBrightness]);

  useEffect(() => {
    if (averageBrightness !== null && typeof document !== 'undefined') {
      // console.log('brightness', averageBrightness)
      const headerTextElements = document.querySelectorAll("#header-text");
      headerTextElements.forEach((el) => {
        el.style.color = averageBrightness > 0.5 ? "var(--static-black)" : "var(--static-cream)";
      });
    }
  }, [averageBrightness]);

  

  return (
    <Banner style={{ background: balado.color }}>
      <BgImageWrapper>
        {balado.imageUrl && (
          <Image
            src={balado?.lqip}
            alt="Background image"
            quality={1}
            width={5}
            height={5}
            layout="fill"
            className="background-image"
            // style={{objectFit: "cover"}}
            id="background-image"
            />
        )}
      </BgImageWrapper>
      <Inner>
        <BannerFlex>
          <ImageWrapper>
            <div className="image-container">
              {balado.imageUrl && (
                <Image
                  src={balado.imageUrl}
                  placeholder="blur"
                  blurDataURL={balado.lqip}
                  width={620}
                  height={620}
                  className="main-image"
                  />
                )}
            </div>
          </ImageWrapper>
          <BannerText>
            <small id="header-text">
              <ConvertDateToString data={balado?.publishedAt} />
            </small>
            <h2 id="header-text">{baladoTitle}</h2>
          <LinkWrapper>
            <small id="header-text">Écouter sur:</small>
            <LinkFlex>
              <ExternalLink
                href={balado?.embed}
                target="_blank"
                rel="noreferrer"
                >
                <SpotifyIcon />
                <small>Spotify</small>
                </ExternalLink>
                {balado?.opuscules &&  
                  <ExternalLink
                    href={balado?.opuscules}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <OpusculesIcon />
                    <small>Opuscules</small>
                  </ExternalLink>
                }
            </LinkFlex>
            </LinkWrapper>  
            <WrapDetails>
              {balado.discussion && (
                <BannerDetails>
                  <BannerItem>
                    <small id="header-text">
                      Discussion
                    </small>
                    {balado.discussion.map((person) => {
                      return (
                        <h4 id="header-text">{person}</h4>
                      );
                    })}
                  </BannerItem>
                </BannerDetails>
              )}
              {balado.interviews && (
                <BannerDetails>
                  <BannerItem>
                    <small id="header-text">
                      Entrevues et lectures
                    </small>
                    {balado.interviews.map((person) => {
                      return (
                        <h4 id="header-text">{person}</h4>
                      );
                    })}
                  </BannerItem>
                </BannerDetails>
              )}
              {balado.animation && (
                <BannerDetails>
                  <BannerItem>
                    <small id="header-text">
                      Animation
                    </small>
                    {balado.animation.map((person) => {
                      return (
                        <h4 id="header-text">{person}</h4>
                      );
                    })}
                  </BannerItem>
                </BannerDetails>
              )}
            </WrapDetails>
          </BannerText>
        </BannerFlex>
      </Inner>
    </Banner>
  )
}

export default BaladoHeader

const Banner = styled.section`
  position: relative;
  width: 100%;
  padding: 10vh 0;
  padding-top: 10rem;

  @media (max-width: ${breakpoints.xs}px) {
    padding-top: 16vh;
  }
`;

const BgImageWrapper = styled.div`
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
    .background-image {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      scale: 1.1;
      object-fit: cover;
      overflow: hidden;
      filter: blur(10px) brightness(1.05) saturate(1.1);
    }
`


const BannerFlex = styled.header`
  position: relative;
  z-index: 10;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${breakpoints.l}px) {
    flex-direction: column;
  }
`;

const ImageWrapper = styled.div`
  aspect-ratio: 1/1;
  width: 35%;
  height: auto;
  display: block;
  position: relative;
  .image-container {
    box-shadow: var(--box-shadow-image);
    display: grid;
    place-items: center;
    overflow: hidden;
    border-radius: 10px;
  }
  .main-image {
    background: unset;
    object-fit: contain;
  }

  @media (max-width: ${breakpoints.l}px) {
    width: 50%;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 75%;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 100%;
  }
`;

const BannerText = styled.div`
  margin-left: 5%;
  width: 60%;
  small {
    display: block;
    margin-bottom: 1.5rem;
  }
  h2 {
    font-family: "Editorial-Italic";
    margin-bottom: 2rem;
  }

  @media (max-width: ${breakpoints.l}px) {
    margin: 0;
    margin-top: 5rem;
    width: 80%;
    h2 {
      margin-bottom: 3rem;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 100%;
    margin-top: 3rem;
    h2 {
      margin-bottom: 2.5rem;
    }
  }
`;

const LinkWrapper = styled.div`
  margin-bottom: 2rem;

  @media (max-width: ${breakpoints.s}px) {
    small {
      margin-bottom: 0.5rem;
    }
  }
`

const LinkFlex = styled.div`
  @media (max-width: ${breakpoints.m}px) {
    display: flex;
    justify-content: space-between;
  }
  @media (max-width: ${breakpoints.xs}px) {
    flex-direction: column;
  }
`


const ExternalLink = styled.a`
  position: relative;
  display: inline-flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 2rem;
  padding: 1rem 2.5rem;
  padding-right: 3rem;
  border-radius: 10px;
  text-decoration: none;
  transition: var(--transition);
  background: var(--static-cream);
  color : var(--static-black);
  border: 1px solid var(--static-black);
  svg {
    margin-right: 1rem;
  }
  :first-of-type {
    margin-left: 0;
  }
  &:nth-of-type(2) {
    &:before {
      content: "";
      display: block;
      position: absolute;
      left: -2rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 75%;
      background: var(--static-black);
    }
  }
  
  small {
    margin: 0!important;
    padding: 0;
  }

  :hover {
    background: var(--color-turquoise);
    filter: brightness(0.9);
    small {
      color: var(--static-black);
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    padding: 1rem 1.5rem;
    padding-right: 2rem;
    margin: 0rem;
    min-width: 45%;
    small {
      color: var(--static-black);
    }
    :first-of-type {
      margin-left: 0;
    }
    &:nth-of-type(2) {
      margin-right: 0;
      &:before {
        display: none;
      }
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    margin: 1rem;
    :first-of-type {
      margin-left: 1rem;
    }
    &:nth-of-type(2) {
      margin-right: 1rem;
    }
  }
`;


const WrapDetails = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media (max-width: ${breakpoints.l}px) {
    justify-content: space-between;
  }
  @media (max-width: ${breakpoints.s}px) {
    flex-direction: column;
  }
`;

const BannerDetails = styled.div`
  margin-right: 3rem;

  @media (max-width: ${breakpoints.l}px) {
    margin-right: 0;
  }
`;

const BannerItem = styled.div`
  margin-top: 2rem;
  display: block;
  small {
    margin-bottom: 1.5rem;
    display: block;
  }
  h4 {
    font-size: 2.18vw;
    white-space: nowrap;
  }
  @media (max-width: ${breakpoints.xl}px) {
    small {
      font-size: 12px;
    }
    h4 {
      font-size: 2.5vw;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    margin-top: 1rem;
    h4 {
      font-size: 28px;
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    h4 {
      font-size: 30px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-bottom: 1rem;
    h4 {
      font-size: 35px;
    }
    small {
      margin-bottom: 0.5rem;
    }
  }
`;