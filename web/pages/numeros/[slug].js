import Link from "next/link";
import groq from "groq";
import BlockContent from "@sanity/block-content-to-react";
import { client } from "../../lib/sanity/client";
import { numeroQuery } from "../../lib/sanity/numeroQuery";
import { footerLogoQuery } from "../../lib/sanity/footerLogoQuery";
import Image from "next/image";
import styled from "styled-components";

export default function Numeros({ numero }) {
  return (
    <>
      <h2>{numero?.title}</h2>
      <p>{numero?.publishedAt}</p>
      <hr />
      {/* <img src={urlFor(numeros?.mainImage).width(300)} /> */}
      <ImageWrapper>
        <Image
          src={numero?.imageUrl}
          alt="Thumbnail image"
          quality={100}
          layout="fill"
        />
      </ImageWrapper>
      <BlockContent blocks={numero?.body} />
      <Link href="/numeros">
        <a>Back to numeros</a>
      </Link>
    </>
  );
}

export async function getStaticProps({ params }) {
  const footerLogos = await client.fetch(footerLogoQuery);

  let slug;
  const numero = await client.fetch(numeroQuery, {
    slug: params.slug,
  });

  return {
    props: {
      numero,
      footerLogos,
    },
  };
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "numero" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

const ImageWrapper = styled.div`
  width: 300px;
  height: 200px;
  position: relative;
`;
