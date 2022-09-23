import { footerLogoQuery } from "../../lib/sanity/footerLogoQuery";
import { residenciesPageQuery } from "../../lib/sanity/residencesQuery";
import { client } from "../../lib/sanity/client";
import groq from "groq";
import styled from "styled-components";

const Residences = ({ residence }) => {
  console.log(residence.person);
  return (
    <Wrapper>
      <h1>{residence?.person?.title}</h1>
    </Wrapper>
  );
};

export default Residences;

export async function getStaticProps({ params }) {
  const footerLogos = await client.fetch(footerLogoQuery);

  const residence = await client.fetch(residenciesPageQuery, {
    slug: params.slug,
  });

  return {
    props: {
      residence,
      footerLogos,
    },
  };
}

export async function getStaticPaths() {
  const residences = await client.fetch(
    groq`*[_type == "residences"].residencesData[].slug.current`
  );
  return {
    paths: residences.map((slug) => ({ params: { slug } })),

    fallback: true,
  };
}

const Wrapper = styled.div`
  margin: 15rem 0;
  background: var(--color-blue);
`;
