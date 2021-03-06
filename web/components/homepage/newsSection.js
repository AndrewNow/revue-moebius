import { useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { breakpoints } from "../../utils/breakpoints";
import ConvertDateToString from "../../utils/convertDateToString";
import { motion, useInView } from "framer-motion";
import { textAnim, textChild, textAnimSlow } from "../../styles/animations";
import SplitText from "../../utils/splitText";

const NewsSection = ({ newsFeed, featuredArticle }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <Header>
        <h3 ref={ref} role="heading">
          <SplitText
            string="Nouvelles"
            variantParent={textAnim}
            variantParentMobile={textAnimSlow}
            variantChild={textChild}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />
        </h3>
        <small>
          <Link href="/nouvelles">voir tous les nouvelles →</Link>
        </small>
      </Header>
      <Articles>
        <FeaturedArticle>
          <FeaturedArticleImg>
            <Link href={`/nouvelles/${featuredArticle.slug}`}>
              <Image
                src={featuredArticle.imageUrl}
                alt={featuredArticle.title}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL={featuredArticle.lqip}
                className="imageHover"
              />
            </Link>
            <FeaturedTag
              style={{ background: featuredArticle.category[0].color }}
            >
              <small>{featuredArticle.category[0].title}</small>
            </FeaturedTag>
          </FeaturedArticleImg>
          <FeaturedArticleText>
            <h4>
              <Link href={`/nouvelles/${featuredArticle.slug}`}>
                {featuredArticle.title}
              </Link>
            </h4>
            <small>
              <ConvertDateToString data={featuredArticle.publishedAt} />
            </small>
          </FeaturedArticleText>
        </FeaturedArticle>
        <ArticleFeed>
          {newsFeed.slice(0, 6).map((article) => {
            const articleTag = article.category[0];
            return (
              <Article key={article._id}>
                <ArticleImg>
                  <Link href={`/nouvelles/${article.slug}`}>
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      layout="fill"
                      objectFit="cover"
                      placeholder="blur"
                      blurDataURL={article.lqip}
                      className="imageHover"
                    />
                  </Link>
                  <FeedTag style={{ background: articleTag.color }}>
                    <small>{articleTag.title}</small>
                  </FeedTag>
                </ArticleImg>
                <ArticleText>
                  <h5>
                    <Link href={`/nouvelles/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h5>
                  <small>
                    <ConvertDateToString data={article.publishedAt} />
                  </small>
                </ArticleText>
              </Article>
            );
          })}
        </ArticleFeed>
      </Articles>
    </>
  );
};

export default NewsSection;

const Header = styled.header`
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 1rem;
  margin-top: 3rem;
  border-top: 1px solid var(--color-black);
  border-bottom: 1px solid var(--color-black);
  transition: var(--transition);

  display: flex;
  justify-content: space-between;
  align-items: baseline;
  /* scroll-padding: 0 24px; */

  h3,
  small,
  a {
    color: var(--color-black);
  }
  @media (max-width: ${breakpoints.s}px) {
    align-items: center;
    small {
      font-size: 12px;
    }
  }
`;

const Articles = styled.div`
  border-bottom: 1px solid var(--color-black);
  display: flex;
  @media (max-width: ${breakpoints.l}px) {
    flex-direction: column;
  }
`;

const FeaturedArticle = styled.div`
  padding: 2rem 0;
  position: relative;
  width: 60%;
  border-right: 1px solid var(--color-black);
  @media (max-width: ${breakpoints.l}px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--color-black);
  }
`;

const FeaturedArticleImg = styled.div`
  aspect-ratio: 852/480;
  display: block;
  position: relative;
  margin-right: 2rem;
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
  @media (max-width: ${breakpoints.l}px) {
    margin-right: 0;
  }
`;

const FeaturedArticleText = styled.div`
  margin-top: 2rem;
  color: var(--color-black);
  small {
    color: var(--color-grey);
  }

  h4 > a {
    color: var(--color-black);
    text-decoration: none;
  }
  :hover {
    h4 > a {
      text-decoration: underline;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    small {
      font-size: 12px;
    }
  }
`;

const FeaturedTag = styled.div`
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

const ArticleFeed = styled.div`
  width: 40%;
  height: 780px;
  /* height: 100%; */
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  @media (max-width: 1500px) {
    height: 670px;
  }
  @media (max-width: ${breakpoints.xxl}px) {
    width: 45%;
    height: 620px;
  }
  @media (max-width: ${breakpoints.xl}px) {
    height: 530px;
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 100%;
    height: 320px;
  }
`;

const Article = styled.article`
  scroll-snap-align: start;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem 0;
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid var(--color-black);
  :last-child {
    border-bottom: none;
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 100%;
  }
`;

const ArticleImg = styled.div`
  position: relative;
  aspect-ratio: 1/1;
  max-width: 45%;
  min-width: 45%;
  /* width: 275px; */
  height: auto;

  .imageHover {
    transition: var(--transition-image);
    transform-origin: center;
    cursor: pointer;
  }
  :hover {
    .imageHover {
      /* scale: 1.05; */
      transform: scale(1.125);
      filter: blur(2px) saturate(110%) brightness(0.9);
    }
  }

  @media (max-width: ${breakpoints.xxl}px) {
    min-width: 225px;
    width: 225px;
  }
  @media (max-width: ${breakpoints.xl}px) {
    min-width: 40%;
    width: 40%;
  }
  @media (max-width: ${breakpoints.l}px) {
    min-width: 22%;
    width: 22%;
  }
  @media (max-width: ${breakpoints.m}px) {
    min-width: 180px;
    width: 180px;
  }
  @media (max-width: ${breakpoints.s}px) {
    max-width: 35%;
    min-width: 150px;
  }
`;

const ArticleText = styled.div`
  padding-left: 2rem;
  h5 {
    margin-bottom: 1rem;
    font-family: "Editorial";
    font-size: 30px;
    a {
      color: var(--color-black);
      text-decoration: none;
    }
  }
  small {
    color: var(--color-grey);
  }
  :hover {
    h5 > a {
      text-decoration: underline;
    }
  }
  @media (max-width: ${breakpoints.xxl}px) {
    padding-left: 1rem;
    h5 {
      font-size: 27px;
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    h5 {
      font-size: 24px;
    }
    small {
      font-size: 14px;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    padding-left: 2rem;
    h5 {
      font-size: 35px;
    }
    small {
      font-size: 16px;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    padding-left: 1rem;
    h5 {
      font-size: 27px;
    }
    small {
      font-size: 14px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    h5 {
      font-size: 24px;
    }
    small {
      font-size: 12px;
    }
  }
`;

const FeedTag = styled.div`
  position: absolute;
  z-index: 2;
  top: 1rem;
  left: 1rem;
  padding: 10px 18px;
  border-radius: 20px;

  small {
    color: var(--static-black);
  }
  @media (max-width: ${breakpoints.xl}px) {
    top: 7px;
    left: 7px;
    padding: 5px 7px;
    small {
      font-size: 14px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    top: 5px;
    left: 5px;
    padding: 5px 7px;
    small {
      font-size: 12px;
    }
  }
`;
