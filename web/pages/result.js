import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import { fetchGetJSON } from "../utils/apiHelpers";
import styled from "styled-components";
import { useEffect } from "react";
import { useReward } from "react-rewards";
// import PrintObject from "../components/PrintObject";
import { breakpoints } from "../utils/breakpoints";
import Head from "next/head";
import { footerLogoQuery } from "../lib/sanity/footerLogoQuery";
import { client } from "../lib/sanity/client";

const ResultPage = () => {
  const router = useRouter();

  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation

  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,

    fetchGetJSON
  );

  if (error) {
    return <div>Oops! Échec du chargement.</div>;
  }

  // Confetti config
  const { reward } = useReward("rewardId", "confetti", {
    lifetime: 800,
    spread: 85,
    startVelocity: 40,
    elementCount: 80,
  });

  useEffect(() => {
    reward();
  }, [reward]);

  return (
    <>
      <Head>
        <title>La revue Mœbius</title>
        <meta property="og:title" content="La revue Mœbius" />
      </Head>
      <Wrapper>
        <Reward id="rewardId" />
        <Text>
          <h3>
            Merci de soutenir la revue,{" "}
            {
              data?.payment_intent?.charges?.data[0].billing_details.name.split(
                " "
              )[0]
            }
            !
          </h3>
          <p>
            Un courriel de confirmation va bientôt être envoyé à l'addresse suivante:{" "}
            <br />{" "}
            {data?.payment_intent.charges.data[0].billing_details.email}
          </p>
          <Link scroll={false} href="/">
            <Button>
              <small>Retourner à la page d'accueil</small>
            </Button>
          </Link>
        </Text>
      </Wrapper>
    </>
    //   {/* <h2>Status: {data?.payment_intent?.status ?? "loading..."}</h2>
    //   <h3>CheckoutSession response:</h3>
    //   <PrintObject content={data ?? "loading..."} /> */}
    //   <Link scroll={false} href="/">
    //     <a>Back home</a>
    //   </Link>
    // </div>
  );
};

export default ResultPage;

export async function getStaticProps() {
  const footerLogos = await client.fetch(footerLogoQuery);
  return {
    props: {
      footerLogos,
    },
    revalidate: 10,
  };
}

const Reward = styled.span`
  margin: 0 auto;
  position: absolute;
  top: 0;
`;

const Wrapper = styled.div`
  min-height: 80vh;
  background-color: var(--color-blue);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Text = styled.div`
  color: var(--static-black);
  text-align: center;
  h3 {
    font-family: "Surt";
  }
  p {
    padding: 3rem 0;;
  }

  @media (max-width: ${breakpoints.s}px) {
    width: 90%;
    margin: 0 auto;
    p {
      padding: 2rem 0;
    }
  }
`;

const Button = styled.div`
  display: inline-block;
  border: 1px solid var(--static-black);
  padding: 1rem 2rem;
  border-radius: 10px;
  transition: var(--transition);
  cursor: pointer;
`;
