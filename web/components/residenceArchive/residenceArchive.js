import styled from "styled-components";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { breakpoints } from "../../utils/breakpoints";
import { Chevron } from "../../svg/icons";
import { ArrowRight } from "../../svg/icons";
import Link from "next/link";

const MapResidenceEntries = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const expandAnimation = {
    visible: {
      height: "auto",
      transition: {
        ease: "easeIn",
      },
    },
    hidden: {
      height: 0,
      transition: {
        ease: "easeInOut",
      },
    },
  };

  return (
    <div key={data._id}>
      <YearEntryTitle
        onClick={() => setOpen(!open)}
        whileHover={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: hover ? "var(--color-yellow)" : "var(--color-cream)",
          color: hover ? "var(--static-black)" : "var(--color-black)",
        }}
      >
        <h3>{data.year}</h3>
        <Chevron open={open} />
      </YearEntryTitle>
      <AnimatePresence exitBeforeEnter>
        {open && (
          <ExpandYear
            variants={expandAnimation}
            initial="hidden"
            animate={open ? "visible" : "hidden"}
            exit="hidden"
          >
            <ArchiveResidencyWrapper>
              {data.residenceData.map((entry) => {
                // Change the category title according to the incoming SEO title data
                // to make it easier to read
                let residencyCategory;
                if (entry.type === "artiste") {
                  residencyCategory = "Résidence d'artiste";
                } else if (entry.type === "écrivain") {
                  residencyCategory = "Résidence d'écrivain.e";
                } else if (entry.type === "hypermédia") {
                  residencyCategory = "Résidence hypermédiatique";
                }

                return (
                  <ArchiveResidencyEntry>
                    <h5>{residencyCategory}</h5>
                    <HideArrow>
                      <ArrowWrapper>
                        <ArrowRight />
                      </ArrowWrapper>
                      <Link href={`residences/${entry.slug}`}>
                        <motion.h3>{entry.title}</motion.h3>
                      </Link>
                    </HideArrow>
                  </ArchiveResidencyEntry>
                );
              })}
            </ArchiveResidencyWrapper>
          </ExpandYear>
        )}
      </AnimatePresence>
    </div>
  );
};

const ResidenceArchive = ({ data }) => {
  return (
    <Section>
      <h2>Archive</h2>
      <p>Découvrir les résidences du passé.</p>
      <Archive>
        {data.map((yearData) => {
          return <MapResidenceEntries data={yearData} />;
        })}
      </Archive>
    </Section>
  );
};

export default ResidenceArchive;

const Section = styled.section`
  width: 90%;
  margin: 0 auto;
  padding: 10rem 0;
  scroll-margin: 120px;
  h2,
  p {
    color: var(--color-black);
  }

  @media (max-width: ${breakpoints.s}px) {
    padding: 5rem 0;
  }
`;

const Archive = styled.div`
  margin: 5rem 0;

  :last-child {
    border-bottom: 1px solid var(--color-black);
  }

  @media (max-width: ${breakpoints.s}px) {
    margin: 2rem 0;
  }
`;

const YearEntryTitle = styled(motion.div)`
  border-top: 1px solid var(--color-black);

  cursor: pointer;
  h3 {
    font-family: "Surt";
  }

  padding: 2.5rem;
  padding-top: 1.5rem;
  padding-bottom: 2rem;
  transition: var(--transition);
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  @media (max-width: ${breakpoints.l}px) {
    padding: 2rem 1rem;
    padding-top: 1rem;
  }
  @media (max-width: ${breakpoints.m}px) {
    padding: 2rem 0.5rem;
    align-items: flex-start;
  }
  @media (max-width: ${breakpoints.s}px) {
    h3 {
      font-size: 30px;
    }
    padding: 1.5rem 0.5rem;
  }
`;

const ExpandYear = styled(motion.div)`
  overflow-y: hidden;
`;

const ArchiveResidencyWrapper = styled.div`
  display: block;
  :last-child {
    margin-bottom: 4rem;
  }

  h3 {
    font-family: "Surt";
  }
  margin: 2rem;
  padding: 0 2rem;
  * {
    color: var(--color-black);
  }
  a {
    color: var(--color-purple);
  }
  @media (max-width: ${breakpoints.l}px) {
    margin: 2rem 1rem;
  }
  @media (max-width: ${breakpoints.m}px) {
    margin: 1rem auto;
    padding: 0;
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-bottom: 2.5rem;
    h5 {
      font-size: 18px;
      letter-spacing: 0.01rem;
    }
    h3 {
      font-size: 30px;
    }
  }
`;

const ArchiveResidencyEntry = styled.div`
  margin: 2rem 3rem;
  padding: 1rem 0;

  h5 {
    color: var(--color-grey);
    margin-bottom: 1rem;
  }

  @media (max-width: ${breakpoints.s}px) {
    margin: 0rem 1rem;
  }
`;

const HideArrow = styled.div`
  position: relative;
  h3 {
    position: relative;
    z-index: 2;
    cursor: pointer;
    background: var(--color-cream);
    transition: var(--transition);
    box-sizing: border-box;
  }
  :hover {
    h3 {
      margin-left: 2.5rem;
      padding-left: 1rem;
    }
  }

  @media (max-width: ${breakpoints.s}px) {
    display: flex;
    align-items: baseline;
    justify-content: flex-start;
    :hover {
      h3 {
        padding-left: 0;
        transform: none;
      }
    }
  }
`;

const ArrowWrapper = styled.div`
  position: absolute;
  z-index: 0;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: ${breakpoints.s}px) {
    position: relative;
    top: 0;
    transform: none;
    scale: 0.5;
  }
`;
