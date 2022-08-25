import React from "react";
// import BlockContent from "@sanity/block-content-to-react";
import getYouTubeId from "get-youtube-id";
import YouTube from "react-youtube";
import { PortableText } from "@portabletext/react";
import SanityImageComponent from "./sanityImageComponent";

const MarkdownContent = ({ blocks }) => {
  const components = {
    types: {
      youtube: ({ value }) => {
        const { url } = value;
        const id = getYouTubeId(url);
        return <YouTube videoId={id} />;
      },
      image: SanityImageComponent,
    },
    block: {
      ["normal-center"]: ({ children }) => (
        <p className="test" style={{ textAlign: "center" }}>
          {children}
        </p>
      ),
      ["normal-right"]: ({ children }) => (
        <p style={{ textAlign: "right" }}>{children}</p>
      ),
    },
  };

  return <PortableText value={blocks} components={components} />;
};

export default MarkdownContent;
