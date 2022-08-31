import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { client } from "../../lib/sanity/client";
import { footerLogoQuery } from "../../lib/sanity/footerLogoQuery";
import { baladoListQuery } from "../../lib/sanity/baladoQuery";
import { Inner } from "../index";
import Image from "next/image";
import Link from "next/link";
import { breakpoints } from "../../utils/breakpoints";
import ConvertDateToString from "../../utils/convertDateToString";
import SplitText from "../../utils/splitText";
import {
  textAnim,
  textAnimSlow,
  textChild,
  textAnimFast,
  textAnimFastest,
  gridAnim,
} from "../../styles/animations";
import { motion, useInView } from "framer-motion";
import CountViewMorePosts from "../../utils/countViewMorePosts";
import { LoadMoreButton } from "../nouvelles";
import BaladoItem from "../../components/baladoItem";

export default function Balado({ baladoData }) {
  //.:*~*:._.:*~*:._.:*~*:._.:*~*:._.:*~**~*:._.:*~*:._.:*~*
  //
  //  Logic for getting the most recent balado for the header section
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*:._.:*~**~*:._.:*~*:._.:*~*
  const [featuredBalado, setFeaturedBalado] = useState(baladoData);

  useEffect(() => {
    let newestBalado = baladoData.splice(0, 1);
    setFeaturedBalado(newestBalado);
  }, []);

  const featured = featuredBalado[0];

  //.:*~*:._.:*~*:._.:*~*:._.:*~*:._.:*~*
  //
  //  Text animation refs
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*:._.:*~*
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.25,
  });

  const ref2 = useRef(null);
  const isInView2 = useInView(ref2, {
    once: true,
  });

  //.:*~*:._.:*~*:._.:*~*:._.:*~*
  //
  //  Logic for loading more posts
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*

  // Only display 6 posts at first
  const [visiblePosts, setVisiblePosts] = useState(6);

  // Value to increment more/less posts by
  const MORE_POSTS = 6;

  // When user clicks on the load more button, load 6 more posts (see: MORE_POSTS)
  const handleLoadNewPosts = () =>
    setVisiblePosts((visiblePosts) => visiblePosts + MORE_POSTS);

  // When we reach the end of the array, load more posts button becomes a "close posts" button
  const handleClosePosts = () => setVisiblePosts(6);

  // render the posts after being sliced
  const filteredArticles = baladoData.slice(0, visiblePosts).map((balado) => {
    return <BaladoItem balado={balado} key={balado._id} />;
  });

  // Counter for the display at the top
  const countDisplayedPosts =
    visiblePosts >= filteredArticles.length
      ? filteredArticles.length
      : visiblePosts;

  return (
    <Main>
      <Inner>
        {featured && (
          <FeaturedBalado>
            <FeaturedText>
              <Tag>
                <small>Nouveauté</small>
              </Tag>
              <h1 role="heading">
                <SplitText
                  string={`Mœbius n°${featured?.number}, `}
                  variantParent={textAnim}
                  variantParentMobile={textAnimSlow}
                  variantChild={textChild}
                  initial="hidden"
                  animate="visible"
                />
                <br />
                <SplitText
                  string={featured?.title}
                  variantParent={textAnim}
                  variantParentMobile={textAnimSlow}
                  variantChild={textChild}
                  initial="hidden"
                  animate="visible"
                />
              </h1>
              <Subtitle>
                <ConvertDateToString data={featured?.publishedAt} />
              </Subtitle>
              <EpisodeLink>
                <Link scroll={false} href={`balado/${featured?.slug}`}>
                  <small>Écouter l'épisode</small>
                </Link>
              </EpisodeLink>
            </FeaturedText>
            <FeaturedImageWrapper style={{ background: featured?.color }}>
              <ColorWrapper>
                {featured?.imageUrl && (
                  <Image
                    src={featured?.imageUrl}
                    alt={`Image couverture pour Moebius-Balado ${featured?.number}`}
                    width={700}
                    height={700}
                    quality={95}
                    priority={true}
                    placeholder="blur"
                    blurDataURL={featured.lqip}
                  />
                )}
              </ColorWrapper>
            </FeaturedImageWrapper>
          </FeaturedBalado>
        )}
        <Header ref={ref}>
          <h4 role="heading">
            <SplitText
              string="Mœbius-balado"
              variantParent={textAnim}
              variantParentMobile={textAnimFast}
              variantChild={textChild}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              isParagraphText={true}
            />
          </h4>
          <p role="heading">
            <SplitText
              string="Afin de poursuivre la mission de Mœbius de favoriser la réflexion
            sur la création littéraire, Mœbius-balado accompagnera chacune des
            parutions de la revue. Mœbius-balado est maintenant disponible sur
            plusieurs plateformes ! Écoutez-le aussi sur Spotify, Anchor et plus
            encore. Merci à Littérature québécoise mobile qui rend possible ce
            projet. Bonne écoute !"
              variantParent={textAnimFastest}
              variantParentMobile={textAnimFastest}
              variantChild={textChild}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              isParagraphText={true}
            />
          </p>
        </Header>
        <Grid
          ref={ref2}
          variants={gridAnim}
          initial="hidden"
          animate={isInView2 ? "visible" : "hidden"}
        >
          {baladoData.length > 0 ? (
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
        </Grid>
        <CountViewMorePosts
          dataSource={baladoData}
          filteredArticles={filteredArticles}
          count={countDisplayedPosts}
        />
        {/* only show button when there are articles that correspond. */}
        {visiblePosts >= baladoData.length ? (
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
    </Main>
  );
}

export async function getStaticProps() {
  const footerLogos = await client.fetch(footerLogoQuery);
  const baladoData = await client.fetch(baladoListQuery);

  return {
    props: {
      footerLogos,
      baladoData,
    },
    revalidate: 10,
  };
}

const FeaturedBalado = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding-top: 15vh;
  padding-bottom: 5vh;
  width: 90%;
  @media (max-width: ${breakpoints.xl}px) {
    padding-top: 20vh;
  }
  @media (max-width: ${breakpoints.l}px) {
    display: block;
    width: 100%;
    margin: 0 auto;
  }
`;

const FeaturedText = styled.div`
  position: relative;
  display: block;
  max-width: 70%;
  h1 {
    margin: 1rem 0;
    color: var(--color-black);
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 100%;
    max-width: none;
    text-align: center;
  }
  @media (max-width: ${breakpoints.m}px) {
    br {
      display: none;
    }
  }
`;

const Subtitle = styled.small`
  margin: 0.5rem auto;
  margin-bottom: 2rem;
  color: var(--color-grey);
  display: block;

  @media (max-width: ${breakpoints.l}px) {
    margin-bottom: 0.5rem;
  }
`;

const Tag = styled.div`
  display: inline-block;
  padding: 10px 18px;
  margin: 0 0.5rem;
  border-radius: 30px;
  transition: var(--transition);
  box-sizing: border-box;
  /* border: 1px solid var(--static-black) !important; */
  background: var(--color-yellow) !important;

  small {
    transition: var(--transition);
    color: var(--static-black);
    user-select: none;
    line-height: 100%;
  }
`;
const FeaturedImageWrapper = styled.div`
  position: relative;
  max-width: 45%;
  margin-left: 2rem;
  aspect-ratio: 1/1;
  display: grid;
  place-items: center;

  @media (max-width: ${breakpoints.l}px) {
    max-width: 60%;
    margin: 0 auto;
    margin-top: 2rem;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 80%;
    max-width: none;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 90%;
  }
`;

const Header = styled.header`
  padding: 5rem 0;
  border-bottom: 1px solid var(--color-black);
  border-top: 1px solid var(--color-black);

  h4,
  p {
    text-align: center;
    margin: 0 auto;
    width: 60%;
    color: var(--color-black);
  }
  h4 {
    margin: 2rem auto;
    margin-top: 0;
  }

  @media (max-width: ${breakpoints.l}px) {
    padding: 3rem 0;
    p {
      width: 100%;
    }
  }
`;

const Main = styled.div`
  background-color: var(--color-cream);
  transition: var(--transition);
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2rem;
  padding: 5rem 0;

  @media (max-width: ${breakpoints.xl}px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${breakpoints.l}px) {
    grid-template-columns: 1fr;
    place-items: center;
    row-gap: 5rem;
  }
`;

const ColorWrapper = styled.div`
  width: 90%;
  height: 90%;
`;

const Item = styled(motion.div)`
  text-align: center;
  max-width: 500px;
  small,
  h4 {
    display: block;
  }
  small {
    margin: 2rem auto;
    color: var(--color-grey);
  }
  h4 {
    color: var(--color-black);
    margin: 1rem auto;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 90%;
    small {
      margin-bottom: 0;
    }
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  position: relative;
  display: grid;
  place-items: center;
`;

const EpisodeLink = styled.div`
  margin: 1rem auto;
  border: 1px solid var(--color-black);
  display: inline-block;
  border-radius: 10px;
  cursor: pointer;
  transition: var(--transition);
  small {
    transition: var(--transition);
    display: inline-block;
    padding: 1rem 4rem;
    margin: 0;
    color: var(--color-black);
  }
  :hover {
    background: var(--color-turquoise);
    border: 1px solid transparent;
    small {
      color: var(--static-black);
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    background: var(--color-turquoise);
    border: 1px solid transparent;
    small {
      color: var(--static-black);
    }
  }
`;
