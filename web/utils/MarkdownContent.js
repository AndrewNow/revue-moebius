import React from "react";
// import BlockContent from "@sanity/block-content-to-react";
import getYouTubeId from "get-youtube-id";
import YouTube from "react-youtube";
import { PortableText } from "@portabletext/react";
import SanityImageComponent from "./sanityImageComponent";

const MarkdownContent = ({ blocks }) => {
  const components = {
    types: {
      image: SanityImageComponent,
      youtube: ({ value }) => {
        const { url } = value;
        const id = getYouTubeId(url);
        return <YouTube videoId={id} />;
      },
    },
    block: {
      ["normalCenterAlign"]: ({ children }) => (
        <p style={{ textAlign: "center", display: "block" }}>{children}</p>
      ),
      ["normalRightAlign"]: ({ children }) => (
        <p style={{ textAlign: "right", display: "block" }}>{children}</p>
      ),
    },
  };

  return <PortableText value={blocks} components={components} />;
};

export default MarkdownContent;
