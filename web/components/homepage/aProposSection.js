import React from "react";
import styled, { keyframes } from "styled-components";
import { breakpoints } from "../../utils/breakpoints";
import Link from "next/link";

const AProposSection = () => {
  return (
    <Wrapper>
      <TextWrapper>
        <h1>
          <Span>
            La revue moebius; <br />
          </Span>
          <Span>présentation & historique</Span>
        </h1>
        <Paragraph>
          <p>
            Mœbius est une revue littéraire québécoise fondée en 1977 par Pierre
            DesRuisseaux, Raymond Martin et Guy Melançon. Elle a été dirigée par
            Robert Giroux pendant trente-cinq ans. La revue paraît quatre fois
            par année.
            <br />
            <br />
          </p>
          <p>
            Mœbius est une revue littéraire québécoise fondée en 1977 par Pierre
            DesRuisseaux, Raymond Martin et Guy Melançon. Elle a été dirigée par
            Robert Giroux pendant trente-cinq ans. La revue paraît quatre fois
            par année.
          </p>
        </Paragraph>
        <InternalLink>
          <Link scroll={false} href="/a-propos">
            <small>En savoir plus</small>
          </Link>
        </InternalLink>
      </TextWrapper>
    </Wrapper>
  );
};

export default AProposSection;

const gradient = keyframes`
  0%{background-position:0% 45%}
  50%{background-position:100% 56%}
  100%{background-position:0% 45%}
`;

const Wrapper = styled.div`
  width: 90%;
  margin: 5rem auto;
  border-radius: 40px;

  display: grid;
  place-items: center;

  background: linear-gradient(283deg, #98657a, #8ab7b7, #789090, #b78298);
  background-size: 400% 400%;

  -webkit-animation: ${gradient} 20s ease infinite;
  -moz-animation: ${gradient} 20s ease infinite;
  animation: ${gradient} 20s ease infinite;

  @media (max-width: ${breakpoints.l}px) {
    border-radius: 15px;
  }
  @media (max-width: ${breakpoints.s}px) {
    border-radius: 10px;
    width: 90%;
  }
`;

const TextWrapper = styled.div`
  position: relative;
  width: 80%;
  margin: 7rem auto;
  color: var(--static-cream);
  display: flex;
  flex-direction: column;
  align-items: center;
  
  span:nth-of-type(2) {
    padding-top: 0;
    margin-left: 5%;
    white-space: nowrap;
  }
  h1 {
    opacity: .95;
    width: 90%;
    margin: 0 auto;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    h1 {
      font-size: 7vw;
    }
  }

  @media (max-width: ${breakpoints.xl}px) {
    margin: 7.5rem auto;
  }

  @media (max-width: ${breakpoints.l}px) {
    width: 85%;
    margin: 5rem auto;
    h1 {
      font-size: 7.5vw;
    }
  }
  
  @media (max-width: ${breakpoints.s}px) {
    margin: 4rem auto;
    width: 95%;
    
    h1 {
      width: 100%;
      font-size: 45px;
      line-height: 110%;
      white-space: normal;
      text-align: center;
    }

    span:nth-of-type(2) {
      margin: 0 auto;
      white-space: normal;
    }

    p {
      width: 100%;
      margin-top: 2rem;
    }
  }
`;

const Paragraph = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 10%;
  width: 90%;
  margin: 0 auto;
  p {
    opacity: 0.85;

    /* width: 45%; */
    margin: 3rem 0;
    text-align: justify;
    text-justify: auto;
  }

  @media (max-width: ${breakpoints.xl}px) {
    p {
      font-size: 20px;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    display: block;
    margin: 3rem auto;
    margin-bottom: 0;
    p {
      text-align: start;
      margin: 0;
      font-size: 18px;
    }
    :nth-child(odd) {
      border: 1px solid red;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    margin: 2rem auto;
    margin-bottom: 0;
  }
`;

const Span = styled.span`
  :nth-of-type(2) {
    padding-top: 0;
    margin-left: 5%;
  }
  @media (max-width: ${breakpoints.m}px) {
    p:nth-of-type(2) {
      margin-left: 0;
    }
  }
`;

const InternalLink = styled.div`
  opacity: 0.85;
  display: inline-block;
  margin: 2rem auto;
  margin-bottom: 0;
  border-radius: 10px;
  border: 1px solid var(--static-cream);
  color: var(--static-cream);
  transition: var(--transition);

  cursor: pointer;
  small {
    display: inline-block;
    padding: 0.75rem 4rem;
    transition: var(--transition);
  }

  :hover {
    small {
      color: var(--static-black);
    }
    border: 1px solid transparent;
    background: var(--color-turquoise);
  }
  @media (max-width: ${breakpoints.s}px) {
    small {
      color: var(--static-cream);
    }
  }
`;
