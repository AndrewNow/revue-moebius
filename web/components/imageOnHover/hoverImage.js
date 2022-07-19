import Image from "next/image";
import { useState, useCallback, useLayoutEffect } from "react";

const getObjectDimensions = (node) => {
  const rect = node.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
  };
};

const useSize = () => {
  const [dimensions, setDimensions] = useState({});

  const [node, setNode] = useState(null);

  const ref = useCallback((node) => {
    setNode(node);
  });

  useLayoutEffect(() => {
    if (node) {
      const measure = () => setDimensions(getObjectDimensions(node));
      measure();
    }
  }, [node]);
  return [ref, dimensions];
};

const HoverImage = ({ data, active, x, y }) => {
  const [ref, { width, height }] = useSize();

  return (
    <div
      ref={ref}
      style={{
        transform: `translate(${x - width / 2}px, ${y - height / 2}px)`,
        willChange: "transform",
      }}
      className={active ? "hover-media is-active" : "hover-media"}
    >
      <Image
        src={data.imageUrl}
        alt={`Image couveture pour ${data.title}`}
        width={375}
        height={470}
        quality={80}
        objectFit="contain"
        placeholder="blur"
        blurDataURL={data.lqip}
      />
    </div>
  );
};

export default HoverImage;
