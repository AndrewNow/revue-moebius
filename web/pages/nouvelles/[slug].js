import Link from "next/link";
import groq from "groq";
import BlockContent from "@sanity/block-content-to-react";
import { client } from "../../lib/sanity/client";
import { nouvellesQuery } from "../../lib/sanity/nouvellesQuery";
import { footerLogoQuery } from "../../lib/sanity/footerLogoQuery";
import Image from "next/image";
import styled from "styled-components";

export default function Nouvelles({ nouvelles }) {
  return (
    <>
      <h2>{nouvelles?.title}</h2>
      <p>{nouvelles?.publishedAt}</p>
      <hr />
      <ImageWrapper>
        <Image
          src={nouvelles?.imageUrl}
          alt="Thumbnail image"
          quality={100}
          layout="fill"
        />
      </ImageWrapper>
      <BlockContent blocks={nouvelles?.body} />
      <Link href="/nouvelles">
        <a>Back to nouvelles</a>
      </Link>
    </>
  );
}

export async function getStaticProps({ params }) {
  const footerLogos = await client.fetch(footerLogoQuery);

  let slug;
  const nouvelles = await client.fetch(nouvellesQuery, {
    slug: params.slug,
  });

  return {
    props: {
      nouvelles,
      footerLogos,
    },
  };
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "nouvelles" && defined(slug.current)][].slug.current`
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
