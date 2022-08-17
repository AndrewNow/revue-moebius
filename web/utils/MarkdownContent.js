import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import getYouTubeId from "get-youtube-id";
import YouTube from "react-youtube";

const MarkdownContent = ({ blocks }) => {
  const serializers = {
    types: {
      youtube: ({ node }) => {
        const { url } = node;
        const id = getYouTubeId(url);
        return <YouTube videoId={id} />;
      },
    },
  };

  return <BlockContent blocks={blocks} serializers={serializers} />;
};

export default MarkdownContent;
