import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import BlockContent from "@sanity/block-content-to-react";
import Image from "next/image";
import { Instagram, LinkIcon } from "../../../svg/icons";

const TeamMember = ({ member, setActiveIndex, index }) => {
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = (index) => {
    // set the hovered index so that you can show the right image on hover
    setActiveIndex(index);
    setHovered(true);
  };
  const handleMouseLeave = () => {
    // once the hover is over, set the active index to nothing (match no items in array)
    setActiveIndex(-1);
    setHovered(false);
  };

  const [open, setOpen] = useState(false);
  const handleModal = () => {
    setOpen(!open);
  };

  const hoverAnimBackground = {
    visible: {
      opacity: 1,
      height: "100%",
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    hidden: {
      opacity: 1,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const openModal = {
    hidden: {
      opacity: 0,
      transition: {
        ease: [0.25, 0, 0.35, 1],
        duration: 0.15,
        staggerChildren: 0.35,
      },
    },
    open: {
      opacity: 1,
      transition: {
        ease: [0.25, 0, 0.35, 1],
        duration: 0.35,
      },
    },
  };
  const modalChild = {
    hidden: {
      opacity: 0,
      y: "-40%",
      x: "-50%",
      transition: {
        ease: [0.25, 0, 0.35, 1],
        duration: 0.35,
      },
    },
    open: {
      opacity: 1,
      y: "-50%",
      x: "-50%",
      transition: {
        ease: [0.25, 0, 0.35, 1],
        duration: 0.35,
      },
    },
  };

  return (
    <>
      <TeamItem
        id="team-item"
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
        onClick={handleModal}
      >
        <ItemInner>
          <h3>{member.name}</h3>
          {member.position && (
            <motion.small
              initial={{ color: "var(--color-grey)" }}
              animate={{
                color: hovered ? "var(--color-black)" : "var(--color-grey)",
                transition: {
                  duration: 0.2,
                  ease: "easeInOut",
                },
              }}
            >
              {member.position}
            </motion.small>
          )}
        </ItemInner>
        <HoverBlue
          variants={hoverAnimBackground}
          initial="hidden"
          animate={hovered ? "visible" : "hidden"}
        />
      </TeamItem>
      <AnimatePresence>
        {open && (
          <Modal
            key={member._id + "modal"}
            variants={openModal}
            initial="hidden"
            animate={open ? "open" : "hidden"}
            exit="hidden"
          >
            <ClickOut onClick={handleModal} />
            <ModalWrapper variants={modalChild}>
              <ModalFlex>
                <ModalImage>
                  <Image
                    src={member.imageUrl}
                    alt={`Portrait de ${member.name}`}
                    width={634}
                    height={795}
                    objectFit="cover"
                  />
                </ModalImage>
                <ModalText>
                  <ModalTextInner>
                    {member.position && <small>{member.position}</small>}
                    <h2>{member.name}</h2>
                    <BlockContent blocks={member.bio} />
                    <ModalSocials>
                      {member.instagram && (
                        <SocialLink>
                          <Instagram />
                          <a
                            href={member.instagram}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <small>Instagram</small>
                          </a>
                        </SocialLink>
                      )}
                      {member.portfolio && (
                        <SocialLink>
                          <LinkIcon />
                          <a
                            href={member.portfolio}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <small>Portfolio</small>
                          </a>
                        </SocialLink>
                      )}
                    </ModalSocials>
                  </ModalTextInner>
                </ModalText>
              </ModalFlex>
              <CloseButton onClick={handleModal}>
                <small style={{color: "var(--color-black)"}}>x</small>
              </CloseButton>
            </ModalWrapper>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default TeamMember;

const TeamItem = styled.div`
  border-bottom: 1px solid var(--color-black);
  padding: 2rem 0;
`;

const ItemInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  h3 {
    font-family: "Surt";
    color: var(--color-black);
    font-weight: 100;
    user-select: none;
  }
  small {
    color: var(--color-grey);
    width: 25%;
    text-align: right;
  }
`;

const HoverBlue = styled(motion.div)`
  z-index: -1;
  /* background: white; */
  background: #b8e8d699;
  backdrop-filter: blur(20px) saturate(180%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-origin: bottom;
`;

const Modal = styled(motion.div)`
  z-index: 15;
  position: fixed;
  background: #00000097;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ClickOut = styled.div`
  z-index: 15;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ModalWrapper = styled(motion.div)`
  position: absolute;
  z-index: 16;
  padding: 1rem;
  top: 50%;
  left: 50%;
  /* transform: translate(-50%, -50%); */
  width: 65%;
  background: var(--color-cream);
  user-select: none;
  border: 1px solid var(--color-black);
  box-sizing: border-box;
`;

const ModalFlex = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  max-height: 795px;
`;

const ModalImage = styled.div`
  height: 100%;
  max-height: 795px;
  width: 50%;
  display: block;
`;

const ModalText = styled.div`
  height: 100%;
  width: 50%;
  display: block;
`;

const ModalTextInner = styled.div`
  overflow-y: auto;
  max-height: 750px;
  width: 80%;
  margin: 0 auto;
  padding: 0.5rem;
  padding-bottom: 0rem;
  padding-top: 4rem;
  * {
    color: var(--color-black);
  }
  h2 {
    margin: 2rem 0;
    font-family: "Editorial-Italic";
    line-height: 100%;
  }
`;

const ModalSocials = styled.div`
  padding: 1rem 0;
`;

const SocialLink = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  a {
    margin-left: 1rem;
    text-decoration: none;
  }
  :hover {
    a {
      text-decoration: underline;
    }
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  padding: 1rem;
  cursor: pointer;
  small {
    font-family: "Surt";
  }
`;
