import { client } from "../lib/sanity/client";
import styled from "styled-components";
import { footerLogoQuery } from "../lib/sanity/footerLogoQuery";
import {
  numeroHomepageQuery,
  numeroHomepageCarouselQuery,
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
import NouvellesSection from "../components/homepage/nouvellesSection";
import NumerosSection from "../components/homepage/numerosSection";
import BaladoSection from "../components/homepage/baladoSection";
import Faq from "../components/homepage/faq";
import AProposSection from "../components/homepage/aProposSection";
import ResidencesSection from "../components/homepage/residencesSection";
import { homepageResidenciesQuery } from "../lib/sanity/residencesQuery";
import Head from "next/head";

export default function Home({
  latestNumero,
  bannerData,
  newsFeed,
  featuredArticle,
  numerosData,
  residencesData,
  baladoData,
  faqData,
}) {
  return (
    <>
      <Head>
        <title>Accueil - La revue Mœbius</title>
        <meta property="og:title" content="Accueil - La revue Mœbius" />
        <meta
          property="og:description"
          content="Mœbius est une revue de création littéraire québécoise fondée en 1977 qui réunit des textes d’auteur·rice·s établi·e·s et d’écrivain·e·s émergent·e·s. La revue valorise la perméabilité des formes et des genres littéraires, l’expérimentation et la mise en scène de la subjectivité."
        />
        <meta
          name="description"
          content="Mœbius est une revue de création littéraire québécoise fondée en 1977 qui réunit des textes d’auteur·rice·s établi·e·s et d’écrivain·e·s émergent·e·s. La revue valorise la perméabilité des formes et des genres littéraires, l’expérimentation et la mise en scène de la subjectivité."
        />
      </Head>
      <Main>
        <Inner>
          <Landing data={latestNumero} />
        </Inner>
        <BannerMarquee data={bannerData} />
        <Inner>
          <NouvellesSection
            newsFeed={newsFeed}
            featuredArticle={featuredArticle}
          />
        </Inner>
        <NumerosSection numerosData={numerosData} />
        <ResidencesSection data={residencesData} />
        <BaladoSection baladoData={baladoData} />
        <AProposSection />
        <Faq faqData={faqData} />
      </Main>
    </>
  );
}

export async function getStaticProps() {
  const footerLogos = await client.fetch(footerLogoQuery);
  const latestNumero = await client.fetch(numeroHomepageQuery);
  const bannerData = await client.fetch(bannerQuery);
  const newsFeed = await client.fetch(nouvellesListHomepageQuery);
  const featuredArticle = await client.fetch(nouvellesFeaturedQuery);
  const numerosData = await client.fetch(numeroHomepageCarouselQuery);
  const residencesData = await client.fetch(homepageResidenciesQuery);
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
      residencesData,
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
