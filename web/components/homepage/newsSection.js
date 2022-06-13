import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const NewsSection = ({ newsFeed, featuredArticle }) => {
  return (
    <>
      <Header>
        <h3>Nouvelles</h3>
      </Header>
      <Articles>
        <FeaturedArticle>
          <FeaturedArticleImg>
            <Image
              src={featuredArticle.imageUrl}
              alt={featuredArticle.title}
              layout="fill"
              objectFit="cover"
            />
            <FeaturedTag
              style={{ background: featuredArticle.category[0].color }}
            >
              <small>{featuredArticle.category[0].title}</small>
            </FeaturedTag>
          </FeaturedArticleImg>
          <FeaturedArticleText>
            <h4>
              <Link href={`nouvelles/${featuredArticle.slug}`}>
                {featuredArticle.title}
              </Link>
            </h4>
            <small>{featuredArticle.publishedAt}</small>
          </FeaturedArticleText>
        </FeaturedArticle>
        <ArticleFeed>
          {newsFeed.map((article) => {
            const articleTag = article.category[0];
            return (
              <Article key={article._id}>
                <ArticleImg>
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                  />
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
                  <small>{article.publishedAt}</small>
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
  h3 {
    color: var(--color-black);
  }
`;

const Articles = styled.div`
  border-bottom: 1px solid var(--color-black);
  display: flex;
`;

const FeaturedArticle = styled.div`
  padding: 2rem 0;
  position: relative;
  width: 60%;
  border-right: 1px solid var(--color-black);
`;

const FeaturedArticleImg = styled.div`
  aspect-ratio: 852/480;
  display: block;
  position: relative;
  margin-right: 2rem;
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
`;

const ArticleImg = styled.div`
  position: relative;
  aspect-ratio: 1/1;
  width: 275px;
  height: 275px;
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
`;
