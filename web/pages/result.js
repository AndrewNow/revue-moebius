import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import { fetchGetJSON } from "../utils/apiHelpers";
import styled from "styled-components";
import { useEffect } from "react";
import { useReward } from "react-rewards";
// import PrintObject from "../components/PrintObject";
// import { breakpoints } from "../utils/breakpoints";

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
      <Wrapper>
        <Reward id="rewardId" />
        <Text>
          <h3>
            Merci de soutenir la revue,{" "}
            {
              data?.payment_intent.charges.data[0].billing_details.name.split(
                " "
              )[0]
            }
            !
          </h3>
          <p>
            Un courriel de confirmation va être envoyé à{" "}
            {data?.payment_intent.charges.data[0].billing_details.email}.
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
    padding-bottom: 3rem;
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
