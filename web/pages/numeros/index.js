import { useState, useRef } from "react";
import { client } from "../../lib/sanity/client";
import styled from "styled-components";
import { footerLogoQuery } from "../../lib/sanity/footerLogoQuery";
import { Inner } from "../../pages/index";
import { numeroPageQuery } from "../../lib/sanity/numeroQuery";
import { breakpoints } from "../../utils/breakpoints";
import NumeroItem from "../../components/numeroItem";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SplitText from "../../utils/splitText";
import {
  textChild,
  textAnim,
  textAnimSlow,
  textAnimSlower,
  gridAnim,
  gridChild,
} from "../../styles/animations";
import { LoadMoreButton } from "../nouvelles";
import CountViewMorePosts from "../../utils/countViewMorePosts";
import Head from "next/head";

const Numeros = ({ numeroData }) => {
  //.:*~*:._.:*~*:._.:*~*:._.:*~*
  //
  //  Refs for text animations
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const ref2 = useRef(null);
  const isInView2 = useInView(ref2, { once: true });

  //.:*~*:._.:*~*:._.:*~*:._.:*~*
  //
  //  Logic for loading more posts
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*

  // Only display 9 posts at first
  const [visiblePosts, setVisiblePosts] = useState(9);

  // Value to increment more/less posts by
  const MORE_POSTS = 6;

  // When user clicks on the load more button, load 6 more posts (see: MORE_POSTS)
  const handleLoadNewPosts = () =>
    setVisiblePosts((visiblePosts) => visiblePosts + MORE_POSTS);

  // When we reach the end of the array, load more posts button becomes a "close posts" button
  const handleClosePosts = () => setVisiblePosts(6);

  // render the posts after being sliced
  const filteredArticles = numeroData.slice(0, visiblePosts).map((numero) => {
    return (
      <motion.span
        key={numero._id}
        variants={gridChild}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <NumeroItem numero={numero} key={numero._id} />
      </motion.span>
    );
  });

  // Counter to show how many items are rendered 
  const countDisplayedPosts =
    visiblePosts >= filteredArticles.length
      ? filteredArticles.length
      : visiblePosts;

  return (
    <>
      <Head>
        <meta
          property="og:title"
          content="Retrouvez tous les numéros de la revue Mœbius"
          key="title"
        />
        <meta
          property="og:description"
          content="Survolez les archives de la revue. Notre catalogue vous permet de revisiter nos numéros, des plus anciens aux plus récents. "
          key="description"
        />
      </Head>
      <Header>
        <Inner>
          <h1 ref={ref} role="heading">
            <SplitText
              string="Survolez tous les numéros de la revue."
              variantParent={textAnim}
              variantParentMobile={textAnimSlow}
              variantChild={textChild}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            />
          </h1>
        </Inner>
      </Header>
      <Inner>
        <Content>
          <ContentHeader>
            <h1 ref={ref2} role="heading">
              <SplitText
                string="Numéros récents"
                variantParent={textAnim}
                variantParentMobile={textAnimSlower}
                variantChild={textChild}
                initial="hidden"
                animate={isInView2 ? "visible" : "hidden"}
              />
            </h1>
          </ContentHeader>
          <Grid
            variants={gridAnim}
            intial="hidden"
            animate={isInView2 ? "visible" : "hidden"}
          >
            <AnimatePresence>
              {numeroData.length > 0 ? (
                // Render the articles w/ the associated filter.
                filteredArticles
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
            dataSource={numeroData}
            filteredArticles={filteredArticles}
            count={countDisplayedPosts}
          />
          {/* only show button when there are articles that correspond. */}
          {visiblePosts >= numeroData.length ? (
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
        </Content>
      </Inner>
    </>
  );
};

export default Numeros;

export async function getStaticProps() {
  const footerLogos = await client.fetch(footerLogoQuery);
  const numeroData = await client.fetch(numeroPageQuery);

  return {
    props: {
      footerLogos,
      numeroData,
    },
    revalidate: 10,
  };
}

const Header = styled.header`
  background: var(--color-purple);
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  z-index: 5;
  h1 {
    color: var(--static-cream);
    max-width: 70%;
    margin-bottom: 3rem;
  }
  @media (max-width: ${breakpoints.xl}px) {
    height: 80vh;
  }
  @media (max-width: ${breakpoints.m}px) {
    height: 70vh;
    /* padding-top: 25vh; */
    h1 {
      max-width: none;
      width: 100%;
    }
  }
`;

const Content = styled.section`
  margin: 10rem 0;
  position: relative;
  z-index: 5;

  @media (max-width: ${breakpoints.m}px) {
    margin: 5rem 0;
  }
`;

const ContentHeader = styled.div`
  text-align: center;
  border-bottom: 1px solid var(--color-black);
  margin-bottom: 1rem;
  h1 {
    color: var(--color-black);
  }
`;

const Grid = styled(motion.div)`
  display: grid;
  justify-content: center;
  justify-items: center;
  align-items: start;
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: ${breakpoints.l}px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: ${breakpoints.s}px) {
    display: block;
  }
`;
