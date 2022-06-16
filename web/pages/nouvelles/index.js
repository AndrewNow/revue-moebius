import { useState, useEffect, useReducer } from "react";
import Link from "next/link";
import styled from "styled-components";
import { client } from "../../lib/sanity/client";
import { footerLogoQuery } from "../../lib/sanity/footerLogoQuery";
import { nouvellesListQuery } from "../../lib/sanity/nouvellesQuery";
import { categoryQuery } from "../../lib/sanity/categoryQuery";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function Nouvelles({ nouvellesList, categories }) {
  //.:*~*:._.:*~*:._.:*~*:._.:*~*
  //
  //  Animation values
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*

  const animateArticles = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };

  //.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:
  //
  //  Logic for filtering the posts according to the toggled filters
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:
  const [activeParams, setActiveParams] = useState([]);
  const [filteredArticleData, setFilteredArticleData] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);

  const handleFilterUpdate = (param) => {
    let currentParams = activeParams;

    let filterItemsByTitle = activeParams.map((item) => item.title);
    // If an item is already clicked, remove it from the array
    if (filterItemsByTitle.includes(param.title)) {
      currentParams = currentParams.filter((item) => {
        return item.title !== param.title;
      });
    } else {
      // Add the item to the array
      currentParams.push(param);
    }
    setActiveParams(currentParams);
    // SelectedCount updates the useEffect, keeping track of the changes to the filter params
    setSelectedCount(currentParams.length);
  };

  useEffect(() => {
    let newData;
    let filterItemsByTitle = activeParams.map((item) => item.title);

    // If no items are in the filter, render ALL the news posts
    if (selectedCount === 0) {
      newData = nouvellesList;
    } else {
      // Else only show the ones that have the filter applied to them
      newData = nouvellesList.filter((item) => {
        if (filterItemsByTitle.includes(item.category[0].title)) {
          return item;
        }
      });
    }
    setFilteredArticleData(newData);
  }, [selectedCount]);

  // Render the buttons for the filter
  function ListFilterButtons() {
    const buttons = categories.map((tag) => {
      let filterItemsByTitle = activeParams.map((item) => item.title);
      let buttonEnabled = filterItemsByTitle.includes(tag.title);

      return (
        <FilterTag
          key={tag.title}
          value={tag.title}
          onClick={() => handleFilterUpdate(tag)}
          style={{
            background: buttonEnabled ? tag.color : "",
            border: buttonEnabled
              ? `1px solid ${tag.color}`
              : "1px solid var(--color-black)",
          }}
        >
          <small style={{ color: buttonEnabled && "var(--static-black)" }}>
            {tag.title}
          </small>
        </FilterTag>
      );
    });
    return <>{buttons}</>;
  }

  // Render articles according to the filtered data (filteredArticleData)
  function ListNewsArticles() {
    const items = filteredArticleData.slice(0, visiblePosts).map((article) => {
      const articleTag = article.category[0];
      return (
        <Article
          key={article._id}
          variants={animateArticles}
          animate="visible"
          exit="hidden"
        >
          <ImageWrapper>
            <Image
              src={article.imageUrl}
              alt="Thumbnail image"
              quality={100}
              width={852}
              height={480}
              layout="responsive"
            />
            <Tag style={{ background: articleTag.color }}>
              <small>{articleTag.title}</small>
            </Tag>
          </ImageWrapper>
          <ArticleLink>
            <Link href={`/nouvelles/${article.slug}`}>{article.title}</Link>
          </ArticleLink>
          <small>{article.publishedAt}</small>
        </Article>
      );
    });
    // Render the articles w/ the associated filter, if none exist then show a placeholder.
    return (
      <>
        {filteredArticleData.length > 0 ? (
          items
        ) : (
          <h5 style={{ color: "var(--color-black)" }}>
            Nous n'avons pas d'articles de ce type pour le moment.
          </h5>
        )}
      </>
    );
  }

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
    visiblePosts >= filteredArticleData.length
      ? filteredArticleData.length
      : visiblePosts;

  return (
    <Main>
      <Header>
        <HeaderText>
          <h1>Nouvelles et événements</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </HeaderText>
      </Header>
      <Inner>
        <CountResults>
          <small>
            Affichage de {countDisplayedPosts} sur {filteredArticleData.length}{" "}
            {filteredArticleData.length > 1 ? "résultats" : "résultat"}
          </small>
        </CountResults>
        <Hr />
        <Filter>
          <small style={{ marginRight: "2rem", color: "var(--color-black)" }}>
            Filtrer par type d'article:
          </small>
          <ListFilterButtons />
        </Filter>
        <ArticleGrid>
          <AnimatePresence>
            <ListNewsArticles />
          </AnimatePresence>
        </ArticleGrid>
        {nouvellesList.length > 6 && (
          <>
            {visiblePosts >= nouvellesList.length ? (
              // if user hits end of news articles, button closes posts
              <LoadMoreButton onClick={handleClosePosts}>
                <small>Afficher moins d'articles</small>
              </LoadMoreButton>
            ) : (
              // Button to open more posts
              <LoadMoreButton onClick={handleLoadNewPosts}>
                <small>Afficher plus d'articles</small>
              </LoadMoreButton>
            )}
          </>
        )}
      </Inner>
    </Main>
  );
}

export async function getStaticProps() {
  const footerLogos = await client.fetch(footerLogoQuery);
  const nouvellesList = await client.fetch(nouvellesListQuery);
  const categories = await client.fetch(categoryQuery);

  return {
    props: {
      nouvellesList,
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
`;

const Hr = styled.span`
  margin-top: 2rem;
  height: 1px;
  width: 100%;
  display: block;
  background: var(--color-black);
`;

const CountResults = styled.div`
  text-align: right;
  margin-top: 3rem;

  color: var(--color-black);
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
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
`;

const ArticleGrid = styled.div`
  margin-top: 5rem;
  margin-bottom: 10rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  width: 100%;
`;

const Article = styled(motion.article)`
  position: relative;
  margin-bottom: 2rem;

  small {
    color: var(--color-black);
  }
`;

const ImageWrapper = styled.div`
  aspect-ratio: 852/480;
  display: block;
  position: relative;
`;

const ArticleLink = styled.h4`
  margin-top: 1rem;

  a {
    color: var(--color-black);
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
`;

const Tag = styled.div`
  position: absolute;
  z-index: 2;
  top: 1rem;
  right: 1rem;
  padding: 10px 18px;
  border-radius: 20px;

  small {
    color: var(--static-black);
  }
`;

const FilterTag = styled.button`
  padding: 10px 18px;
  margin: 0 0.5rem;
  border-radius: 30px;
  transition: var(--transition);
  box-sizing: border-box;

  cursor: pointer;

  small {
    transition: var(--transition);
    color: var(--color-black);
    user-select: none;
  }

  background: var(--color-cream);
  border: 1px solid var(--color-black);
  :hover {
    background: #d9d9d965;
    small {
      color: var(--color-black);
    }
  }
`;

const LoadMoreButton = styled.button`
  display: block;
  margin: 5rem auto;
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
`;