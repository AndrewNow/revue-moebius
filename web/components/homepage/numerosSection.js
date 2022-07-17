import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { Inner } from "../../pages/index";
import { motion, useInView } from "framer-motion";
import { breakpoints } from "../../utils/breakpoints";
import ConvertDateToString from "../../utils/convertDateToString";
import SplitText from "../../utils/splitText";
import { textAnim, textChild } from "../../styles/animations";

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
  }, [update]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <Inner>
        <Header>
          <motion.h3
            ref={ref}
            variants={textAnim}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            role="heading"
          >
            <SplitText variants={textChild} string="Numéros" />
          </motion.h3>
          <small>
            <Link href="/numeros">voir tous les numéros →</Link>
          </small>
        </Header>
      </Inner>
      <ComponentWrapper>
        <Wrapper ref={containerRef}>
          {numerosData.slice(0, 7).map((numero) => {
            return (
              <Numero key={numero._id}>
                <ImageWrapper>
                  <Image
                    src={numero.imageUrl}
                    alt={numero.title}
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={numero.lqip}
                  />
                </ImageWrapper>
                <Text>
                  <small>
                    <ConvertDateToString data={numero.publishedAt} />
                  </small>
                  <h5>
                    <Link href={`/numeros/${numero.slug}`}>{numero.title}</Link>
                  </h5>
                </Text>
              </Numero>
            );
          })}
          <Numero>
            <ImageWrapper>
              <Link href="/numeros">
                <Placeholder>
                  <motion.svg
                    width="72"
                    height="69"
                    viewBox="0 0 72 69"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeInOut" }}
                  >
                    <path
                      d="M4.91809 4.92857H44.2628V29.0786H49.1809V4.92857C49.1809 3.62143 48.6627 2.36783 47.7404 1.44354C46.8181 0.519258 45.5671 0 44.2628 0H4.91809C3.61373 0 2.36279 0.519258 1.44047 1.44354C0.518154 2.36783 0 3.62143 0 4.92857V64.0714C0 65.3786 0.518154 66.6322 1.44047 67.5565C2.36279 68.4807 3.61373 69 4.91809 69H44.2628C45.5671 69 46.8181 68.4807 47.7404 67.5565C48.6627 66.6322 49.1809 65.3786 49.1809 64.0714H4.91809V4.92857Z"
                      fill="#8A8A8A"
                      fillOpacity="0.2"
                    />
                    <path
                      d="M56.8169 32.892C56.3457 32.4872 55.7395 32.2757 55.1196 32.2997C54.4997 32.3237 53.9116 32.5815 53.4729 33.0216C53.0342 33.4616 52.7772 34.0515 52.7533 34.6734C52.7293 35.2953 52.9402 35.9033 53.3437 36.376L61.6694 44.5547H25.9526C25.2993 44.5547 24.6728 44.815 24.2108 45.2784C23.7489 45.7418 23.4894 46.3703 23.4894 47.0256C23.4894 47.681 23.7489 48.3095 24.2108 48.7728C24.6728 49.2362 25.2993 49.4965 25.9526 49.4965H61.6694L53.3437 58.0459C53.0859 58.2674 52.8764 58.54 52.7286 58.8466C52.5807 59.1531 52.4977 59.487 52.4846 59.8273C52.4715 60.1676 52.5286 60.5069 52.6525 60.824C52.7763 61.1411 52.9641 61.4291 53.2042 61.6699C53.4442 61.9107 53.7313 62.0991 54.0474 62.2233C54.3635 62.3476 54.7018 62.4049 55.041 62.3918C55.3803 62.3786 55.7131 62.2953 56.0187 62.147C56.3243 61.9986 56.5961 61.7886 56.8169 61.5299L71.2021 47.1986L56.8169 32.892Z"
                      fill="#8A8A8A"
                      fillOpacity="0.2"
                    />
                  </motion.svg>
                </Placeholder>
              </Link>
            </ImageWrapper>
            <Text>
              <small>Découvrez plus</small>
              <h5>
                <Link href="/numeros">
                  Cliquez ici pour consulter tous les numéros
                </Link>
              </h5>
            </Text>
          </Numero>
        </Wrapper>
        <PrevButton
          whileTap={{ scale: 0.9 }}
          onClick={(e) => prev(e)}
          // disabled={state.isPrevDisabled}
        >
          <svg
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.6104 0.764648L0.124898 9.25015L8.6104 17.7356L9.6709 16.6752L2.2459 9.25015L9.6709 1.82515L8.6104 0.764648Z"
              fill="var(--color-black)"
            />
          </svg>
        </PrevButton>
        <NextButton
          whileTap={{ scale: 0.9 }}
          onClick={(e) => next(e)}
          // disabled={state.isNextDisabled}
        >
          <svg
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.6104 0.764648L0.124898 9.25015L8.6104 17.7356L9.6709 16.6752L2.2459 9.25015L9.6709 1.82515L8.6104 0.764648Z"
              fill="var(--color-black)"
            />
          </svg>
        </NextButton>
      </ComponentWrapper>
    </>
  );
};

