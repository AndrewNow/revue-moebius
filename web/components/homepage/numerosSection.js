import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Inner } from "../../pages/index";

const NumerosSection = ({ numerosData }) => {
  //.:*~*:._.:*~*:._.:*~*:._.:*~*
  //
  //  ""Pure CSS"" carousel setup
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*
  const containerRef = useRef(null);

  // this is just used to update the useEffect
  const [update, setUpdate] = useState(0);

  const [state, setState] = useState({
    scroller: null,
    itemWidth: 0,
    isPrevDisabled: true,
    isNextDisabled: false,
  });

  const SLIDE_INTERVAL = 1;

  const next = (e) => {
    e.preventDefault();
    setUpdate(update + 1);
    state.scroller.scrollBy({
      left: state.itemWidth * SLIDE_INTERVAL,
      top: 0,
      behavior: "smooth",
    });

    // Hide if is the last item
    // if () {
    //   setState({ ...state, isNextDisabled: true, isPrevDisabled: false });
    // }
  };

  const prev = (e) => {
    e.preventDefault();
    setUpdate(update - 1);
    state.scroller.scrollBy({
      left: -state.itemWidth * SLIDE_INTERVAL,
      top: 0,
      behavior: "smooth",
    });
    // Hide if is the first item
    // setState({ ...state, isNextDisabled: false, isPrevDisabled: true });
  };

  useEffect(() => {
    const scroller = containerRef.current;
    const itemWidth = containerRef.current.firstElementChild?.clientWidth;

    setState({ ...state, scroller, itemWidth });
    console.log(scroller, itemWidth);
  }, [update]);

  return (
    <>
      <Inner>
        <Header>
          <h3>Numéros</h3>
          <small>
            <Link href="/numeros">voir tous les numéros</Link>
          </small>
        </Header>
      </Inner>
      <Wrapper ref={containerRef}>
        {numerosData.map((numero) => {
          return (
            <Numero key={numero._id}>
              <ImageWrapper>
                <Image src={numero.imageUrl} alt={numero.title} layout="fill" />
              </ImageWrapper>
              <Text>
                <small>{numero.publishedAt}</small>
                <h5>
                  <Link href={`/numeros/${numero.slug}`}>{numero.title}</Link>
                </h5>
              </Text>
            </Numero>
          );
        })}
      </Wrapper>
      <Inner>
        <button
          className="btn prev"
          onClick={(e) => prev(e)}
          // disabled={state.isPrevDisabled}
        >
          &lt; Previous
        </button>
        <button
          className="btn next"
          onClick={(e) => next(e)}
          // disabled={state.isNextDisabled}
        >
          Next &gt;
        </button>
      </Inner>
    </>
  );
};

export default NumerosSection;

const Wrapper = styled.div`
  position: relative;
  display: flex;

  width: 96.5%;
  float: right;
  overflow: auto;
  scroll-snap-type: x mandatory;
`;

const Header = styled.header`
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 1rem;
  margin-bottom: 3rem;
  border-bottom: 1px solid var(--color-black);
  transition: var(--transition);

  display: flex;
  justify-content: space-between;
  align-items: baseline;
  /* scroll-padding: 0 24px; */

  h3,
  small,
  a {
    color: var(--color-black);
  }
`;

const Numero = styled.article`
  scroll-snap-align: start;
  position: relative;
  min-width: 420px;
  margin: 0 2rem;
`;

const ImageWrapper = styled.div`
  aspect-ratio: 417/592;
  position: relative;
  display: block;
  width: 100%;
`;

const Text = styled.div`
  border-top: 1px solid var(--color-black);
  margin-top: 2rem;
  padding-top: 1rem;
  small {
    color: var(--color-grey);
  }
  h5 {
    margin-top: 0.5rem;
    color: var(--color-black);
    font-family: "Editorial";
    font-size: 35px;
    line-height: 120%;
  }

  a {
    text-decoration: none;
  }

  :hover {
    a {
      text-decoration: underline;
    }
  }
`;
