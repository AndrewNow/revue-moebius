import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
  Highlight,
  useInstantSearch,
} from "react-instantsearch-hooks-web";
import Image from "next/image";
import styled from "styled-components";
import "instantsearch.css/themes/reset.css";
import Link from "next/link";
import { SearchIcon } from "../../svg/icons";
import { breakpoints } from "../../utils/breakpoints";
import { motion, AnimatePresence } from "framer-motion";
import { NoResults } from "./noResults";

const algoliaClient = algoliasearch(
  // process.env.ALGOLIA_APPLICATION_ID,
  // process.env.ALGOLIA_SEARCH_KEY
  "I74N1FJC69",
  "e5ebac56d6781f95f6eb5d3d68bf9d3d",
  {
    _useRequestCache: true,
  }
);

// Prevent search on page load. Only fire a request when a user begins typing.
// https://github.com/algolia/react-instantsearch/issues/1111#issuecomment-414239919

const searchClient = {
  search(requests) {
    const shouldSearch = requests.some(({ params: { query } }) => query !== "");
    if (shouldSearch) {
      return algoliaClient.search(requests);
    }
    return Promise.resolve({
      results: [{ hits: [] }],
    });
  },
  searchForFacetValues: algoliaClient.searchForFacetValues,
};

// Debounce the search by 200ms
let DEBOUNCE_TIME = 200;
let timerId = undefined;

function queryHook(query, search) {
  if (timerId) {
    clearTimeout(timerId);
  }

  timerId = setTimeout(() => search(query), DEBOUNCE_TIME);
}

function NoResultsBoundary({ children, fallback }) {
  const { results } = useInstantSearch();

  // The `__isArtificial` flag makes sure to not display the No Results message
  // when no hits have been returned yet.
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    );
  }
  return children;
}


console.log()

export const AlgoliaSearch = ({ setOpen, isOpen }) => {
  return (
    <InstantSearch searchClient={searchClient} indexName="MOEBIUS_PRODUCTION">
      <Configure hitsPerPage={4} />
      <SearchParent layout>
        <SearchIcon className="icon" />
        <SearchBox
          queryHook={queryHook}
          placeholder="Tapez pour rechercher..."
          classNames={{
            root: "searchRoot",
            form: "searchForm",
            input: "searchInput",
            submitIcon: "searchSubmitIcon",
            resetIcon: "searchResetIcon",
          }}
          submitIconComponent={() => <></>}
          // disabled loading icon, we don't really need one (it's also tricky to style).
          // resetIconComponent={() => <></>}
          loadingIconComponent={() => <></>}
        />
      </SearchParent>
      <AnimatePresence exitBeforeEnter>
        <HitWrapper
          layout
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.25,
          }}
          exit={{ y: 20, opacity: 0 }}
          key="hitWrap"
        >
          <NoResultsBoundary fallback={<NoResults />}>
            <Hits
              hitComponent={({ hit }) => (
                <Hit hit={hit} setOpen={setOpen} isOpen={isOpen} />
              )}
            />
          </NoResultsBoundary>
        </HitWrapper>
      </AnimatePresence>
    </InstantSearch>
  );
};

const SearchParent = styled(motion.span)`
  min-height: 40px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  padding: 10px;

  border-bottom: 1px solid var(--static-cream);
  background: var(--color-clay);

  .searchRoot {
    width: 95%;
    position: relative;
  }
  .searchForm {
    width: 100%;
    display: flex;
    align-items: flex-end;
    position: relative;
    padding-left: 15px;
  }
  .searchInput {
    width: 95%;
    height: 100%;
    box-sizing: border-box;
    background: none;
    border: none;
    color: var(--static-cream);
    padding: 0;
    text-transform: uppercase;
    letter-spacing: 0.015rem;
    font-weight: 100 !important;
    font-family: "Surt";
    line-height: 100%;

    ::placeholder {
      font-family: "Surt";
      line-height: 100%;
      color: #c9c9c9c9;
    }
    :focus {
      outline: none;
    }
  }

  .ais-SearchBox-submit {
    display: none;
  }

  .ais-SearchBox-reset {
    min-width: 5%;
    svg {
      fill: var(--static-cream);
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    border-bottom: none;
  }
`;

const HitWrapper = styled(motion.div)``;

