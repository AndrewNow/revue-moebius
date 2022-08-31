import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { breakpoints } from "../../utils/breakpoints";
import { LightDarkButton } from "../../svg/icons";
import { useTheme } from "next-theme-mode";

const ToggleDarkMode = () => {
  // Set Dark mode / Light mode
  // according to https://sreetamdas.com/blog/the-perfect-dark-mode

  // __Rules__
  // * If the user has visited our site before, then we use their saved preference.
  // * If the user hasn't visited our site before or hasn't saved a preference, then we check if their Operating System has a preference and use the same.
  // * If the above two methods don't return a preference still, then we default to a light theme.
  // * All the above checks need to be run before our page is rendered/shown to the user.
  // * Allow the user to toggle dark mode, and save their preference for future reference.

  // const [darkTheme, setDarkTheme] = useState(undefined);

  // const handleToggle = () => {
  //   setDarkTheme(!darkTheme);
  // };

  // const storeUserSetPreference = (pref) => {
  //   localStorage.setItem("theme", pref);
  //   console.log("TOGGLEDARKMODE:", localStorage.getItem("theme"));
  // };

  // const root = document.documentElement;
  // console.log('root', root)

  // useEffect(() => {
  //   if (document !== undefined) {
  //     const initialColorValue = root.style.getPropertyValue(
  //       "--initial-color-mode"
  //     );
  //     console.log('initialcolorvalue', initialColorValue)
  //     setDarkTheme(initialColorValue === "dark");
  //     console.log('setting dark theme to dark', darkTheme)

  //   }
  // }, []);

  // useEffect(() => {
  //   if (document !== undefined) {
  //     // const root = document.documentElement;
  //     if (darkTheme !== undefined) {
  //       console.log("if statement fires, dark theme:", darkTheme)
  //       if (darkTheme) {
  //         root.setAttribute("data-theme", "dark");
  //         storeUserSetPreference("dark");
  //       } else {
  //         root.removeAttribute("data-theme");
  //         storeUserSetPreference("light");
  //       }
  //     }
  //   }
  // }, [darkTheme]);

  const { colorMode, setColorMode } = useTheme();

  const isDark = colorMode === "dark" ? true : false;

  const handleToggle = () => {
    isDark ? setColorMode("light") : setColorMode("dark");
  };

  return (
    // darkTheme !== undefined && (
    <>
          <Paragraph>{isDark ? "true" : "false"}</Paragraph>
      <Desktop>
        <Button onClick={handleToggle} aria-label="toggle dark mode">
          <Circle />
          <small>Mode {isDark ? "sombre" : "claire"}</small>
        </Button>
      </Desktop>
      <Mobile>
        <Button onClick={handleToggle} aria-label="toggle dark mode">
          <LightDarkButton
          // darkTheme={darkTheme}
          />
        </Button>
      </Mobile>
    </>
    // )
  );
};

export default ToggleDarkMode;

const Desktop = styled.div`
  @media (max-width: ${breakpoints.s}px) {
    display: none;
  }
`;

const Mobile = styled.div`
  display: none;
  @media (max-width: ${breakpoints.s}px) {
    display: block;
  }
`;
const Paragraph = styled.p`
  color: var(--color-themecream);
`;
const Button = styled.button`
  position: relative;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* color: var(--color-cream); */
  transition: var(--transition);
  width: 175px;
  height: 34px;


  small {
    position: relative;
    align-self: center;
    font-family: "Surt";
    transform: translateY(2px);

    :hover {
      text-decoration: underline;
    }
  }
  @media (max-width: ${breakpoints.m}px) {
    width: auto;
    height: 25px;
    small {
      font-size: 14px !important;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    height: 20px;
    small {
      font-size: 12px !important;
      white-space: nowrap;
    }
  }
`;

const Circle = styled.span`
  width: 20px;
  height: auto;
  aspect-ratio: 1/1;
  margin-right: 0.5rem;
  display: inline-block;
  border-radius: 100%;
  background-color: var(--color-cream);
  transition: var(--transition);

  @media (max-width: ${breakpoints.m}px) {
    width: 15px;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 10px;
  }
`;
