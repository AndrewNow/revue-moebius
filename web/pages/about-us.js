import React, { useState, useCallback, useEffect } from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import { StaticImage } from "gatsby-plugin-image";
import Seo from "../components/seo";
import styled from "styled-components";
import breakpoints from "../components/breakpoints";
import { motion } from "framer-motion";
import EightBranches from "../components/AboutUsComponents/eight-branches";
import useEmblaCarousel from "embla-carousel-react";
import { AcademicAdvisor } from "../components/generalcomponents";
import FAQMap from "../components/AboutUsComponents/FAQMap";
import { Arrow } from "../svg/misc";
import { useInView } from "react-intersection-observer";
import teachingClinic from "../../site/settings/teaching_clinic.json";

const AboutUs = ({ data }) => {
  const siteTitle =
    data.site.siteMetadata?.title || `What is Eight Branches About?`;
  const [expand, setExpand] = useState(false);

  const clickExpand = {
    hidden: {
      height: "300px",
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
    visible: {
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
      height: "auto",
    },
  };
  const hideGradient = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
    visible: {
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
      opacity: 1,
    },
  };

  const hideImage = {
    visible: {
      clipPath: "inset(100% 0% 0% 0%)",
    },
    hidden: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        delay: 0.15,
        ease: "easeInOut",
        duration: 1,
      },
    },
  };

  const parent = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeIn = {
    hidden: {
      y: 40,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };
  const principlesFadeIn = {
    hidden: {
      y: 30,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.85,
        ease: "easeInOut",
        staggerChildren: 0.35,
      },
    },
  };

  // Intersection observer logic
  const [OurStoryRef, OurStoryInView] = useInView({
    root: null,
    threshold: 0.5,
    triggerOnce: true,
  });
  const [CorePrinciples1Ref, CorePrinciples1InView] = useInView({
    root: null,
    threshold: 0.15,
    triggerOnce: true,
  });
  const [CorePrinciples2Ref, CorePrinciples2InView] = useInView({
    root: null,
    threshold: 0.15,
    triggerOnce: true,
  });
  const [CorePrinciples3Ref, CorePrinciples3InView] = useInView({
    root: null,
    threshold: 0.15,
    triggerOnce: true,
  });

  // ---------- Initialize Embla Carousel ----------
  const [emblaRef, embla] = useEmblaCarousel({
    align: "center",
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  // ---------- Run configurations ----------
  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
  }, [embla, onSelect]);

  // ---------- Carousel buttons ----------

  const NextButton = ({ enabled, onClick }) => {
    return (
      <NextEmblaButton
        onClick={onClick}
        disabled={!enabled}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle r="24.5" transform="matrix(-1 0 0 1 25 25)" stroke="black" />
          <path d="M20 14L31 25L20 36" stroke="black" />
        </svg>
      </NextEmblaButton>
    );
  };

  const PrevButton = ({ enabled, onClick }) => {
    return (
      <PrevEmblaButton
        onClick={onClick}
        disabled={!enabled}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="25"
            cy="25"
            r="24.5"
            stroke="black"
            vectorEffect="non-scaling-size"
          />
          <path d="M30 14L19 25L30 36" stroke="black" />
        </svg>
      </PrevEmblaButton>
    );
  };

  return (
    <Layout title={siteTitle}>
      <Seo
        title="What is Eight Branches About?"
        description="With the highest graduate pass rates for acupuncture and herbal medicine on Pan-Canadian
Exams, Eight Branches is the top choice for future leaders in TCM."
        keywords={[
          `Eight Branches`,
          `Eight Branches Toronto`,
          `Eight Branches about`,
          `Eight Branches about us`,
          `what is traditional chinese medicine`,
          `what is tcm`,
          `learn acupuncture toronto`,
          `Acupuncture learn online`,
          `Acupuncture school online`,
          `learn TCM toronto`,
          `tcm university toronto`,
          `tcm university online`,
          `best school for acupuncture toronto`,
          `best ranking school acupuncture toronto`,
          `best ranking school acupuncture ontario`,
          `best ranking school acupuncture canada`,
          `affordable acupuncture toronto`,
        ]}
      />
      <AboutUsSection ref={OurStoryRef}>
        <Left>
          <HideImage
            variants={hideImage}
            initial="visible"
            animate={OurStoryInView ? "hidden" : "visible"}
            exit="hidden"
          >
            <StaticImage
              src="../images/AboutUs/school.png"
              alt="Image of an office within our school. A wooden table is pictured against a green wall backdrop, surrounded by decorative plants."
              quality={100}
              placeholder="none"
              transformOptions={{ cropFocus: "center" }}
              imgStyle={{ objectFit: "cover" }}
              style={{ height: "100%" }}
            />
          </HideImage>
        </Left>
        <Right variants={parent} initial="hidden" animate="visible">
          <motion.h3 variants={fadeIn}>
            Eight Branches College of Eastern Medicine is a Toronto Acupuncture
            School which offers students a comprehensive education with a
            foundation in Traditional Chinese Medicine.
          </motion.h3>
          <motion.div variants={fadeIn}>
            <HiddenText
              variants={clickExpand}
              initial="hidden"
              animate={expand ? "visible" : "hidden"}
            >
              <Gradient
                variants={hideGradient}
                intial="visible"
                animate={expand ? "hidden" : "visible"}
              />
              <p>
                Eight Branches College of Eastern Medicine specializes in
                teaching the ancient practice of Traditional Chinese Medicine
                (TCM) and making it relevant in the modern world through capable
                and confident graduates. The student experience includes a
                balance of in-depth theory and extensive hands-on practice. The
                education is comprehensive— based on eight foundational branches
                of Eastern Medicine. Students are supported and mentored by a
                warm community, and encouraged to grow; personally, as an expert
                in TCM, and as a capable leader in your community. Eight
                Branches fosters thought-leadership, academic excellence and
                brings decades of experience to ensure that students are
                equipped for success, and most importantly, are able to better
                lives through this powerful and compassionate medicine.
                <br />
                <br />
                We are committed to the success of our students, and to offering
                the best Eastern Medicine education in the province of Ontario,
                Canada. To this effect we have established a program that has
                lead to the highest pass rates on board regulatory examinations
                in the Province of Ontario. Eight Branches works diligently to
                ensure programs meet (and, where possible, exceed) the criteria
                for excellence set out by all the major North American
                regulatory bodies so that graduates can confidently practice
                this medicine no matter where their future takes them. Eight
                Branches offers continuing education, professional development
                and advancement to our students, graduates and faculty. We aim
                to create a supportive environment that encourages growth, and
                promotes leaders in the field of TCM. We aim to be a centre for
                mentorship and an incubator for leading edge approaches so that
                the very best this medicine has to offer is readily available
                via our ever-expanding community of dedicated and capable
                practitioners.
              </p>
            </HiddenText>
          </motion.div>
          <ExpandButton variants={fadeIn} onClick={() => setExpand(!expand)}>
            <p>{!expand ? "Continue Reading" : "Close"}</p>
            <motion.svg
              animate={expand ? { rotate: "180deg" } : { rotate: 0 }}
              initial={{ rotate: 0 }}
              width="13"
              height="8"
              viewBox="0 0 18 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.115 -6.94355e-07L9 6.79892L15.885 -9.24496e-08L18 2.09312L9 11L-9.14931e-08 2.09312L2.115 -6.94355e-07Z"
                fill="black"
              />
            </motion.svg>
          </ExpandButton>
        </Right>
      </AboutUsSection>
      <EightBranchesFacts>
        <h1>
          <svg
            width="64"
            height="89"
            viewBox="0 0 64 89"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M46.1941 68.4199C42.8549 71.3584 37.8305 73.0537 32.5253 73.0537C22.4765 73.0537 14.3002 66.8094 14.3002 59.1523C14.3002 50.0543 20.6353 45.2509 32.5253 45.2509C45.3515 45.2509 50.7503 48.359 50.7503 55.79V62.6842C36.2389 62.5994 31.9635 59.7457 31.9635 50.8171V38.0177C31.9635 29.0891 36.3326 26.2354 50.7503 26.1506V31.3778C50.7503 40.3063 45.9132 43.5839 32.5253 43.5839C20.5104 43.5839 14.3002 38.7806 14.3002 29.6825C14.3002 22.0819 22.4765 15.7811 32.5253 15.7811C37.7369 15.7811 42.8549 17.5612 46.1941 20.4997L47.5048 19.313C43.7911 16.0354 38.2986 14.0858 32.5253 14.0858C21.5403 14.0858 12.4277 21.0648 12.4277 29.6825C12.4277 39.7977 19.5118 45.2792 32.5253 45.2792C46.8494 45.2792 52.6228 41.3235 52.6228 31.3778V24.4553C35.7708 24.3706 30.0911 27.5634 30.0911 38.0177V50.8171C30.0911 61.2714 35.7708 64.4642 52.6228 64.3795V55.79C52.6228 47.2853 46.2877 43.5839 32.5253 43.5839C19.6054 43.5839 12.4277 49.1218 12.4277 59.1523C12.4277 67.7418 21.4467 74.749 32.5253 74.749C38.2986 74.749 43.7911 72.8842 47.5048 69.6066L46.1941 68.4199Z"
              fill="#D27241"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.9809 0.148438H49.3991C57.1205 0.148438 63.38 6.32115 63.38 13.9356V75.2118C63.38 82.8262 57.1205 88.9989 49.3991 88.9989H13.9809C6.25945 88.9989 0 82.8262 0 75.2118V13.9356C0 6.32115 6.25945 0.148438 13.9809 0.148438ZM13.9809 1.68034C7.11739 1.68034 1.55343 7.1672 1.55343 13.9356V75.2118C1.55343 81.9801 7.11739 87.467 13.9809 87.467H49.3991C56.2626 87.467 61.8266 81.9801 61.8266 75.2118V13.9356C61.8266 7.1672 56.2626 1.68034 49.3991 1.68034H13.9809Z"
              fill="#D27241"
            />
          </svg>
          The Eight Branches <br /> of Chinese Medicine
        </h1>
        <EightBranches />
      </EightBranchesFacts>
      <OurCorePrinciples>
        <h2>Our Core Principles</h2>
        <PrinciplesWrapper>
          <PrinciplesItem
            ref={CorePrinciples1Ref}
            variants={principlesFadeIn}
            initial="hidden"
            animate={CorePrinciples1InView ? "visible" : "hidden"}
          >
            <PrinciplesImage
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ ease: "easeOut" }}
              variants={principlesFadeIn}
            >
              <StaticImage
                src="../images/AboutUs/OurCorePrinciples/left.png"
                alt="Image of a practitioner performing moxibustion."
                quality={100}
              />
            </PrinciplesImage>
            <motion.p variants={principlesFadeIn}>
              Education based upon the 8 foundational branches of Eastern
              Medicine.
            </motion.p>
          </PrinciplesItem>
          <PrinciplesItem
            ref={CorePrinciples2Ref}
            variants={principlesFadeIn}
            initial="hidden"
            animate={CorePrinciples2InView ? "visible" : "hidden"}
          >
            <PrinciplesImage
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ ease: "easeOut" }}
              variants={principlesFadeIn}
            >
              <StaticImage
                src="../images/AboutUs/OurCorePrinciples/middle.png"
                alt="Soothing image of a Chinese money plant, located in one of our facilities."
                quality={100}
              />
            </PrinciplesImage>
            <motion.p variants={principlesFadeIn}>
              Focus on personal development and care based on the Daoist Arts,
              which enrich the understanding of this system of medicine.
            </motion.p>
          </PrinciplesItem>
          <PrinciplesItem
            ref={CorePrinciples3Ref}
            variants={principlesFadeIn}
            initial="hidden"
            animate={CorePrinciples3InView ? "visible" : "hidden"}
          >
            <PrinciplesImage
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ ease: "easeOut" }}
              variants={principlesFadeIn}
            >
              <StaticImage
                src="../images/AboutUs/OurCorePrinciples/right.png"
                alt="Image of a practitioner performing acupuncture on a shoulder."
                quality={100}
              />
            </PrinciplesImage>
            <motion.p variants={principlesFadeIn}>
              Balanced courses, offering both in-depth theory and extensive
              hands-on practice.
            </motion.p>
          </PrinciplesItem>
        </PrinciplesWrapper>
      </OurCorePrinciples>
      <GraphSection>
        <GraphTop>
          <h1>
            Educational <br /> Excellence
          </h1>
          <h6>
            At Eight Branches, we pride ourselves on providing a comprehensive
            education that is tailored to help our passionate students pass the
            necessary exams and help them build a successful professional
            practice.
            <br />
            <br />
            Our students consistently outperform the Ontario average in terms of
            pass rates on the Pan-Canadian examinations, the only objective
            measure which is used to compare schools.
          </h6>
        </GraphTop>
        <Embla>
          <EmblaViewport ref={emblaRef}>
            <EmblaContainer>
              <EmblaSlide>
                <StaticImage
                  src="../images/AboutUs/Graphs/allexams.png"
                  alt="Graph depicting how Eight Branches consistently scores higher in written exam success rates compared to other Ontario colleges."
                  placeholder="none"
                  quality={100}
                />
              </EmblaSlide>
              <EmblaSlide>
                <StaticImage
                  src="../images/AboutUs/Graphs/clinicalexams.png"
                  alt="Graph depicting how Eight Branches consistently scores higher in clinical exam success rates compared to other Ontario colleges."
                  placeholder="none"
                  quality={100}
                />
              </EmblaSlide>
              <EmblaSlide>
                <StaticImage
                  src="../images/AboutUs/Graphs/writtenexams.png"
                  alt="Graph depicting how Eight Branches consistently scores higher in written exam success rates compared to other Ontario colleges."
                  placeholder="none"
                  quality={100}
                />
              </EmblaSlide>
              <EmblaSlide>
                <StaticImage
                  src="../images/AboutUs/Graphs/tcmpexams.png"
                  alt="Graph depicting how Eight Branches consistently scores higher in traditional chinese medicine practitioner exam success rates compared to other Ontario colleges."
                  placeholder="none"
                  quality={100}
                />
              </EmblaSlide>
            </EmblaContainer>
          </EmblaViewport>
          <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
          <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </Embla>
      </GraphSection>

      <OurTeachingClinic>
        <TeachingClinicFlex>
          <TCLeft>
            <StaticImage
              src="../images/AboutUs/tcimage.png"
              alt="Image of a woman receiving care. She is lying down with her eyes closed as two metal rods point to her temple."
              placeholder="blurred"
              transformOptions={{ cropFocus: "top" }}
              imgStyle={{ objectFit: "cover" }}
              style={{ height: "100%" }}
              quality={100}
            />
          </TCLeft>
          <TCRight>
            <Header>
              <Link to="/teaching-clinic">
                <h2>
                  Our Teaching Clinic
                  <Arrow />
                </h2>
              </Link>
              <h6>
                Explore affordable, community-based treatments from our
                student-run clinic. Supervised by our most talented instructors,
                the clinc is one of the many ways we help our students gain
                real-world expertise and knowledge in patient care.
              </h6>
            </Header>
            <Bottom>
              <Treatments>
                <p>Available Treatments:</p>
                <p>
                  Acupuncture, Moxibustion, Herbal Medicine, Tui Na, Nutritional
                  & Lifestyle Counselling, Cupping, Gua Sha, Auricular (Ear)
                  Acupuncture and Seeding.
                </p>
              </Treatments>
              <Hours>
                <p>Clinic Hours:</p>
                <Details>
                  <p style={{ paddingRight: "1.5rem" }}>
                    Monday
                    <br />
                    Tuesday
                    <br />
                    Wednesday
                    <br />
                    Thursday
                    <br />
                    Friday
                    <br />
                    Saturday
                    <br />
                    Sunday
                    <br />
                  </p>
                  <p>
                    {teachingClinic.mon} <br />
                    {teachingClinic.tues} <br />
                    {teachingClinic.wed} <br />
                    {teachingClinic.thurs} <br />
                    {teachingClinic.fri} <br />
                    {teachingClinic.sat} <br />
                    {teachingClinic.sun} <br />
                  </p>
                </Details>
              </Hours>
            </Bottom>
          </TCRight>
        </TeachingClinicFlex>
      </OurTeachingClinic>
      <FAQBg>
        <h1>Common Questions</h1>
        <FAQWrapper>
          <FAQMap />
        </FAQWrapper>
      </FAQBg>
      <AcademicAdvisor />
    </Layout>
  );
};

