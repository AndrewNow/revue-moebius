import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { breakpoints } from "../../utils/breakpoints";

const Filter = ({
  categories,
  nouvellesData,
  setFiltered,
  setActiveFilter,
  activeFilter,
}) => {
  //.:*~*:._.:*~*:._.:*~*:._.:*~*~*:._.:*~*
  //
  //  Handler for when a filter tag is clicked
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*~*:._.:*~*
  const handleFilterClick = (tag) => {
    const activeFilterTitles = activeFilter.map((item) => item.title);
    let currentParams = activeFilter;

    if (activeFilterTitles.includes(tag.title)) {
      // If an item is already toggled "on", remove it from the array
      currentParams = currentParams.filter(
        (activeTag) => activeTag.title !== tag.title
      );
      setActiveFilter(currentParams);
    } else {
      // add the tag into the array
      setActiveFilter((current) => [...current, tag]);
    }
  };

  //.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:._.:*~*:._.:*~*:._.:*~*
  //
  //  Update the articles according to the filter's state
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:._.:*~*:._.:*~*:._.:*~*
  useEffect(() => {
    if (activeFilter.length === 0) {
      // if no buttons are clicked, just show all the data
      setFiltered(nouvellesData);
      return;
    } else {
      // else return the articles that match the {activeFilter}
      const activeFilterTitles = activeFilter.map((item) => item.title);

      let newArticles;

      newArticles = nouvellesData.filter((article) => {
        if (activeFilterTitles.includes(article.category[0].title)) {
          return article;
        }
      });
      setFiltered(newArticles);
    }
  }, [activeFilter]);

  console.log(categories)
  return (
    <FilterWrapper>
      <small style={{ marginRight: "2rem", color: "var(--color-black)" }}>
        Filtrer par type d'article:
      </small>
      {categories.map((tag) => {
        const activeFilterTitles = activeFilter.map((item) => item.title);
        let buttonEnabled = activeFilterTitles.includes(tag.title);
        return (
          <FilterTag
            key={tag.title}
            value={tag.title}
            onClick={() => handleFilterClick(tag)}
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
      })}
    </FilterWrapper>
  );
};

export default Filter;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  border-top: 1px solid var(--color-black);
  padding-top: 2rem;

  @media (max-width: ${breakpoints.l}px) {
    overflow-x: scroll;
    margin-top: 2rem;
    padding: 1rem 0;
    border-bottom: 1px solid var(--color-black);
  }
`;

const FilterTag = styled(motion.button)`
  padding: 10px 18px;
  margin: 0 0.5rem;
  border-radius: 30px;
  transition: var(--transition);
  box-sizing: border-box;

  cursor: pointer;

  small {
    white-space: nowrap;
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