const Hit = ({ hit, setOpen, isOpen }) => {
  //  Style category tag
  let categoryColor = "var(--static-cream)";
  let categoryUrl = null;

  if (hit._type === "numero") {
    // if error, make status red
    categoryColor = "#BE869D";
    categoryUrl = "/numeros/";
  }
  if (hit._type === "balado") {
    // if error, make status red
    categoryColor = "#B8E8D6";
    categoryUrl = "/balado/";
  }
  if (hit._type === "nouvelles") {
    // if error, make status red
    categoryColor = "var(--color-yellow)";
    categoryUrl = "/nouvelles/";
  }
  if (hit._type === "archive") {
    // if error, make status red
    categoryColor = "var(--color-blue)";
    categoryUrl = "/numeros/archive/";
  }

  return (
    <HitArticle
      layout
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        ease: "easeInOut",
        duration: 0.25,
      }}
      exit={{ y: 20, opacity: 0 }}
    >
      <ImageWrapper>
        <Image
          src={hit.imageUrl}
          alt={hit.title}
          width={75}
          height={75}
          quality={20}
          // layout="fill"
          objectFit="contain"
          // objectPosition="top"
          placeholder="blur"
          blurDataURL={hit.lqip}
        />
      </ImageWrapper>
      <TextWrapper>
        <TagWrapper>
          <Tag
            style={{ background: categoryColor }}
            onClick={() => setOpen(!isOpen)}
          >
            <Link scroll={false} href={categoryUrl}>
              <small>{hit._type}</small>
            </Link>
          </Tag>
          {hit.number && (
            <>
              <small style={{ color: "#c9c9c9" }}>
                édition N°
                <Highlight
                  attribute="number"
                  hit={hit}
                  classNames={{
                    root: "number-highlight",
                    highlighted: "number-highlighted",
                  }}
                />
              </small>
              <br />
            </>
          )}
        </TagWrapper>
        <br />
        <span onClick={() => setOpen(!isOpen)}>
          <Link scroll={false} href={categoryUrl + hit.slug}>
            <Title>
              <Highlight
                attribute="title"
                hit={hit}
                classNames={{
                  root: "highlight",
                  highlighted: "highlighted",
                }}
              />
            </Title>
          </Link>
        </span>
      </TextWrapper>
    </HitArticle>
  );
};

const HitArticle = styled(motion.article)`
  border-bottom: 1px dotted var(--static-cream);
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
`;

const ImageWrapper = styled.div`
  position: relative;
  display: block;
  width: 25%;
  max-height: 100px;
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.15));
`;

const TextWrapper = styled.div`
  width: 75%;
  margin: 0 0.5rem;
  display: inline-flex;
  flex-direction: column;

  small {
    color: var(--static-cream);
    font-size: 12px;
    line-height: 100%;
  }

  @media (max-width: ${breakpoints.s}px) {
    small {
      font-size: 10px !important;
    }
  }
`;

const TagWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  small {
    display: block;
    padding: 0.15rem 0;
    line-height: 100%;
  }

  .number-highlighted {
    background: var(--color-turquoise);
    color: var(--static-black);
  }

  .number-highlight {
    color: #c9c9c9c9;
  }
`;

const Tag = styled.div`
  padding: 3px 10px;
  margin-right: auto;
  border-radius: 30px;
  transition: var(--transition);
  box-sizing: border-box;
  cursor: pointer;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.05));

  small {
    line-height: 100%;
    white-space: nowrap;
    transition: var(--transition);
    color: var(--color-black);
    user-select: none;
  }
  :hover {
    transition: var(--transition);
    filter: brightness(0.9);
  }

  @media (max-width: ${breakpoints.s}px) {
    small {
      font-size: 10px !important;
    }
  }
`;

const Title = styled.div`
  margin-top: 0.5rem;
  color: var(--static-cream);
  line-height: 80%;

  cursor: pointer;

  :hover {
    text-decoration: underline;
  }

  .highlight {
    font-size: 12px;
    font-family: "IBM-Plex-Regular";
    text-transform: uppercase;
    color: var(--static-cream);
  }
  .highlighted {
    background: var(--color-turquoise);
    color: var(--static-black);
  }

  @media (max-width: ${breakpoints.s}px) {
    font-size: 11px;
    line-height: 140%;
    .highlight {
      font-size: 11px;
    }
  }
`;