export default AboutUs;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

const EightBranchesFacts = styled.section`
  width: 100%;
  margin: 0 auto;
  padding-top: 2rem;
  background-color: var(--color-lightestbeige);

  h1 {
    padding: 5rem 0;
    margin: 0 auto;
    text-align: center;
    color: var(--color-lightorange);
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: ${breakpoints.l}px) {
    h1 {
      padding: 2.5rem 0;
      width: 100%;
      svg {
        padding-bottom: 1rem;
      }
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    padding-top: 1rem;
    h1 {
      font-size: 34px;
      svg {
        padding-bottom: 1.5rem;
      }
    }
  }
`;

const AboutUsSection = styled.section`
  background-color: var(--color-sandbeige);
  display: flex;
  justify-content: space-around;
  position: relative;

  @media (max-width: ${breakpoints.l}px) {
    flex-direction: column-reverse;
  }
`;

const Left = styled.div`
  overflow: hidden;
  position: sticky;
  top: 0;
  width: 50vw;
  height: 100vh;

  @media (max-width: ${breakpoints.l}px) {
    display: none;
  }
`;

const HideImage = styled(motion.div)`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const Right = styled(motion.div)`
  width: 50vw;
  background-color: var(--color-sandbeige);
  position: relative;
  z-index: 10;

  h3 {
    padding-top: 25vh;
    padding-bottom: 5rem;
    margin: 0 auto;
    width: 85%;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    h3 {
      width: 80%;
      padding-bottom: 4rem;
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    h3 {
      padding-top: 15vh;
      margin: 0 auto;
    }
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 80%;
    margin: 0 auto;
    h3 {
      margin: 0 auto;
      padding-top: 10rem;
      padding-bottom: 3rem;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 90%;
    h3 {
      margin: 0;
      width: 100%;
    }
  }
`;

const HiddenText = styled(motion.div)`
  width: 75%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  p {
    font-family: "Matter-light";
  }

  @media (max-width: ${breakpoints.xl}px) {
    width: 80%;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 100%;
  }
`;

const Gradient = styled(motion.div)`
  :before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: linear-gradient(
      180deg,
      rgba(253, 250, 241, 0) 30%,
      #efe9dd 90%
    );
  }

  @media (max-width: ${breakpoints.s}px) {
    :before {
      background: linear-gradient(
        180deg,
        rgba(253, 250, 241, 0) 10%,
        #efe9dd 70%
      );
    }
  }
`;

const ExpandButton = styled(motion.button)`
  width: 75%;
  margin: 0 auto;
  margin-bottom: 5rem;
  border: none;
  background: none;
  position: relative;
  padding-top: 1rem;
  z-index: 5;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  p {
    padding-right: 0.5rem;
    font-size: 20px;
    color: black;
  }
  @media (max-width: ${breakpoints.xl}px) {
    width: 80%;
  }

  @media (max-width: ${breakpoints.s}px) {
    justify-content: center;
    /* border-bottom: 1px solid; */
    width: auto;
    padding-left: 0;
    p {
      font-size: 17px;
    }
  }
`;

const OurCorePrinciples = styled.section`
  padding: 5rem 0;
  background-color: #efe9dd;

  h2 {
    text-align: center;
    color: var(--color-darkgreen);
  }
  @media (max-width: ${breakpoints.l}px) {
    h2 {
      font-size: 40px;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    padding: 5rem 0;
    h2 {
      margin-top: 3rem;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    padding: 1.5rem 0;
    h2 {
      font-size: 30px;
      margin-top: 3rem;
    }
  }
`;

const PrinciplesWrapper = styled.div`
  padding-top: 5rem;
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${breakpoints.xxl}px) {
    width: 90%;
  }

  @media (max-width: ${breakpoints.m}px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-top: 2.5rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    padding-top: 0.5rem;
  }
`;

const PrinciplesItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 31%;
  p {
    font-family: "Matter-light";
    padding-top: 1rem;
    text-align: center;
  }
  @media (max-width: ${breakpoints.xl}px) {
    p {
      width: 90%;
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    width: 27%;
    p {
      width: 100%;
      font-size: 16px;
      line-height: 130%;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 40%;
    margin: 2rem 0;
    p {
      width: 100%;
      font-size: 19px;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 90%;
    margin: 2rem 0;
    p {
      line-height: 140%;
      font-size: 17px;
      width: 70vw;
    }
  }
`;

const PrinciplesImage = styled(motion.div)`
  overflow: hidden;
  border-radius: 100%;
`;

const GraphSection = styled.section`
  background-color: var(--color-lightestbeige);
  padding-top: 4rem;
  padding-bottom: 4rem;
  border-bottom: 1px solid #c4c4c4;
`;

const GraphTop = styled.section`
  width: 90%;
  margin: 0 auto;
  border-top: 1px solid #c4c4c4;
  display: flex;
  justify-content: space-between;
  padding-top: 2rem;
  padding-bottom: 5rem;

  h1 {
    padding-right: 3rem;
  }

  h6 {
    width: 55%;
    align-self: flex-end;
  }

  @media (max-width: ${breakpoints.m}px) {
    flex-direction: column;
    padding-bottom: 2rem;
    h1 {
      padding-right: 0rem;
    }
    h6 {
      padding-top: 2rem;
      align-self: flex-start;
      width: 100%;
    }
  }
`;

const Embla = styled.div`
  width: 80%;
  margin: 0 auto;
  position: relative;
  padding: 5rem 0;

  @media (max-width: ${breakpoints.xl}px) {
    width: 70%;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 95%;
  }
`;

const EmblaViewport = styled.div`
  width: 100%;
  overflow: hidden;
`;

const EmblaContainer = styled.div`
  display: flex;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

const EmblaSlide = styled.div`
  min-width: 100%;
  min-height: 100%;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const NextEmblaButton = styled(motion.button)`
  right: -5%;
  border: none;
  background: none;
  cursor: pointer;
  touch-action: manipulation;
  transition: opacity 0.5s ease;
  opacity: 1;

  position: absolute;
  z-index: 1;
  top: 37.5%;

  :disabled {
    opacity: 0.2;
    cursor: default;
  }
  @media (max-width: ${breakpoints.xl}px) {
    right: -15%;
  }

  @media (max-width: ${breakpoints.m}px) {
    width: 45px;
    height: 45px;
    top: 90%;
    right: 25%;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    top: 85%;
  }
`;

const PrevEmblaButton = styled(motion.button)`
  left: -5%;
  border: none;
  background: none;
  cursor: pointer;
  touch-action: manipulation;
  transition: opacity 0.5s ease;
  opacity: 1;

  position: absolute;
  z-index: 1;
  top: 37.5%;

  :disabled {
    opacity: 0.2;
    cursor: default;
  }

  @media (max-width: ${breakpoints.xl}px) {
    left: -15%;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 45px;
    height: 45px;
    top: 90%;
    left: 25%;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    top: 85%;
  }
`;

const OurTeachingClinic = styled.section`
  background-color: var(--color-salmon);
  width: 100%;
`;

const TeachingClinicFlex = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  width: 85%;
  height: 100%;
  margin: 0 auto;
  padding: 10rem 0;

  @media (max-width: ${breakpoints.xxl}px) {
    width: 90%;
  }
  @media (max-width: ${breakpoints.l}px) {
    flex-direction: column;
  }
  @media (max-width: ${breakpoints.m}px) {
    padding: 5rem 0;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 100%;
  }
`;

const TCLeft = styled.div`
  position: relative;
  align-self: center;
  margin-right: 2rem;
  border-radius: 20px;
  overflow: hidden;
  /* max-width: 36vw; */
  width: 40%;
  height: 100%;

  @media (max-width: ${breakpoints.xxl}px) {
    /* max-width: 40vw; */
    align-self: flex-start;
  }
  @media (max-width: ${breakpoints.xl}px) {
    /* position: sticky;
    top: 50%;
    transform: translateY(-50%);
    margin-top: 15rem; */
  }
  @media (max-width: ${breakpoints.l}px) {
    display: none;
  }
`;

const TCRight = styled.div`
  flex-basis: 50%;
  margin: 0 2rem;
`;

const Header = styled.div`
  color: black;
  padding-bottom: 2.5rem;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid black;
  a {
    text-decoration: none;
  }
  h2 {
    color: black;
    text-decoration: none;
    padding-bottom: 1rem;

    svg {
      transform: translateY(-0.25rem);
      transition: var(--hover-transition);
      margin-left: 1rem;
    }
    :hover {
      svg {
        margin-left: 1.5rem;
      }
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    h2 {
      svg {
        transform: translateY(0rem);
      }
    }
  }
`;

const Bottom = styled.div`
  color: black;
  display: flex;
  justify-content: space-between;
  p {
    padding-top: 1rem;
    font-family: "matter-light";
  }
  h6 {
    font-family: "matter-regular";
    letter-spacing: 0.02rem;
  }
  @media (max-width: ${breakpoints.xl}px) {
    flex-direction: column;
  }
  @media (max-width: ${breakpoints.l}px) {
    flex-direction: row;
  }
  @media (max-width: ${breakpoints.m}px) {
    flex-direction: column;
  }
`;

const Details = styled.div`
  color: black;
  display: flex;
  justify-content: space-between;
  p {
    padding-top: 1rem;
    font-family: "matter-light";
  }

  @media (max-width: ${breakpoints.xl}px) {
    justify-content: flex-start;
    p :nth-of-type(1) {
      margin-right: 2rem;
    }
  }
`;

const Hours = styled.div`
  white-space: nowrap;

  @media (max-width: ${breakpoints.xl}px) {
    padding-top: 2rem;
  }

  @media (max-width: ${breakpoints.l}px) {
    padding-top: 0rem;
  }

  @media (max-width: ${breakpoints.m}px) {
    padding-top: 2rem;
  }
`;
const Treatments = styled.div`
  width: 45%;
  margin-right: 2rem;

  @media (max-width: ${breakpoints.xl}px) {
    width: 100%;
    margin-right: 1rem;
  }

  @media (max-width: ${breakpoints.l}px) {
    width: 45%;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 100%;
  }
`;

const FAQBg = styled.section`
  background-color: var(--color-lightestbeige);
  width: 100%;
  padding-top: 10rem;
  padding-bottom: 15rem;
  h1 {
    text-align: center;
    padding: 5rem 0;
    color: var(--color-darkgreen);
  }

  @media (max-width: ${breakpoints.l}px) {
    padding-top: 5rem;
    padding-bottom: 10rem;
  }

  @media (max-width: ${breakpoints.m}px) {
    padding-top: 0rem;
    padding-bottom: 5rem;

    h1 {
      padding-bottom: 2.5rem;
    }
  }
`;

const FAQWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  border: 1px solid black;
  border-bottom: none;
  @media (max-width: ${breakpoints.m}px) {
    width: 90%;
  }
`;
