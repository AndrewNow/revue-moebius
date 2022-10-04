import styled from "styled-components";
import Head from "next/head";
import { breakpoints } from "./breakpoints";

export const Layout = (props) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png"></link>
        <meta property="og:image" content="https://i.imgur.com/mk55koK.png" />
        <meta property="og:title" content="La revue Mœbius" />
        <meta
          property="og:description"
          content="Mœbius est une revue de création littéraire québécoise fondée en 1977 qui réunit des textes d’auteur·rice·s établi·e·s et d’écrivain·e·s émergent·e·s. La revue valorise la perméabilité des formes et des genres littéraires, l’expérimentation et la mise en scène de la subjectivité."
        />
        <meta
          name="description"
          content="Mœbius est une revue de création littéraire québécoise fondée en 1977 qui réunit des textes d’auteur·rice·s établi·e·s et d’écrivain·e·s émergent·e·s. La revue valorise la perméabilité des formes et des genres littéraires, l’expérimentation et la mise en scène de la subjectivité."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <Main>{props.children}</Main>
    </>
  );
};

const Main = styled.main`
  margin: 0 auto;
  background-color: var(--color-cream);

  button {
    border: none;
    cursor: pointer;
  }

  h1 {
    font-size: 6.77vw;
    line-height: 120%;
    letter-spacing: -0.02em;
  }

  h2 {
    font-size: 100px;
    line-height: 120%;
  }
  h3 {
    font-size: 64px;
    line-height: 120%;
  }
  h4 {
    font-size: 42px;
    line-height: 130%;
  }
  h5 {
    font-size: 27px;
    line-height: 140%;
    font-weight: normal;
    letter-spacing: 1%;
  }
  h6 {
    font-size: 14px;
    line-height: 150%;
  }

  p,
  blockquote,
  ul,
  li {
    font-size: 23px;
    line-height: 150%;
    letter-spacing: -1%;
  }

  li::marker {
    font-size: 1rem;
    color: var(--color-black);
  }

  @media (max-width: ${breakpoints.xxl}px) {
    h1 {
      font-size: 100px;
    }
    h2 {
      font-size: 75px;
    }
    h3 {
      font-size: 50px;
    }
    h4 {
      font-size: 38px;
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    h1 {
      font-size: 75px;
    }
    h2 {
      font-size: 65px;
    }
    h4 {
      font-size: 35px;
    }
    h5 {
      font-size: 23px;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    h1 {
      font-size: 65px;
    }
    h2 {
      font-size: 50px;
    }
    h3 {
      font-size: 45px;
    }
    h4 {
      font-size: 35px;
    }
    h5 {
      font-size: 20px;
    }
    p {
      font-size: 21px;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    p {
      font-size: 20px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    h1 {
      font-size: 50px;
    }
    h2 {
      font-size: 38px;
    }
    h3 {
      font-size: 44px;
    }
    h4 {
      font-size: 30px;
    }
    h5 {
      font-size: 20px;
    }
    h6 {
      font-size: 14px;
    }
    p,
    blockquote {
      font-size: 18px;
    }
    small {
      font-size: 13px;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    h4 {
      font-size: 22px;
    }
    small {
      font-size: 12px;
    }
  }
`;
