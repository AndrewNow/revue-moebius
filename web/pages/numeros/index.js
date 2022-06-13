import { client } from "../../lib/sanity/client";
import styled from "styled-components";
import { footerLogoQuery } from "../../lib/sanity/footerLogoQuery";
import { Inner } from "../../pages/index";
import { numeroListQuery } from "../../lib/sanity/numeroQuery";
import Image from "next/image";
import Link from "next/link";

const Numeros = ({ numeroData }) => {
  return (
    <>
      <Header>
        <Inner>
          <h1>La revue Mœbius lorem ipsum dolor sit amet</h1>
        </Inner>
      </Header>
      <Inner>
        <Content>
          <ContentHeader>
            <h1>Éditions</h1>
          </ContentHeader>
          <Grid>
            {numeroData.map((numero) => {
              return (
                <GridItem>
                  <ItemImage>
                    <Image
                      src={numero.imageUrl}
                      alt={`Image couveture pour ${numero.title}`}
                      layout="fill"
                    />
                  </ItemImage>
                  <ItemText>
                    <small>n°{numero.number}</small>
                    <h5>
                      <Link href={`/numeros/${numero.slug}`}>
                        {numero.title}
                      </Link>
                    </h5>
                  </ItemText>
                </GridItem>
              );
            })}
          </Grid>
        </Content>
      </Inner>
    </>
  );
};

export default Numeros;

export async function getStaticProps() {
  const footerLogos = await client.fetch(footerLogoQuery);
  const numeroData = await client.fetch(numeroListQuery);

  return {
    props: {
      footerLogos,
      numeroData,
    },
    revalidate: 10,
  };
}

const Header = styled.header`
  background: var(--color-purple);
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  h1 {
    color: var(--static-cream);
    max-width: 80%;
    margin-bottom: 3rem;
  }
`;

const Content = styled.section`
  margin: 10rem 0;
`;

const ContentHeader = styled.div`
  text-align: center;
  border-bottom: 1px solid var(--color-black);
  h1 {
    color: var(--color-black);
  }
`;

const Grid = styled.div`
  display: grid;
  justify-content: center;
  justify-items: center;
  align-items: start;
  grid-template-columns: 1fr 1fr 1fr;
`;

const GridItem = styled.div`
  width: 490px;
  position: relative;
  margin: 2rem 0;
`;

const ItemText = styled.div`
  text-align: center;
  margin: 2rem 0;
  h5 {
    color: var(--color-black);
  }
  small {
    color: var(--color-grey);
  }

  a {
    text-decoration: none;
  }

  :hover {
    a {
      text-decoration: underline;
    }
  }
`;

const ItemImage = styled.div`
  aspect-ratio: 512/732;
  display: block;
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
`;
