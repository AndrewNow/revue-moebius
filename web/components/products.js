import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { breakpoints } from "../utils/breakpoints";
import { motion } from "framer-motion";
import { gridChild } from "../styles/animations";

const Products = ({ products }) => {
  const { addItem } = useShoppingCart();

  return products.map((product) => {
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
      image: product.imageUrl,
      id: product.id,
      // server side data (for Stripe)
      product_data: {
        name: product.title,
        images: [product.image],
      },
      price_data: {
        currency: "cad",
        unit_amount: product.price,
        unit_amount_decimal: product.price,
      },
    };

    return (
      <Numero key={product._id} variants={gridChild}>
        <ImageWrapper>
          <Link href={`/numeros/${product.slug}`}>
            <Image
              placeholder="blur"
              blurDataURL={product.lqip}
              src={product.imageUrl}
              alt={`image couverture pour Moebius ${product.number}`}
              layout="fill"
              objectFit="cover"
              className="imageHover"
            />
          </Link>
        </ImageWrapper>
        <TextWrapper>
          <span>
            <small>Moebius n°{product.number}</small>
            <Link href={`/numeros/${product.slug}`}>
              <h4>{product.title}</h4>
            </Link>
          </span>
          <Button
            onClick={() => addItem(stripeFormattedProduct)}
            // onClick={() => addItem(product, {product_data: {name: "test"}})}
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
              <small>Numéro non disponible</small>
            )}
          </Button>
        </TextWrapper>
      </Numero>
    );
  });
};

export default Products;

const Numero = styled(motion.div)`
  position: relative;
  /* max-width: 325px; */
  @media (max-width: ${breakpoints.xl}px) {
    max-width: 307px;
  }
  @media (max-width: ${breakpoints.m}px) {
    display: flex;
    max-width: none;
    width: 100%;
    margin: 2rem 0;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  display: block;
  margin: 0 auto;
  aspect-ratio: 324/473;
  height: auto;
  width: 100%;
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

  @media (max-width: ${breakpoints.m}px) {
    width: 200px;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 150px;
    border-radius: 0;
    align-self: flex-end;
  }
  @media (max-width: ${breakpoints.xs}px) {
    width: 120px;
    height: 100% !important;
  }
`;

const TextWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  h4 {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
    margin-bottom: 1.5rem;
    color: var(--color-black);

    cursor: pointer;
    user-select: none;
    :hover {
      text-decoration: underline;
    }
  }
  small {
    color: var(--color-grey);
    margin: 1.5rem 0;
  }

  small,
  h4 {
    display: block;
    text-align: center;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 65%;
    margin-left: 1rem;

    h4 {
      margin: 2rem 0;
    }
    h4,
    small {
      text-align: left;
    }
    small {
      margin-top: 0;
      margin: 0.5rem 0;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    justify-content: space-between;
    h4 {
      margin-top: 0;
      font-size: 25px;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    h4 {
      margin-bottom: 0;
    }
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
    width: 100%;
    small {
      font-size: 14px;
      margin: 0 auto;
      text-align: center;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    border-radius: 5px;
    margin: 0;
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

    small {
      color: var(--static-black);
      width: 80%;
      font-size: 12px;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    padding: 0.3rem 0.25rem;
  }
`;
