import { useState, useEffect } from "react";
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import { fetchPostJSON } from "../utils/apiHelpers.js";
import styled from "styled-components";
import Image from "next/image.js";
import Link from "next/link.js";
import { breakpoints } from "../utils/breakpoints.js";
import { motion } from "framer-motion";
import { blurDataAnimation } from "../utils/blurDataURLTools.js";

export default function CartSummary({ setOpenCart, openCart }) {
  //setting up some React states for our cart
  const [loading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);

  // destructuring all the building blocks we get from use-shopping-cart
  const {
    formattedTotalPrice,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
    addItem,
    decrementItem,
  } = useShoppingCart();

  //sets our cartEmpty state with cart data
  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  const handleCheckout = async (event) => {
    event.preventDefault();
    setLoading(true);
    //send the cart data to our serverless API
    const response = await fetchPostJSON(
      "/api/checkout_sessions/cart",
      cartDetails
    );
    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }
    //if nothing went wrong, sends user to Stripe checkout
    redirectToCheckout({ sessionId: response.id });
  };

  const openModal = {
    hidden: {
      opacity: 0,
      transition: {
        ease: [0.25, 0, 0.35, 1],
        duration: 0.15,
        staggerChildren: 0.35,
      },
    },
    open: {
      opacity: 1,
      transition: {
        ease: [0.25, 0, 0.35, 1],
        duration: 0.35,
      },
    },
  };

  const modalChild = {
    hidden: {
      opacity: 0,
      y: 30,
      transition: {
        ease: [0.25, 0, 0.35, 1],
        duration: 0.35,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.25, 0, 0.35, 1],
        duration: 0.35,
      },
    },
  };

  return (
    <CartWrapper
      variants={openModal}
      initial="hidden"
      animate="open"
      exit="hidden"
      key="cartwrapper"
    >
      <Header>
        <h4>
          Votre panier{" "}
          <small suppressHydrationWarning>
            ({cartCount > 0 ? cartCount : 0})
          </small>
        </h4>
        <Close
          onClick={() => setOpenCart(!openCart)}
          aria-label="Fermer le panier"
        >
          X
        </Close>
      </Header>
      <CartInner variants={modalChild}>
        <Form onSubmit={handleCheckout}>
          <LineItemWrapper>
            <ItemInner>
              {cartCount > 0 ? (
                Object.keys(cartDetails).map((cartItem) => {
                  /* Get items from the cart {cartDetails} and map over them, 
              to add them as line items */
                  const item = cartDetails[cartItem];
                  return (
                    <LineItem key={item.id}>
                      <ImageWrapper>
                        <Image
                          src={item.image}
                          alt="Image couverture"
                          width={69}
                          height={100}
                          quality={20}
                          placeholder="blur"
                          blurDataURL={blurDataAnimation(69, 100)}
                        />
                      </ImageWrapper>
                      <LineItemTitle>
                        <small>{item.title}</small>
                        <ButtonGroup>
                          <Button
                            onClick={() => decrementItem(item.id)}
                            aria-label="Retirer un article du panier."
                          >
                            -
                          </Button>
                          <small>{item.quantity}</small>
                          <Button
                            onClick={() => addItem(item)}
                            aria-label="Ajouter un article au panier."
                          >
                            +
                          </Button>
                        </ButtonGroup>
                      </LineItemTitle>
                      <small style={{ alignSelf: "flex-end" }}>
                        {formatCurrencyString({
                          value: item.price,
                          currency: item.currency,
                        })}
                      </small>
                    </LineItem>
                  );
                })
              ) : (
                <NoItemsInCart>
                  <p>
                    Il n'y a aucun article dans votre panier!
                    <br />
                    <br />
                    <Link href="/vente">Cliquez ici</Link> pour magasiner.
                  </p>
                </NoItemsInCart>
              )}
            </ItemInner>
            {cartCount > 0 && <Gradient />}
          </LineItemWrapper>
          <CheckoutWrapper>
            <Count suppressHydrationWarning>
              <small>Articles:</small>
              <small>{cartCount}</small>
            </Count>
            <Total suppressHydrationWarning>
              <small>Total:</small>
              <small>{formattedTotalPrice}</small>
            </Total>
            <Checkout type="submit" disabled={cartEmpty || loading}>
              <small>Procéder au paiement</small>
            </Checkout>
            <ClearCart type="button" onClick={clearCart}>
              <small>Vider votre panier</small>
            </ClearCart>
          </CheckoutWrapper>
        </Form>
      </CartInner>
    </CartWrapper>
  );
}

