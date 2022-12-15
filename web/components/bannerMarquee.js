import Marquee from "react-fast-marquee";
import styled from "styled-components";
import Link from "next/link";
import { breakpoints } from "../utils/breakpoints";

const BannerMarquee = ({ data }) => {
  return (
    <Wrapper>
      <Marquee gradientWidth={0} speed={80}>
        <Small>
          {data.link ? (
            <Link scroll={false} href={`${data.link}`}>
              {data.title}
            </Link>
          ) : (
            data.title
          )}
          {" "}
        </Small>
      </Marquee>
    </Wrapper>
  );
};

export default BannerMarquee;

const Wrapper = styled.div`
  width: 100%;
  margin: 5rem 0;
  background-color: var(--color-turquoise);
  /* * {
    font-size: 16px !important;
  } */
  small {
    padding: 1rem 0;
  }

  color: var(--static-black);
  a {
    text-decoration: none;
  }

  :hover {
    /* cursor: pointer; */
    small > a {
      text-decoration: underline;
    }
  }
  /* @media (max-width: ${breakpoints.m}px) {
    * {
      font-size: 14px !important;
    }
  } */
`;

const Small = styled.small`
  font-size: 16px;

  @media (max-width: ${breakpoints.m}px) {
    font-size: 14px;
  }
`;
