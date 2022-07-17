import Marquee from "react-fast-marquee";
import styled from "styled-components";
import Link from "next/link";
import { breakpoints } from "../utils/breakpoints";

const BannerMarquee = ({ data }) => {
  return (
    <Marquee gradientWidth={0} speed={55}>
      <Wrapper>
        <Link href={`${data.link}`}>
          <small>{data.title}</small>
        </Link>
      </Wrapper>
    </Marquee>
  );
};

export default BannerMarquee;

const Wrapper = styled.div`
  width: 100%;
  background-color: var(--color-turquoise);
  * {
    font-size: 16px !important;
  }
  small {
    padding: 1rem 0;
  }

  a {
    text-decoration: none;
    color: var(--static-black);
  }

  :hover {
    /* cursor: pointer; */
    small > a {
      text-decoration: underline;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    * {
      font-size: 14px !important;
    }
  }
`;
