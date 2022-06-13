import Link from "next/link";
import { client } from "../lib/sanity/client";
import { homeQuery } from "../lib/sanity/homeQuery";
import styled from "styled-components";
import { footerLogoQuery } from "../lib/sanity/footerLogoQuery";
import {
  numeroHomepageQuery,
  numeroListQuery,
} from "../lib/sanity/numeroQuery";
import { bannerQuery } from "../lib/sanity/bannerQuery";
import Landing from "../components/homepage/landing";
import BannerMarquee from "../components/bannerMarquee";
import NewsSection from "../components/homepage/newsSection";
import {
  nouvellesListHomepageQuery,
  nouvellesFeaturedQuery,
} from "../lib/sanity/nouvellesQuery";
import NumerosSection from "../components/homepage/numerosSection";

export default function Home({
  latestNumero,
  bannerData,
  newsFeed,
  featuredArticle,
  numerosData,
}) {
  return (
    <Main>
      <Inner>
        <Landing data={latestNumero} />
      </Inner>
      <BannerMarquee data={bannerData} />
      <Inner>
        <NewsSection newsFeed={newsFeed} featuredArticle={featuredArticle} />
      </Inner>
      <NumerosSection numerosData={numerosData} />
    </Main>
  );
}

export async function getStaticProps() {
  const footerLogos = await client.fetch(footerLogoQuery);
  const latestNumero = await client.fetch(numeroHomepageQuery);
  const bannerData = await client.fetch(bannerQuery);
  const newsFeed = await client.fetch(nouvellesListHomepageQuery);
  const featuredArticle = await client.fetch(nouvellesFeaturedQuery);
  const numerosData = await client.fetch(numeroListQuery);

  return {
    props: {
      latestNumero,
      bannerData,
      newsFeed,
      featuredArticle,
      footerLogos,
      numerosData,
    },
    // params: {
    //   slug: string,
    // },
    revalidate: 10,
  };
}

const Main = styled.div`
  background-color: var(--color-cream);
  transition: var(--transition);
  overflow-x: hidden;
`;

export const Inner = styled.div`
  width: 92.5%;
  margin: 0 auto;
`;

const Header = styled.h1`
  padding-top: 130px;
  margin: 0;
  color: var(--color-black);
  background: var(--color-cream);

  transition: var(--transition);
`;