const CartWrapper = styled(motion.div)`
  position: absolute;
  z-index: 10;
  top: 2rem;
  right: 2rem;
  background: var(--color-cream);
  border: 1px solid var(--color-black);
  border-radius: 10px;
  filter: drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.16));
  width: 420px;

  @media (max-width: ${breakpoints.m}px) {
    right: 1rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    right: 0.225rem;
    max-width: 90vw;
    margin: 0 auto;
    top: 3rem;
  }
  @media (max-width: ${breakpoints.xs}px) {
    max-height: 80vh;
    overflow-y: scroll;
  }
`;

const CartInner = styled(motion.div)`
  width: 90%;
  margin: 0 auto;
  height: auto;
  position: relative;
  overflow-y: auto;
  scrollbar-color: var(--color-grey) var(--color-cream);
  scrollbar-width: thin;
  ::-webkit-scrollbar {
    width: 5px;
    border-radius: 3px;
    background-color: var(--color-cream);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: var(--color-grey);
  }
`;

const Form = styled.form`
  padding: 1rem 0;
  position: relative;
`;

const Header = styled.div`
  display: block;
  top: 0;
  left: 0;
  z-index: 10;
  background: var(--color-turquoise);
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid var(--color-black);
  padding: 0.5rem;
  padding-top: 1.5rem;

  h4 {
    font-family: "Editorial";
    text-align: center;
  }
`;

const Close = styled.small`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-family: "Surt";
  cursor: pointer;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 100%;
  display: grid;
  place-items: center;
  transition: var(--transition);

  padding-top: 4px;
  :hover {
    background: #99bfb150;
  }
`;

const Count = styled.div`
  width: 90%;
  margin: 1rem auto;
  margin-bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-black);
`;
const Total = styled.div`
  width: 90%;
  margin: 2rem auto;
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-black);
`;

const Checkout = styled.button`
  display: block;
  width: 90%;
  margin: 1rem auto;
  border: 1px solid var(--color-white) !important;
  border-radius: 10px;
  padding: 1rem 2rem;
  transition: var(--transition);
  background: var(--color-black);

  small {
    margin: 0;
    color: var(--color-cream);
    font-size: 14px;
  }

  :hover {
    filter: brightness(0.8);
  }
  @media (max-width: ${breakpoints.xs}px) {
    small {
      font-size: 12px;
    }
  }
`;

const ClearCart = styled.button`
  display: block;
  width: 90%;
  margin: 1rem auto;
  border: 1px solid var(--color-black) !important;
  border-radius: 10px;
  padding: 1rem 2rem;
  transition: var(--transition);
  background: var(--color-cream);

  small {
    margin: 0;
    color: var(--color-black);
    font-size: 14px;
  }

  :hover {
    filter: brightness(0.8);
  }
`;

const LineItemWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;

  @media (max-width: ${breakpoints.m}px) {
    overflow: auto;
  }
`;

const CheckoutWrapper = styled.div``;

const ItemInner = styled.div`
  max-height: 45vh;
  /* height: 45vh; */
  overflow: auto;
  position: relative;
  display: inline-block;

  scrollbar-color: var(--color-black) var(--color-cream);
  scrollbar-width: thin;
  ::-webkit-scrollbar {
    width: 5px;
    border-radius: 3px;
    background-color: var(--color-cream);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: var(--color-black);
  }
  @media (max-width: ${breakpoints.m}px) {
    /* max-height: none; */
  }
  @media (max-width: ${breakpoints.xs}px) {
    max-height: none;
    height: auto;
  }
`;

const Gradient = styled.div`
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 4rem;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    var(--color-cream) 85%
  );

  @media (max-width: ${breakpoints.xs}px) {
    display: none;
  }
`;

const LineItem = styled.div`
  display: flex;
  margin: 1rem 0;
  padding: 1rem 0;
  padding-top: 0rem;
  border-bottom: 1px solid var(--color-grey);
  width: 97%;

  small {
    color: var(--color-black);
  }

  :last-child {
    margin-bottom: 4rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    :last-child {
      margin-bottom: 2rem;
    }
  }
`;

const ImageWrapper = styled.div`
  height: 100px;
  width: 69px;
  aspect-ratio: 69/100;
`;

const LineItemTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 1rem;

  small {
    display: block;
    font-size: 14px;
    width: 60%;
    color: var(--color-black);
  }
  @media (max-width: ${breakpoints.s}px) {
    small {
      font-size: 12px;
      width: 100%;
    }
  }
`;

const ButtonGroup = styled.div`
  display: block;
  width: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  small {
    text-align: center;
    color: var(--color-black);
  }
`;

const Button = styled.button`
  aspect-ratio: 1/1;
  width: 22px;
  height: 22px;
  border-radius: 100%;
  border: 1px solid var(--color-black) !important;
  background: none;
  color: var(--color-black);
  transition: var(--hover-transition);
  text-align: center;
  :hover {
    background: var(--color-yellow);
    color: var(--static-black);
  }
`;

const NoItemsInCart = styled.div`
  color: var(--color-black);
  width: 80%;
  margin: 2rem auto;
  text-align: center;
`;
