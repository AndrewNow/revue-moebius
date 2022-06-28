import React from "react";
import { footerLogoQuery } from "../lib/sanity/footerLogoQuery";
import { client } from "../lib/sanity/client";
import styled from "styled-components";
import { numeroListQuery } from "../lib/sanity/numeroQuery";
import { Inner } from "./index";
import Products from "../components/products";

const Vente = ({ numeros }) => {
  return (
    <>
      <Header>
        <h1>Vente</h1>
        <p>
          Procurez-vous le tout dernier (ou le tout premier) numéro de la revue.
        </p>
      </Header>
      <Content>
        <Inner>
          <Grid>
            <Products products={numeros} />
          </Grid>
        </Inner>
      </Content>
    </>
  );
};

export default Vente;

export async function getStaticProps() {
  const footerLogos = await client.fetch(footerLogoQuery);
  const numeros = await client.fetch(numeroListQuery);
  return {
    props: {
      footerLogos,
      numeros,
    },
    revalidate: 10,
  };
}

const Header = styled.div`
  background: var(--color-blue);
  h1 {
    padding-top: 15rem;
  }
  p {
    padding-bottom: 5rem;
  }
  h1,
  p {
    color: var(--static-black);
    text-align: center;
    width: 50%;
    margin: 0 auto;
  }
`;

const Content = styled.div`
  padding: 10rem 0;
`;

const Grid = styled.div`
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 3rem;
  justify-content: center;
  justify-items: center;
  align-items: start;
`;
