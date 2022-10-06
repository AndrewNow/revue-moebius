import { useState, useEffect } from "react";
import styled from "styled-components";
import { client } from "../../lib/sanity/client";
import { footerLogoQuery } from "../../lib/sanity/footerLogoQuery";
import { nouvellesListQuery } from "../../lib/sanity/nouvellesQuery";
import { categoryQuery } from "../../lib/sanity/categoryQuery";
import { motion } from "framer-motion";
import { breakpoints } from "../../utils/breakpoints";
import Article from "../../components/nouvellesFilter/article";
import Filter from "../../components/nouvellesFilter/filter";
import SplitText from "../../utils/splitText";
import {
  textAnim,
  textChild,
  textAnimSlow,
  textAnimFast,
} from "../../styles/animations";
import CountViewMorePosts from "../../utils/countViewMorePosts";
import Head from "next/head";

export default function Nouvelles({ nouvellesData, categories }) {
  //.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:._
  //
  //  Create state for filtering articles. Pass these as props
  //  into < Filter />, where the filtering operation happens.
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:._
  const [filtered, setFiltered] = useState([]);
  const [activeFilter, setActiveFilter] = useState([]);

  useEffect(() => {
    // On load, create a copy of the nouvelles query data
    setFiltered(nouvellesData);
  }, []);

  //.:*~*:._.:*~*:._.:*~*:._.:*~*
  //
  //  Logic for loading more posts
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*

  // Only display 6 posts at first
  const [visiblePosts, setVisiblePosts] = useState(6);

  // Value to increment more/less posts by
  const MORE_POSTS = 4;

  // When user clicks on the load more button, load 6 more posts (see: MORE_POSTS)
  const handleLoadNewPosts = () =>
    setVisiblePosts((visiblePosts) => visiblePosts + MORE_POSTS);

  // When we reach the end of the array, load more posts button becomes a "close posts" button
  const handleClosePosts = () => setVisiblePosts(6);

  // Counter for the display at the top
  const countDisplayedPosts =
    visiblePosts >= filtered.length ? filtered.length : visiblePosts;

  // render the posts after being sliced
  const filteredArticles = filtered.slice(0, visiblePosts).map((data) => {
    return <Article article={data} key={data._id} />;
  });

  //.:*~*:._.:*~*:._.:*~*:._.:*~*
  //
  //  Animation values
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*
  const animateArticles = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        delay: 0.25,
        ease: [0.25, 0, 0.35, 1],
      },
    },
    hidden: {
      y: 20,
      opacity: 0,
      transition: {
        duration: 0.45,
        ease: [0.25, 0, 0.35, 1],
      },
    },
  };

  return (
    <>
      <Head>
        <title>Restez à l’affût de nos activités</title>
        <meta property="og:title" content="Restez à l’affût de nos activités" />
        <meta
          property="og:description"
          content="Retrouvez les captations d'événements passés aussi bien que les toutes dernières nouvelles de la revue. Suivez-nous sur nos réseaux afin de ne rien manquer : appels de texte, lancements, tables rondes, concours et plus encore."
        />
        <meta
          name="description"
          content="Retrouvez les captations d'événements passés aussi bien que les toutes dernières nouvelles de la revue. Suivez-nous sur nos réseaux afin de ne rien manquer : appels de texte, lancements, tables rondes, concours et plus encore."
        />
      </Head>
      <Main>
        <Header>
          <HeaderText>
            <h1>
              <SplitText
                string="Nouvelles et événements"
                variantParent={textAnim}
                variantParentMobile={textAnimSlow}
                variantChild={textChild}
                initial="hidden"
                animate="visible"
              />
            </h1>
            <p>
              <SplitText
                string="Retrouvez les captations d'événements passés aussi bien que les
              toutes dernières nouvelles de la revue."
                variantParent={textAnimFast}
                variantParentMobile={textAnim}
                variantChild={textChild}
                initial="hidden"
                animate="visible"
                isParagraphText={true}
              />
            </p>
          </HeaderText>
        </Header>
        <Inner>
          <WrapFilter>
            <CountResults>
              <small>
                Affichage de {countDisplayedPosts} sur {filtered.length}{" "}
                {filtered.length > 1 || filtered.length === 0
                  ? "résultats"
                  : "résultat"}
              </small>
            </CountResults>
            <Filter
              categories={categories}
              nouvellesData={nouvellesData}
              setFiltered={setFiltered}
              setActiveFilter={setActiveFilter}
              activeFilter={activeFilter}
            />
          </WrapFilter>
          <ArticleGrid layout layoutId="article">
            {filtered.length > 0 ? (
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
                Nous n'avons pas d'articles de ce type pour le moment.
              </motion.h5>
            )}
          </ArticleGrid>
          {/* only show button when there are articles that correspond. */}
          {filtered.length > 6 ? (
            <>
              <CountViewMorePosts
                dataSource={nouvellesData}
                filteredArticles={filteredArticles}
                count={countDisplayedPosts}
              />
              {visiblePosts >= nouvellesData.length ? (
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
            </>
          ) : null}
        </Inner>
      </Main>
    </>
  );
}

export async function getStaticProps() {
  const footerLogos = await client.fetch(footerLogoQuery);
  const nouvellesData = await client.fetch(nouvellesListQuery);
  const categories = await client.fetch(categoryQuery);

  return {
    props: {
      nouvellesData,
      footerLogos,
      categories,
    },
    revalidate: 10,
  };
}

const Main = styled.div`
  background-color: var(--color-cream);
  transition: var(--transition);
`;

const Inner = styled.div`
  width: 92.5%;
  margin: 0 auto;
    @media (max-width: ${breakpoints.s}px) {
      padding-bottom: 3rem;
    }
`;

const WrapFilter = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: ${breakpoints.l}px) {
    flex-direction: column-reverse;
  }
