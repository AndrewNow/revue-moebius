import React from "react";
import { client } from "../lib/sanity/client";
import { footerLogoQuery } from "../lib/sanity/footerLogoQuery";
import styled from "styled-components";
import Link from "next/link";
import Head from "next/head";

const FourOFour = () => {
  return (
    <>
      <Head>
        <title>Page introuvable - La revue Mœbius</title>
        <meta
          property="og:title"
          content="Page introuvable - La Revue Mœbius"
        />
      </Head>
      <Wrapper>
        <Text>
          <h1>404</h1>
          <p>Cette page est aussi introuvable que Réjean Ducharme.</p>
          <Link scroll={false} href="/">
            <Button>
              <small>Retourner à la page d'accueil</small>
            </Button>
          </Link>
        </Text>
      </Wrapper>
    </>
  );
};

export default FourOFour;

export async function getStaticProps() {
  const footerLogos = await client.fetch(footerLogoQuery);

  return {
    props: {
      footerLogos,
    },
    revalidate: 10,
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
    padding-bottom: 3rem;
  }
`;

const Button = styled.div`
  display: inline-block;
  border: 1px solid var(--static-black);
  padding: 1rem 2rem;
  border-radius: 10px;
  cursor: pointer;
  background: var(--color-blue);
  transition: var(--transition);
  small {
    transition: var(--transition);
  }
  :hover {
    small {
      color: var(--color-black);
    }
    background: var(--color-cream);
  }
`;
