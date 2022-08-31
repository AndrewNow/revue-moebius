import React from "react";
import { client } from "../lib/sanity/client";
import { footerLogoQuery } from "../lib/sanity/footerLogoQuery";
import styled from "styled-components";
import Link from "next/link";

const FiveHundred = () => {
  return (
    <Wrapper>
      <Text>
        <h1>500</h1>
        <p>Nous n'arrivons pas à trouver la page que vous recherchez.</p>
        <Link scroll={false} href="/">
          <Button>
            <small>Retourner à la page d'accueil</small>
          </Button>
        </Link>
      </Text>
    </Wrapper>
  );
};

export default FiveHundred;

export async function getStaticProps() {
  const footerLogos = await client.fetch(footerLogoQuery);

  return {
    props: {
      footerLogos,
    },
  };
}

const Wrapper = styled.div`
  min-height: 80vh;
  background: var(--color-blue);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Text = styled.div`
  color: var(--static-black);
  text-align: center;
  p {
    padding-bottom: 5rem;
  }
`;

const Button = styled.div`
  display: inline-block;
  border: 1px solid var(--static-black);
  padding: 1rem 2rem;
  border-radius: 10px;
  transition: var(--transition);
  cursor: pointer;
  background: var(--color-blue);

  :hover {
    background: var(--color-cream);
  }
`;
