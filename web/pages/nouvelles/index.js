import { useState, useEffect, useReducer, useCallback } from "react";
import Link from "next/link";
import styled from "styled-components";
import { client } from "../../lib/sanity/client";
import { footerLogoQuery } from "../../lib/sanity/footerLogoQuery";
import { nouvellesListQuery } from "../../lib/sanity/nouvellesQuery";
import { categoryQuery } from "../../lib/sanity/categoryQuery";
import Image from "next/image";
import NewsArticles from "../../components/newsArticles";

export default function Nouvelles({ nouvellesList, categories }) {
  //.:*~*:._.:*~*:._.:*~*:._.:*~*
  //
  //  Filtering system state, handlers, etc.
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*

  const [filterParams, setFilterParams] = useState([]);

  const handleButtonClick = (categoryName) => {
    let currentParams = filterParams;

    if (currentParams.includes(categoryName)) {
      currentParams = currentParams.filter((item) => item !== categoryName);
    } else {
      currentParams.push(categoryName);
    }
    setFilterParams(currentParams);
  };

  console.log(filterParams);

  // const filteredNewsArr = nouvellesList;

  // const result = filteredNewsArr.filter(
  //   filterParams.includes(articleTag.title)
  // );

  // console.log(result)

  //.:*~*:._.:*~*:._.:*~*:._.:*~*
  //
  //  Logic for loading more posts
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*

  // Only display 6 posts at first
  const [visiblePosts, setVisiblePosts] = useState(6);

  const MORE_POSTS = 6;

  // When user clicks on the load more button, load 6 more posts (see: MORE_POSTS)
  const handleLoadNewPosts = () =>
    setVisiblePosts((visiblePosts) => visiblePosts + MORE_POSTS);

  // When we reach the end of the array, load more posts button becomes a "close posts" button
  const handleClosePosts = () => setVisiblePosts(6);

  // Fallback for if there are no posts
  if (nouvellesList.length === 0) {
    return <p>Aucun article trouvé.</p>;
  }
  // Counter for the display at the top
  // !!! This probably is buggy and needs work. Should be replaced.
  const countDisplayedPosts =
    visiblePosts >= nouvellesList.length ? nouvellesList.length : visiblePosts;

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
            Affichage de {countDisplayedPosts} sur {nouvellesList.length}{" "}
            résultats
          </small>
        </CountResults>
        <Hr />
        <Filter
        // onSubmit={handleButtonFormSubmit}
        >
          <small style={{ marginRight: "2rem", color: "var(--color-black)" }}>
            Filtrer par type d'article:
          </small>
          {categories.map((tag, i) => {
            // const buttonEnabled = filterState.find(
            //   ({ filterName }) => filterName === tag.title
            // );

            // const buttonEnabled = () => {
            //   return filterParams.includes(tag.title);
            // };

            return (
              <FilterTag
                key={i}
                value={tag.title}
                onClick={() => handleButtonClick(tag.title)}
                // style={{
                //   background: buttonEnabled === true ? tag.color : "",
                //   border:
                //     buttonEnabled === true
                //       ? `1px solid ${tag.color}`
                //       : "1px solid var(--color-black)",
                // }}
              >
                <small>{tag.title}</small>
              </FilterTag>
            );
          })}
        </Filter>
        <ArticleGrid>
          {nouvellesList.slice(0, visiblePosts).map((article) => {
            const articleTag = article.category[0];
            return (
              <Article key={article._id}>
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
                  <Link href={`/nouvelles/${article.slug}`}>
                    {article.title}
                  </Link>
                </ArticleLink>
                <small>{article.publishedAt}</small>
              </Article>
            );
          })}

          {/*
            1. check if filterParams has a length
            if 'yes' loop over all articles and only render those where filterParams.includes(articleTag.title)
            if 'no' return all articles
            
            if filterParams has a length and no articles are available, show placeholder
          */}

          {/* {filterParams.length ? (
            // if filters enabled, only show articles where
            // filterParams.includes(articleTag.title)
            // if no results from that filter, show placeholder
            <NewsArticles
              nouvellesList={nouvellesList}
              visiblePosts={visiblePosts}
              filterParams={filterParams}
            />
          ) : (
            // if no filters enabled, return all articles
            <NewsArticles
              nouvellesList={nouvellesList}
              visiblePosts={visiblePosts}
            />
          )} */}
          {/* <NewsArticles
            nouvellesList={nouvellesList}
            visiblePosts={visiblePosts}
            filterParams={filterParams}
          /> */}
        </ArticleGrid>
        {/* Only show the buttons if there are more than 6 news posts. */}
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

const Article = styled.article`
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
    color: var(--static-black);
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
