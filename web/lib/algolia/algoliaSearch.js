import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
  Highlight,
} from "react-instantsearch-hooks-web";
import Image from "next/image";
import styled from "styled-components";
import "instantsearch.css/themes/reset.css";
import Link from "next/link";
import { SearchIcon } from "../../svg/icons";
import { breakpoints } from "../../utils/breakpoints";

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

export const AlgoliaSearch = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName="MOEBIUS_PRODUCTION">
      <Configure hitsPerPage={4} />
      <SearchParent>
        <SearchBox
          placeholder="Tapez pour rechercher..."
          classNames={{
            root: "searchRoot",
            form: "searchForm",
            input: "searchInput",
            resetIcon: "searchResetUcib",
          }}
          submitIconComponent={() => <SearchIcon className="icon" />}
          // disabled reset and loading icons, we don't really need those.
          resetIconComponent={() => <></>}
          loadingIconComponent={() => <></>}
        />
      </SearchParent>
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
};

const SearchParent = styled.span`
  .searchRoot {
    border-bottom: 1px solid var(--static-cream);
    position: relative;
  }
  .searchForm {
    /* display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    position: relative; */
  }
  .searchInput {
    box-sizing: border-box;
    width: 90%;
    background: none;
    border: none;
    padding: 10px 15px;
    padding-top: 0;
    color: var(--static-cream);

    text-transform: uppercase;
    letter-spacing: 0.015rem;
    font-weight: 100 !important;
    font-family: "Surt";
    line-height: 100%;

    ::placeholder {
      font-family: "Surt";
      color: #c9c9c9c9;
    }
    :focus {
      outline: none;
    }
  }
`;

const Hit = ({ hit }) => {
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
    <HitWrapper>
      <ImageWrapper>
        <Image
          src={hit.imageUrl}
          alt={hit.title}
          width={75}
          height={75}
          layout="fill"
          objectFit="contain"
          placeholder="blur"
          blurDataURL={hit.lqip}
        />
      </ImageWrapper>
      <TextWrapper>
        <TagWrapper>
          <Tag style={{ background: categoryColor }}>
            <Link href={categoryUrl}>
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
        <Link href={categoryUrl + hit.slug}>
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
      </TextWrapper>
    </HitWrapper>
  );
};

const HitWrapper = styled.article`
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

  @media (max-width: ${breakpoints.s}px) {
    height: 60px;
  }
`;

const TextWrapper = styled.div`
  width: 75%;
  margin: 0 0.5rem;
  display: inline-flex;
  flex-direction: column;

  small {
    color: var(--static-cream);
    font-size: 12px;
  }

  @media (max-width: ${breakpoints.s}px) {
    small {
      font-size: 10px!important;
    }
  }
`;

const TagWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

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
      font-size: 10px!important;
    }
  }
`;

const Title = styled.div`
  margin-top: 0.5rem;
  color: var(--static-cream);

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
