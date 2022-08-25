import { getImageDimensions } from "@sanity/asset-utils";
import urlBuilder from "@sanity/image-url";
import { client } from "../lib/sanity/client";

const SanityImageComponent = ({ value }) => {
  const { width, height } = getImageDimensions(value);
  return (
    <img
      src={urlBuilder(client)
        .image(value)
        .width(800)
        .fit("max")
        .auto("format")
        .url()}
      // src={value.image}
      alt={value.alt || " "}
      loading="lazy"
      style={{
        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
        display: "block",
        margin: "0 auto",
      }}
      width={"90%"}
      height={"auto"}
    />
  );
};

export default SanityImageComponent;