`;

const CountResults = styled.div`
  text-align: right;
  margin-top: 3rem;
  color: var(--color-black);

  @media (max-width: ${breakpoints.l}px) {
    margin-top: 2rem;
    text-align: center;
    small {
      font-family: "Simula";
      text-transform: none;
      letter-spacing: 0.01rem;
      /* font-size: 14px; */
      color: var(--color-grey);
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-top: 2rem;
  }
`;

const Header = styled.header`
  padding-top: 20vh;
  margin: 0;
  color: var(--static-black);
  background: var(--color-yellow);
  transition: var(--transition);
`;

const HeaderText = styled.div`
  text-align: center;
  padding: 5rem 0;

  p {
    max-width: 40%;
    margin: 0 auto;
  }
  @media (max-width: ${breakpoints.l}px) {
    h1 {
      margin-bottom: 2rem;
    }
    p {
      max-width: none;
      width: 70%;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    p {
      max-width: none;
      width: 90%;
    }
  }
`;

const ArticleGrid = styled(motion.div)`
  margin-top: 5rem;
  margin-bottom: 10rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  width: 100%;

  @media (max-width: ${breakpoints.l}px) {
    display: block;
    margin: 3rem auto;
  }
  @media (max-width: ${breakpoints.s}px) {
    margin: 2rem auto;
  }
`;

export const LoadMoreButton = styled.button`
  display: block;
  margin: 5rem auto;
  margin-top: 2rem;
  padding: 1rem 5rem;
  border-radius: 10px;
  text-align: center;

  background: none;
  border: none;
  border: 1px solid var(--color-black) !important;

  transition: var(--transition);
  cursor: pointer;

  small {
    color: var(--color-black);
  }
  :hover {
    border: 1px solid var(--color-turquoise) !important;
    background: var(--color-turquoise);
    small {
      color: var(--static-black);
    }
  }

  :disabled {
    border: 1px solid var(--color-grey) !important;
    cursor: not-allowed;
    small {
      color: var(--color-grey);
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    margin: 2rem auto;
    padding: 1rem 3rem;
  }
`;
