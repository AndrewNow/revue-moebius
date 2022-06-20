import Link from "next/link";
import groq from "groq";
import BlockContent from "@sanity/block-content-to-react";
import { client } from "../../lib/sanity/client";
import { nouvellesQuery } from "../../lib/sanity/nouvellesQuery";
import { footerLogoQuery } from "../../lib/sanity/footerLogoQuery";
import Image from "next/image";
import styled from "styled-components";

export default function balado({ balado }) {
  console.log(balado[0]);
  return (
    <>
      <h2>{balado?.title}</h2>
      <p>{balado?.publishedAt}</p>
      <hr />
      {/* <img src={urlFor(balado?.mainImage).width(300)} /> */}
      <ImageWrapper>
        <Image
          src={balado?.imageUrl}
          alt="Thumbnail image"
          quality={100}
          layout="fill"
        />
      </ImageWrapper>
      <BlockContent blocks={balado?.body} />
      <Link href="/balado">
        <a>Back to balado</a>
      </Link>
    </>
  );
}

export async function getStaticProps({ params }) {
  const footerLogos = await client.fetch(footerLogoQuery);

  let slug;
  const balado = await client.fetch(baladoQuery, {
    slug: params.slug,
  });

  return {
    props: {
      balado,
      footerLogos,
    },
  };
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "balado" && defined(slug.current)][].slug.current`
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
