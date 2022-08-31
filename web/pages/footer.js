import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import contactInfo from "../../site/settings/contact_info.json";
import FooterStamp from "../svg/footerStamp";
import { SiTiktok, SiInstagram, SiLinkedin } from "react-icons/si";
import MailchimpFormContainer from "./Mailchimp/mailchimpFormContainer.js";
import breakpoints from "./breakpoints.js";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  const [visible, setVisible] = useState(false);

  const footerRef = useRef();
  // logic to hide the footer unless it is within a certain threshold from the top of the viewport
  // this is to prevent it appearing when an iOS user triggers a "scroll bounce" when scrolling to the top of the page, revealing the footer behind the <body>
  const showFooter = useCallback(() => {
    setVisible(true);
  }, []);

  const hideFooter = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const footerDivCoords = footerRef.current?.getBoundingClientRect();
      // only show the footer if it is within 1800px from the top of the viewport
      if (footerDivCoords?.y <= 1800) {
        showFooter();
      } else {
        hideFooter();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [showFooter, hideFooter]);

  // fade it in with an animation

  const fadeIn = {
    initial: {
      opacity: 0,
      transition: {
        duration: 0.35,
        transition: "easeOut",
      },
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.35,
        transition: "easeOut",
      },
    },
  };

  return (
    <div ref={footerRef}>
      <AnimatePresence>
        {visible && (
          <FooterComponent
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <FlexWrapper>
              <Newsletter>
                <div>
                  <h4>
                    Join our newsletter to stay in touch with the latest events
                    and updates
                  </h4>
                  <MailchimpFormContainer />
                </div>
                <FooterStamp />
              </Newsletter>
              <MobileWrapper>
                <SiteMenu>
                  {/* <Title>Menu</Title> */}
                  {/* <CollapseBreakMobile /> */}
                  {/* <CollapseBreakMobile /> */}
                  <Link scroll={false} to="/careers/">
                    <p>Careers</p>
                  </Link>
                  <Link scroll={false} to="/about-us/">
                    <p>About Us</p>
                  </Link>
                  <Link scroll={false} to="/programs/">
                    <p>Programs</p>
                  </Link>
                  <Link scroll={false} to="/admissions/">
                    <p>Admissions</p>
                  </Link>
                  <Link scroll={false} to="/campus/">
                    <p>Campus</p>
                  </Link>
                  <Link scroll={false} to="/our-faculty/">
                    <p>Meet Our Faculty</p>
                  </Link>
                  <Link scroll={false} to="/teaching-clinic/">
                    <p>Teaching Clinic</p>
                  </Link>
                  <Link scroll={false} to="/bulletin-board/">
                    <p>Events</p>
                  </Link>
                  <Link scroll={false} to="/alumni/">
                    <p>Alumni</p>
                  </Link>
                  <a href="https://online.erealia.com/ebaem/cwv/">
                    <p>Student Portal</p>
                  </a>
                </SiteMenu>

                <GetInTouch>
                  {/* <Title>Get in touch</Title> */}
                  {/* <CollapseBreakMobile /> */}
                  {/* <CollapseBreakMobile /> */}
                  <div>
                    <a href={`mailto: ${contactInfo.email}`}>
                      {contactInfo.email}
                    </a>
                    <br />
                    <br />
                    <a
                      href={`tel: ${contactInfo.phone}`}
                      alt="Main phone number"
                    >
                      {contactInfo.phone}
                    </a>
                    <br />
                    <a
                      href={`tel: ${contactInfo.phone2}`}
                      alt="Toll-free phone number"
                    >
                      {contactInfo.phone2}
                    </a>
                    <br />
                    <br />
                    <a href="https://g.page/EightBranches?share" target="blank">
                      {contactInfo.address.street}
                    </a>
                  </div>

                  <br />
                  <br />
                  <SocialIcons>
                    <a
                      href="https://www.tiktok.com/@eightbranches?fromUrl=%2Feightbranches&lang=en"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <SiTiktok size={27} />
                    </a>
                    <a
                      href="https://www.instagram.com/eightbranches/"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <SiInstagram size={27} />
                    </a>
                    <a
                      href="https://ca.linkedin.com/company/eight-branches-academy-of-eastern-medicine"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <SiLinkedin size={27} />
                    </a>
                  </SocialIcons>
                </GetInTouch>
              </MobileWrapper>
              {/* <FooterStampMobile>
                <FooterStamp />
              </FooterStampMobile> */}
            </FlexWrapper>
          </FooterComponent>
        )}
      </AnimatePresence>
    </div>
  );
};

