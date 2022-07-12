import React from "react";
import styled from "styled-components";
import ConvertDateToString from "../../utils/convertDateToString";
import { blurDataAnimation } from "../../utils/blurDataURLTools";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { breakpoints } from "../../utils/breakpoints";

const Article = ({ article }) => {
  const articleTag = article.category[0];

  return (
    <ArticlePost key={article._id + "article"} layout>
      <ImageWrapper>
        <Link href={`/nouvelles/${article.slug}`}>
          <Image
            src={article.imageUrl}
            alt="Thumbnail image"
            quality={100}
            width={852}
            height={480}
            layout="responsive"
            placeholder="blur"
            blurDataURL={blurDataAnimation(852, 480)}
            className="imageHover"
          />
        </Link>
        <Tag style={{ background: articleTag.color }}>
          <small>{articleTag.title}</small>
        </Tag>
      </ImageWrapper>
      <ArticleLink>
        <Link href={`/nouvelles/${article.slug}`}>{article.title}</Link>
      </ArticleLink>
      <small style={{ color: "var(--color-grey)" }}>
        <ConvertDateToString data={article?.publishedAt} />
      </small>
    </ArticlePost>
  );
};

export default Article;

const ArticlePost = styled(motion.article)`
  position: relative;
  margin-bottom: 2rem;
  small {
    color: var(--color-black);
  }

  @media (max-width: ${breakpoints.l}px) {
    margin-bottom: 3rem;
  }
`;

const ImageWrapper = styled.div`
  aspect-ratio: 852/480;
  display: block;
  position: relative;

  .imageHover {
    cursor: pointer;
    transition: var(--transition-image);
    transform-origin: center;
  }
  :hover {
    .imageHover {
      transform: scale(1.025);
      filter: blur(2px) saturate(110%) brightness(0.9);
    }
  }
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
    white-space: nowrap;
    color: var(--static-black);
  }
`;