export default NumerosSection;

const ComponentWrapper = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;

  width: 96.5%;
  left: 3.5%;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  overflow: auto;
  scroll-snap-type: x mandatory;

  scrollbar-color: var(--color-purple) #ededed;
  scrollbar-width: thin;
  ::-webkit-scrollbar {
    width: 900px !important;
    height: 5px;
    border-radius: 3px;
    background-color: #ededed;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: var(--color-purple);
  }
  @media (max-width: ${breakpoints.xl}px) {
    scrollbar-width: normal;
  }
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
  @media (max-width: ${breakpoints.s}px) {
    align-items: center;
    small {
      font-size: 12px;
    }
  }
`;

const Numero = styled.article`
  scroll-snap-align: center;
  position: relative;
  min-width: 420px;
  margin: 0 2rem;

  :last-of-type {
    margin-right: 3.5%;
  }
  :first-of-type {
    margin-left: 0;
  }
  @media (max-width: ${breakpoints.xxl}px) {
    min-width: 380px;
  }
  @media (max-width: ${breakpoints.xl}px) {
    min-width: 320px;
    margin: 0 1.5rem;
  }
  @media (max-width: ${breakpoints.l}px) {
    min-width: 280px;
    margin: 0 1rem;
  }
  @media (max-width: ${breakpoints.m}px) {
    min-width: 230px;
  }
`;

const ImageWrapper = styled.div`
  aspect-ratio: 417/592;
  position: relative;
  display: block;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  user-select: none;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  cursor: pointer;

  background: linear-gradient(
    193.73deg,
    rgba(138, 138, 138, 0.12) 11.34%,
    rgba(138, 138, 138, 0.1) 45.35%,
    rgba(138, 138, 138, 0.16) 91.34%
  );
`;

const Text = styled.div`
  border-top: 1px solid var(--color-black);
  margin-top: 2rem;
  padding-top: 1rem;
  small {
    color: var(--color-grey);
    margin-bottom: 0.5rem;
    display: block;
  }
  h5 {
    margin-top: 0.75rem;
    color: var(--color-black);
    font-family: "Editorial";
    font-size: 35px;
    line-height: 120%;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box !important;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    white-space: normal;
  }

  a {
    text-decoration: none;
  }

  :hover {
    a {
      text-decoration: underline;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    h5 {
      font-size: 30px;
    }
  }
`;

const PrevButton = styled(motion.button)`
  width: 70px;
  height: 70px;
  position: absolute;
  z-index: 10;
  top: 40%;
  /* transform: translateY(-50%); */
  left: 2%;
  border: 1px solid var(--color-black) !important;
  background: #ffffff80;
  backdrop-filter: blur(20px) saturate(180%);
  border-radius: 100%;
  box-shadow: 3px 4px 20px rgba(53, 53, 53, 0.1);
  svg {
    margin-left: -3px;
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 55px;
    height: 55px;
  }
  @media (max-width: ${breakpoints.s}px) {
    display: none;
  }
`;
const NextButton = styled(motion.button)`
  width: 70px;
  height: 70px;
  position: absolute;
  z-index: 10;
  top: 40%;
  /* transform: translateY(-50%); */
  right: 5%;
  border: 1px solid var(--color-black) !important;
  background: #ffffff80;
  backdrop-filter: blur(20px) saturate(180%);
  border-radius: 100%;
  box-shadow: 3px 4px 20px rgba(53, 53, 53, 0.1);
  svg {
    margin-left: 3px;
    transform: rotate(-180deg);
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 55px;
    height: 55px;
  }
  @media (max-width: ${breakpoints.s}px) {
    display: none;
  }
`;
