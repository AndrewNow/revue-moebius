import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

const NewsArticles = ({ nouvellesList, visiblePosts, filterParams }) => {
  // console.log("filterparams", filterParams);
  return nouvellesList.slice(0, visiblePosts).map((article) => {
    const articleTag = article.category[0];
    return (
      // filterParams.includes(articleTag.title) && (
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
          <Link href={`/nouvelles/${article.slug}`}>{article.title}</Link>
        </ArticleLink>
        <small>{article.publishedAt}</small>
      </Article>
      // )
    );
  });
};

export default NewsArticles;

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
