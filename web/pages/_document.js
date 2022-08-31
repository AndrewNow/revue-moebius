import React from "react";
import { Head, Html, Main, NextScript } from "next/document";
import { ScriptHydrationTheme } from "next-theme-mode";
import { Theme } from "../styles/Theme";

export default function Document() {
  return (
    <Html lang="fr">
      <Head />
      <body>
        <ScriptHydrationTheme themes={Theme} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// import Document, { Html, Head, Main, NextScript } from "next/document";

// // // taken from:
// // // https://sreetamdas.com/blog/the-perfect-dark-mode

// // our function needs to be a string
// const blockingSetInitialColorMode = `(function() {
// 	${setInitialColorMode.toString()}
// 	setInitialColorMode();
// })()
// `;

// function setInitialColorMode() {
//   function getInitialColorMode() {
//     const persistedColorPreference = window.localStorage.getItem("theme");
//     console.log("DOCUMENT:", persistedColorPreference);
//     const hasPersistedPreference = typeof persistedColorPreference === "string";

//     /**
//      * If the user has explicitly chosen light or dark,
//      * use it. Otherwise, this value will be null.
//      */
//     if (hasPersistedPreference) {
//       console.log("persistedColorPreference", persistedColorPreference);
//       return persistedColorPreference;
//     }

//     // If there is no saved preference, use a media query
//     const mql = window.matchMedia("(prefers-color-scheme: dark)");
//     const hasMediaQueryPreference = typeof mql.matches === "boolean";

//     if (hasMediaQueryPreference) {
//       console.log("hasMediaQueryPreference", hasMediaQueryPreference);
//       return mql.matches ? "dark" : "light";
//     }

//     // default to 'light'.
//     return "light";
//   }

//   const colorMode = getInitialColorMode();
//   console.log("color mode", colorMode);
//   const root = document.documentElement;
//   root.style.setProperty("--initial-color-mode", colorMode);
//   console.log(root.style);

//   // add HTML attribute if dark mode
//   if (colorMode === "dark")
//     document.documentElement.setAttribute("data-theme", "dark");
//     console.log(document.documentElement);
// }

// export default class MyDocument extends Document {
//   render() {
//     return (
//       <Html>
//         <Head />
//         <body>
//           <script
//             dangerouslySetInnerHTML={{
//               __html: blockingSetInitialColorMode,
//             }}
//           ></script>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }
