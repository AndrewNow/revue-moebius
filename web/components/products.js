import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const Products = ({ products }) => {
  const { addItem } = useShoppingCart();

  return products.map((product) => {
    //
    // Format the {product} to only take the fields that Stripe will need.
    //
    const stripeFormattedProduct = {
      title: product.title,
      price: product.price,
      number: product.number,
      currency: product.currency,
      image: product.imageUrl,
      id: product._id,
    };

    return (
      <Numero key={product._id}>
        <ImageWrapper>
          <Image
            src={product.imageUrl}
            alt={`image couverture pour Moebius ${product.number}`}
            layout="fill"
            objectFit="fill"
          />
        </ImageWrapper>
        <small>Moebius n°{product.number}</small>
        <Link href={`/numeros/${product.slug}`}>
          <h4>{product.title}</h4>
        </Link>
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
            <small>Numéro non disponible</small>
          )}
        </Button>
      </Numero>
    );
  });
};

export default Products;

const Numero = styled.div`
  position: relative;
  max-width: 325px;

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
`;

const ImageWrapper = styled.div`
  position: relative;
  display: block;
  margin: 0 auto;
  aspect-ratio: 324/473;
  height: auto;
  border-radius: 5px;
  overflow: hidden;
`;

const Button = styled.button`
  background: none;
  display: block;
  margin: 0 auto;
  border: 1px solid var(--color-black) !important;
  border-radius: 10px;
  padding: 1rem 1rem;

  transition: var(--transition);

  background: #ffffad70;

  small {
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
`;
