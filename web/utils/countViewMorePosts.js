import styled from "styled-components";

const CountViewMorePosts = ({ dataSource, count, filteredArticles }) => {
  return (
    <Wrapper>
      <small>
        Affichage de {count} sur {dataSource.length}{" "}
        {filteredArticles.length > 1 || filteredArticles.length === 0
          ? "résultats"
          : "résultat"}
      </small>
    </Wrapper>
  );
};

export default CountViewMorePosts;

const Wrapper = styled.div`
  display: block;
  text-align: center;
  margin-top: 3rem;

  small {
    font-family: "Simula";
    text-transform: none;
    letter-spacing: 0.01rem;
    /* font-size: 14px; */
    color: var(--color-grey);
  }
`;
