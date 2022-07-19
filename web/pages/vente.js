import { useRef } from "react";
import { footerLogoQuery } from "../lib/sanity/footerLogoQuery";
import { client } from "../lib/sanity/client";
import styled from "styled-components";
import { numeroListQuery } from "../lib/sanity/numeroQuery";
import { Inner } from "./index";
import Products from "../components/products";
import { breakpoints } from "../utils/breakpoints";
import Abonnements from "../components/abonnements/abonnements";
import { abonnementQuery } from "../lib/sanity/abonnementQuery";
import SplitText from "../utils/splitText";
import { motion, useInView } from "framer-motion";
import {
  textAnim,
  textChild,
  textAnimSlow,
  textAnimFast,
  gridAnim,
} from "../styles/animations";

const Vente = ({ numeros, abonnements }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <Header>
        <h1 role="heading">
          <SplitText
            string="Vente"
            variantParent={textAnim}
            variantParentMobile={textAnimSlow}
            variantChild={textChild}
            initial="hidden"
            animate="visible"
          />
        </h1>
        <p role="heading">
          <SplitText
            string="Procurez-vous le tout dernier (ou le tout premier) numéro de la revue."
            variantParent={textAnimFast}
            variantParentMobile={textAnim}
            variantChild={textChild}
            initial="hidden"
            animate="visible"
            isParagraphText={true}
          />
        </p>
      </Header>
      <Content>
        <Inner>
          <Grid
            ref={ref}
            variants={gridAnim}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Products products={numeros} />
          </Grid>
        </Inner>
      </Content>
      <Abonnements abonnements={abonnements} />
    </>
  );
};

export default Vente;

export async function getStaticProps() {
  const footerLogos = await client.fetch(footerLogoQuery);
  const numeros = await client.fetch(numeroListQuery);
  const abonnements = await client.fetch(abonnementQuery);
  return {
    props: {
      footerLogos,
      numeros,
      abonnements,
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
  @media (max-width: ${breakpoints.m}px) {
    h1 {
      margin-bottom: 2rem;
    }
    p {
      width: 80%;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    h1 {
      margin-bottom: 1rem;
    }
  }
`;

const Content = styled.div`
  padding: 10rem 0;
  @media (max-width: ${breakpoints.xl}px) {
    padding: 7rem 0;
  }
  @media (max-width: ${breakpoints.l}px) {
    padding: 5rem 0;
  }
  @media (max-width: ${breakpoints.s}px) {
    padding: 2.5rem 0;
  }
`;

const Grid = styled(motion.div)`
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 3rem;
  justify-content: center;
  justify-items: center;
  align-items: start;

  @media (max-width: ${breakpoints.xl}px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
  }
  @media (max-width: ${breakpoints.m}px) {
    display: block;
  }
`;
