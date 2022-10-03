import { useRef, useState } from "react";
import { footerLogoQuery } from "../../lib/sanity/footerLogoQuery";
import { client } from "../../lib/sanity/client";
import styled from "styled-components";
import { numeroVenteQuery } from "../../lib/sanity/numeroQuery";
import { boutiqueListQuery } from "../../lib/sanity/boutiqueQuery";
import Boutique from "../../components/boutique/boutique";
import { Inner } from "../index";
import Products from "../../components/products";
import { breakpoints } from "../../utils/breakpoints";
import Abonnements from "../../components/abonnements/abonnements";
import { abonnementQuery } from "../../lib/sanity/abonnementQuery";
import SplitText from "../../utils/splitText";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  textAnim,
  textChild,
  textAnimSlow,
  textAnimFast,
  gridAnim,
  gridChild,
} from "../../styles/animations";
import { LoadMoreButton } from "../nouvelles";
import CountViewMorePosts from "../../utils/countViewMorePosts";

const Vente = ({ numeros, abonnements, boutique }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  //.:*~*:._.:*~*:._.:*~*:._.:*~*
  //
  //  Logic for loading more posts
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*

  // Only display 9 posts at first
  const [visiblePosts, setVisiblePosts] = useState(8);

  // Value to increment more/less posts by
  const MORE_POSTS = 8;

  // When user clicks on the load more button, load 6 more posts (see: MORE_POSTS)
  const handleLoadNewPosts = () =>
    setVisiblePosts((visiblePosts) => visiblePosts + MORE_POSTS);

  // When we reach the end of the array, load more posts button becomes a "close posts" button
  const handleClosePosts = () => setVisiblePosts(8);

  // render the posts after being sliced
  const products = numeros.slice(0, visiblePosts).map((product) => {
    return (
      <motion.span
        variants={gridChild}
        initial="hidden"
        animate="visible"
        exit="hidden"
        key={product._id}
      >
        <Products product={product} />
      </motion.span>
    );
  });

  // Counter to show how many items are rendered
  const countDisplayedPosts =
    visiblePosts >= products.length ? products.length : visiblePosts;

  return (
    <>
      <Header>
        <h1 role="heading">
          <SplitText
            string="Vente"
            variantParent={textAnim}
            variantParentMobile={textAnimSlow}
            variantChild={textChild}
            initial="hidden"
            animate="visible"
          />
        </h1>
        <p role="heading">
          <SplitText
            string="Procurez-vous le tout dernier (ou le tout premier) numéro de la revue."
            variantParent={textAnimFast}
            variantParentMobile={textAnim}
            variantChild={textChild}
            initial="hidden"
            animate="visible"
            isParagraphText={true}
          />
        </p>
      </Header>
      <Content>
        <Inner>
          <Grid
            ref={ref}
            variants={gridAnim}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <AnimatePresence>
              {numeros.length > 0 ? (
                // Render the articles w/ the associated filter.
                products
              ) : (
                // If none exist, then show a placeholder.
                <motion.h5
                  style={{ color: "var(--color-black)" }}
                  variants={animateArticles}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  Nous n'avons pas d'articles pour le moment.
                </motion.h5>
              )}
            </AnimatePresence>
          </Grid>
          <CountViewMorePosts
            dataSource={numeros}
            filteredArticles={products}
            count={countDisplayedPosts}
          />
          {/* only show button when there are articles that correspond. */}
          {visiblePosts >= numeros.length ? (
            // if user hits end of news articles, button closes posts
            <LoadMoreButton onClick={handleClosePosts} layout>
              <small>Afficher moins d'articles</small>
            </LoadMoreButton>
          ) : (
            // Button to open more posts
            <LoadMoreButton onClick={handleLoadNewPosts} layout>
              <small>Afficher plus d'articles</small>
            </LoadMoreButton>
          )}
        </Inner>
      </Content>
      {abonnements.length && <Abonnements abonnements={abonnements} />}
      {boutique.length && <Boutique boutique={boutique} />}
    </>
  );
};

export default Vente;

export async function getStaticProps() {
  const footerLogos = await client.fetch(footerLogoQuery);
  const numeros = await client.fetch(numeroVenteQuery);
  const abonnements = await client.fetch(abonnementQuery);
  const boutique = await client.fetch(boutiqueListQuery);
  return {
    props: {
      footerLogos,
      numeros,
      abonnements,
      boutique,
    },
    revalidate: 10,
  };
}

const Header = styled.div`
  background: var(--color-blue);
  h1 {
    padding-top: 15rem;
  }
  p {
    padding-bottom: 5rem;
  }
  h1,
  p {
    color: var(--static-black);
    text-align: center;
    width: 50%;
    margin: 0 auto;
  }
  @media (max-width: ${breakpoints.m}px) {
    h1 {
      margin-bottom: 2rem;
    }
    p {
      width: 80%;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    h1 {
      margin-bottom: 1rem;
    }
  }
`;

const Content = styled.div`
  padding: 10rem 0;
  @media (max-width: ${breakpoints.xl}px) {
    padding: 7rem 0;
  }
  @media (max-width: ${breakpoints.l}px) {
    padding: 5rem 0;
  }
  @media (max-width: ${breakpoints.s}px) {
    padding: 2.5rem 0;
  }
`;

const Grid = styled(motion.div)`
  width: 90%;
  margin: 0 auto;
  padding-bottom: 2.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 3rem;
  justify-content: center;
  justify-items: center;
  align-items: start;

  @media (max-width: ${breakpoints.xl}px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
  }
  @media (max-width: ${breakpoints.m}px) {
    display: block;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 100%;
    padding-bottom: 1rem;
  }
`;
