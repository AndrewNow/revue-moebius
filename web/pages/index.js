import { client } from "../lib/sanity/client";
import styled from "styled-components";
import { footerLogoQuery } from "../lib/sanity/footerLogoQuery";
import {
  numeroHomepageQuery,
  numeroListQuery,
} from "../lib/sanity/numeroQuery";
import { bannerQuery } from "../lib/sanity/bannerQuery";
import { featuredBaladoQuery } from "../lib/sanity/baladoQuery";
import {
  nouvellesListHomepageQuery,
  nouvellesFeaturedQuery,
} from "../lib/sanity/nouvellesQuery";
import { faqQuery } from "../lib/sanity/faqQuery";
import Landing from "../components/homepage/landing";
import BannerMarquee from "../components/bannerMarquee";
import NewsSection from "../components/homepage/newsSection";
import NumerosSection from "../components/homepage/numerosSection";
import BaladoSection from "../components/homepage/baladoSection";
import Faq from "../components/homepage/faq";
import AProposSection from "../components/homepage/aProposSection";

export default function Home({
  latestNumero,
  bannerData,
  newsFeed,
  featuredArticle,
  numerosData,
  baladoData,
  faqData,
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
      <BaladoSection baladoData={baladoData} />

      <AProposSection />
      <Faq faqData={faqData} />
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
  const baladoData = await client.fetch(featuredBaladoQuery);
  const faqData = await client.fetch(faqQuery);

  return {
    props: {
      latestNumero,
      bannerData,
      newsFeed,
      featuredArticle,
      footerLogos,
      numerosData,
      baladoData,
      faqData,
    },
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
