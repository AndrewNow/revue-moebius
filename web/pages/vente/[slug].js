import { boutiqueQuery } from "../../lib/sanity/boutiqueQuery";
import { footerLogoQuery } from "../../lib/sanity/footerLogoQuery";
import { client } from "../../lib/sanity/client";
import groq from "groq";
import styled from "styled-components";
import Image from "next/image";
import { breakpoints } from "../../utils/breakpoints";
import ConvertDateToString from "../../utils/convertDateToString";
import { motion } from "framer-motion";
import SplitText from "../../utils/splitText";
import { textAnim, textAnimSlow, textChild } from "../../styles/animations";
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import BlockContent from "@sanity/block-content-to-react";
import Link from "next/link";

const BoutiqueProduct = ({ boutiqueData }) => {
  const { addItem } = useShoppingCart();

  const stripeFormattedProduct = {
    // client side data (for cartSummary)
    name: boutiqueData.title,
    title: boutiqueData.title,
    price: boutiqueData.price,
    number: boutiqueData.number,
    currency: boutiqueData.currency,
    image: boutiqueData.imageUrl,
    id: boutiqueData.id,
    // server side data (for Stripe)
    product_data: {
      name: boutiqueData.title,
      images: [boutiqueData.image],
    },
    price_data: {
      currency: "cad",
      unit_amount: boutiqueData.price,
      unit_amount_decimal: boutiqueData.price,
    },
  };

  return (
    <PageWrapper>
      <ProductWrapper>
        <ProductText>
          <h1 role="heading">
            <SplitText
              string={boutiqueData?.title}
              variantParent={textAnim}
              variantParentMobile={textAnimSlow}
              variantChild={textChild}
              initial="hidden"
              animate="visible"
            />
          </h1>
          <Subtitle>
            <ConvertDateToString data={boutiqueData?.publishedAt} />
          </Subtitle>
          <Button
            onClick={() => addItem(stripeFormattedProduct)}
            aria-label="Ajouter au panier"
            disabled={boutiqueData?.available ? false : true}
            suppressHydrationWarning
          >
            {boutiqueData?.available ? (
              <small suppressHydrationWarning>
                Ajouter au panier -{" "}
                {formatCurrencyString({
                  value: boutiqueData?.price,
                  currency: boutiqueData?.currency,
                })}
              </small>
            ) : (
              <small>Non disponible</small>
            )}
          </Button>
        </ProductText>
        <ImageWrapper>
          <Image
            src={boutiqueData.imageUrl}
            alt={`Image couverture pour Moebius-Balado ${boutiqueData.number}`}
            width={700}
            height={700}
            quality={95}
            priority={true}
            placeholder="blur"
            blurDataURL={boutiqueData.lqip}
          />
        </ImageWrapper>
      </ProductWrapper>
      <MainContent>
        <BlockContent blocks={boutiqueData?.body} />
      </MainContent>
      <Return>
        <Link href="/vente">
          <span>
            <svg
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 1L1 8L8 15M1 8L17 8L1 8Z"
                stroke="var(--color-black)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>{" "}
            Retourner vers la page de vente
          </span>
        </Link>
      </Return>
    </PageWrapper>
  );
};

export default BoutiqueProduct;

export async function getStaticProps({ params }) {
  const footerLogos = await client.fetch(footerLogoQuery);

  let slug;

  const boutiqueData = await client.fetch(boutiqueQuery, {
    slug: params.slug,
  });

  return {
    props: {
      boutiqueData,
      footerLogos,
    },
  };
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "boutique" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

const PageWrapper = styled.div`
  margin-bottom: 5rem;
`;

const ProductWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding-top: 15vh;
  padding-bottom: 5vh;
  width: 90%;
  @media (max-width: ${breakpoints.xl}px) {
    padding-top: 20vh;
  }
  @media (max-width: ${breakpoints.l}px) {
    display: block;
    width: 100%;
    margin: 0 auto;
  }

  @media (max-width: ${breakpoints.s}px) {
    padding-bottom: 0;
  }
`;

const ProductText = styled.div`
  position: relative;
  display: inline-block;
  max-width: 70%;
  h1 {
    margin: 1rem 0;
    color: var(--color-black);
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 100%;
    max-width: none;
    text-align: center;
  }
`;

const Subtitle = styled.small`
  margin: 0.5rem auto;
  margin-bottom: 2rem;
  color: var(--color-grey);
  display: block;

  @media (max-width: ${breakpoints.l}px) {
    margin-bottom: 0.5rem;
  }
`;
export const Button = styled.button`
  display: inline-block;
  margin: 0 auto;
  border: 1px solid var(--color-black) !important;
  border-radius: 10px;
  padding: 1rem;
  user-select: none;
  transition: var(--transition);
  background: #ffffad70;

  small {
    display: inline-block;
    margin: 0;
    color: var(--color-black);
    transition: var(--transition);
  }

  :disabled {
    cursor: not-allowed;
    border: 1px solid var(--color-grey) !important;
    background: var(--color-cream);
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
    background: var(--color-yellow);
  }
  @media (max-width: ${breakpoints.xl}px) {
    padding: 0.75rem;
    margin: 1rem 0;
    display: inline-block;
    small {
      display: inline-block;
      font-size: 14px;
      margin: 0 auto;
      text-align: center;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    border-radius: 5px;
    background: var(--color-turquoise);
    border: 1px solid transparent !important;
    color: var(--static-black);
    max-width: 300px;
    :hover {
      background: var(--color-turquoise);
      border: 1px solid transparent;
      color: var(--static-black);
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    padding: 0.6rem 0.5rem;
    border-radius: 5px;
    max-width: 260px;
    width: 90%;
    margin: 1.5rem auto;

    small {
      color: var(--static-black);
      width: 100%;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    padding: 0.3rem 0.25rem;
  }
`;
const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  max-width: 45%;
  margin-left: 2rem;
  aspect-ratio: 1/1;

  @media (max-width: ${breakpoints.l}px) {
    max-width: 60%;
    margin: 0 auto;
    margin-top: 2rem;
  }
  @media (max-width: ${breakpoints.m}px) {
    max-width: 90%;
  }
`;

const MainContent = styled.div`
  width: 55%;
  margin: 5rem auto;
  margin-bottom: 7rem;

  p {
    margin-bottom: 1.5rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
  * {
    color: var(--color-black);
    transition: var(--transition);
  }
  a {
    color: var(--color-purple);

    :hover {
      opacity: 0.6;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 90%;
  }
`;

const Return = styled.small`
  display: inline-block;
  margin-bottom: 2rem;
  margin-left: 5rem;

  span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--color-black);
  }

  svg {
    margin-right: 1rem;
    transition: var(--transition);
    stroke: var(--color-black);
  }

  cursor: pointer;

  :hover {
    text-decoration: underline;
    color: var(--color-black);
    svg {
      transform: translateX(-5px);
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    margin: 3rem 5%;
  }
`;
