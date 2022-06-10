import Link from "next/link";
import { client } from "../lib/sanity/client";
import { homeQuery } from "../lib/sanity/homeQuery";
import styled from "styled-components";
import { footerLogoQuery } from "../lib/sanity/footerLogoQuery";

export default function Home({ posts }) {
  return (
    <Main>
      <Inner>
        <Header>My Blog</Header>
        <Header>My Blog</Header>
        <Header>My Blog</Header>
        <Header>My Blog</Header>
        <hr />
        <ul>
          {/* {posts.map((p) => (
            <li key={p._id}>
              <Link href={`/posts/${p.slug}`}>
              <a>{p.title}</a>
              </Link>
              </li>
            ))} */}
        </ul>
      </Inner>
    </Main>
  );
}

export async function getStaticProps() {
  const footerLogos = await client.fetch(footerLogoQuery);

  const posts = await client.fetch(homeQuery);

  return {
    props: {
      posts,
      footerLogos,
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
`;

const Inner = styled.div`
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
