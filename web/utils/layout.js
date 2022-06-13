import styled from "styled-components";
import Head from "next/head";
import { breakpoints } from "./breakpoints";

export const Layout = (props) => {
  return (
    <>
      <Head>
        {/* <link rel="icon" href="/xxxfavicon.png" /> */}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Main>{props.children}</Main>
    </>
  );
};

const Main = styled.main`
  margin: 0 auto;
  background-color: var(--color-cream);

  a,
  button {
  }

  button {
    border: none;
    cursor: pointer;
  }

  h1 {
    font-size: 130px;
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

  p {
    font-size: 23px;
    line-height: 150%;
    letter-spacing: -1%;
  }
`;
