import Marquee from "react-fast-marquee";
import styled from "styled-components";
import Link from "next/link";
import { breakpoints } from "../utils/breakpoints";

const BannerMarquee = ({ data }) => {
  return (
    <Wrapper>
      <Marquee gradientWidth={0} speed={55}>
        <small>
          <Link href={`${data.link}`}>{data.title}</Link>
        </small>
      </Marquee>
    </Wrapper>
  );
};

export default BannerMarquee;

const Wrapper = styled.div`
  width: 100%;
  background-color: var(--color-turquoise);
  small {
    padding: 1rem 0;
  }

  small > a {
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
    small, a {
      font-size: 12px !important;
    }
  }
`;