const FooterComponent = styled(motion.footer)`
  position: fixed;
  bottom: 0;
  z-index: 0;
  height: var(--footer-height);
  // make sure to also change the padding-bottom in layout.js when adjusting the footer
  // make sure to also change the padding-bottom in layout.js when adjusting the footer
  // make sure to also change the padding-bottom in layout.js when adjusting the footer
  // make sure to also change the padding-bottom in layout.js when adjusting the footer
  width: 100%;
  background-color: var(--color-beige);

  @media (max-width: ${breakpoints.xl}px) {
    height: 70vh;
  }
  @media (max-width: ${breakpoints.m}px) {
    /* height: auto; */
    height: 80vh;
  }
  @media (max-width: ${breakpoints.s}px) {
    height: 98vh;
  }
`;

const FlexWrapper = styled.span`
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin: 0 auto;
  padding-top: 5rem;

  a,
  p {
    color: var(--color-black);
    font-size: 18px;
    line-height: 28px;
    text-decoration: none;
    font-family: "Matter-light";
    transition: var(--hover-transition);

    :hover {
      color: var(--color-orange);
    }
  }

  p {
    padding-bottom: 0.5rem;
  }

  h4 {
    padding-bottom: 1.5rem;
  }

  @media (max-width: 1600px) {
    width: 80%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    width: 85%;

    p,
    a {
      font-size: 16px;
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    width: 90%;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 90%;
    align-items: center;
    flex-direction: column;
    padding-top: 5vh;

    h4 {
      font-family: "Matter-regular";
      color: #2b2b2b;
      padding-bottom: 0.75rem;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 90%;
    padding-top: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding-top: 10vh; */
    /* padding-top: 15rem; */
  }
  @media (max-width: ${breakpoints.xs}px) {
    p,
    a {
      font-size: 14px;
    }
  }
`;

const Newsletter = styled.section`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  max-width: 500px;

  h4 {
    line-height: 120%;
    margin-bottom: 1rem;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    max-width: 400px;
    h4 {
      font-size: 30px !important;
    }
  }
  @media (max-width: ${breakpoints.xl}px) {
    margin-right: 1rem;
  }
  @media (max-width: ${breakpoints.l}px) {
    max-width: 350px;
    h4 {
      font-size: 28px !important;
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    max-width: none;
    width: 90%;
    align-self: flex-start;

    > :nth-child(2) {
      display: none;
    }
    padding-bottom: 2.5rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 100%;
    h4 {
      font-size: 22px !important;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    h4 {
      font-size: 20px !important;
    }
  }
`;

const SiteMenu = styled.section`
  color: var(--color-black);
  text-decoration: none;

  @media (max-width: ${breakpoints.m}px) {
    margin-right: 5rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-right: 1rem;
  }
`;

const Title = styled.p`
  :hover {
    color: black !important;
  }
  @media (max-width: ${breakpoints.m}px) {
    font-family: "Matter-regular" !important;
    font-size: 18px !important;
    margin-bottom: 0.5rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    margin-bottom: 0rem;
  }
`;

const GetInTouch = styled.section`
  flex-basis: 3rem;
  a {
    cursor: pointer;
  }
`;
const SocialIcons = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
`;

// const FooterStampMobile = styled.div`
//   display: none;

//   @media (max-width: ${breakpoints.m}px) {
//     display: flex;
//   }
// `

const MobileWrapper = styled.div`
  width: 45%;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${breakpoints.xxl}px) {
    width: 55%;
    justify-content: space-evenly;
  }
  @media (max-width: ${breakpoints.xl}px) {
    width: 40%;
    justify-content: space-between;
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 45%;
  }
  @media (max-width: ${breakpoints.m}px) {
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
  }
  @media (max-width: ${breakpoints.s}px) {
    justify-content: space-between;
    /* margin-bottom: 2rem; */
  }
`;

const CollapseBreakMobile = styled.br`
  @media (max-width: ${breakpoints.m}px) {
    display: none;
  }
`;

export default Footer;
