import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }

  return stripePromise;
};

export default getStripe;

// Stripe
// identifiant : revuemoebius@gmail.com
// mot de passe : kfk3EM0KJjz5VsY
// code de récupération (pour contourner l’authentification à 2 facteurs) : kmhm-lxfl-wtou-bwzc-erqp
