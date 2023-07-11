import { useState, useEffect } from "react";
import { breakpoints } from '../utils/breakpoints';
import Image from 'next/image';
import styled from 'styled-components';
import ConvertDateToString from '../utils/convertDateToString';
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import { Inner } from "../pages/index.js";

export function calculateAverageBrightness(imageData, width, height) {
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


const NumeroHeader = ({numero}) => {
  const [averageBrightness, setAverageBrightness] = useState(null);

  useEffect(() => {
    if (typeof document !== 'undefined') {
        const imageElement = document.getElementById("background-image");
        if (imageElement && imageElement.complete && averageBrightness === null) {
        const width = 3
        const height = 6

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
  

  const { addItem } = useShoppingCart();

  const stripeFormattedProduct = {
    // client side data (for cartSummary)
    name: numero?.title,
    title: numero?.title,
    price: numero?.price,
    number: numero?.number,
    currency: numero?.currency,
    image: numero?.image,
    id: numero?._id,
    // server side data (for Stripe)
    product_data: {
      name: numero?.title,
      images: [numero?.image],
    },
    price_data: {
      currency: "cad",
      unit_amount: numero?.price,
      unit_amount_decimal: numero?.price,
    },
  };


  return (
    <Header>
        <BgImageWrapper>
        {numero.image && (
          <Image
            src={numero?.lqip}
            alt="Background image"
            quality={1}
            width={3}
            height={6}
            layout="responsive"
            className="background-image"
            id="background-image"
          />
          )}
        </BgImageWrapper>
        <Inner>
          <HeaderFlex>
            <HeaderImage>
              {numero.image && (
                <Image
                  src={numero?.image}
                  alt="Thumbnail image"
                  quality={100}
                  layout="fill"
                  placeholder="blur"
                  blurDataURL={numero?.lqip}
                />
              )}
            </HeaderImage>
            <HeaderText>
              <h5 id="header-text">
                Mœbius, N°{numero?.number}
                {numero?.secondaryNumber && `-${numero?.secondaryNumber}`}
              </h5>
              <h1 id="header-text">{numero?.title}</h1>
              <small id="header-text">
                <ConvertDateToString data={numero?.publishedAt} />
                <br />
                Dirigé par {numero?.directedBy}
              </small>
              {numero?.available && (
                <Button
                  onClick={() => addItem(stripeFormattedProduct)}
                  aria-label="Ajouter au panier"
                  disabled={numero?.available ? false : true}
                  suppressHydrationWarning
                >
                  <small suppressHydrationWarning>
                    Ajouter au panier -{" "}
                    {formatCurrencyString({
                      value: numero?.price,
                      currency: numero?.currency,
                    })}
                  </small>
                </Button>
              )}
            </HeaderText>
          </HeaderFlex>
        </Inner>
      </Header>
  )
}

export default NumeroHeader


const Header = styled.header`
  /* background-color: var(--color-yellow); */
  position: relative;
  height: 100%;
  width: 100%;
  padding-bottom: 5rem;
  overflow-y: hidden;
  overflow-x: hidden;


  @media (max-width: ${breakpoints.xl}px) {
    padding-bottom: 3rem;
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

const HeaderFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  padding-top: 5rem;

  @media (max-width: ${breakpoints.l}px) {
    flex-direction: column-reverse;
  }
`;

const HeaderText = styled.div`
  position: relative;
  align-self: center;
  width: 63%;
  margin: 3rem 0;

  h5,
  h1,
  small {
    /* color: var(--static-black); */
  }

  small {
    display: block;
    width: 45%;
    opacity: 0.8;
  }

  h1 {
    width: 90%;
    margin: 4rem 0;
    font-size: 5.5vw;
    line-height: 110%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    margin-top: 5rem;
    h1 {
      font-size: 6.77vw;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 90%;
    margin: 0 3rem;
    margin-top: 5rem;
    margin-bottom: 1rem;
    h5,
    h1,
    small {
      text-align: center;
    }
    small,
    h1 {
      width: 100%;
    }
    h1 {
      margin: 2rem 0;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    margin-bottom: 1rem;
    h1 {
      font-size: 50px;
    }
    small {
      width: 80%;
      margin: 0 auto;
    }
  }
`;

const HeaderImage = styled.div`
  position: relative;
  display: block;
  aspect-ratio: 559/790;
  width: 30%;
  height: auto;
  margin: 2rem;
  margin-left: 0;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: var(--box-shadow-image);

  @media (max-width: ${breakpoints.l}px) {
    width: 50%;
    margin: 2rem;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 80%;
  }
`;

const Button = styled.button`
  background: none;
  display: inline-block;
  margin: 3rem auto;
  border: 1px solid var(--static-black) !important;
  border-radius: 10px;
  padding: 1rem 1rem;

  transition: var(--transition);

  background: var(--static-cream);

  small {
    margin: 0 auto;
    width: 100%;
    color: var(--static-black);
    transition: var(--transition);
  }

  :disabled {
    cursor: not-allowed;
    border: 1px solid var(--color-grey) !important;
    background: var(--static-cream);
    small {
      color: var(--color-grey);
    }
    :hover {
      background: var(--color-cream);
    }
  }
  :hover {
    small {
      color: var(--static-black);
    }
    background: var(--color-turquoise);
  }
  @media (max-width: ${breakpoints.l}px) {
    display: block;
    margin: 3rem auto;
  }
`;
