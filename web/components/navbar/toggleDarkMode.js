import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

const ToggleDarkMode = () => {
  // Set Dark mode / Light mode
  // according to https://sreetamdas.com/blog/the-perfect-dark-mode

  // __Rules__
  // * If the user has visited our site before, then we use their saved preference.
  // * If the user hasn't visited our site before or hasn't saved a preference, then we check if their Operating System has a preference and use the same.
  // * If the above two methods don't return a preference still, then we default to a light theme.
  // * All the above checks need to be run before our page is rendered/shown to the user.
  // * Allow the user to toggle dark mode, and save their preference for future reference.

  const [darkTheme, setDarkTheme] = useState(undefined);

  const handleToggle = () => {
    setDarkTheme(!darkTheme);
  };

  const storeUserSetPreference = (pref) => {
    localStorage.setItem("theme", pref);
  };

  useEffect(() => {
    if (document !== undefined) {
      const root = document.documentElement;

      const initialColorValue = root.style.getPropertyValue(
        "--initial-color-mode"
      );

      setDarkTheme(initialColorValue === "dark");
    }
  }, []);

  useEffect(() => {
    if (document !== undefined) {
      const root = document.documentElement;
      if (darkTheme !== undefined) {
        if (darkTheme) {
          root.setAttribute("data-theme", "dark");
          storeUserSetPreference("dark");
        } else {
          root.removeAttribute("data-theme");
          storeUserSetPreference("light");
        }
      }
    }
  }, [darkTheme]);

  return (
    darkTheme !== undefined && (
      <Button onClick={handleToggle}>
        <Circle />
        <small>Mode {darkTheme ? "sombre" : "claire"}</small>
      </Button>
    )
  );
};

export default ToggleDarkMode;

const Button = styled.button`
  position: relative;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: var(--color-cream);
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
`;

const Circle = styled.span`
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
  display: inline-block;
  border-radius: 100%;
  background-color: var(--color-cream);
  transition: var(--transition);
`;
