import styled from "styled-components";
import { breakpoints } from "../../utils/breakpoints";
import { Inner } from "../../pages";
import { Button } from "../../pages/vente/[slug]";
import Image from "next/image";
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import Link from "next/link";

const Boutique = ({ boutique }) => {
  const { addItem } = useShoppingCart();

  return (
    <BoutiqueWrapper>
      <Inner>
        <Header>
          <h1>Boutique</h1>
        </Header>
        <Products>
          {boutique.map((product) => {
            // Format the {product} to only take the fields that Stripe will need.
            // https://stripe.com/docs/api/products/create
            //
            const stripeFormattedProduct = {
              // client side data (for cartSummary)
              name: product.title,
              title: product.title,
              price: product.price,
              number: product.number,
              currency: product.currency,
              image: product.image,
              id: product.id,
              // server side data (for Stripe)
              product_data: {
                name: product.title,
                images: [product.image],
              },
              price_data: {
                currency: product.currency,
                unit_amount: product.price,
                unit_amount_decimal: product.price,
              },
            };

            return (
              <Product key={product._id}>
                <ImageWrapper>
                  {product.image && (
                    <Link scroll={false} href={`/vente/${product.slug}`}>
                      <Image
                        src={product.image}
                        placeholder="blur"
                        blurDataURL={product.lqip}
                        width={408}
                        height={408}
                        quality={95}
                        objectFit="contain"
                        objectPosition="top"
                        className="imageHover"
                      />
                    </Link>
                  )}
                </ImageWrapper>
                <ProductInfo>
                  <WrapText>
                    <Link scroll={false} href={`/vente/${product.slug}`}>
                      <h2>{product.title}</h2>
                    </Link>
                    {product.description && <p>{product.description}</p>}
                  </WrapText>
                  <Button
                    onClick={() => addItem(stripeFormattedProduct)}
                    aria-label="Ajouter au panier"
                    disabled={product.available ? false : true}
                    suppressHydrationWarning
                  >
                    {product.available ? (
                      <small suppressHydrationWarning>
                        Ajouter au panier -{" "}
                        {formatCurrencyString({
                          value: product.price,
                          currency: product.currency,
                        })}
                      </small>
                    ) : (
                      <small>Non disponible</small>
                    )}
                  </Button>
                </ProductInfo>
              </Product>
            );
          })}
        </Products>
      </Inner>
    </BoutiqueWrapper>
  );
};

export default Boutique;

const BoutiqueWrapper = styled.section`
  margin-bottom: 10rem;
  @media (max-width: ${breakpoints.m}px) {
    margin-bottom: 5rem;
  }
`;

const Header = styled.div`
  border-top: 1px solid var(--color-black);
  border-bottom: 1px solid var(--color-black);

  padding: 5rem 0;
  margin: 5rem 0;

  h1,
  p {
    text-align: center;
    margin: 0 auto;
    width: 60%;
    color: var(--color-black);
  }

  @media (max-width: ${breakpoints.l}px) {
    padding: 3rem 0;
    p {
      width: 90%;
      margin: 0 auto;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    padding: 2rem 0;
    margin: 3rem 0;
  }
`;

const Products = styled.div`
  position: relative;
  width: 80%;
  margin: 0 auto;
`;

const Product = styled.article`
  position: relative;
  display: flex;
  margin-bottom: 5rem;
  color: var(--color-black);

  @media (max-width: ${breakpoints.m}px) {
    flex-direction: column;
  }
`;

const ProductInfo = styled.div`
  margin-left: 3rem;

  @media (max-width: ${breakpoints.m}px) {
    margin-left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const WrapText = styled.div`
  margin-bottom: 2rem;

  h2 {
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
  p {
    color: var(--color-grey);
    width: 80%;
  }

  @media (max-width: ${breakpoints.m}px) {
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 0;

    p {
      width: 100%;
      margin-top: 0.5rem;
    }
  }
`;

const ImageWrapper = styled.div`
  aspect-ratio: 1/1;
  display: block;
  position: relative;
  border-radius: 5px;
  overflow: hidden;

  .imageHover {
    cursor: pointer;
    transition: var(--transition-image);
    transform-origin: center;
  }
  :hover {
    .imageHover {
      transform: scale(1.025);
      filter: blur(2px) saturate(110%);
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    width: 80%;
    height: auto;
    margin: 0 auto;
  }

  @media (max-width: ${breakpoints.s}px) {
    width: 100%;
  }
`;
