import React from "react";
import styled, { keyframes } from "styled-components";

const AProposSection = () => {
  return (
    <Wrapper>
      <TextWrapper>
        <h1>
          La revue moebius <br />
          Présentation et historique
        </h1>
        <p>
          Mœbius est une revue littéraire québécoise fondée en 1977 par Pierre
          DesRuisseaux, Raymond Martin et Guy Melançon. Elle a été dirigée par
          Robert Giroux pendant trente-cinq ans. La revue paraît quatre fois par
          année.
        </p>
      </TextWrapper>
    </Wrapper>
  );
};

export default AProposSection;

const gradient = keyframes`
    0%{background-position:0% 19%}
    50%{background-position:100% 82%}
    100%{background-position:0% 19%}
`;

const Wrapper = styled.div`
  width: 90%;
  margin: 5rem auto;
  height: 700px;
  border-radius: 50px;

  background: linear-gradient(283deg, #98657a, #789090);
  background-size: 400% 400%;

  -webkit-animation: ${gradient} 44s ease infinite;
  -moz-animation: ${gradient} 44s ease infinite;
  animation: ${gradient} 44s ease infinite;
`;

const TextWrapper = styled.div`
  width: 80%;
  margin: 2rem auto;
  color: var(--static-cream);
  background: #ffffff20;
  backdrop-filter: blur(20px);
  border: 1px solid red;
`;
