import Image from "next/image";

const HoverImage = ({ data, active, x, y }) => {
  return (
    <div
      style={{ transform: `translate(${x}px, ${y}px)` }}
      className={active ? "hover-media is-active" : "hover-media"}
    >
      <Image
        src={data.imageUrl}
        alt={`Image couveture pour ${data.title}`}
        width={275}
        height={413}
        quality={80}
      />
    </div>
  );
};

export default HoverImage;
